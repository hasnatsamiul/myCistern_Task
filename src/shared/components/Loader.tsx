export default function Loader({ label = "Loading..." }: { label?: string }) {
  return (
    <div className="loader" role="status" aria-live="polite">
      {label}
    </div>
  );
}
