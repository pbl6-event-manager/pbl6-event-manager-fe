import React from "react";
import { Users, Calendar, Shield, Tags } from "lucide-react";
import { useDashBoardViewModel } from "../../../../viewmodels/Admin/dashboard/dashboard-view-model";
import { StatCard } from "../components/dashboard-stat-card";
import { VerticalBarChart } from "../components/vertical-bar-chart";
import { StatusDonutChart } from "../components/status-donut-chart";
import { CategoryBarChart } from "../components/category-bar-chart";

const AdminDashboard: React.FC = () => {
  const {
    numberOfEvents,
    numberOfUsers,
    numberOfPermissions,
    numberOfCategories,
    monthLabels,
    publishedEventsByMonth,
    pendingEventsByMonth,
    usersByMonth,
    categoryCounts,
    statusCounts,
    setEndMonth, 
    setEndYear,
    setMonthCount,
    monthCount,
    endMonth,
    endYear
  } = useDashBoardViewModel();

  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 8 }).map((_, i) => currentYear - 5 + i);

  return (
    <div className="pt-3 px-6 pb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[var(--defaulttext)]">
          Dashboard
        </h2>
        <div className="text-sm text-gray-500">Overview & statistics</div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Events"
          value={numberOfEvents}
          icon={<Calendar size={18} />}
        />
        <StatCard
          title="Users"
          value={numberOfUsers}
          icon={<Users size={18} />}
        />
        <StatCard
          title="Permissions"
          value={numberOfPermissions}
          icon={<Shield size={18} />}
        />
        <StatCard
          title="Categories"
          value={numberOfCategories}
          icon={<Tags size={18} />}
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-end gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <label className="whitespace-nowrap">Months</label>
            <select
              value={monthCount}
              onChange={(e) => setMonthCount(Number(e.target.value))}
              className="border rounded px-2 py-1 text-sm"
            >
              <option value={3}>3</option>
              <option value={6}>6</option>
              <option value={12}>12</option>
            </select>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <label className="whitespace-nowrap">End month</label>
            <select
              value={endMonth}
              onChange={(e) => setEndMonth(Number(e.target.value))}
              className="border rounded px-2 py-1 text-sm"
            >
              {Array.from({ length: 12 }).map((_, i) => {
                const m = new Date(0, i).toLocaleString(undefined, {
                  month: "short",
                });
                return (
                  <option key={i} value={i + 1}>
                    {m}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <label className="whitespace-nowrap">End year</label>
            <select
              value={endYear}
              onChange={(e) => setEndYear(Number(e.target.value))}
              className="border rounded px-2 py-1 text-sm"
            >
              {yearOptions.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="text-lg font-medium">Accounts</div>
            <div className="text-sm text-gray-500">
              Period ending{" "}
              {new Date(endYear, endMonth - 1).toLocaleString(undefined, {
                month: "short",
                year: "numeric",
              })}{" "}
              — last {monthCount} months
            </div>
          </div>
          <VerticalBarChart
            labels={monthLabels}
            series={[
              { name: "Account", values: usersByMonth, colorClass: "bg-blue-700" },
            ]}
            chartHeight={340}
            barInnerWidth={28}
            yTicks={4}
            isEvent={false}
            showLegend={true}
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="text-lg font-medium">Events</div>
            <div className="text-sm text-gray-500">
              Period ending{" "}
              {new Date(endYear, endMonth - 1).toLocaleString(undefined, {
                month: "short",
                year: "numeric",
              })}{" "}
              — last {monthCount} months
            </div>
          </div>
          <VerticalBarChart
            labels={monthLabels}
            series={[
              { name: "Published Event", values: publishedEventsByMonth, colorClass: "bg-green-700" },
              { name: "Pending Event", values: pendingEventsByMonth, colorClass: "bg-blue-700" },
            ]}
            chartHeight={340}
            barInnerWidth={18}
            yTicks={4}
            isEvent={true}
            showLegend={true}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <StatusDonutChart counts={statusCounts} />
          <CategoryBarChart
            data={
              categoryCounts.length
                ? categoryCounts
                : [{ name: "No categories", count: 0 }]
            }
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
