import Swal from "sweetalert2";

export const SuccessAlert = (text: string) => {
  if (!text) return null;

  return Swal.fire({
    icon: "success",
    title: "Success",
    text,
  });
};
