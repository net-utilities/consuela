import { expect } from 'chai';
import ShouldDatabaseBeUpdated from './ShouldDatabaseBeUpdated';

test('Expect not being updated for 24 hours to result in false', function () {

  const lastChecked = 1600413689000;
  const currentDate = 1600388489000;
  expect(ShouldDatabaseBeUpdated(lastChecked, currentDate)).to.be.false;

});

test('Expect being updated more than 24 hours ago to result in true', function () {

  const lastChecked = 1600413689000;
  const currentDate = 1600500099000;
  expect(ShouldDatabaseBeUpdated(lastChecked, currentDate)).to.be.true;

});
