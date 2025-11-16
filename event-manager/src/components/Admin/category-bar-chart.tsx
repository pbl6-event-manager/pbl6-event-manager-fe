export const CategoryBarChart: React.FC<{
  data: { name: string; count: number }[];
}> = ({ data }) => {
  const max = Math.max(...data.map((d) => d.count), 1);
  return (
    <div className="bg-white rounded shadow p-4 h-full">
      <div className="flex items-center justify-between mb-3">
        <div className="font-medium">Events by category</div>
        <div className="text-sm text-gray-500">Top {data.length}</div>
      </div>

      <div className="space-y-3">
        {data.map((d) => (
          <div key={d.name} className="flex items-center gap-3">
            <div className="w-32 text-sm text-gray-600 overflow-hidden truncate">
              {d.name}
            </div>
            <div className="flex-1 bg-gray-100 h-3 rounded overflow-hidden">
              <div
                className="h-3 bg-orange-500"
                style={{ width: `${(d.count / max) * 100}%` }}
              />
            </div>
            <div className="w-12 text-right text-sm font-medium">{d.count}</div>
          </div>
        ))}
      </div>
    </div>
  );
};