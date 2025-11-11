"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Textarea } from "../../../components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { usePermissionViewModel } from "../../../viewmodels/Organizer/settings/permission-view-model"
import { useRoleViewModel } from "../../../viewmodels/Organizer/settings/role-staff-view-model"

export default function CreateRolePage() {
    // ✅ Role ViewModel
    const {
        formData,
        updateFormData,
        validationErrors,
        handleCreateOwnerRole,
        isLoading: roleLoading
    } = useRoleViewModel()

    // ✅ Permission ViewModel
    const {
        permissionListItems,
        isLoading: permissionLoading,
        error: permissionError,
        selectedPermissions,
        setSelectedPermissions
    } = usePermissionViewModel()

    // ✅ Toggle permission và sync với formData
    const togglePermission = (permissionId: number) => {
        const newPermissions = new Set(selectedPermissions)
        if (newPermissions.has(permissionId)) {
            newPermissions.delete(permissionId)
        } else {
            newPermissions.add(permissionId)
        }
        setSelectedPermissions(newPermissions)
        
        // ✅ Update formData.permissionIds
        updateFormData("permissionIds", Array.from(newPermissions))
    }

    const toggleSelectAll = () => {
        const newPermissions = new Set(selectedPermissions)
        const allSelected = permissionListItems.every((p) => newPermissions.has(p.id))

        if (allSelected) {
            setSelectedPermissions(new Set())
            updateFormData("permissionIds", [])
        } else {
            const allIds = permissionListItems.map((p) => p.id)
            setSelectedPermissions(new Set(allIds))
            updateFormData("permissionIds", allIds)
        }
    }

    const isAllSelected = permissionListItems.length > 0 && 
        permissionListItems.every((p) => selectedPermissions.has(p.id))

    if (permissionLoading) {
        return (
            <div className="flex-1 bg-gray-50 p-8">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center py-12">
                        <p className="text-gray-600">Loading permissions...</p>
                    </div>
                </div>
            </div>
        )
    }

    if (permissionError) {
        return (
            <div className="flex-1 bg-gray-50 p-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <p className="text-red-600">Error: {permissionError}</p>
                    </div>
                </div>
            </div>
        )
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
                    <CardContent className="space-y-4">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Name <span className="text-red-500">*</span>
                            </label>
                            <Input
                                type="text"
                                placeholder="Enter a role name"
                                value={formData.name}
                                onChange={(e) => updateFormData("name", e.target.value)}
                                maxLength={50}
                                className={validationErrors.name ? "border-red-500" : ""}
                            />
                            <div className="flex justify-between mt-2">
                                {validationErrors.name && (
                                    <p className="text-red-500 text-sm">{validationErrors.name}</p>
                                )}
                                <p className="text-gray-500 text-sm ml-auto">{formData.name.length}/50</p>
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description <span className="text-red-500">*</span>
                            </label>
                            <Textarea
                                placeholder="Enter a role description"
                                value={formData.description}
                                onChange={(e) => updateFormData("description", e.target.value)}
                                maxLength={200}
                                rows={3}
                                className={validationErrors.description ? "border-red-500" : ""}
                            />
                            <div className="flex justify-between mt-2">
                                {validationErrors.description && (
                                    <p className="text-red-500 text-sm">{validationErrors.description}</p>
                                )}
                                <p className="text-gray-500 text-sm ml-auto">
                                    {formData.description.length}/200
                                </p>
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
                        {validationErrors.permissions && (
                            <p className="text-red-500 text-sm mb-4">{validationErrors.permissions}</p>
                        )}

                        {permissionListItems.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                                No permissions available
                            </div>
                        ) : (
                            <>
                                {/* Select All */}
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={isAllSelected}
                                            onChange={toggleSelectAll}
                                            className="w-4 h-4 rounded border-gray-300 cursor-pointer"
                                        />
                                        <div>
                                            <h3 className="font-semibold text-gray-900">Select All</h3>
                                            <p className="text-sm text-gray-600">
                                                Select all {permissionListItems.length} permissions
                                            </p>
                                        </div>
                                    </label>
                                </div>

                                {/* Permissions List */}
                                <div className="border border-gray-200 rounded-lg overflow-hidden">
                                    <div className="divide-y divide-gray-200">
                                        {permissionListItems.map((permission) => (
                                            <label
                                                key={permission.id}
                                                className="flex items-start gap-3 cursor-pointer hover:bg-gray-50 p-4 transition-colors"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={selectedPermissions.has(permission.id)}
                                                    onChange={() => togglePermission(permission.id)}
                                                    className="w-4 h-4 rounded border-gray-300 cursor-pointer mt-0.5"
                                                />
                                                <div className="flex-1">
                                                    <h4 className="text-sm font-medium text-gray-700 capitalize">
                                                        {permission.name.replace(/_/g, " ")}
                                                    </h4>
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        {permission.description}
                                                    </p>
                                                </div>
                                                {selectedPermissions.has(permission.id) && (
                                                    <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                                                )}
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Summary */}
                                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                                    <p className="text-sm text-blue-900">
                                        <span className="font-semibold">{selectedPermissions.size}</span> of{" "}
                                        <span className="font-semibold">{permissionListItems.length}</span>{" "}
                                        permission{permissionListItems.length !== 1 ? "s" : ""} selected
                                    </p>
                                </div>
                            </>
                        )}
                    </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex gap-4 mt-8 justify-end">
                    <Button
                        variant="outline"
                        onClick={() => window.history.back()}
                        className="px-6 py-2"
                        disabled={roleLoading}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleCreateOwnerRole}
                        disabled={roleLoading || permissionLoading}
                        className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2"
                    >
                        {roleLoading ? "Creating..." : "Create Role"}
                    </Button>
                </div>
            </div>
        </div>
    )
}
