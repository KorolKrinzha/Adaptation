import axios from "axios";

export const check_user = () => {
  return false;
};

export const check_admin = async () => {
  axios
    .post("/api/check_admin", { withCredentials: true })
    .then((response) => {
      return response["data"]["statusSuccess"];
    })
    .catch((error) => {
      if (error.response) {
        // обработка ошибок
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      return false;
    });
};
