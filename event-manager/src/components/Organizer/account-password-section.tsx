import { useState } from "react";
import { Field } from "../ui/text-field";

export const AccountPasswordSection: React.FC = () => {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleChange = () => {
    if (!newPass || newPass !== confirm) {
      alert("New password and confirm must match");
      return;
    }
    console.log("change password", { oldPass, newPass });
    alert("Password change requested (demo)");
    setOldPass("");
    setNewPass("");
    setConfirm("");
  };

  return (
    <section className="bg-white rounded p-6 max-w-xl">
      <h3 className="text-2xl font-bold mb-6">Change Password</h3>

      <div className="space-y-4">
        <Field label="Current password" className="">
          <input type="password" value={oldPass} onChange={(e) => setOldPass(e.target.value)} className="w-full rounded border px-3 py-2" />
        </Field>

        <Field label="New password" className="">
          <input type="password" value={newPass} onChange={(e) => setNewPass(e.target.value)} className="w-full rounded border px-3 py-2" />
        </Field>

        <Field label="Confirm new password" className="">
          <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} className="w-full rounded border px-3 py-2" />
        </Field>

        <div className="flex justify-end">
          <button type="button" className="px-5 py-2 bg-[var(--primary-admin)] hover:bg-[var(--primary-hover)] cursor-pointer text-white rounded-lg" onClick={handleChange}>
            Change password
          </button>
        </div>
      </div>
    </section>
  );
};