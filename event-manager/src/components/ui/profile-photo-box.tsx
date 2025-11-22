import React, { useEffect, useRef, useState } from "react";

type Props = {
  value?: string;
  onChange?: (file: File | null) => void;
  size?: number; 
};

export const ProfilePhotoBox: React.FC<Props> = ({ value, onChange, size = 160 }) => {
  const [preview, setPreview] = useState<string | undefined>(value);
  const [dragActive, setDragActive] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const objectUrlRef = useRef<string | null>(null);

  useEffect(() => {
    setPreview(value);
  }, [value]);

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = null;
      }
    };
  }, []);

  const handleFiles = (file?: File) => {
    if (!file) {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = null;
      }
      setPreview(undefined);
      onChange?.(null);
      if (fileRef.current) fileRef.current.value = "";
      return;
    }

    if (!file.type.startsWith("image/")) {
      // ignore non-image
      if (fileRef.current) fileRef.current.value = "";
      return;
    }

    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
    }

    const url = URL.createObjectURL(file);
    objectUrlRef.current = url;
    setPreview(url);
    onChange?.(file);
    if (fileRef.current) fileRef.current.value = "";
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    handleFiles(f);
    if (e.target) e.target.value = "";
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const f = e.dataTransfer.files?.[0];
    if (f) handleFiles(f);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const openFilePicker = () => fileRef.current?.click();
  const removeImage = () => handleFiles(undefined);

  return (
    <div className="flex items-start gap-8">
      <div
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        className={`flex flex-col items-center justify-center rounded border-2 ${
          dragActive ? "border-blue-300 bg-blue-50" : "border-dashed border-gray-300 bg-white"
        }`}
        style={{ width: size, height: size, minWidth: size, minHeight: size, position: "relative" }}
      >
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onInputChange}
          aria-hidden
        />

        {preview ? (
          <>
            <img
              src={preview}
              alt="Profile preview"
              className="object-cover w-full h-full rounded"
              style={{ borderRadius: 8 }}
            />
            <div className="absolute left-2 bottom-2 flex gap-2">
              <button
                type="button"
                onClick={openFilePicker}
                className="px-2 py-1 text-xs bg-white/80 rounded border text-gray-800 hover:bg-white cursor-pointer"
              >
                Change
              </button>
              <button
                type="button"
                onClick={removeImage}
                className="px-2 py-1 text-xs bg-white/80 rounded border text-red-600 hover:bg-white cursor-pointer"
              >
                Remove
              </button>
            </div>
          </>
        ) : (
          <div className="text-center px-3">
            <div className="font-medium text-sm text-gray-700">ADD A PROFILE IMAGE</div>
            <div className="text-xs mt-1 text-gray-500">Drag and drop or choose a file to upload</div>

            <div className="mt-3 flex justify-center">
              <button
                type="button"
                onClick={openFilePicker}
                className="px-3 py-1 text-sm rounded bg-blue-50 text-blue-700 border border-blue-100 hover:bg-blue-100 cursor-pointer"
              >
                Upload
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-4">Profile Photo</h2>
        <p className="text-sm text-gray-600">Add a clear profile picture so attendees can recognize you.</p>
      </div>
    </div>
  );
};

export default ProfilePhotoBox;