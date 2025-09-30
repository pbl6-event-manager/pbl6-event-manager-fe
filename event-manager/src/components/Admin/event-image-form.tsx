import React from "react";
import type { ImageUploadBoxProps } from "../../models/Admin/image-models";

const ImageUploadBox: React.FC<ImageUploadBoxProps> = ({
  preview,
  fileInputRef,
  onButtonClick,
  onFileChange,
}) => {
  return (
    <div className="w-full h-64 border-2 border-dashed border-gray-300 rounded flex items-center justify-center bg-gray-50 relative">
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={onFileChange}
        className="hidden"
      />

      {preview ? (
        <>
          <img
            src={preview}
            alt="Preview"
            className="h-full w-full object-cover rounded"
          />
          {/* Nút Đổi ảnh */}
          <button
            type="button"
            onClick={onButtonClick}
            className="absolute bottom-2 left-2 px-3 py-1 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700"
          >
            Change
          </button>
          {/* Nút Xóa ảnh */}
          <button
            type="button"
            onClick={() => onFileChange(null)}
            className="absolute bottom-2 right-2 px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
          >
            Delete
          </button>
        </>
      ) : (
        <button
          type="button"
          onClick={onButtonClick}
          className="px-4 py-2 bg-[var(--primary-admin)] text-white rounded hover:bg-[var(--primary-hover)]"
        >
          Upload
        </button>
      )}
    </div>
  );
};

export default ImageUploadBox;
