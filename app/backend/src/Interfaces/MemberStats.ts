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

export interface DBMemberStats extends DeviceMemberStats {
  _id: string;
  _rev?: string;
  deviceName: string;
  daysDown: number;
  daysWithoutConnections: number;
  daysWithoutData: number;
  daysWithoutRequests: number;
  lastChecked: string;
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
