import { toast } from "react-toastify";

export function errors(error) {
  const errorArray = error?.response?.data?.errors;
  Object.keys(errorArray).forEach((element, index) => {
    toast.error(`${element}: ${errorArray[element][0]}`);
  });
  return;
}
