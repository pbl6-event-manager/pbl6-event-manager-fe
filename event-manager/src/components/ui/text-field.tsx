export const Field: React.FC<{ label: string; children: React.ReactNode; className?: string }> = ({ label, children, className }) => (
  <div className={className}>
    <label className="block text-sm text-gray-700 mb-2">{label}</label>
    {children}
  </div>
);