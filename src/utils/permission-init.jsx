import { DoNotDisturbOn, Home } from "@mui/icons-material";
import { Box, Button, makeStyles, Stack, Typography } from "@mui/material";
import { Navigate } from "react-router";
import { useEffect } from "react";
import { useState } from "react";
import store from "../redux/store";

function PermissionInit({ children, permission_key }) {
  const [isPermission, setIsPermission] = useState(false);

  let permission = store?.getState().permission;
  let role = store?.getState().role;


  const checkPermission = async () => {
    let type = await typeof(permission_key);
    if(type === 'object') {
      for(let item of permission) {
        let filter = await permission.filter(element => element === item);
        if(filter.length !== 0) {
          setIsPermission(true);
        }
      }
    }else {
      let filter = await permission.filter((item) => item === permission_key);
      if (filter.length !== 0) {
        setIsPermission(true);
      }
    }
    
  };

  useEffect(() => {
    if (role.crm_role_name === "SU") {
      setIsPermission(true);
    } else {
      checkPermission();
    }
  }, []);

  if (isPermission) {
    return <>{children}</>;
  } else {
    return (
      <>
        <Box sx={{ background: "#ededed", minHeight: "100vh", width: "100%", overflow: "auto" }}>
          <Stack mt={30} spacing={2} alignItems="center">
            <Box>
              <DoNotDisturbOn fontSize="large" color="error" />
            </Box>
            <Typography variant="h6">ไม่มีสิทธิ์เข้าถึง</Typography>
          </Stack>
        </Box>
      </>
    );
  }
}

export default PermissionInit;
