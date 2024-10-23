import Swal from "sweetalert2";

export const DeleteAlert = (text: string) => {
  if (!text) return null;

  return Swal.fire({
    icon: "question",
    text,
    showCancelButton: true,
    customClass: {
      confirmButton: "my-confirm-button",
      icon: "my-icon",
      title: "my-title",
      popup: "my-popup",
      htmlContainer: "my-text",
    },
  });
};
