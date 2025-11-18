"use client"

import { Check, ArrowLeft } from "lucide-react"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Textarea } from "../../../components/ui/textarea"
import { Label } from "../../../components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Checkbox } from "../../../components/ui/checkbox"
import { usePermissionViewModel } from "../../../viewmodels/Organizer/settings/permission-view-model"
import { useRoleViewModel } from "../../../viewmodels/Organizer/settings/role-staff-view-model"
import { useParams } from "react-router-dom"

export default function EditRolePage() {
    const { id } = useParams<{ id: string }>()
    
    const {
        formData,
        updateFormData,
        validationErrors,
        handleUpdateOwnerRole,
        handleGetRoleById,
        isLoading: roleLoading,
        isInitialized,
        handleBackClick
    } = useRoleViewModel(id) 
    
    const {
        permissionListItems,
        isLoading: permissionLoading,
        error: permissionError,
        selectedPermissions,
        togglePermission,
        toggleSelectAll,
        isAllSelected
    } = usePermissionViewModel(updateFormData, formData.permissionIds)

    const currentRole = id ? handleGetRoleById(id) : null

    if (!isInitialized && roleLoading) {
        return (
            <div className="flex-1 bg-gray-50 p-8">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center py-12">
                        <p className="text-gray-600">Loading role...</p>
                    </div>
                </div>
            </div>
        )
    }

    if (!currentRole && isInitialized) {
        return (
            <div className="flex-1 bg-gray-50 p-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-red-800 mb-2">Role Not Found</h3>
                        <p className="text-red-600 mb-4">The role with ID {id} could not be found.</p>
                        <Button
                            variant="outline"
                            onClick={() => window.history.back()}
                        >
                            Go Back
                        </Button>
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
                <div className="flex items-center justify-between pb-4">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" onClick={handleBackClick}>
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back
                        </Button>
                    </div>
                </div>
                
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Edit Role</h1>
                    <p className="text-gray-600">Update role information and permissions</p>
                </div>

                {/* Role Information */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Role Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* Name */}
                        <div>
                            <Label className="block text-sm font-medium text-gray-700 mb-2">
                                Name <span className="text-red-500">*</span>
                            </Label>
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
                            <Label className="block text-sm font-medium text-gray-700 mb-2">
                                Description <span className="text-red-500">*</span>
                            </Label>
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
                                    <Label className="flex items-center gap-3 cursor-pointer">
                                        <Checkbox
                                            checked={isAllSelected}
                                            onCheckedChange={toggleSelectAll}
                                        />
                                        <div>
                                            <h3 className="font-semibold text-gray-900">Select All</h3>
                                            <p className="text-sm text-gray-600">
                                                Select all {permissionListItems.length} permissions
                                            </p>
                                        </div>
                                    </Label>
                                </div>

                                {/* Permissions List */}
                                <div className="border border-gray-200 rounded-lg overflow-hidden">
                                    <div className="divide-y divide-gray-200">
                                        {permissionListItems.map((permission) => {
                                            const isChecked = selectedPermissions.has(permission.id);
                                            return (
                                                <Label
                                                    key={permission.id}
                                                    className="flex items-start gap-3 cursor-pointer hover:bg-gray-50 p-4 transition-colors"
                                                >
                                                    <Checkbox
                                                        checked={isChecked}
                                                        onCheckedChange={() => togglePermission(permission.id)}
                                                    />
                                                    <div className="flex-1">
                                                        <h4 className="text-sm font-medium text-gray-700 capitalize">
                                                            {permission.name.replace(/_/g, " ")}
                                                        </h4>
                                                        <p className="text-xs text-gray-500 mt-1">
                                                            {permission.description}
                                                        </p>
                                                    </div>
                                                    {isChecked && (
                                                        <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                                                    )}
                                                </Label>
                                            )
                                        })}
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
                        onClick={() => handleUpdateOwnerRole(Number(id))}
                        disabled={roleLoading || permissionLoading}
                        className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2"
                    >
                        {roleLoading ? "Updating..." : "Update Role"}
                    </Button>
                </div>
            </div>
        </div>
    )
}