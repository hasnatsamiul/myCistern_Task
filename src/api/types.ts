export type Device = {
  id: string;
  name: string;
  status: 'online' | 'offline';
  location: string;
  firmware: string;
};

export type DeviceMetrics = {
  id: string;
  temperatureC: number;
  fillLevelPct: number;
  batteryPct: number;
  updatedAt: string;
};

export type CommandPayload =
  | { type: 'PING' }
  | { type: 'REBOOT' }
  | { type: 'VALVE_OPEN'; value: boolean };

export type Paged<T> = { items: T[]; page: number; total: number; pageSize: number };
