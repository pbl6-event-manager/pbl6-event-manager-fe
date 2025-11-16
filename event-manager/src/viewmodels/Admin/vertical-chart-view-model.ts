import { useEffect, useMemo, useRef, useState } from "react";
import type { Series } from "../../models/component-props/chart-component-props";
import { computeNiceTicks } from "../../utils/Admin/vertical-chart-utils";

export const useVerticalChartViewModel = (series?: Series[], values?: number[], colorClass?: string, yTicks?: number, labels?: string[], chartHeight?: number) => {
    const cols = Math.max(1, labels?.length ?? 1);

    const normalized: Series[] = useMemo(() => {
        const base: Series[] = series && series.length
            ? series.map(s => ({ ...s, values: Array.isArray(s.values) ? s.values : [] }))
            : [{ name: "Series", values: Array.isArray(values) ? values : [], colorClass }];

        return base.map(s => {
            const padded = Array.from({ length: cols }, (_, i) => {
                const v = s.values?.[i];
                return typeof v === "number" ? v : 0;
            });
            return { ...s, values: padded };
        });
    }, [series, values, colorClass, cols]);

    const max = Math.max(1, ...normalized.flatMap((s) => s.values));

    const autoTicks = typeof yTicks !== "number" || yTicks <= 0;
    const desired = autoTicks ? 4 : Math.max(1, Math.round(yTicks ?? 4));
    const tickInfo = computeNiceTicks(max, desired);
    const tickValues = tickInfo.values;
    const maxTick = tickInfo.maxTick;

    const paddingLeft = 56;
    const paddingRight = 16;
    const xAxisHeight = 48;
    const topPadding = 12;
    const bottomPadding = 8;
    const effectiveChartHeight = (typeof chartHeight === "number" ? chartHeight : 320);
    const innerHeight = Math.max(40, effectiveChartHeight - xAxisHeight - topPadding - bottomPadding);

    const containerRef = useRef<HTMLDivElement | null>(null);
    const [tooltip, setTooltip] = useState<{ visible: boolean; x: number; y: number; label: string; value: number; color?: string }>({
        visible: false,
        x: 0,
        y: 0,
        label: "",
        value: 0,
        color: undefined,
    });

    useEffect(() => {
        const onLeave = () => setTooltip((t) => ({ ...t, visible: false }));
        const node = containerRef.current;
        if (node) {
            node.addEventListener("mouseleave", onLeave);
            return () => node.removeEventListener("mouseleave", onLeave);
        }
    }, []);

    const onBarEnter = (e: React.MouseEvent, label: string, value: number, color?: string) => {
        const rect = containerRef.current?.getBoundingClientRect();
        const x = rect ? e.clientX - rect.left : e.clientX;
        const y = rect ? e.clientY - rect.top : e.clientY;
        setTooltip({ visible: true, x, y, label, value, color });
    };

    const labelsCount = labels?.length ?? 0;
    const noData = labelsCount === 0 || normalized.every(s => s.values.every(v => v === 0));

    return {
        cols,
        normalized,
        max,
        tickValues,
        maxTick,
        paddingLeft,
        paddingRight,
        xAxisHeight,
        topPadding,
        bottomPadding,
        innerHeight,
        containerRef,
        tooltip,
        onBarEnter,
        noData,
    };
}