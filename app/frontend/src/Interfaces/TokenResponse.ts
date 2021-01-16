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
