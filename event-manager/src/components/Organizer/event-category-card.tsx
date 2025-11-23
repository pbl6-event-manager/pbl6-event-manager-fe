import { useState, useEffect } from "react"
import { Checkbox } from "../ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import type { CategoryListItem } from "../../models/form-models/category-form-models"


interface EventTypeCategoryCardProps {
    eventType?: string
    category?: string
    subcategory?: string
    onTypeChange?: (type: string) => void
    onSubcategoryChange?: (subcategory: string) => void
    selectedCategoryIds?: number[]
    onCategoryChange?: (categoryIds: number[]) => void
}

const MOCK_CATEGORIES: CategoryListItem[] = [
    { id: 1, name: "Sports & Fitness", description: "All about sports and fitness events" },
    { id: 2, name: "Music", description: "Music events and concerts" },
    { id: 3, name: "Business & Professional", description: "Business and professional events" },
    { id: 4, name: "Food & Drink", description: "Food and drink related events" },
    { id: 5, name: "Community & Culture", description: "Community and cultural events" },
    { id: 6, name: "Arts & Entertainment", description: "Arts and entertainment events" },
    { id: 7, name: "Game or Competition", description: "Competitive gaming and events" },
    { id: 8, name: "Family & Education", description: "Family-friendly and educational events" },
]

const EVENT_TYPES = [
    "Music",
    "Business",
    "Food & Drink",
    "Community",
    "Sports & Fitness",
    "Game or Competition",
    "Art",
    "Family & Education",
    "Religious",
    "Networking",
    "Classes & Workshops",
    "Travel & Outdoor",
    "Entertainment",
]


export function EventTypeCategoryCard({
    eventType,
    category,
    subcategory,
    onTypeChange,
    onCategoryChange,
    selectedCategoryIds = [],
    onCategoryChangeMultiple,
}: EventTypeCategoryCardProps & { onCategoryChangeMultiple?: (categoryIds: number[]) => void }) {
    const [selectedType, setSelectedType] = useState(eventType || "Game or Competition")
    const [selectedCategory, setSelectedCategory] = useState<number[]>([])
    const [selectedSubcategory, setSelectedSubcategory] = useState(subcategory || "Other")
    const [categories, setCategories] = useState<CategoryListItem[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Simulate API call to fetch categories from database
        setTimeout(() => {
            setCategories(MOCK_CATEGORIES)
            setIsLoading(false)
        }, 300)
    }, [])

    const handleTypeChange = (type: string) => {
        setSelectedType(type)
        onTypeChange?.(type)
        // Reset category and subcategory when type changes
        const defaultCategory = MOCK_CATEGORIES.find(cat => cat.name === type)?.name || "Other"
        const defaultCategoryIds = MOCK_CATEGORIES
            .filter(cat => cat.name === defaultCategory)
            .map(cat => cat.id)
        onCategoryChangeMultiple?.(defaultCategoryIds)
        setSelectedCategory(defaultCategoryIds)
        setSelectedSubcategory("Other")
        onCategoryChange?.(defaultCategoryIds)
    }

    const handleCategoryChange = (cat: number[]) => {
        setSelectedCategory(cat)
        onCategoryChange?.(cat)
    }


    const handleCategoryToggle = (categoryId: number) => {
        const updatedIds = selectedCategoryIds.includes(categoryId)
            ? selectedCategoryIds.filter((id) => id !== categoryId)
            : [...selectedCategoryIds, categoryId]

        onCategoryChangeMultiple?.(updatedIds)
    }

    return (
        <div className="bg-card border rounded-lg p-6">
            <h3 className="text-lg font-bold text-foreground mb-2">Event type and category</h3>
            <p className="text-sm text-muted-foreground mb-6">
                Your type and category help your event appear in more searches.
            </p>

            <div className="space-y-4">
                {/* Event Type */}
                <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Type</label>
                    <Select value={selectedType} onValueChange={handleTypeChange}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select event type" />
                        </SelectTrigger>
                        <SelectContent>
                            {EVENT_TYPES.map((type) => (
                                <SelectItem key={type} value={type}>
                                    {type}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Category and Subcategory */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Category</label>
                        {isLoading ? (
                            <p className="text-sm text-muted-foreground">Loading categories...</p>
                        ) : (
                            <div className="space-y-3">
                                {categories.map((category) => (
                                    <div key={category.id} className="flex items-center gap-3">
                                        <Checkbox
                                            id={`category-${category.id}`}
                                            checked={selectedCategoryIds.includes(category.id)}
                                            onCheckedChange={() => handleCategoryToggle(category.id)}
                                        />
                                        <label
                                            htmlFor={`category-${category.id}`}
                                            className="text-sm font-medium text-foreground cursor-pointer hover:text-blue-600 transition-colors"
                                        >
                                            {category.name}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    
                </div>
            </div>

            {selectedCategoryIds.length > 0 && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded text-sm text-blue-700">
                    {selectedCategoryIds.length} categor{selectedCategoryIds.length === 1 ? "y" : "ies"} selected
                </div>
            )}
        </div>
    )
}
