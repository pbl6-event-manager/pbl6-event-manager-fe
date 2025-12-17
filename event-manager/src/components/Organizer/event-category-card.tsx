import { Checkbox } from "../ui/checkbox"
import { Lock } from "lucide-react"
import { useCategoryViewModel } from "../../viewmodels/Organizer/events/category-view-model"
import type { EventCategoryCardProps } from "../../models/component-props/card-component-props"

export function EventCategoryCard({
    selectedCategoryIds = [],
    onCategoryChange,
    readOnly = false
}: EventCategoryCardProps) {
    const {
        categories,
        loading: isLoading,
        handleCategoryToggle
    } = useCategoryViewModel(selectedCategoryIds, onCategoryChange);

    return (
        <div className="bg-card border rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-foreground">
                    Event category
                </h3>
                {readOnly && (
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground 
                         bg-gray-100 border px-2 py-1 rounded-full">
                        <Lock className="h-3 w-3" />
                        Read only
                    </span>
                )}
            </div>
            <p className="text-sm text-muted-foreground mb-6">
                {readOnly
                    ? "Categories assigned to this event."
                    : "Your category helps your event appear in more searches."}
            </p>

            <div className="space-y-4">
                {isLoading ? (
                    <p className="text-sm text-muted-foreground">Loading categories...</p>
                ) : (
                    <div className="space-y-3">
                        {categories.map((category) => (
                            <div key={category.id} className="flex items-start gap-3">
                                <Checkbox
                                    id={`category-${category.id}`}
                                    checked={selectedCategoryIds.includes(category.id)}
                                    onCheckedChange={() => !readOnly && handleCategoryToggle(category.id)}
                                    disabled={readOnly}
                                    className={readOnly ? 'cursor-not-allowed opacity-70' : ''}
                                />
                                <label
                                    htmlFor={`category-${category.id}`}
                                    className={`flex-1 ${!readOnly ? 'cursor-pointer' : 'cursor-default'}`}
                                >
                                    <div className={`font-medium text-foreground ${!readOnly ? 'hover:text-blue-600' : ''} transition-colors`}>
                                        {category.name}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        {category.description}
                                    </div>
                                </label>
                            </div>
                        ))}
                    </div>
                )}


            </div>

            {selectedCategoryIds.length > 0 && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded text-sm text-blue-700">
                    {selectedCategoryIds.length} categor{selectedCategoryIds.length === 1 ? "y" : "ies"} selected
                </div>
            )}
        </div>
    )
}
