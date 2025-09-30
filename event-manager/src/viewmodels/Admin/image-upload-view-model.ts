import { useState, useRef, useEffect } from "react";

export const useImageUploadViewModel = (onChange?: (file: File | null) => void) => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // cleanup khi preview thay đổi
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement> | null) => {
    if (e === null) {
      // Trường hợp bấm "Xóa ảnh"
      setPreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // reset input file
      }
      return;
    }

    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  return {
    preview,
    fileInputRef,
    handleButtonClick,
    handleFileChange,
  };
};
