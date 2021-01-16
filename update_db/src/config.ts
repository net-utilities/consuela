import {IF5Config, IReportConfig } from './config.interfaces';
import Slack from './reportTransports/Slack/slack';

/*
  Most of the configuration below can either be done in the file, or supplied via environment variables.
  If this file has been populated and an environment variable is also used,
  the environment variable takes precedence.
 */

/*
  couchDBConfig
  couchDBServer: The address to your CouchDB server
  couchDBUser: Username for CouchDB
  couchDBPassword: Password for CouchDB
 */

export const couchDBConfig = {
  couchDBServer: process.env.COUCHDB_SERVER || 'localhost:5984',
  couchDBUser: process.env.COUCHDB_USER || 'admin',
  couchDBPassword: process.env.COUCHDB_PASSWORD || 'password',
}

/*
  The F5Configuration is a bit more tricky
  If you use bigipreport the devices polled will be based on:
  - The devices in bigipreport
  - Ignored devicegroups are removed (must match the device group in bigipreport
  - Devices in deviceGroups are then finally added to complete the list

  If you bigipreport is set to '' all devices comes from explicitDeviceGroups

  username: admin,  // Which user to authenticate against the f5s with
  password: admin,  // Which password to authenticate against the f5s with
  bigipReportBaseUrl: 'https://bigipreport.domain.com', // Url to bigipreport, set to '' to specify devices manually
  ignoreDeviceGroups: ['US-CLUSTER'], // Device group names in bigipreport to ignore
  explicitDeviceGroups: [
    {
      name: 'UK-CLUSTER',
      devices: [
        'UK-LB-01.domain.com',
        'UK-LB-02.domain.com'
      ]
    },                            //Manually defined device groups.
    {
      name: 'SE-CLUSTER',
      devices: [
        'SE-LB-01.domain.com',
        'SE-LB-02.domain.com'
      ]
    }
  ]

}
* */

export const f5Config: IF5Config = {
  username: process.env.F5_USERNAME || 'admin',
  password: process.env.F5_PASSWORD || 'admin',
  bigipReportBaseUrl: '',
  ignoreDeviceGroups: [],
  explicitDeviceGroups: [],
};

// Should be clear to anyone using logz.io
// Leave environment variables unset and strings blanks if you don't want to use this
export const logzioConfig = {
  listenerHost: process.env.LOGZIO_LISTENER || '',
  token: process.env.LOGZIO_TOKEN || '',
  type: process.env.LOGZIO_TYPE || '',
};

/*
  reportWhen
  What's the limit in terms of days down or without data for triggering the Slack webhook?

  reportTransports
  If if you don't want the Slack reports, remove Slack from reportTransports
  If you WANT to use it, supply SLACK_WEBHOOK as a environment variable when starting
  the script.
*/

export const reportConfig: IReportConfig = {
  reportWhen: {
    poolsDownDays: 0,
    noDataDays: 0,
  },
  reportTransports: [
    Slack,
  ]
};

