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
