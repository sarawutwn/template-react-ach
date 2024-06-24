import axios from "axios";
import { hostname } from "../../../hostname";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Typography,
  DialogActions,
  Button,
} from "@mui/material";
import { toast } from "react-toastify";

function DeletePermission({ open, setOpen, role, permission, callback }) {
  const deleteData = async () => {
    try {
      const { data } = await axios.delete(
        `${hostname}/api/permission-group/delete-by-permission/${permission.crm_permission_id}/role/${role.crm_role_id}`
      );
      if (data.status === "success") {
        callback();
        toast.success("ลบรายการนี้สำเร็จ");
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
      maxWidth="sm"
    >
      <DialogTitle>
        <>ต้องการลบรายการนี้</>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography>
            คุณแน่ใจหรือไม่ว่าต้องการลบ{" "}
            {permission?.crm_permissions?.crm_permission_name} ออกจาก{" "}
            {role?.crm_role_display_name} ?
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ mr: "15px", mb: "15px" }}>
        <Button onClick={() => setOpen(false)} size="small" color="inherit">
          ยกเลิก
        </Button>
        <Button
          onClick={() => deleteData()}
          size="small"
          sx={{ boxShadow: 0, borderRadius: "3px" }}
          color="danger"
          variant="contained"
        >
          ตกลง
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeletePermission;
