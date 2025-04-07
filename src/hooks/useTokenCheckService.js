import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { getCookie, removeCookie } from "../helpers/cokieesFunc";
import { LOAD_USER_FAIL_CHECK_PERMIT, LOAD_USER_REQUEST_CHECK_PERMIT, LOAD_USER_SUCCESS_CHECK_PERMIT } from "../store/authReducer/authTypes";
import { fetchConfig } from "../resources/getEnvConfig";


const useTokenCheckService = (setAlert) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const checkToken = async () => {
    const id = getCookie("user-id");
    const token = getCookie("x-auth-token");
    const env = await fetchConfig();

    if (!id || !token) return;

    const myHeaders = new Headers();
    myHeaders.append("content-type", "application/json");

    const raw = JSON.stringify({ "x-auth-token": token, "user-id": id });
    const requestOptions = { method: "POST", headers: myHeaders, body: raw };
    dispatch({ type: LOAD_USER_REQUEST_CHECK_PERMIT });

    try {
      const response = await fetch(`${env.apiDomain}/api/v1/corporate-account/check-auth`, requestOptions);
      const result = await response.json();


      if (result.status === 200) {
        dispatch({ type: LOAD_USER_SUCCESS_CHECK_PERMIT, payload: result });
      } else {
        dispatch({ type: LOAD_USER_FAIL_CHECK_PERMIT, payload: result.status });
        removeCookie("user-id");
        removeCookie("x-auth-token");
        router.push("/");
        //
        setAlert({ alert: true, close: true, message: "Token expired. Please log in again.", error: true, });
      }
    } catch (error) {
      console.log("error", error);
      dispatch({ type: LOAD_USER_FAIL_CHECK_PERMIT, payload: error });
      setAlert({ alert: true, close: true, message: error.message, error: true, });
    }
  };

  return checkToken;
};

export default useTokenCheckService;
