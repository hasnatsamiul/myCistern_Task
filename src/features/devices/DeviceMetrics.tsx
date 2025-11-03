import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/client";
import Loader from "../../shared/components/Loader";
import ErrorView from "../../shared/components/ErrorView";
import { useI18n } from "../../shared/i18n/I18nProvider";

export default function DeviceMetrics({ id }: { id: string }) {
  const { t } = useI18n();
  const q = useQuery({
    queryKey: ["metrics", id],
    queryFn: () => api.getDeviceMetrics(id),
    refetchInterval: 6000, // polling every 6s
  });

  if (q.isLoading) return <Loader label={t("loadingMetrics")} />;
  if (q.isError)
    return <ErrorView title={t("metricsError")} onRetry={() => q.refetch()} />;

  const m = q.data!;
  return (
    <div className="metrics">
      <div className="metric">
        <span>{t("temperature")}</span>
        <strong>{m.temperatureC.toFixed(1)} °C</strong>
      </div>
      <div className="metric">
        <span>{t("fill")}</span>
        <strong>{m.fillLevelPct.toFixed(0)}%</strong>
      </div>
      <div className="metric">
        <span>{t("battery")}</span>
        <strong>{m.batteryPct.toFixed(0)}%</strong>
      </div>
      <div className="metric updated">
        {t("updatedAt")} {new Date(m.updatedAt).toLocaleTimeString()}
      </div>
    </div>
  );
}
