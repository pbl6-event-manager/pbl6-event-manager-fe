import { forwardRef, useImperativeHandle, useState, useRef, useEffect } from "react"
import { Upload, X, ImageIcon, VideoIcon, Check, Plus } from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"
import type { MediaFileModel } from "../../models/form-models/event-form-models"

interface MediaUploadCardProps {
  uploadedMedia: MediaFileModel[]
  onUpdate: (files: MediaFileModel[]) => void
  inputRef?: React.RefObject<HTMLInputElement | null>
}

export interface MediaUploadCardHandle {
  expand: () => void
}

export const MediaUploadCard = forwardRef<MediaUploadCardHandle, MediaUploadCardProps>(
  ({ uploadedMedia, onUpdate, inputRef }, ref) => {
    const [isExpanded, setIsExpanded] = useState(false)
    const [isValid, setIsValid] = useState(false)
    const cardRef = useRef<HTMLDivElement>(null)
    const imageInputRef = useRef<HTMLInputElement>(null)
    const videoInputRef = useRef<HTMLInputElement>(null)

    // Expose expand method to parent
    useImperativeHandle(ref, () => ({
      expand: () => setIsExpanded(true)
    }))

    useEffect(() => {
      // Validate: at least one image uploaded
      setIsValid(uploadedMedia.filter((f) => f.type === "image").length > 0)
    }, [uploadedMedia])

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (cardRef.current && !cardRef.current.contains(event.target as Node) && isExpanded) {
          // Validate and collapse if valid
          if (isValid) {
            setIsExpanded(false)
          }
        }
      }

      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [isExpanded, isValid])

    const handleFileUpload = (file: File, type: "image" | "video") => {
      const newFile: MediaFileModel = {
        id: Math.random().toString(36).substr(2, 9),
        file,
        preview: URL.createObjectURL(file),
        type,
        uploadedAt: new Date(),
      }
      onUpdate([...uploadedMedia, newFile])
    }

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
        handleFileUpload(file, "image")
      }
      if (imageInputRef.current) imageInputRef.current.value = ""
    }

    const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
        handleFileUpload(file, "video")
      }
      if (videoInputRef.current) videoInputRef.current.value = ""
    }

    const removeFile = (id: string) => {
      onUpdate(uploadedMedia.filter((f) => f.id !== id))
    }

    if (!isExpanded) {
      const imageFiles = uploadedMedia.filter((f) => f.type === "image")

      return (
        <Card
          ref={cardRef}
          className={`p-0 border-2 border-gray-300 hover:border-blue-700 transition-colors duration-300 cursor-pointer`}
          onClick={() => setIsExpanded(true)}
        >
          <CardContent className="p-0">
            <div className="relative aspect-[2/1] bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg overflow-hidden group">
              {imageFiles.length > 0 ? (
                <img
                  src={imageFiles[0].preview || "/placeholder.svg"}
                  alt="Event cover"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center mb-4 mx-auto">
                      <Upload className="h-8 w-8 text-primary" />
                    </div>
                    <p className="font-medium text-lg mb-2">Upload photos and video</p>
                    <p className="text-sm text-muted-foreground max-w-md mx-auto">
                      Pro tip: Use photos that set the mood, and avoid distracting text overlays.
                    </p>
                  </div>
                </div>
              )}
              <div className="absolute top-4 right-4">
                {isValid ? (
                  <div className="bg-green-500 text-white rounded-full p-2">
                    <Check className="h-5 w-5" />
                  </div>
                ) : (
                  <Button size="sm" variant="secondary" className="cursor-pointer">
                    <Plus className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )
    }

    return (
      <Card ref={cardRef} className="border-2 border-blue-700 transition-colors duration-300">
        <CardContent className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">Add images and video</h3>
            {isValid && (
              <Button variant="ghost" size="sm" onClick={() => setIsExpanded(false)}>
                Done
              </Button>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Images</h4>
              <div className="flex items-start gap-2 text-sm text-muted-foreground mb-4">
                <span className="text-primary">✨</span>
                <p>
                  <span className="font-medium">Pro tip:</span> Use photos that set the mood, and avoid distracting text overlays.
                </p>
              </div>
            </div>

            <div className="border-2 border-dashed rounded-lg p-8 text-center bg-muted/30">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                  <ImageIcon className="h-8 w-8 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Drag and drop an image or</p>
                  <input
                    ref={inputRef || imageInputRef}
                    type="file"
                    accept="image/jpeg,image/png"
                    className="hidden"
                    onChange={handleImageSelect}
                  />
                  <Button variant="outline" onClick={() => (inputRef || imageInputRef).current?.click()} className="cursor-pointer">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Image
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex gap-4 text-xs text-muted-foreground">
              <span>• Recommended image size: 2160 x 1080px</span>
              <span>• Maximum file size: 10MB</span>
              <span>• Supported image files: JPEG, PNG</span>
            </div>

            {uploadedMedia.filter((f) => f.type === "image").length > 0 && (
              <div className="grid grid-cols-3 gap-4">
                {uploadedMedia
                  .filter((f) => f.type === "image")
                  .map((file) => (
                    <div key={file.id} className="relative group">
                      <img
                        src={file.preview || "/placeholder.svg"}
                        alt="Uploaded"
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <Button
                        size="sm"
                        variant="destructive"
                        className="absolute top-2 right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeFile(file.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Video</h4>
              <p className="text-sm text-muted-foreground">
                Add a video to show your event's vibe. The video will appear with your event images.
              </p>
            </div>

            <div className="border-2 border-dashed rounded-lg p-8 text-center bg-muted/30">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                  <VideoIcon className="h-8 w-8 text-muted-foreground" />
                </div>
                <input
                  ref={videoInputRef}
                  type="file"
                  accept="video/mp4,video/quicktime"
                  className="hidden"
                  onChange={handleVideoSelect}
                />
                <Button variant="outline" onClick={() => videoInputRef.current?.click()} className="cursor-pointer">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload video
                </Button>
              </div>
            </div>

            <div className="flex gap-4 text-xs text-muted-foreground">
              <span>• Min resolution: 480p</span>
              <span>• Ratio: any vertical</span>
              <span>• Length: up to 1 min</span>
              <span>• Formats: MP4, MOV</span>
            </div>

            {uploadedMedia.filter((f) => f.type === "video").length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                {uploadedMedia
                  .filter((f) => f.type === "video")
                  .map((file) => (
                    <div key={file.id} className="relative group">
                      <video src={file.preview} className="w-full h-40 object-cover rounded-lg" controls />
                      <Button
                        size="sm"
                        variant="destructive"
                        className="absolute top-2 right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeFile(file.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }
)

MediaUploadCard.displayName = "MediaUploadCard"