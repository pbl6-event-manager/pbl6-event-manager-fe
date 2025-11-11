export const KeyRow: React.FC<{ label: string; value?: React.ReactNode }> = ({ label, value }) => (
  <div className="flex py-2 border-b last:border-b-0">
    <div className="w-40 text-sm text-gray-600">{label}</div>
    <div className="flex-1 text-sm">{value ?? "—"}</div>
  </div>
);