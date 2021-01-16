export interface IDeviceGroup {
  name: string,
  devices: string[],
}

export interface IF5Config {
  username: string,
  password: string,
  bigipReportBaseUrl?: string,
  ignoreDeviceGroups: string[],
  explicitDeviceGroups: IDeviceGroup[]
}

export interface IReportWhen {
  poolsDownDays: number,
  noDataDays: number,
}

export interface IReport {
  poolsDown: number,
  noData: number,
  failedDevices: string[],
}

export interface IReportConfig {
  reportWhen: IReportWhen,
  reportTransports?: ((report: IReport) => void) []
}
