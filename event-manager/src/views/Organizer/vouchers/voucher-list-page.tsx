<<<<<<< HEAD
import React from "react";
import { Card, CardContent } from "../../../components/ui/card";
import { ChevronRight, Percent, Zap } from "lucide-react";
import { Button } from "../../../components/ui/button";
import VoucherForm from "./voucher-form";
import useVoucherViewModel from "../../../viewmodels/Organizer/voucher/voucher-view-model";

const VoucherListPage: React.FC = () => {
  const {
    q,
    setQ,
    filtered,
    showCreate,
    openCreateModal,
    closeCreateModal,
    stepTypeSelected,
    setStepTypeSelected,
    formName,
    setFormName,
    formDesc,
    setFormDesc,
    formType,
    setFormType,
    formAmount,
    setFormAmount,
    formMaxUses,
    setFormMaxUses,
    formExpires,
    setFormExpires,
    handleCreateFromModal,
    loadingEvents,
    handleRandomCode,
    voucherCode,
    setVoucherCode,
    eventSelectionList
  } = useVoucherViewModel();

  // helper: get expiry strings (local datetime and GMT + zone name)
  const formatExpiry = (raw: any) => {
    const s = raw?.expiresAt ?? raw?.validTo ?? raw?.valid_to ?? raw?.expiry ?? raw;
    if (!s) return { local: "—", gmt: "—" };
    const d = new Date(String(s));
    if (isNaN(d.getTime())) return { local: String(s), gmt: "—" };

    const local = d.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

    let tzName = "";
    try {
      const parts = new Intl.DateTimeFormat(undefined, { timeZoneName: "long" }).formatToParts(d);
      const tzPart = parts.find((p) => p.type === "timeZoneName");
      tzName = tzPart ? tzPart.value : "";
    } catch {
      tzName = "";
    }

    const offsetMinutes = -d.getTimezoneOffset();
    const sign = offsetMinutes >= 0 ? "+" : "-";
    const hh = String(Math.floor(Math.abs(offsetMinutes) / 60)).padStart(2, "0");
    const mm = String(Math.abs(offsetMinutes) % 60).padStart(2, "0");
    const gmt = `GMT${sign}${hh}:${mm}`;

    return { local, gmt };
  };

  return (
    <div className="p-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Vouchers</h1>
          <div className="flex items-center gap-3">
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search code or expiry" className="border px-3 py-2 rounded-md" />
            <button onClick={openCreateModal} className="px-4 py-2 bg-[#f05537] text-white rounded-md">
              Create voucher
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg border overflow-x-auto">
          {/* header with separate GMT column */}
          <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b text-sm font-semibold text-gray-700">
            <div className="col-span-2">Code</div>
            <div className="col-span-2">Type</div>
            <div className="col-span-2">Amount</div>
            <div className="col-span-2">Uses</div>
            <div className="col-span-2">Expiry</div>
            <div className="col-span-1">GMT</div>
            <div className="col-span-1 text-center">Status</div>
          </div>

          {(!filtered || filtered.length === 0) ? (
            <div className="px-6 py-12 text-center text-gray-500">No vouchers found</div>
          ) : (
            filtered.map((v: any) => {
              const { local, gmt } = formatExpiry(v);
              return (
                <div key={v.id} className="grid grid-cols-12 gap-4 px-6 py-4 border-b items-center">
                  <div className="col-span-2 font-medium">{v.code}</div>
                  <div className="col-span-2">{v.type}</div>
                  <div className="col-span-2">{v.type === "Percentage" ? `${v.amount}%` : `${v.amount}`}</div>
                  <div className="col-span-2">{v.uses ?? 0} {v.maxUses ? ` / ${v.maxUses}` : ""}</div>
                  <div className="col-span-2">{local}</div>
                  <div className="col-span-1 text-sm text-gray-600">{gmt}</div>
                  <div className="col-span-1 text-center">
                    <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-800">Active</span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={closeCreateModal} />

          <div className="relative z-10 w-full max-w-3xl mx-4 flex flex-col bg-white rounded-lg" style={{ maxHeight: "85vh" }}>
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold">Create vouchers</h2>
              <button className="text-gray-500" onClick={closeCreateModal} aria-label="Close">✕</button>
            </div>

            <div className="flex-1 overflow-auto p-6">
              {!stepTypeSelected ? (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">Choose a voucher type</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <Card className="cursor-pointer hover:border-primary transition-colors" onClick={() => { setStepTypeSelected("Percentage"); setFormType("Percentage"); }}>
                      <CardContent className="flex items-center justify-between p-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                            <Percent className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">Percentage</h3>
                            <p className="text-sm text-muted-foreground">Percentage discount</p>
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </CardContent>
                    </Card>

                    <Card className="cursor-pointer hover:border-primary transition-colors" onClick={() => { setStepTypeSelected("Fixed"); setFormType("Fixed"); }}>
                      <CardContent className="flex items-center justify-between p-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                            <Zap className="h-6 w-6 text-purple-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">Fixed</h3>
                            <p className="text-sm text-muted-foreground">Fixed amount discount</p>
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ) : (
                <VoucherForm
                  eventSelectionList={eventSelectionList}
                  voucherCode={voucherCode}
                  setVoucherCode={setVoucherCode}
                  formName={formName}
                  setFormName={setFormName}
                  formDesc={formDesc}
                  setFormDesc={setFormDesc}
                  formType={formType}
                  setFormType={setFormType}
                  formAmount={formAmount}
                  setFormAmount={setFormAmount}
                  formMaxUses={formMaxUses}
                  setFormMaxUses={setFormMaxUses}
                  formExpires={formExpires}
                  setFormExpires={setFormExpires}
                  onSave={handleCreateFromModal}
                  onBack={() => setStepTypeSelected(null)}
                  loadingEvents={loadingEvents}
                  handleRandomCode={handleRandomCode}
                />
              )}
            </div>

            <div className="p-4 border-t flex justify-end gap-2">
              <Button variant="outline" onClick={() => setStepTypeSelected(null)}>Back</Button>
              <Button className="bg-orange-600 hover:bg-orange-700" onClick={() => { handleCreateFromModal(); }}>Save Voucher</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoucherListPage;
=======
import { Button } from "../../../components/ui/button"
import { useNavigate } from "react-router-dom"

export default function VoucherListPage() {
  const navigate = useNavigate();

  const handleAddVouchers = () => {
    navigate("/organizer/vouchers/create");
  }
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-bold">Vouchers</h1>
      <Button
        className="bg-[#f05537] hover:bg-[#d63c1f] text-white"
        onClick={handleAddVouchers}
      >
        Add more vouchers
      </Button>
    </div>
  )
}
>>>>>>> develop
