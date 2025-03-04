import { toast } from "react-hot-toast";
import swal from "sweetalert";

export function ShowSwal(icon, title, buttons) {
  return swal({
    icon,
    title,
    buttons,
  });
}
export function newErrorToast(text) {
  return toast.error(text, {
    theme: "colored",
    position: "top-center",
    autoClose: 2000,
  });
}
export function newSucToast(text) {
  return toast.success(text, {
    theme: "colored",
    position: "top-center",
    autoClose: 2000,
  });
}
export function newToast(text) {
  return toast(text, {
    theme: "colored",
    position: "top-center",
    autoClose: 2000,
  });
}
