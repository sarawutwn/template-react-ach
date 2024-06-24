import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { hostname } from "../../hostname";
import axios from "axios";
import { toast } from "react-toastify";
import { Input, Modal } from "antd";

function EditRoleDialog({ open, setOpen, emit, setEmit, callback }) {
  const editRole = async () => {
    try {
      let formData = {
        crm_role_name: emit.crm_role_name,
        crm_role_display_name: emit.crm_role_display_name,
        crm_role_description: emit.crm_role_description
      }
      const { data } = await axios.put(
        `${hostname}/api/role/update/${emit?.crm_role_id}`,
        formData
      );
      if (data.status === "success") {
        setEmit({});
        callback();
        toast.success("แก้ไขรายละเอียดสำเร็จ");
        setOpen(false);
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Modal
      title={<Typography variant="h6">แก้ไขรายละเอียดสิทธิ์</Typography>}
      open={open}
      onOk={editRole}
      onCancel={() => setOpen(false)}
      closable={true}
    >
      <DialogContent>
        <DialogContentText>
          <Stack
            sx={{
              display: "flex",
              justifyContent: "start",
              flexDirection: "column",
              mt: -2,
              mb: -2,
            }}
          >
            <Typography variant="subtitle2" sx={{ color: "grey" }}>
              ชื่อสิทธิ์
            </Typography>
            <Input
              value={emit?.crm_role_name}
              onChange={(e) =>
                setEmit({
                  ...emit,
                  ["crm_role_name"]: e.target.value,
                })
              }
            />
            <Typography variant="subtitle2" sx={{ color: "grey" }}>
              ชื่อที่แสดงผล (Display)
            </Typography>
            <Input
              value={emit?.crm_role_display_name}
              onChange={(e) =>
                setEmit({
                  ...emit,
                  ["crm_role_display_name"]: e.target.value,
                })
              }
            />
            <Typography variant="subtitle2" sx={{ color: "grey" }}>
              รายละเอียด
            </Typography>
            <Input
              value={emit?.crm_role_description}
              onChange={(e) =>
                setEmit({
                  ...emit,
                  ["crm_role_description"]: e.target.value,
                })
              }
            />
          </Stack>
        </DialogContentText>
      </DialogContent>
    </Modal>
  );
}

export default EditRoleDialog;
