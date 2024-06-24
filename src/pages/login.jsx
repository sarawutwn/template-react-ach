import { useState } from "react";
import {
  Button,
  Typography,
  Box,
  Stack,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import axios from "axios";
import { hostname } from "../hostname";
import { toast } from "react-toastify";

function Login() {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setUserData({ ...userData, [prop]: event.target.value });
  };

  const onClickLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${hostname}/api/auth/local/sign-in`, {
        crm_user_code: userData.username,
        crm_user_password: userData.password,
      });
      if (data.status === "NOTFOUND") {
        toast.error("ไม่มีชื่อผู้ใช้งานนี้ในระบบ!");
      }
      if (data.status === "LOCKED") {
        toast.error("ใส่รหัสผ่านผิดมากเกินไป กรุณาติดต่อเจ้าหน้าที่");
      }
      if (data.status === "PASSWORD") {
        toast.error("รหัสผ่านไม่ถูกต้อง!");
      }
      if (data.status === "Authenticated") {
        localStorage.setItem("TOKEN", data.token);
        localStorage.setItem("USER_PROFILE", JSON.stringify(data.user_profile));
        window.location.href = "/home";
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickShowPassword = () => {
    setUserData({ ...userData, showPassword: !userData.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const styles = {
    paperContainer: {
      background: "#f89922",
      backgroundImage: `url(${"/image/home-ir.jpeg"})`,
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
    },
  };

  return (
    <>
       <Box style={styles.paperContainer}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            boxShadow:
              "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
          }}
        >
          <Box
            sx={{
              p: 4,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              backgroundColor: "white",
              borderRadius: "5px",
              boxShadow:
                "rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;",
            }}
          >
            <Stack
              direction="column"
              spacing={5}
              alignItems="center"
              justifyContent="flex-start"
            >
              <form onSubmit={onClickLogin}>
                <Stack direction={{ xs: "column", md: "row" }} sx={{ mb: 2 }}>
                  <img
                    src="/logo-acg.png"
                    alt=""
                    style={{ height: "8rem" }}
                  />
                </Stack>
                <Typography variant="h6" textAlign="center">
                  <b>Template AUTOCORP</b>
                </Typography>
                <Stack direction="column" spacing={2} my={1}>
                  <TextField
                    size="small"
                    required
                    onChange={e => setUserData({ ...userData, ['username']: event.target.value })}
                    label="ชื่อผู้ใช้"
                    variant="outlined"
                  />
                  <FormControl
                    required
                    variant="outlined"
                    size="small"
                  >
                    <InputLabel htmlFor="outlined-adornment-password">
                      รหัสผ่าน
                    </InputLabel>
                    <OutlinedInput
                      type={userData.showPassword ? "text" : "password"}
                      value={userData.password}
                      onChange={handleChange("password")}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {userData.showPassword ? (
                              <VisibilityIcon />
                            ) : (
                              <VisibilityOffIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="รหัสผ่าน"
                    />
                  </FormControl>
                </Stack>
                <Button
                  variant="contained"
                  size="medium"
                  color="primary"
                  fullWidth
                  type="submit"
                  sx={{ boxShadow: 0, mt: 1.5, borderRadius: "3px" }}
                >
                  <b>เข้าสู่ระบบ</b>
                </Button>
              </form>
            </Stack>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Login;
