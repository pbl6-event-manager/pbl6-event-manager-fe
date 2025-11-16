export const StatusDonutChart: React.FC<{ counts: Record<string, number> }> = ({
  counts,
}) => {
  const entries = Object.entries(counts).filter(([, v]) => v > 0);
  const total = Object.values(counts).reduce((s, v) => s + v, 0) || 1;
  const size = 140;
  const stroke = 20;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  const colors: Record<string, string> = {
    PUBLISHED: "#F97316",
    APPROVAL_PENDING: "#F59E0B",
    REJECTED: "#EF4444",
    DRAFT: "#9CA3AF",
    UNKNOWN: "#60A5FA",
  };

  let offset = 0;

  return (
    <div className="bg-white rounded shadow p-4 h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <div className="font-medium">Events by status</div>
        <div className="text-sm text-gray-500">
          Total {Object.values(counts).reduce((s, v) => s + v, 0)}
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center gap-6">
        <div className="flex-none flex items-center justify-center">
          <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            className="flex-none"
          >
            <g transform={`translate(${size / 2},${size / 2})`}>
              {entries.map(([key, val]) => {
                const portion = val / total;
                const dash = portion * circumference;
                const color = colors[key] ?? colors.UNKNOWN;
                const seg = (
                  <circle
                    key={key}
                    r={radius}
                    cx={0}
                    cy={0}
                    fill="transparent"
                    stroke={color}
                    strokeWidth={stroke}
                    strokeDasharray={`${dash} ${circumference - dash}`}
                    strokeDashoffset={-offset}
                    strokeLinecap="butt"
                    transform="rotate(-90)"
                  />
                );
                offset += dash;
                return seg;
              })}
              <circle r={radius - stroke - 2} fill="white" cx={0} cy={0} />
            </g>
          </svg>
        </div>

        <div className="flex-1 flex flex-col justify-center">
          {Object.entries(counts).map(([k, v]) => (
            <div
              key={k}
              className="flex items-center justify-between text-sm mb-2"
            >
              <div className="flex items-center gap-2">
                <span
                  style={{ background: colors[k] ?? colors.UNKNOWN }}
                  className="w-3 h-3 rounded-sm inline-block"
                />
                <span className="capitalize">
                  {k.replace(/_/g, " ").toLowerCase()}
                </span>
              </div>
              <div className="text-sm font-medium">{v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};