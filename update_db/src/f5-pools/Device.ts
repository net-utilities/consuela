//Remove if using proper certificates
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

import fetch from 'node-fetch';
import logger from '../logger/winston';
import { PoolListResponse } from './Device.interfaces';
import { PoolMemberStatsResponse } from './Device.interfaces';
import ProcessPoolMemberStatistics from './ProcessPoolMemberStatistics/ProcessPoolMemberStatistics';

class Device {

  deviceDNS: string;
  deviceGroupName: string
  userName: string;
  password: string;
  token: string;
  tokenExpiration: number;
  management_ip: string;

  constructor(device_dns: string, deviceGroupName: string, user_name: string, password: string, management_ip = '') {
    this.deviceDNS = device_dns;
    this.userName = user_name;
    this.password = password;
    this.token = '';
    this.management_ip = management_ip;
    this.tokenExpiration = 0;
    this.deviceGroupName = deviceGroupName;
  }

  async getRestEndpoint(endpoint: string) {

    const now = Date.now();
    const url = `https://${this.deviceDNS}${endpoint}`;
    await this.getToken();

    const response = await fetch(url,{
      headers: {
        'X-F5-Auth-Token': this.token
      }
    })

    const data = await response.json();
    if (!response.ok){
      logger.error(`Failed REST call to ${endpoint}`);
      logger.error(data);
    }

    logger.debug(`Rest call took ${now - Date.now()}`);

    return data;

  }

  async isActive() {
    const response = await this.getRestEndpoint('/mgmt/tm/cm/failover-status');
    const deviceState = response.entries['https://localhost/mgmt/tm/cm/failover-status/0'].nestedStats.entries.status.description;
    return deviceState === 'ACTIVE';
  }

  async getPools(){

    const response: PoolListResponse = await this.getRestEndpoint('/mgmt/tm/ltm/pool?$select=fullPath');

    for(const poolPath of response.items){
      const { fullPath } = poolPath;
      const poolLink = `/mgmt/tm/ltm/pool/${fullPath.replace(/\//g, '~')}/members/stats?$select=monitorStatus,status.statusReason,totRequests,serverside.totConns,port,status.availabilityState,monitorRule,poolName,serverside.pktsIn,serverside.bitsOut,serverside.pktsOut,nodeName,sessionStatus,addr,status.enabledState,serverside.bitsIn`;
      const poolMemberStatsResponse: PoolMemberStatsResponse = await this.getRestEndpoint(poolLink);

      const { entries } = poolMemberStatsResponse;

      for(const poolMemberLink in entries){
        const memberStats = entries[poolMemberLink].nestedStats.entries;
        await ProcessPoolMemberStatistics(this.deviceDNS, this.deviceGroupName, memberStats);
      }
    }

  }

  async getToken() {

    const now = new Date();
    const epoch = now.getTime()/1000;

    // If the expiration time of the token is less than 600 seconds we re-use it
    if(this.tokenExpiration - epoch > 600){
      return this.token;
    }

    logger.info('Attempting to issue a new token');
    const device_dns = this.deviceDNS;
    const url = `https://${device_dns}/mgmt/shared/authn/login`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(this.userName + ":" + this.password).toString('base64')}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        username: this.userName,
        password: this.password,
        loginProviderName: 'tmos'
      })
    });

    if(!response.ok) {
      logger.error(await response.json());
      throw(`Failed get a token from ${device_dns}`);
    }

    logger.info(`Got new token from ${device_dns}`);

    const json = await response.json()
    const { token } = json;
    this.tokenExpiration = token.expirationMicros/1000000;
    this.token = token.token;

  }

}

export { Device };
