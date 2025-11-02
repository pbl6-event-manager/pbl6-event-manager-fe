//#region Image Component Props
export interface ImageUploadBoxProps {
  preview: string | null;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onButtonClick: () => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement> | null) => void;
}
//#endregion