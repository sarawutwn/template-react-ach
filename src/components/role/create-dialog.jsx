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
import { useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import { hostname } from "../../hostname";
import axios from "axios";
import { toast } from "react-toastify";

function CreateRoleDialog({ open, setOpen, callback }) {
  const [roleDetail, setRoleDetail] = useState({});

  const addRole = async () => {
    try {
      const { data } = await axios.post(
        `${hostname}/api/role/create`,
        roleDetail
      );
      if (data.status === "success") {
        toast.success("เพิ่มสิทธิ์การใช้งานสำเร็จ");
        callback();
        setOpen(false);
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Dialog
      open={open}
      PaperProps={{
        sx: {
          borderRadius: "15px",
          boxShadow: 0,
        },
      }}
      onClose={() => setOpen(false)}
      fullWidth
    >
      <DialogTitle>
        <>{`เพิ่มสิทธิ์การเริ่มต้นของระบบ`}</>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Stack
            sx={{
              display: "flex",
              justifyContent: "start",
              flexDirection: "column",
              mt: 0,
            }}
          >
            <Typography variant="subtitle2" sx={{ color: "grey" }}>
              ชื่อสิทธิ์
            </Typography>
            <TextField
              size="small"
              required
              inputProps={{
                style: {
                  height: "15px",
                },
              }}
              sx={{ mb: 1 }}
              variant="outlined"
              onChange={(e) =>
                setRoleDetail({
                  ...roleDetail,
                  ["crm_role_name"]: e.target.value,
                })
              }
            />
            <Typography variant="subtitle2" sx={{ color: "grey" }}>
              ชื่อที่แสดงผล (Display)
            </Typography>
            <TextField
              size="small"
              required
              inputProps={{
                style: {
                  height: "15px",
                },
              }}
              sx={{ mb: 1 }}
              variant="outlined"
              onChange={(e) =>
                setRoleDetail({
                  ...roleDetail,
                  ["crm_role_display_name"]: e.target.value,
                })
              }
            />
            <Typography variant="subtitle2" sx={{ color: "grey" }}>
              รายละเอียด
            </Typography>
            <TextField
              size="small"
              required
              inputProps={{
                style: {
                  height: "15px",
                },
              }}
              sx={{ mb: 3 }}
              ƒ
              variant="outlined"
              onChange={(e) =>
                setRoleDetail({
                  ...roleDetail,
                  ["crm_role_description"]: e.target.value,
                })
              }
            />
            <Stack spacing={0.5}>
              <Button
                sx={{ boxShadow: 0 }}
                color="success"
                disabled={
                  roleDetail?.crm_role_name === undefined ||
                  roleDetail?.crm_role_display_name === undefined ||
                  roleDetail?.crm_role_description === undefined ||
                  roleDetail?.crm_role_name === "" ||
                  roleDetail?.crm_role_display_name === "" ||
                  roleDetail?.crm_role_description === ""
                }
                variant="contained"
                size="small"
                onClick={() => addRole()}
              >
                <SaveIcon fontSize="small" />
                <>บันทึก</>
              </Button>
              <Button
                sx={{ boxShadow: 0 }}
                color="danger"
                variant="contained"
                onClick={() => setOpen(false)}
                size="small"
              >
                <>ยกเลิก</>
              </Button>
            </Stack>
          </Stack>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}

export default CreateRoleDialog;
