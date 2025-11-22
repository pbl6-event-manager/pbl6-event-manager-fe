import { useAccountViewModel } from "../../viewmodels/Organizer/accounts/accounts-view-model";

export const AccountProfileSidebar: React.FC = () => {
  const { isPassword, isProfile, setActiveTab } = useAccountViewModel();

  const baseBtn = "w-full text-left px-3 py-2 rounded-lg cursor-pointer transition";
  const inactiveBtn = "hover:bg-gray-100 text-gray-800";
  const activeBtn = "bg-blue-50 text-blue-700";

  return (
    <aside className="w-64 min-h-screen bg-while border-r">
      <nav className="p-6 space-y-2 text-sm text-black">
        <div className="mb-4 font-medium">Account</div>
        <button
          onClick={() => setActiveTab("profile")}
          className={`${baseBtn} ${isProfile ? activeBtn : inactiveBtn}`}
        >
          Profile
        </button>
        <button
          onClick={() => setActiveTab("password")}
          className={`${baseBtn} ${isPassword ? activeBtn : inactiveBtn}`}
        >
          Password
        </button>
      </nav>
    </aside>
  );
};