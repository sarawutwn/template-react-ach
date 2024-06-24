import axios from "axios";
import { hostname } from "../../hostname";
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

function DeletePermissionDialog({ open, setOpen, emit, callback }) {
  const deleteData = async () => {
    try {
      const { data } = await axios.delete(
        `${hostname}/api/permission/destroy/${emit?.crm_permission_id}`
      );
      if (data.status === "success") {
        callback();
        toast.success("ลบสิทธิ์การใช้งานเรียบร้อย");
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
        <Typography sx={{ fontSize: "22px" }}>ต้องการลบรายการนี้</Typography>
      </DialogTitle>
      <DialogContent>
          <Typography>
            คุณแน่ใจหรือไม่ว่าต้องการลบ {emit?.crm_permission_name} ?
          </Typography>
      </DialogContent>
      <DialogActions sx={{ mt: -1, mr: 1 }}>
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

export default DeletePermissionDialog;
