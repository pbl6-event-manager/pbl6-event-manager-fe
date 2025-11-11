import Swal from "sweetalert2";

export const showSuccessAlert = (message: string, title: string = "Success") => {
  return Swal.fire({
    icon: "success",
    title,
    text: message,
    timer: 1500,
    showConfirmButton: false,
  });
};

export const showErrorAlert = (message: string, title: string = "Error") => {
  return Swal.fire({
    icon: "error",
    title,
    text: message,
    confirmButtonColor: "#d33",
  });
};

export const showWarningAlert = (message: string, title: string = "Warning") => {
  return Swal.fire({
    icon: "warning",
    title,
    text: message,
    confirmButtonColor: "#3085d6",
  });
};

export const showConfirmAlert = async (
  message: string,
  title: string = "Are you sure?"
): Promise<boolean> => {
  const result = await Swal.fire({
    title,
    text: message,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
    cancelButtonText: "Cancel",
  });

  return result.isConfirmed;
};

const MIN_LOADING_MS = 500;
let _loadingShownAt: number | null = null;
let _loadingCloseTimer: ReturnType<typeof setTimeout> | null = null;

export const showLoadingAlert = (title = "Processing...") => {
  if (_loadingShownAt) {
    return;
  }
  if (_loadingCloseTimer) {
    clearTimeout(_loadingCloseTimer);
    _loadingCloseTimer = null;
  }

  _loadingShownAt = Date.now();
  Swal.fire({
    title,
    text: "Please wait a moment.",
    allowOutsideClick: false,
    showConfirmButton: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });
};

export const closeLoadingAlert = () => {
  if (!_loadingShownAt) {
    try {
      Swal.close();
    } catch {}
    return;
  }

  const elapsed = Date.now() - _loadingShownAt;
  const remaining = Math.max(0, MIN_LOADING_MS - elapsed);

  if (remaining === 0) {
    try {
      Swal.close();
    } catch {}
    _loadingShownAt = null;
    if (_loadingCloseTimer) {
      clearTimeout(_loadingCloseTimer);
      _loadingCloseTimer = null;
    }
    return;
  }

  if (_loadingCloseTimer) {
    clearTimeout(_loadingCloseTimer);
  }
  _loadingCloseTimer = setTimeout(() => {
    try {
      Swal.close();
    } catch {}
    _loadingShownAt = null;
    _loadingCloseTimer = null;
  }, remaining);
};