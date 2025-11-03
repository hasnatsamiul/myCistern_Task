import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/client";
import Loader from "../../shared/components/Loader";
import ErrorView from "../../shared/components/ErrorView";
import StatusBadge from "../../shared/components/StatusBadge";
import DeviceMetrics from "./DeviceMetrics";
import SendCommand from "./SendCommand";
import { useI18n } from "../../shared/i18n/I18nProvider";

export default function DeviceDetail() {
  const { t } = useI18n();
  const { id = "" } = useParams();
  const q = useQuery({
    queryKey: ["device", id],
    queryFn: () => api.getDeviceDetails(id),
  });

  if (q.isLoading) return <Loader label={t("loadingDevice")} />;
  if (q.isError)
    return <ErrorView title={t("error")} message={t("deviceNotFound")} />;

  const d = q.data!;
  return (
    <section className="detail">
      <Link to="/devices" className="link back">
        {t("back")}
      </Link>

      <div className="color-box title">
        <h2 className="device-title">
          {d.name} <StatusBadge status={d.status} />
        </h2>
      </div>

      <div className="grid">
        <div className="color-box info">
          <h3>{t("info")}</h3>
          <p>
            <strong>{t("location")}:</strong> {d.location}
          </p>
          <p>
            <strong>{t("firmware")}:</strong> {d.firmware}
          </p>
        </div>

        <div className="color-box metrics">
          <h3>{t("liveMetrics")}</h3>
          <DeviceMetrics id={d.id} />
        </div>

        <div className="color-box commands">
          <h3>{t("sendCommand")}</h3>
          <SendCommand id={d.id} />
        </div>
      </div>
    </section>
  );
}
