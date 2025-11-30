import { Checkbox } from "../ui/checkbox"
import { useCategoryViewModel } from "../../viewmodels/Organizer/events/category-view-model"
import type { EventCategoryCardProps } from "../../models/component-props/card-component-props"

export function EventCategoryCard({
    selectedCategoryIds = [],
    onCategoryChange,
}: EventCategoryCardProps) {
    const {
        categories,
        loading: isLoading,
        handleCategoryToggle
    } = useCategoryViewModel(selectedCategoryIds, onCategoryChange);

    return (
        <div className="bg-card border rounded-lg p-6">
            <h3 className="text-lg font-bold text-foreground mb-2">Event category</h3>
            <p className="text-sm text-muted-foreground mb-6">
                Your category helps your event appear in more searches.
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
                                    onCheckedChange={() => handleCategoryToggle(category.id)}
                                />
                                <label
                                    htmlFor={`category-${category.id}`}
                                    className="flex-1 cursor-pointer"
                                >
                                    <div className="font-medium text-foreground hover:text-blue-600 transition-colors">
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
