export interface LoginReference {
  link: string;
}

export interface User {
  link: string;
}

export interface Token {
  token: string;
  name: string;
  userName: string;
  authProviderName: string;
  user: User;
  timeout: number;
  startTime: Date;
  address: string;
  partition: string;
  generation: number;
  lastUpdateMicros: number;
  expirationMicros: number;
  kind: string;
  selfLink: string;
}

export interface TokenResponse {
  username: string;
  loginReference: LoginReference;
  loginProviderName: string;
  token: Token;
  generation: number;
  lastUpdateMicros: number;
}

export interface PoolResponse {
  kind: string,
  items: Pool[]
}


export interface MembersReference {
  link: string;
  isSubcollection: boolean;
  items?: Member[];
}

export interface Pool {
  linkQosToServer: string;
  monitor: string;
  description: string;
  partition: string;
  ignorePersistedWeight: string;
  slowRampTime: number;
  minActiveMembers: number;
  allowSnat: string;
  queueOnConnectionLimit: string;
  selfLink: string;
  minUpMembersChecking: string;
  reselectTries: number;
  minUpMembers: number;
  fullPath: string;
  ipTosToClient: string;
  linkQosToClient: string;
  minUpMembersAction: string;
  queueTimeLimit: number;
  loadBalancingMode: string;
  membersReference: MembersReference;
  kind: string;
  name: string;
  allowNat: string;
  queueDepthLimit: number;
  generation: number;
  serviceDownAction: string;
  ipTosToServer: string;
}

export interface NameReference {
  link: string;
}

export interface Fqdn {
  autopopulate: string;
}

export interface Member {
  session: string;
  rateLimit: string;
  fullPath: string;
  inheritProfile: string;
  ephemeral: string;
  state: string;
  generation: number;
  logging: string;
  kind: string;
  name: string;
  ratio: number;
  address: string;
  nameReference: NameReference;
  fqdn: Fqdn;
  monitor: string;
  partition: string;
  connectionLimit: number;
  selfLink: string;
  dynamicRatio: number;
  priorityGroup: number;
}

export interface Addr {
  description: string;
}

export interface MonitorRule {
  description: string;
}

export interface MonitorStatus {
  description: string;
}

export interface NodeName {
  description: string;
}

export interface PoolName {
  description: string;
}

export interface Port {
  value: number;
}

export interface ServersideBitsIn {
  value: number;
}

export interface ServersideBitsOut {
  value: number;
}

export interface ServersidePktsIn {
  value: number;
}

export interface ServersidePktsOut {
  value: number;
}

export interface ServersideTotConns {
  value: number;
}

export interface SessionStatus {
  description: string;
}

export interface StatusAvailabilityState {
  description: string;
}

export interface StatusEnabledState {
  description: string;
}

export interface StatusStatusReason {
  description: string;
}

export interface TotRequests {
  value: number;
}

export interface DeviceMemberStats {
  totRequests: TotRequests;
  sessionStatus: SessionStatus;
  'status.enabledState': StatusEnabledState;
  port: Port;
  nodeName: NodeName;
  poolName: PoolName;
  'serverside.pktsIn': ServersidePktsIn;
  monitorRule: MonitorRule;
  'serverside.totConns': ServersideTotConns;
  monitorStatus: MonitorStatus;
  addr: Addr;
  'serverside.bitsOut': ServersideBitsOut;
  'serverside.pktsOut': ServersidePktsOut;
  'status.availabilityState': StatusAvailabilityState;
  'serverside.bitsIn': ServersideBitsIn;
  'status.statusReason': StatusStatusReason;
}

export interface IMemberStats extends DeviceMemberStats {
  _id: string;
  _rev?: string;
  deviceName: string;
  deviceGroupName: string,
  daysDown: number;
  daysWithoutConnections: number;
  daysWithoutData: number;
  daysWithoutRequests: number;
  lastChecked: number;
}

export interface NestedStats {
  kind: string;
  selfLink: string;
  entries: DeviceMemberStats;
}

export interface Member {
  nestedStats: NestedStats;
}

export interface PoolMemberStatsResponse {
  kind: string;
  selfLink: string;
  entries: { [id: string ]: Member };
}


export interface PoolPath {
  fullPath: 'string'
}

export interface PoolListResponse {
  items: PoolPath[],
}




