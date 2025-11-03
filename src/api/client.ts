import type { Device, DeviceMetrics, Paged, CommandPayload } from './types';

// ---- mock data ----
let DEVICES: Device[] = Array.from({ length: 32 }).map((_, i) => ({
  id: String(i + 1),
  name: `Cistern ${i + 1}`,
  status: Math.random() > 0.2 ? 'online' : 'offline',
  location: ['Regensburg', 'Munich', 'Darmstadt', 'Berlin'][i % 4],
  firmware: `v1.${(i % 9) + 1}.0`,
}));

const METRICS: Record<string, DeviceMetrics> = Object.fromEntries(
  DEVICES.map(d => [
    d.id,
    {
      id: d.id,
      temperatureC: 8 + Math.random() * 18,
      fillLevelPct: 30 + Math.random() * 60,
      batteryPct: 40 + Math.random() * 60,
      updatedAt: new Date().toISOString(),
    },
  ])
);

// Simulate drift
function tickMetrics(m: DeviceMetrics) {
  const jitter = () => (Math.random() - 0.5) * 3;
  m.temperatureC = Math.max(0, m.temperatureC + jitter());
  m.fillLevelPct = Math.min(100, Math.max(0, m.fillLevelPct + jitter()));
  m.batteryPct = Math.min(100, Math.max(0, m.batteryPct - Math.random() * 0.1));
  m.updatedAt = new Date().toISOString();
}

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

const USE_MOCK = import.meta.env.VITE_USE_MOCK === '1';

export const api = {
  async getDevices(query = '', page = 1, pageSize = 10): Promise<Paged<Device>> {
    if (USE_MOCK) {
      await delay(300);
      const q = query.trim().toLowerCase();
      const filtered = DEVICES.filter(
        d =>
          d.name.toLowerCase().includes(q) ||
          d.location.toLowerCase().includes(q) ||
          d.firmware.toLowerCase().includes(q)
      );
      const start = (page - 1) * pageSize;
      return { items: filtered.slice(start, start + pageSize), page, total: filtered.length, pageSize };
    }
    throw new Error('Real API not wired yet');
  },

  async getDeviceDetails(id: string): Promise<Device> {
    if (USE_MOCK) {
      await delay(250);
      const d = DEVICES.find(x => x.id === id);
      if (!d) throw new Error('not_found');
      return d;
    }
    throw new Error('Real API not wired yet');
  },

  async getDeviceMetrics(id: string): Promise<DeviceMetrics> {
    if (USE_MOCK) {
      await delay(250);
      const m = METRICS[id];
      if (!m) throw new Error('not_found');
      tickMetrics(m);
      return { ...m };
    }
    throw new Error('Real API not wired yet');
  },

  async postDeviceCommand(id: string, payload: CommandPayload): Promise<{ ok: true }> {
    if (USE_MOCK) {
      await delay(500);
      // Simulate occasional failure
      if (Math.random() < 0.12) throw new Error('network_error');
      if (payload.type === 'REBOOT') {
        const d = DEVICES.find(x => x.id === id);
        if (d) d.status = 'online';
      }
      return { ok: true };
    }
    throw new Error('Real API not wired yet');
  },
};
