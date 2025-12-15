import type { VerticalBarChartProps } from "../../../../models/component-props/chart-component-props";
import { useVerticalChartViewModel } from "../../../../viewmodels/Admin/component/vertical-chart-view-model";

export const VerticalBarChart: React.FC<VerticalBarChartProps> = ({
  labels,
  series,
  values,
  colorClass = "bg-orange-500",
  chartHeight = 320,
  barInnerWidth = 28,
  yTicks = 4,
  isEvent,
  showLegend = true,
}) => {
  const {
    cols,
    normalized,
    max,
    tickValues,
    maxTick,
    paddingLeft,
    paddingRight,
    xAxisHeight,
    topPadding,
    innerHeight,
    containerRef,
    tooltip,
    onBarEnter,
    noData,
  } = useVerticalChartViewModel(series, values, colorClass, yTicks, labels, chartHeight);
  
  return (
    <div className="bg-white rounded shadow p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="font-medium">
          {isEvent
            ? "Number of Events Started in a period"
            : "Number of New Account in a period"}
        </div>
        {showLegend && (
          <div className="flex items-center gap-3 text-xs text-gray-600">
            {normalized.map((s, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span
                  style={{ background: undefined }}
                  className={`${
                    s.colorClass ?? "bg-gray-400"
                  } w-3 h-3 rounded-sm inline-block`}
                />
                <span className="whitespace-nowrap">{s.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div
        ref={containerRef}
        className="relative"
        style={{ height: chartHeight }}
      >
        {noData ? (
          <div className="absolute inset-0 flex items-center justify-center text-gray-500">
            No data in this period
          </div>
        ) : (
          <>
            {tickValues.map((tv, i) => {
              const ratioFromTop = 1 - tv / Math.max(1, maxTick); // 0..1
              const top = Math.round(topPadding + ratioFromTop * innerHeight);
              return (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    left: paddingLeft,
                    right: paddingRight,
                    top: `${top}px`,
                    height: 1,
                    background: "var(--tw-bg-opacity, #eef2f7)",
                  }}
                />
              );
            })}

            <div
              style={{
                position: "absolute",
                left: 8,
                top: topPadding,
                height: innerHeight,
                width: paddingLeft - 12,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
              className="text-xs text-gray-500"
            >
              {tickValues
                .slice()
                .reverse()
                .map((tv, i) => (
                  <div key={i} style={{ lineHeight: "1" }}>
                    {tv}
                  </div>
                ))}
            </div>

            <div
              style={{
                position: "absolute",
                left: paddingLeft,
                right: paddingRight,
                top: topPadding,
                height: innerHeight,
                display: "grid",
                gridTemplateColumns: `repeat(${cols}, 1fr)`,
                alignItems: "end",
                gap: "8px",
                boxSizing: "border-box",
                paddingLeft: 8,
                paddingRight: 8,
              }}
            >
              {labels.map((lbl, colIndex) => (
                <div
                  key={colIndex}
                  className="flex flex-col items-center justify-end"
                >
                  <div
                    style={{ display: "flex", alignItems: "flex-end", gap: 8 }}
                  >
                    {normalized.map((s, si) => {
                      const v = s.values[colIndex] ?? 0;
                      const pct = v <= 0 ? 0 : v / max;
                      const barHeight = Math.max(
                        4,
                        Math.round(pct * innerHeight)
                      );
                      return (
                        <div
                          key={si}
                          onMouseEnter={(e) =>
                            onBarEnter(e, lbl, v, s.colorClass)
                          }
                          onMouseMove={(e) =>
                            onBarEnter(e, lbl, v, s.colorClass)
                          }
                          className="cursor-pointer"
                          style={{
                            width: `${barInnerWidth}px`,
                            height: `${barHeight}px`,
                            display: "flex",
                            alignItems: "flex-end",
                            justifyContent: "center",
                          }}
                          title={`${s.name}: ${v}`}
                        >
                          <div
                            className={`${
                              s.colorClass ?? "bg-gray-400"
                            } rounded-t`}
                            style={{ width: "100%", height: "100%" }}
                          />
                        </div>
                      );
                    })}
                  </div>

                  <div
                    className="text-xs mt-2 text-center truncate w-full"
                    style={{ marginTop: 8 }}
                  >
                    {lbl}
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                position: "absolute",
                left: paddingLeft,
                right: paddingRight,
                bottom: 8,
                height: xAxisHeight - 8,
              }}
            />

            {tooltip.visible && (
              <div
                style={{
                  position: "absolute",
                  left: Math.min(
                    Math.max(tooltip.x - 40, 8),
                    (containerRef.current?.clientWidth ?? 800) - 120
                  ),
                  top: Math.max(tooltip.y - 48, 8),
                  pointerEvents: "none",
                  zIndex: 50,
                }}
              >
                <div className="bg-white border rounded shadow-sm text-xs py-1 px-2 whitespace-nowrap">
                  <div className="text-gray-600">{tooltip.label}</div>
                  <div className="font-medium" style={{ color: "" }}>
                    {tooltip.value}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
