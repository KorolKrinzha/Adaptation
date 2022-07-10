import axios from "axios";

export const check_user = () => {
  return false;
};

export const check_admin = () => {
  axios
    .post("/api/check_admin", { withCredentials: true })
    .then((response) => console.log(response["data"]))
    .catch((error) => console.log(error));

  return false;
};
