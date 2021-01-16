import { expect } from 'chai';
import { DeviceMemberStats, IMemberStats } from '../../Device.interfaces';
import ShouldDatabaseBeUpdated from './ShouldDatabaseBeUpdated';

test('Expect not being updated on a previous day result in false', function () {

  const dbStats: IMemberStats = {
    _id: 'bogus',
    deviceName: 'bogus',
    deviceGroupName: 'bogus',
    addr: { description: '10.50.14.49%1' },
    monitorRule: { description: '/UK/T_mon (pool monitor)' },
    monitorStatus: { description: 'up' },
    nodeName: { description: '/UK/10.50.14.49' },
    poolName: { description: '/UK/decoder-pool' },
    port: { value: 8001 },
    'serverside.bitsIn': { value: 8709972888 },
    'serverside.bitsOut': { value: 24194656 },
    'serverside.pktsIn': { value: 884622 },
    'serverside.pktsOut': { value: 42005 },
    'serverside.totConns': { value: 4 },
    sessionStatus: { description: 'enabled' },
    'status.availabilityState': { description: 'available' },
    'status.enabledState': { description: 'enabled' },
    'status.statusReason': { description: 'Pool member is available' },
    totRequests: { value: 0 },
    daysDown: 0,
    daysWithoutConnections: 0,
    daysWithoutData: 0,
    daysWithoutRequests: 0,
    lastChecked: 1600413689000,
  }

  const currentDate = 1600388489000 ;
  expect(ShouldDatabaseBeUpdated(dbStats, currentDate)).to.be.false;

});

test('Expect being updated a previous day to result in true', function () {

  const dbStats: IMemberStats = {
    _id: 'bogus',
    deviceName: 'bogus',
    deviceGroupName: 'bogus',
    addr: { description: '10.50.14.49%1' },
    monitorRule: { description: '/UK/T_mon (pool monitor)' },
    monitorStatus: { description: 'up' },
    nodeName: { description: '/UK/10.50.14.49' },
    poolName: { description: '/UK/decoder-pool' },
    port: { value: 8001 },
    'serverside.bitsIn': { value: 8709972888 },
    'serverside.bitsOut': { value: 24194656 },
    'serverside.pktsIn': { value: 884622 },
    'serverside.pktsOut': { value: 42005 },
    'serverside.totConns': { value: 4 },
    sessionStatus: { description: 'enabled' },
    'status.availabilityState': { description: 'available' },
    'status.enabledState': { description: 'enabled' },
    'status.statusReason': { description: 'Pool member is available' },
    totRequests: { value: 0 },
    daysDown: 0,
    daysWithoutConnections: 0,
    daysWithoutData: 0,
    daysWithoutRequests: 0,
    lastChecked: 1600413689000,
  }

  const currentDate = 1600500099000;
  expect(ShouldDatabaseBeUpdated(dbStats, currentDate)).to.be.true;

});
