import 'source-map-support/register';
import DBUtil from './util/DBUtil';
import GetStats from './f5-pools/GetStats'
import { f5Config } from './config';

async function main(){
    await DBUtil.connect();
    await GetStats(f5Config);
}

export default main;

main();

