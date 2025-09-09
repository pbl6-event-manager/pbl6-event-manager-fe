import React from "react";
import * as Dialog from "@radix-ui/react-dialog";

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  onOpenChange,
  title,
  description,
  onConfirm,
  confirmText = "Xác nhận",
  cancelText = "Hủy",
}) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />
        <Dialog.Content className="fixed top-1/2 left-1/2 bg-white p-6 rounded shadow-md -translate-x-1/2 -translate-y-1/2 w-[300px]">
          <Dialog.Title className="text-lg font-bold">{title}</Dialog.Title>
          <Dialog.Description className="mt-2 text-gray-600">
            {description}
          </Dialog.Description>

          <div className="mt-4 flex justify-end gap-2">
            <Dialog.Close asChild>
              <button className="px-3 py-1 rounded bg-gray-200">
                {cancelText}
              </button>
            </Dialog.Close>
            <button
              className="px-3 py-1 rounded bg-red-500 text-white"
              onClick={onConfirm}
            >
              {confirmText}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ConfirmDialog;
