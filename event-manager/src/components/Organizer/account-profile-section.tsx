import { useAccountViewModel } from "../../viewmodels/Organizer/accounts/accounts-view-model";
import { ProfilePhotoBox } from "../ui/profile-photo-box";
import { Field } from "../ui/text-field";
import React from "react";

export const AccountProfileSection: React.FC<{
  user: any;
}> = ({ user }) => {
  const {
    handlePhotoChange,
    setFirstName,
    firstName,
    lastName,
    setLastName,
    phone,
    setPhone,
    saving,
    handleSubmit
  } = useAccountViewModel();

  return (
    <section className="bg-white rounded p-6">
      <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
      <ProfilePhotoBox value={user?.avatarUrl} onChange={handlePhotoChange} />
      <form
        className="space-y-6 mt-8"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className="grid grid-cols-2 gap-6">
          <Field label="First Name" className="">
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full rounded border px-3 py-2"
            />
          </Field>

          <Field label="Last Name" className="">
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full rounded border px-3 py-2"
            />
          </Field>

          <Field label="Email" className="">
            <input
              defaultValue={user?.email ?? ""}
              className="w-full rounded border px-3 py-2"
              readOnly
            />
          </Field>

          <Field label="Cell Phone" className="">
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded border px-3 py-2"
            />
          </Field>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className={`px-5 py-2 ${
              saving ? "opacity-60 cursor-not-allowed" : ""
            } bg-[var(--primary-admin)] hover:bg-[var(--primary-hover)] text-white rounded-lg`}
          >
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </form>
    </section>
  );
};
export default AccountProfileSection;
