import { expect } from 'chai';
import { DeviceMemberStats } from '../../Device.interfaces';
import IncreaseDaysDown from './IncreaseDaysDown'

test('Expect pool being up to not be incremented', function () {

  const currentStats: DeviceMemberStats = {
    addr: { description: '10.50.14.49%1' },
    monitorRule: { description: '/UK/T_mon (pool monitor)' },
    monitorStatus: { description: 'up' },
    nodeName: { description: '/UK/10.50.14.49' },
    poolName: { description: '/UK/decoder-pool-pool' },
    port: { value: 8001 },
    'serverside.bitsIn': { value: 8709972888 },
    'serverside.bitsOut': { value: 24194656 },
    'serverside.pktsIn': { value: 884622 },
    'serverside.pktsOut': { value: 42005 },
    'serverside.totConns': { value: 3 },
    sessionStatus: { description: 'enabled' },
    'status.availabilityState': { description: 'available' },
    'status.enabledState': { description: 'enabled' },
    'status.statusReason': { description: 'Pool member is available' },
    totRequests: { value: 0 }
  }

  expect(IncreaseDaysDown(currentStats)).to.be.false;

});

test('Expect pool being down to be incremented', function () {

  const currentStats = {
      addr: { description: '10.50.14.49%1' },
      monitorRule: { description: '/UK/T_mon (pool monitor)' },
      monitorStatus: { description: 'down' },
      nodeName: { description: '/UK/10.50.14.49' },
      poolName: { description: '/UK/decoder-pool' },
      port: { value: 8006 },
      'serverside.bitsIn': { value: 0 },
      'serverside.bitsOut': { value: 0 },
      'serverside.pktsIn': { value: 0 },
      'serverside.pktsOut': { value: 0 },
      'serverside.totConns': { value: 0 },
      sessionStatus: { description: 'enabled' },
      'status.availabilityState': { description: 'offline' },
      'status.enabledState': { description: 'enabled' },
      'status.statusReason': {
        description: '/UK/T_mon: No successful responses received before deadline. @2020/07/27 08:12:23. '
      },
      totRequests: { value: 0 }
  }

  expect(IncreaseDaysDown(currentStats)).to.be.true;

});

test('Expect pool being up to not be incremented', function () {

  const currentStats: DeviceMemberStats = {
    addr: { description: '10.50.14.49%1' },
    monitorRule: { description: '/UK/T_mon (pool monitor)' },
    monitorStatus: { description: 'up' },
    nodeName: { description: '/UK/10.50.14.49' },
    poolName: { description: '/UK/decoder-pool-pool' },
    port: { value: 8001 },
    'serverside.bitsIn': { value: 8709972888 },
    'serverside.bitsOut': { value: 24194656 },
    'serverside.pktsIn': { value: 884622 },
    'serverside.pktsOut': { value: 42005 },
    'serverside.totConns': { value: 3 },
    sessionStatus: { description: 'enabled' },
    'status.availabilityState': { description: 'available' },
    'status.enabledState': { description: 'enabled' },
    'status.statusReason': { description: 'Pool member is available' },
    totRequests: { value: 0 }
  }

  expect(IncreaseDaysDown(currentStats)).to.be.false;

});

test('Expect pool being down to be incremented', function () {

  const currentStats = {
    addr: { description: '10.50.14.49%1' },
    monitorRule: { description: '/UK/T_mon (pool monitor)' },
    monitorStatus: { description: 'down' },
    nodeName: { description: '/UK/10.50.14.49' },
    poolName: { description: '/UK/decoder-pool' },
    port: { value: 8006 },
    'serverside.bitsIn': { value: 0 },
    'serverside.bitsOut': { value: 0 },
    'serverside.pktsIn': { value: 0 },
    'serverside.pktsOut': { value: 0 },
    'serverside.totConns': { value: 0 },
    sessionStatus: { description: 'enabled' },
    'status.availabilityState': { description: 'offline' },
    'status.enabledState': { description: 'enabled' },
    'status.statusReason': {
      description: '/UK/T_mon: No successful responses received before deadline. @2020/07/27 08:12:23. '
    },
    totRequests: { value: 0 }
  }

  expect(IncreaseDaysDown(currentStats)).to.be.true;

});

test('Expect pool member being unchecked to not be incremented', function () {

  const currentStats = {
    addr: { description: '10.50.14.49%1' },
    monitorRule: { description: '/UK/T_mon (pool monitor)' },
    monitorStatus: { description: 'unchecked' },
    nodeName: { description: '/UK/10.50.14.49' },
    poolName: { description: '/UK/decoder-pool' },
    port: { value: 8006 },
    'serverside.bitsIn': { value: 0 },
    'serverside.bitsOut': { value: 0 },
    'serverside.pktsIn': { value: 0 },
    'serverside.pktsOut': { value: 0 },
    'serverside.totConns': { value: 0 },
    sessionStatus: { description: 'enabled' },
    'status.availabilityState': { description: 'unchecked' },
    'status.enabledState': { description: 'enabled' },
    'status.statusReason': {
      description: '/UK/T_mon: No successful responses received before deadline. @2020/07/27 08:12:23. '
    },
    totRequests: { value: 0 }
  }

  expect(IncreaseDaysDown(currentStats)).to.be.false;

});
