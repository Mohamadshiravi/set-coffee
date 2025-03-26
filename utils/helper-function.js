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
    position: "top-center",
  });
}
export function newSucToast(text) {
  return toast.success(text, {
    position: "top-center",
  });
}
export function newToast(text) {
  return toast(text, {
    position: "top-center",
  });
}
