"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ChevronDown, ChevronUp, Check } from "lucide-react"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import permissionsData from "../../../data/permissions.json"

interface PermissionCategory {
    description: string
    permissions: string[]
}

interface PermissionsData {
    permissions: Record<string, PermissionCategory>
}

export default function CreateRolePage() {
    const navigate = useNavigate()
    const [roleName, setRoleName] = useState("")
    const [selectedPermissions, setSelectedPermissions] = useState<Set<string>>(new Set())
    const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set())
    const [errors, setErrors] = useState<Record<string, string>>({})

    const permissions = permissionsData as PermissionsData

    const toggleCategory = (categoryKey: string) => {
        const newExpanded = new Set(expandedCategories)
        if (newExpanded.has(categoryKey)) {
            newExpanded.delete(categoryKey)
        } else {
            newExpanded.add(categoryKey)
        }
        setExpandedCategories(newExpanded)
    }

    const togglePermission = (permission: string) => {
        const newPermissions = new Set(selectedPermissions)
        if (newPermissions.has(permission)) {
            newPermissions.delete(permission)
        } else {
            newPermissions.add(permission)
        }
        setSelectedPermissions(newPermissions)
    }

    const toggleSelectAll = (categoryKey: string, permissions: string[]) => {
        const newPermissions = new Set(selectedPermissions)
        const allSelected = permissions.every((p) => newPermissions.has(p))

        if (allSelected) {
            permissions.forEach((p) => newPermissions.delete(p))
        } else {
            permissions.forEach((p) => newPermissions.add(p))
        }
        setSelectedPermissions(newPermissions)
    }

    const isCategoryFullySelected = (permissions: string[]) => {
        return permissions.every((p) => selectedPermissions.has(p))
    }

    const handleCreateRole = () => {
        const newErrors: Record<string, string> = {}

        if (!roleName.trim()) {
            newErrors.roleName = "Role name is required"
        } else if (roleName.length > 50) {
            newErrors.roleName = "Role name must be 50 characters or less"
        }

        if (selectedPermissions.size === 0) {
            newErrors.permissions = "At least one permission must be selected"
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        // TODO: Dispatch Redux action to create role
        console.log("Creating role:", {
            name: roleName,
            permissions: Array.from(selectedPermissions),
        })

        navigate(-1)
    }

    return (
        <div className="flex-1 bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Create New Role</h1>
                    <p className="text-gray-600">Define a custom role with specific permissions</p>
                </div>

                {/* Role Information */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Role Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Name <span className="text-red-500">*</span>
                            </label>
                            <Input
                                type="text"
                                placeholder="Enter a role name"
                                value={roleName}
                                onChange={(e) => {
                                    setRoleName(e.target.value)
                                    if (errors.roleName) {
                                        setErrors({ ...errors, roleName: "" })
                                    }
                                }}
                                maxLength={50}
                                className={errors.roleName ? "border-red-500" : ""}
                            />
                            <div className="flex justify-between mt-2">
                                {errors.roleName && <p className="text-red-500 text-sm">{errors.roleName}</p>}
                                <p className="text-gray-500 text-sm ml-auto">{roleName.length}/50</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Permissions */}
                <Card>
                    <CardHeader>
                        <CardTitle>Permissions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {errors.permissions && <p className="text-red-500 text-sm mb-4">{errors.permissions}</p>}

                        <div className="space-y-4">
                            {Object.entries(permissions.permissions).map(([categoryKey, category]) => (
                                <div key={categoryKey} className="border border-gray-200 rounded-lg overflow-hidden">
                                    {/* Category Header */}
                                    <button
                                        onClick={() => toggleCategory(categoryKey)}
                                        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                                    >
                                        <div className="flex items-center gap-3 flex-1 text-left">
                                            <input
                                                type="checkbox"
                                                checked={isCategoryFullySelected(category.permissions)}
                                                onChange={() => toggleSelectAll(categoryKey, category.permissions)}
                                                onClick={(e) => e.stopPropagation()}
                                                className="w-4 h-4 rounded border-gray-300 cursor-pointer"
                                            />
                                            <div>
                                                <h3 className="font-semibold text-gray-900 capitalize">{categoryKey.replace(/_/g, " ")}</h3>
                                                <p className="text-sm text-gray-600">{category.description}</p>
                                            </div>
                                        </div>
                                        {expandedCategories.has(categoryKey) ? (
                                            <ChevronUp className="h-5 w-5 text-gray-400" />
                                        ) : (
                                            <ChevronDown className="h-5 w-5 text-gray-400" />
                                        )}
                                    </button>

                                    {/* Category Permissions */}
                                    {expandedCategories.has(categoryKey) && (
                                        <div className="border-t border-gray-200 bg-gray-50 p-4 space-y-3">
                                            {category.permissions.map((permission) => (
                                                <label
                                                    key={permission}
                                                    className="flex items-center gap-3 cursor-pointer hover:bg-white p-2 rounded transition-colors"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedPermissions.has(permission)}
                                                        onChange={() => togglePermission(permission)}
                                                        className="w-4 h-4 rounded border-gray-300 cursor-pointer"
                                                    />
                                                    <span className="text-sm text-gray-700 capitalize">{permission.replace(/_/g, " ")}</span>
                                                    {selectedPermissions.has(permission) && <Check className="h-4 w-4 text-green-600 ml-auto" />}
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex gap-4 mt-8 justify-end">
                    <Button variant="outline" onClick={() => navigate(-1)} className="px-6 py-2">
                        Cancel
                    </Button>
                    <Button onClick={handleCreateRole} className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2">
                        Create
                    </Button>
                </div>
            </div>
        </div>
    )
}
