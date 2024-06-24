import axios from "axios";
import { useRef } from "react";
import LoadingModal from "./utils/loading-modal";
import { ThemeProvider } from "@mui/material/styles";
import { StyledEngineProvider } from "@mui/material";
import Theme from "./utils/theme";
import Routes from "./routes";
import SnackbarRef from "./utils/snackbar-ref";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ConfigProvider } from "antd";

function App() {
  const loadingModalRef = useRef(null);
  const snackbarRef = useRef(null);

  axios.interceptors.request.use(
    function (config) {
      loadingModalRef.current.setOpen(true);
      config.headers = {
        Authorization: "Bearer " + localStorage.getItem("TOKEN"),
      };
      return config;
    },
    function (error) {
      loadingModalRef.current.setOpen(false);
      toast.error(error.toString());
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    function (response) {
      loadingModalRef.current.setOpen(false);
      return response;
    },
    async function (error) {
      loadingModalRef.current.setOpen(false);
      const jwt = localStorage.getItem("TOKEN").split(".")[1];
      const decodedJwt = JSON.parse(atob(jwt));
      const expirationTime = decodedJwt.exp * 1000;
      const isExpired = expirationTime < Date.now();
      if (isExpired) {
        localStorage.clear();
        window.location.href = "/";
      }
      return Promise.reject(error);
    }
  );

  return (
    <>
      <StyledEngineProvider injectFirst>
        <ConfigProvider
          theme={{
            token: {
              fontFamily: '"Kanit", sans-serif',
            },
          }}
        >
          <ThemeProvider theme={Theme}>
            <Routes />
            <LoadingModal ref={loadingModalRef} />
            <SnackbarRef ref={snackbarRef} />
            <ToastContainer />
          </ThemeProvider>
        </ConfigProvider>
      </StyledEngineProvider>
    </>
  );
}

export default App;
