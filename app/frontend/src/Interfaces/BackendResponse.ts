import {DBMemberStats} from './MemberStats';

export interface IDBResult {
  docs: DBMemberStats[],
  bookmark?: string,
  warning?: string,
}
