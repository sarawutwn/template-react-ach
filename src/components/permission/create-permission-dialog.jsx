import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import { hostname } from "../../hostname";
import axios from "axios";
import { toast } from "react-toastify";
import { Input, Modal, Typography } from "antd";

function CreateRoleDialog({ open, setOpen, callback }) {
  const [permissionDetail, setPermissionDetail] = useState({});

  const AddPermission = async () => {
    try {
      const { data } = await axios.post(
        `${hostname}/api/permission/create`,
        permissionDetail
      );
      if (data.status === "success") {
        toast.success("เพิ่มสิทธิ์การใช้งานสำเร็จ");
        setOpen(false);
        callback();
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Modal
      title={
        <Typography.Title level={4}>
          เพิ่มสิทธิ์การใช้งานของระบบ
        </Typography.Title>
      }
      open={open}
      onCancel={() => setOpen(false)}
      onOk={AddPermission}
      okButtonProps={{
        disabled:
          permissionDetail?.crm_permission_name === undefined ||
          permissionDetail?.crm_permission_display_name === undefined ||
          permissionDetail?.crm_permission_description === undefined ||
          permissionDetail?.crm_permission_name === "" ||
          permissionDetail?.crm_permission_display_name === "" ||
          permissionDetail?.crm_permission_description === "",
      }}
    >
      <Stack
        sx={{
          display: "flex",
          justifyContent: "start",
          flexDirection: "column",
          mt: 1,
        }}
        spacing={1.5}
      >
        <Input
          addonBefore="ชื่อสิทธิ์"
          onChange={(e) =>
            setPermissionDetail({
              ...permissionDetail,
              ["crm_permission_name"]: e.target.value,
            })
          }
        />
        <Input
          addonBefore="ชื่อที่แสดงผล"
          onChange={(e) =>
            setPermissionDetail({
              ...permissionDetail,
              ["crm_permission_display_name"]: e.target.value,
            })
          }
        />
        <Input.TextArea
          addonBefore="รายละเอียด"
          onChange={(e) =>
            setPermissionDetail({
              ...permissionDetail,
              ["crm_permission_description"]: e.target.value,
            })
          }
        />
      </Stack>
    </Modal>
  );
}

export default CreateRoleDialog;
