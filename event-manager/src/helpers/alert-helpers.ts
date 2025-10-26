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

export const showLoadingAlert = (title = "Processing...") => {
  Swal.fire({
    title,
    text: "Please wait a moment.",
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });
};

export const closeLoadingAlert = () => Swal.close();