import { useEventViewModel } from "../../viewmodels/Admin/event-view-model";
import { fmt } from "../../utils/Organizer/date-format";
import { KeyRow } from "./key-row";
import { InfoRowPair } from "./infor-row-pair";
export const EventInfoSection: React.FC = () => {
  const { eventDetails } = useEventViewModel();

  if (!eventDetails?.eventInfo) {
    return <div className="p-6 bg-white rounded shadow">No event data.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded shadow">
        <div className="flex gap-6">
          <div className="w-48 h-48 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
            {eventDetails?.eventInfo?.bannerImagePath ? (
              <img
                src={eventDetails?.eventInfo?.bannerImagePath}
                alt="event banner"
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="text-gray-400">No banner</div>
            )}
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-2">
              {eventDetails?.eventInfo?.title}
            </h2>
            <p className="text-sm text-gray-700 mb-4">
              {eventDetails?.eventInfo?.summary ?? "—"}
            </p>

            <div className="rounded divide-y divide-gray-200 overflow-hidden">
              <div className="p-3">
                <div className="space-y-0">
                  <div className="divide-y divide-gray-100">
                    <div className="py-0">
                      <div className="flex flex-col">
                        <div className="divide-y divide-gray-200">
                          <InfoRowPair
                            leftLabel="ID"
                            leftValue={eventDetails?.eventInfo?.id}
                            rightLabel="Status"
                            rightValue={eventDetails?.eventInfo?.status ?? "—"}
                          />
                          <InfoRowPair
                            leftLabel="Start Time"
                            leftValue={fmt(eventDetails?.eventInfo?.startTime)}
                            rightLabel="End Time"
                            rightValue={fmt(eventDetails?.eventInfo?.endTime)}
                          />
                          <InfoRowPair
                            leftLabel="Language"
                            leftValue={eventDetails?.eventInfo?.language ?? "—"}
                            rightLabel="Organizer ID"
                            rightValue={
                              eventDetails?.eventInfo?.organizerId ?? "—"
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4">
              {Array.isArray(eventDetails.categories) &&
              eventDetails.categories.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {eventDetails.categories.map((c: any) => (
                    <span
                      key={c.id}
                      className="inline-flex items-center justify-center bg-orange-100 text-orange-800 dark:bg-orange-600 dark:text-white rounded-full px-3 py-1 text-xs font-medium shadow-sm"
                    >
                      {c.name}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded shadow overflow-hidden">
        <div className="bg-[var(--primary-admin)] text-white px-4 py-2">
          <h3 className="text-lg font-medium">Location</h3>
        </div>
        <div className="p-6">
          <KeyRow
            label="Address"
            value={eventDetails?.eventInfo?.address ?? "—"}
          />
          <KeyRow label="City" value={eventDetails?.eventInfo?.city ?? "—"} />
          <KeyRow
            label="Country"
            value={eventDetails?.eventInfo?.country ?? "—"}
          />
          <KeyRow
            label="Latitude"
            value={eventDetails?.eventInfo?.latitude ?? "—"}
          />
          <KeyRow
            label="Longitude"
            value={eventDetails?.eventInfo?.longitude ?? "—"}
          />
        </div>
      </div>

      <div className="bg-white rounded shadow overflow-hidden">
        <div className="bg-[var(--primary-admin)] text-white px-4 py-2">
          <h3 className="text-lg font-medium">Organizer</h3>
        </div>
        <div className="p-6">
          {eventDetails?.organizer ? (
            <>
              <KeyRow label="Name" value={eventDetails.organizer.name} />
              <KeyRow
                label="Description"
                value={eventDetails.organizer.description ?? "—"}
              />
              <KeyRow
                label="Contact Email"
                value={eventDetails.organizer.contactEmail ?? "—"}
              />
              <KeyRow
                label="Contact Phone"
                value={eventDetails.organizer.contactPhone ?? "—"}
              />
              <KeyRow
                label="Website"
                value={eventDetails.organizer.website ?? "—"}
              />
              <KeyRow
                label="Active"
                value={eventDetails.organizer.isActive ? "Yes" : "No"}
              />
            </>
          ) : (
            <div className="text-sm text-gray-600">No organizer info</div>
          )}
        </div>
      </div>

      <div className="bg-white rounded shadow overflow-hidden">
        <div className="bg-[var(--primary-admin)] text-white px-4 py-2">
          <h3 className="text-lg font-medium">System</h3>
        </div>
        <div className="p-6">
          <KeyRow
            label="Created At"
            value={fmt(eventDetails?.eventInfo?.createdAt)}
          />
          <KeyRow
            label="Updated At"
            value={fmt(eventDetails?.eventInfo?.updatedAt)}
          />
        </div>
      </div>

      <div className="bg-white rounded shadow overflow-hidden">
        <div className="bg-[var(--primary-admin)] text-white px-4 py-2">
          <h3 className="text-lg font-medium">Owner</h3>
        </div>
        <div className="p-6">
          {eventDetails.owner ? (
            <>
              <KeyRow
                label="Name"
                value={
                  `${eventDetails.owner.firstName ?? ""} ${
                    eventDetails.owner.lastName ?? ""
                  }`.trim() || "—"
                }
              />
              <KeyRow label="Email" value={eventDetails.owner.email ?? "—"} />
              <KeyRow label="Phone" value={eventDetails.owner.phone ?? "—"} />
              <KeyRow
                label="Active"
                value={eventDetails.owner.isActive ? "Yes" : "No"}
              />
            </>
          ) : (
            <div className="text-sm text-gray-600">No owner info</div>
          )}
        </div>
      </div>
    </div>
  );
};
