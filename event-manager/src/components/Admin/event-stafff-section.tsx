import React, { useEffect, useMemo, useState } from "react";
import Table from "./table";

type StaffMember = {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  avatarUrl?: string;
  roleStaff: string;
};

export const EventStaffSection: React.FC<{ id?: string }> = ({ id }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  const columns = [
    { header: "ID", accessor: "id", type: "text" as const },
    { header: "Avatar", accessor: "avatarUrl", type: "image" as const },
    { header: "First Name", accessor: "firstName", type: "text" as const },
    { header: "Last Name", accessor: "lastName", type: "text" as const },
    { header: "Phone", accessor: "phone", type: "text" as const },
  ];

  useEffect(() => {
    setLoading(true);
    setError(null);

    const mock: StaffMember[] = [
      { id: "1", firstName: "A", lastName: "Nguyen Van", email: "a.nguyen@example.com", roleStaff: "Manager", phone: "0912345678", avatarUrl: "" },
      { id: "2", firstName: "A", lastName: "Nguyen Van", email: "a.nguyen@example.com", roleStaff: "Admin", phone: "0912345678", avatarUrl: "" },
      { id: "3", firstName: "A", lastName: "Nguyen Van", email: "a.nguyen@example.com", roleStaff: "Marketing", phone: "0912345678", avatarUrl: "" },
      { id: "4", firstName: "A", lastName: "Nguyen Van", email: "a.nguyen@example.com", roleStaff: "Security", phone: "0912345678", avatarUrl: "" },
      { id: "5", firstName: "A", lastName: "Nguyen Van", email: "a.nguyen@example.com", roleStaff: "Security", phone: "0912345678", avatarUrl: "" },
    ];

    // simulate network delay
    const t = setTimeout(() => {
      setStaff(mock);
      setLoading(false);
    }, 250);

    return () => clearTimeout(t);
  }, [id]);

  const groupedByRole = useMemo(() => {
    const map = new Map<string, StaffMember[]>();
    for (const s of staff) {
      const role = s.roleStaff?.trim() || "Unspecified";
      if (!map.has(role)) map.set(role, []);
      map.get(role)!.push(s);
    }
    return Array.from(map.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  }, [staff]);

  if (loading) {
    return (
      <div className="p-4">
        <div className="text-sm text-gray-600">Loading staff…</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="text-sm text-red-600">Error: {error}</div>
      </div>
    );
  }

  if (!staff.length) {
    return (
      <div className="p-4">
        <div className="text-sm text-gray-500">No staff assigned to this event.</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {groupedByRole.map(([role, members]) => (
        <div key={role} className="bg-[var(--surface)] rounded -sm p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="font-medium">{role}</div>
            <div className="text-xs text-gray-500">
              {members.length} member{members.length > 1 ? "s" : ""}
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table
                columns={columns}
                data={members}
                className="rounded-lg shadow-md"
              />
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventStaffSection;