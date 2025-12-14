import Swal from "sweetalert2";

// helper: lock/unlock body scroll with scrollbar compensation
function lockBodyScroll() {
  try {
    // debug (tắt log khi đã ổn)
    // console.log('lockBodyScroll before', { innerWidth: window.innerWidth, clientWidth: document.documentElement.clientWidth, paddingRight: document.body.style.paddingRight, scrollY: window.scrollY });

    // store current scroll and inline styles
    (document.body as any).__savedScrollY = window.scrollY;
    (document.body as any).__savedPaddingRight = document.body.style.paddingRight || "";
    (document.body as any).__savedOverflow = document.body.style.overflow || "";

    // prevent layout shift by fixing body in place
    document.body.style.position = "fixed";
    document.body.style.top = `-${window.scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";

    // optional: still add paddingRight if scrollbar removed and you need it for some layout cases
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollBarWidth > 0) {
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    }
  } catch (e) {}
}

function unlockBodyScroll() {
  try {
    const savedScrollY = (document.body as any).__savedScrollY || 0;
    const savedPadding = (document.body as any).__savedPaddingRight;
    const savedOverflow = (document.body as any).__savedOverflow;

    // restore styles
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";
    document.body.style.overflow = savedOverflow ?? "";
    document.body.style.paddingRight = typeof savedPadding !== "undefined" ? savedPadding : "";

    // restore scroll
    window.scrollTo(0, Number(savedScrollY) || 0);

    delete (document.body as any).__savedScrollY;
    delete (document.body as any).__savedPaddingRight;
    delete (document.body as any).__savedOverflow;
  } catch (e) {}
}

export const showSuccessAlert = (message: string, title: string = "Success") => {
  return Swal.fire({
    icon: "success",
    title,
    text: message,
    timer: 1500,
    showConfirmButton: false,
    didOpen: () => {
      lockBodyScroll();
    },
    didClose: () => {
      unlockBodyScroll();
    },
  });
};

export const showErrorAlert = (message: string, title: string = "Error") => {
  return Swal.fire({
    icon: "error",
    title,
    text: message,
    confirmButtonText: "OK",
    confirmButtonColor: "#d33",
    showConfirmButton: true,
    allowOutsideClick: false,
    allowEscapeKey: false,
    didOpen: () => {
      lockBodyScroll();
    },
    didClose: () => {
      unlockBodyScroll();
    },
  });
};

export const showWarningAlert = (message: string, title: string = "Warning") => {
  return Swal.fire({
    icon: "warning",
    title,
    text: message,
    confirmButtonColor: "#3085d6",
    didOpen: () => {
      lockBodyScroll();
    },
    didClose: () => {
      unlockBodyScroll();
    },
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
    didOpen: () => {
      lockBodyScroll();
    },
    didClose: () => {
      unlockBodyScroll();
    },
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
      lockBodyScroll();
      Swal.showLoading();
    },
    didClose: () => {
      unlockBodyScroll();
    },
  });
};

export const closeLoadingAlert = () => {
  if (!_loadingShownAt) {
    return;
  }

  const elapsed = Date.now() - _loadingShownAt;
  const remaining = Math.max(0, MIN_LOADING_MS - elapsed);

  if (remaining === 0) {
    try {
      Swal.close();
      unlockBodyScroll();
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
      unlockBodyScroll();
    } catch {}
    _loadingShownAt = null;
    _loadingCloseTimer = null;
  }, remaining);
};