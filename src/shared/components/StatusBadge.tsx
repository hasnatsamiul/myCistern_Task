export default function StatusBadge({
  status,
}: {
  status: "online" | "offline";
}) {
  return <span className={`badge ${status}`}>{status}</span>;
}
