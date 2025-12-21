"use client"

import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { Button } from "../../../components/ui/button"
import { Label } from "../../../components/ui/label"
import { Input } from "../../../components/ui/input"
import { Textarea } from "../../../components/ui/textarea"
import { ArrowLeft, Contact, ImageIcon, UserRound, Upload, X } from "lucide-react"
import { useOrganizerViewModel } from "../../../viewmodels/Organizer/settings/organizer-view-model"

export default function EditOrganizerPage() {
    const { organizerId } = useParams<{ organizerId: string }>()
    const {
        formData,
        validationErrors,
        fileInputRef,
        imagePreview,
        updateFormData,
        handleUpdateOrganizer,
        handleImageUpload,
        handleRemoveImage,
        handleBackClick,
        loadOrganizerForEdit
    } = useOrganizerViewModel()

    useEffect(() => {
        if (organizerId) {
            loadOrganizerForEdit(Number(organizerId))
        }
    }, [organizerId, loadOrganizerForEdit])


    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-5xl px-6 py-8 space-y-3">
                {/* Back Button */}
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="px-8 py-4 text-0.5xl cursor-pointer" onClick={handleBackClick}>
                        <ArrowLeft className="h-4 w-4 mr-2 text-blue-600" />
                        <span className="text-blue-600 hover:underline">Organization Settings</span>
                    </Button>
                </div>

                {/* Header */}
                <h1 className="mb-8 text-6xl font-bold text-gray-900">Edit Organizer Profile</h1>

                {/* Organizer Profile Image */}
                <div className="mb-8 flex gap-6">
                    <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center">
                        <ImageIcon className="h-15 w-15 text-gray-400"></ImageIcon>
                    </div>
                    <div className="flex-1">
                        <h2 className="mb-2 text-2xl font-bold text-gray-900">Organizer profile image</h2>
                        <p className="mb-6 text-gray-600">
                            This is the first image attendees will see at the top of your profile. Use a high quality square image.
                        </p>
                        {/* Image Upload Area */}
                        <div className="relative">
                            {!imagePreview ? (
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-12 cursor-pointer hover:border-gray-400 transition-colors"
                                >
                                    <ImageIcon className="h-12 w-12 text-gray-400 mb-4" />
                                    <p className="text-base font-medium text-gray-700 mb-1">Drag & drop or click to add profile image.</p>
                                    <p className="text-sm text-gray-500">JPEG or PNG, no larger than 10MB.</p>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/jpeg,image/png"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                    />
                                </div>
                            ) : (
                                <div className="relative inline-block">
                                    <img
                                        src={imagePreview || "/placeholder.svg"}
                                        alt="Profile preview"
                                        className="h-64 w-64 rounded-lg object-cover"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center gap-4 bg-black/40 rounded-lg opacity-0 hover:opacity-100 transition-opacity">
                                        <Button
                                            size="icon"
                                            variant="secondary"
                                            className="h-12 w-12 rounded-full"
                                            onClick={() => fileInputRef.current?.click()}
                                        >
                                            <Upload className="h-5 w-5" />
                                        </Button>
                                        <Button
                                            size="icon"
                                            variant="secondary"
                                            className="h-12 w-12 rounded-full"
                                            onClick={handleRemoveImage}
                                        >
                                            <X className="h-5 w-5" />
                                        </Button>
                                    </div>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/jpeg,image/png"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* About the Organizer */}
                <div className="mb-8 flex gap-6">
                    <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center">
                        <UserRound className="h-15 w-15 text-gray-400"></UserRound>
                    </div>
                    <div className="flex-1">
                        <h2 className="mb-2 text-2xl font-bold text-gray-900">About the organizer</h2>
                        <p className="mb-6 text-gray-600">
                            Let attendees know who is hosting events.{" "}
                            <a href="#" className="text-blue-600 hover:underline">
                                Learn More
                            </a>
                        </p>

                        <div className="space-y-4">
                            <div>
                                <Label className="mb-2 block text-sm font-medium text-gray-700">
                                    Organizer name <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    value={formData.name}
                                    onChange={(e) => updateFormData("name", e.target.value)}
                                    placeholder="e.g. Eventbrite Careers"
                                    className={`w-full rounded-lg border ${validationErrors.name ? "border-red-500" : "border-gray-300"
                                        } px-4 py-3 focus:border-blue-500 focus:outline-none`}
                                />
                                {validationErrors.name && <p className="mt-1 text-sm text-red-500">{validationErrors.name}</p>}
                            </div>

                            <div>
                                <Label className="mb-2 block text-sm font-medium text-gray-700">Your website</Label>
                                <Input
                                    type="url"
                                    value={formData.website}
                                    onChange={(e) => updateFormData("website", e.target.value)}
                                    placeholder="e.g: https://www.eventbritecareers.com/home"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                                />
                            </div>

                            {/* Description for Event Pages */}
                            <div>
                                <h3 className="mb-2 text-xl font-bold text-gray-900">Description for event pages</h3>
                                <p className="mb-4 text-sm text-gray-600">
                                    Write a short description for this organizer to show on all your event pages. Unfortunately, we can no
                                    longer support images, video, or custom HTML in the description.
                                </p>
                                <div className="rounded-lg border border-gray-300">
                                    <Textarea
                                        value={formData.description}
                                        onChange={(e) => updateFormData("description", e.target.value)}
                                        rows={6}
                                        className="w-full resize-none px-4 py-3 focus:outline-none"
                                        placeholder="Enter description..."
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Social Media and Marketing */}
                <div className="mb-8 flex gap-6">
                    <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center">
                        <Contact className="h-15 w-15 text-gray-400" />
                    </div>
                    <div className="flex-1">
                        <h2 className="mb-2 text-2xl font-bold text-gray-900">Social media and marketing</h2>
                        <p className="mb-6 text-gray-600">
                            Let attendees know how to connect with you.
                        </p>
                        <div className="space-y-4">
                            {/* Contact Email */}
                            <div>
                                <Label className="mb-2 block text-sm font-medium text-gray-700">Contact Email</Label>
                                <Input
                                    value={formData.contactEmail}
                                    onChange={(e) => updateFormData("contactEmail", e.target.value)}
                                    placeholder="e.g: example@example.com"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                                />
                            </div>

                            {/* Contact Phone */}
                            <div>
                                <Label className="mb-2 block text-sm font-medium text-gray-700">Contact Phone</Label>
                                <Input
                                    value={formData.contactPhone}
                                    onChange={(e) => updateFormData("contactPhone", e.target.value)}
                                    placeholder="e.g: +1 234 567 8901"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-4">
                    <Button
                        onClick={handleBackClick}
                        variant="outline"
                        className="rounded-lg border border-gray-300 px-6 py-2.5 font-semibold text-gray-900 hover:bg-gray-50 cursor-pointer"
                    >
                        Cancel
                    </Button>

                    <Button
                        onClick={() => handleUpdateOrganizer(Number(organizerId))}
                        type="submit"
                        className="rounded-lg bg-blue-600 px-6 py-2.5 font-semibold text-white hover:bg-blue-700 disabled:bg-gray-300 cursor-pointer"
                    >
                        Save
                    </Button>
                </div>
            </div>
        </div>
    )
}