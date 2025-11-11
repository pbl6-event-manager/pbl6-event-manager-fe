import type { InfoRowPairProps } from "../../models/component-props/infor-row-pair-props";

export const InfoRowPair: React.FC<InfoRowPairProps> = ({ leftLabel, rightLabel, leftValue, rightValue }) => {
  return (
    <div className="flex items-center py-3">
        <div className="w-40 text-sm text-gray-600">{leftLabel}</div>
        <div className="flex-1 text-sm">{leftValue ?? "—"}</div>
        {rightLabel ? (
        <>
            <div className="w-40 text-sm text-gray-600">{rightLabel}</div>
            <div className="flex-1 text-sm">{rightValue ?? "—"}</div>
        </>
        ) : null}
    </div>
  );
};
