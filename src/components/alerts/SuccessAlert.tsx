import Swal from "sweetalert2";

export const successAlert = (text: string) => {
  if (!text) return null;

  return Swal.fire({
    icon: "success",
    title: "Success",
    text,
  });
};
