import React, { useState, useEffect } from "react";
import { Button, Grid, Stack, TextField, Typography } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { Box } from "@mui/system";
import axios from "axios";
import { hostname } from "../hostname";
import { toast } from "react-toastify";
import { Input } from "antd";

function Password() {
  const [profile, setProfile] = useState({});
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const getProfile = async () => {
    try {
      const storage = localStorage.getItem("USER_PROFILE");
      setProfile(JSON.parse(storage));
    } catch (err) {
      alert(err);
    }
  };

  const handleChange = (prop) => (event) => {
    setPassword({ ...password, [prop]: event.target.value });
  };

  const resetPassword = async () => {
    if (password.newPassword.length < 5) {
      alert("รหัสผ่านควรมีมากกว่า 5 ตัวอักษร!");
      return;
    }
    if (password.newPassword !== password.confirmPassword) {
      alert("รหัสไม่สอดคล้องกัน!");
      return;
    }
    try {
      const formData = {
        password: password.newPassword,
        old_password: password.oldPassword,
      };
      const { data } = await axios.post(
        `${hostname}/api/auth/reset-password`,
        formData
      );
      if (data.status === "success") {
        toast.success("เปลี่ยนรหัสผ่านสำเร็จ");
        setPassword({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        toast.error("รหัสผ่านเดิมไม่ถูกต้อง!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          m: 1,
        }}
      >
        <Grid container>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                background: "#FFF",
                boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                borderRadius: "8px",
                m: 1,
                p: 2,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Stack
                display="flex"
                sx={{ justifyContent: "center" }}
                spacing={0.5}
              >
                <Typography
                  variant="h5"
                  sx={{ display: "flex", justifyContent: "start", mb: 1 }}
                >
                  <>เปลี่ยนรหัสผ่าน</>
                </Typography>
                <Stack direction="column">
                  <Typography fontSize={12}>รหัสผ่านเดิม</Typography>
                  <TextField
                    size="small"
                    value={password.oldPassword}
                    onChange={handleChange("oldPassword")}
                  />
                </Stack>
                <Stack direction="column">
                  <Typography fontSize={12}>รหัสผ่านใหม่</Typography>
                  <TextField
                    size="small"
                    value={password.newPassword}
                    onChange={handleChange("newPassword")}
                  />
                </Stack>
                <Stack direction="column">
                  <Typography fontSize={12}>ยืนยันรหัสผ่าน</Typography>
                  <TextField
                    size="small"
                    value={password.confirmPassword}
                    onChange={handleChange("confirmPassword")}
                  />
                </Stack>
              </Stack>
              <Button
                color="success"
                variant="contained"
                size="small"
                sx={{ mt: 3, boxShadow: 0, borderRadius: "3px" }}
                fullWidth
                onClick={resetPassword}
              >
                <SaveIcon fontSize="small" sx={{ mr: "5px" }} />
                <>เปลี่ยนรหัสผ่าน</>
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Password;
