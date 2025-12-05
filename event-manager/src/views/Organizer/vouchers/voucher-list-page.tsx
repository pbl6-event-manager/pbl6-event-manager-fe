import React from "react";
import { Card, CardContent } from "../../../components/ui/card";
import { ChevronRight, Percent, Zap, Copy, Edit, Trash2 } from "lucide-react";
import { Button } from "../../../components/ui/button";
import VoucherForm from "./voucher-form";
import VoucherDuplicateForm from "./voucher-duplicate-form";
import useVoucherViewModel from "../../../viewmodels/Organizer/voucher/voucher-view-model";
import { formatExpiry } from "../../../utils/Organizer/date-format";
import { VoucherSearchFilter } from "../../../components/Organizer/voucher-search-filter";

const VoucherListPage: React.FC = () => {
  const {
    q,
    setQ,
    discountType,
    setDiscountType,
    filtered,
    showForm,
    openCreateModal,
    closeCreateModal,
    stepTypeSelected,
    setStepTypeSelected,
    formName,
    setFormName,
    formDesc,
    setFormDesc,
    formDiscountType,
    setFormDiscountType,
    formDiscountValue,
    setFormDiscountValue,
    formMinOrderAmount,
    setFormMinOrderAmount,
    formMaxDiscountAmount,
    setFormMaxDiscountAmount,
    formTotalUsageLimit,
    setFormTotalUsageLimit,
    formUsagePerUser,
    setFormUsagePerUser,
    formValidFrom,
    setFormValidFrom,
    formValidTo,
    setFromValidTo,
    formEventId,
    setFormEventId,
    handleCreateFromModal,
    handleRandomCode,
    voucherCode,
    setVoucherCode,
    eventSelectionList,
    selectedTimezone,
    setSelectedTimezone,
    handleDuplicateVoucher,
    handleEditVoucher,
    handleDeleteVoucher,
    isUpdate,
    _duplicateVoucher,
    setDuplicateModalOpen,
    duplicateModalOpen,
    editVoucher,
    paged,
    currentPage,
    setCurrentPage,
    totalPages,
    pageSize,
    setPageSize,
    totalItems
  } = useVoucherViewModel();

  return (
    <div className="p-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Vouchers</h1>
          <div className="flex items-center gap-3">
            {/* Search and Filter */}
            <VoucherSearchFilter 
                searchTerm={q} 
                discountType={discountType}
                onSearchChange={setQ}
                onTypeChange={setDiscountType}
            />
            <button
              onClick={openCreateModal}
              className="px-4 py-2 bg-[#f05537] text-white rounded-md cursor-pointer"
            >
              Create voucher
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg border overflow-hidden">
          <div
            className="grid gap-4 px-6 py-3 border-b text-sm font-semibold text-gray-700 bg-white sticky top-0 z-10"
            style={{
              gridTemplateColumns:
                "1fr 1.2fr 0.8fr 0.8fr 0.8fr 1.5fr 1fr 0.8fr 0.6fr",
            }}
          >
            <div>Code</div>
            <div>Type</div>
            <div>Event</div>
            <div className="text-center">Amount</div>
            <div className="text-center">Uses</div>
            <div>Expiry</div>
            <div>GMT</div>
            <div>Status</div>
            <div className="pr-10">Actions</div>
          </div>

          <div className="overflow-y-auto" style={{ maxHeight: "48vh" }}>
            {!filtered || filtered.length === 0 ? (
              <div className="px-6 py-12 text-center text-gray-500">
                No vouchers found
              </div>
            ) : (
              (paged || []).map((v: any) => {
                const { local, gmt } = formatExpiry(v);
                return (
                  <div
                    key={v.id}
                    className="grid gap-4 px-6 py-4 border-b items-center cursor-pointer hover:bg-gray-50"
                    style={{
                      gridTemplateColumns:
                        "1fr 1.2fr 0.8fr 0.8fr 0.8fr 1.5fr 1fr 0.8fr 0.6fr",
                    }}
                  >
                    <div className="font-medium truncate" title={v.code}>
                      {v.code}
                    </div>
                    <div className="truncate">{v.type}</div>
                    <div className="truncate" title={v.eventTitle}>
                      {v.eventTitle || "All Events"}
                    </div>
                    <div className="text-center">
                      {v.type === "PERCENTAGE" ? `${v.amount}%` : `${v.amount}`}
                    </div>
                    <div className="text-center">{v.uses ?? 0}</div>
                    <div className="truncate">{local}</div>
                    <div className="text-sm text-gray-600 truncate">{gmt}</div>
                    <div className="text-center">
                      {(() => {
                        const status = (v.status || "").toString().toUpperCase();
                        const map: Record<string, { label: string; bg: string; text: string }> = {
                          ACTIVE: { label: "Active", bg: "bg-green-50", text: "text-green-800" },
                          INACTIVE: { label: "Inactive", bg: "bg-gray-100", text: "text-gray-700" },
                          EXPIRED: { label: "Expired", bg: "bg-red-50", text: "text-red-800" },
                        };
                        const s = map[status] ?? { label: status || "Unknown", bg: "bg-gray-100", text: "text-gray-700" };
                        return (
                          <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${s.bg} ${s.text}`}>
                            {s.label}
                          </span>
                        );
                      })()}
                    </div>
                    <div className="flex items-center justify-end gap-2">
                      <button
                        title="Duplicate"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDuplicateVoucher(v.id);
                        }}
                        className="p-1 rounded hover:bg-gray-100"
                      >
                        <Copy className="w-4 h-4 text-gray-600 cursor-pointer" />
                      </button>
                      <button
                        title="Edit"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditVoucher(v.type, v.id, gmt);
                        }}
                        className="p-1 rounded hover:bg-gray-100"
                      >
                        <Edit className="w-4 h-4 text-gray-600 cursor-pointer" />
                      </button>
                      <button
                        title="Delete"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteVoucher(v.id);
                        }}
                        className="p-1 rounded hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4 text-red-600 cursor-pointer" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between px-2">
          <div className="text-sm text-gray-600">
            Showing {totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1} -{" "}
            {Math.min(currentPage * pageSize, totalItems)} of {totalItems}
          </div>

          <div className="flex items-center gap-3">
            <select
              className="border rounded px-2 py-1 text-sm"
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              {[5, 10, 20, 50].map((s) => (
                <option key={s} value={s}>
                  {s} / page
                </option>
              ))}
            </select>

            <div className="flex items-center gap-1">
              <button
                className="px-2 py-1 border rounded disabled:opacity-50"
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                aria-label="Previous page"
              >
                Prev
              </button>

              <div className="flex items-center gap-1 px-2">
                {Array.from({ length: totalPages }).map((_, i) => {
                  const page = i + 1;
                  if (
                    totalPages > 9 &&
                    Math.abs(page - currentPage) > 3 &&
                    page !== 1 &&
                    page !== totalPages
                  ) {
                    if (page === 2 && currentPage > 5)
                      return (
                        <span key={page} className="px-2">
                          ...
                        </span>
                      );
                    if (page === totalPages - 1 && currentPage < totalPages - 4)
                      return (
                        <span key={page} className="px-2">
                          ...
                        </span>
                      );
                    return null;
                  }
                  return (
                    <button
                      key={page}
                      className={`px-2 py-1 rounded ${
                        page === currentPage
                          ? "bg-gray-200"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => setCurrentPage(page)}
                      aria-label={`Go to page ${page}`}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>

              <button
                className="px-2 py-1 border rounded disabled:opacity-50"
                disabled={currentPage >= totalPages}
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                aria-label="Next page"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={closeCreateModal}
          />

          <div
            className="relative z-10 w-full max-w-3xl mx-4 flex flex-col bg-white rounded-lg"
            style={{ maxHeight: "85vh" }}
          >
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold">
                {isUpdate ? "Update voucher" : "Create voucher"}
              </h2>
              <button
                className="text-gray-500"
                onClick={closeCreateModal}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-auto p-6">
              {!stepTypeSelected ? (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Choose a voucher type
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <Card
                      className="cursor-pointer hover:border-primary transition-colors"
                      onClick={() => {
                        setStepTypeSelected("PERCENTAGE");
                        setFormDiscountType("PERCENTAGE");
                      }}
                    >
                      <CardContent className="flex items-center justify-between p-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                            <Percent className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">
                              Percentage
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              Percentage discount
                            </p>
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </CardContent>
                    </Card>

                    <Card
                      className="cursor-pointer hover:border-primary transition-colors"
                      onClick={() => {
                        setStepTypeSelected("FIXED_AMOUNT");
                        setFormDiscountType("FIXED_AMOUNT");
                      }}
                    >
                      <CardContent className="flex items-center justify-between p-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                            <Zap className="h-6 w-6 text-purple-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">Fixed</h3>
                            <p className="text-sm text-muted-foreground">
                              Fixed amount discount
                            </p>
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
                  formDiscountType={formDiscountType}
                  setFormDiscountType={setFormDiscountType}
                  formDiscountValue={formDiscountValue}
                  setFormDiscountValue={setFormDiscountValue}
                  formMinOrderAmount={formMinOrderAmount}
                  setFormMinOrderAmount={setFormMinOrderAmount}
                  formMaxDiscountAmount={formMaxDiscountAmount}
                  setFormMaxDiscountAmount={setFormMaxDiscountAmount}
                  formTotalUsageLimit={formTotalUsageLimit}
                  setFormTotalUsageLimit={setFormTotalUsageLimit}
                  formUsagePerUser={formUsagePerUser}
                  setFormUsagePerUser={setFormUsagePerUser}
                  formValidFrom={formValidFrom}
                  setFormValidFrom={setFormValidFrom}
                  formValidTo={formValidTo}
                  setFormValidTo={setFromValidTo}
                  formEventId={formEventId}
                  setFormEventId={setFormEventId}
                  selectedTimezone={selectedTimezone}
                  setSelectedTimezone={setSelectedTimezone}
                  onSave={handleCreateFromModal}
                  onBack={() => setStepTypeSelected(null)}
                  handleRandomCode={handleRandomCode}
                />
              )}
            </div>

            <div className="p-4 border-t flex justify-end gap-2">
              {stepTypeSelected === null ? (
                <Button
                  className="bg-orange-600 hover:bg-orange-700"
                  onClick={() => {
                    if (!isUpdate) {
                      handleCreateFromModal();
                    } else {
                      editVoucher && editVoucher();
                    }
                  }}
                >
                  Save Voucher
                </Button>
              ) : (
                <>
                  {!isUpdate && (
                    <Button
                      variant="outline"
                      onClick={() => setStepTypeSelected(null)}
                    >
                      Back
                    </Button>
                  )}
                  <Button
                    className="bg-orange-600 hover:bg-orange-700"
                    onClick={() => {
                      if (!isUpdate) {
                        handleCreateFromModal();
                      } else {
                        editVoucher && editVoucher();
                      }
                    }}
                  >
                    Save Voucher
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {duplicateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setDuplicateModalOpen(false)}
          />
          <div className="relative z-10 w-full max-w-xl mx-4 bg-white rounded-lg overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">Duplicate voucher</h3>
              <button
                className="text-gray-600 cursor-pointer"
                onClick={() => setDuplicateModalOpen(false)}
              >
                ✕
              </button>
            </div>
            <VoucherDuplicateForm
              handleRandomCode={handleRandomCode}
              voucherCode={voucherCode}
              setVoucherCode={setVoucherCode}
              onCancel={() => setDuplicateModalOpen(false)}
              duplicateVoucher={_duplicateVoucher}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default VoucherListPage;
