import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { api } from "../../api/client";
import StatusBadge from "../../shared/components/StatusBadge";
import Loader from "../../shared/components/Loader";
import ErrorView from "../../shared/components/ErrorView";
import EmptyState from "../../shared/components/EmptyState";
import { Link } from "react-router-dom";
import { useI18n } from "../../shared/i18n/I18nProvider";

const PAGE_SIZE = 10;

export default function DeviceList() {
  const { t } = useI18n();
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const q = useQuery({
    queryKey: ["devices", query, page],
    queryFn: () => api.getDevices(query, page, PAGE_SIZE),
  });

  const totalPages = useMemo(() => {
    if (!q.data) return 1;
    return Math.max(1, Math.ceil(q.data.total / q.data.pageSize));
  }, [q.data]);

  if (q.isLoading) return <Loader label={t("loadingDevices")} />;
  if (q.isError)
    return <ErrorView title={t("error")} onRetry={() => q.refetch()} />;

  const data = q.data!;
  return (
    <section>
      <h1 className="page-title">{t("deviceList")}</h1>

      {/* Search bar */}
      <div className="toolbar">
        <div className="search-bar">
          <input
            value={query}
            onChange={(e) => {
              setPage(1);
              setQuery(e.target.value);
            }}
            placeholder={t("searchPlaceholder")}
            className="input"
          />
        </div>
      </div>

      {/* Device cards */}
      {data.items.length === 0 ? (
        <EmptyState title={t("noDevices")} />
      ) : (
        <ul className="cards">
          {data.items.map((d) => (
            <li className="card" key={d.id}>
              <div className="card-head">
                <strong>{d.name}</strong>
                <StatusBadge status={d.status} />
              </div>
              <div className="card-body">
                <div>
                  {t("location")}: {d.location}
                </div>
                <div>
                  {t("firmware")}: {d.firmware}
                </div>
              </div>
              <div className="card-foot">
                <Link className="btn" to={`/devices/${d.id}`}>
                  {t("viewDetails")}
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Pagination */}
      <div className="pager">
        <button
          className="btn"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page <= 1}
        >
          {t("prev")}
        </button>
        <span>
          {t("page")} {page} / {totalPages}
        </span>
        <button
          className="btn"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page >= totalPages}
        >
          {t("next")}
        </button>
      </div>
    </section>
  );
}
