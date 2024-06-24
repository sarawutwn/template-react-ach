import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { hostname } from "../../../hostname";
import { toast } from "react-toastify";

function CreatePermissionDialog({
  open,
  setOpen,
  permission,
  setPermission,
  id,
  callback,
}) {
  const [disableButton, setDisableButton] = useState(true);

  const addPermission = async () => {
    let formData = [];
    await permission.forEach((element) => {
      if (element.approved === true) {
        formData.push({
          crm_role_id: id,
          crm_permission_id: element.crm_permission_id,
        });
      }
    });
    try {
      const { data } = await axios.post(
        `${hostname}/api/permission-group/create-many`,
        { createDto: formData }
      );
      if (data.status === "success") {
        callback();
        toast.success("สร้างสิทธิ์สำเร็จ");
        setPermission([]);
        setDisableButton(true);
        setOpen(false);
      }
    } catch (err) {
      alert(err);
    }
  };

  const handlerOpenButton = async () => {
    const result = await permission.filter((item) => item.approved === true);
    if (result.length !== 0) {
      setDisableButton(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        setDisableButton(true);
        setOpen(false);
      }}
      PaperProps={{
        sx: {
          borderRadius: "15px",
          boxShadow: 0,
        },
      }}
      fullWidth
    >
      <DialogTitle>
        <>{`เพิ่ม Perission`}</>
        <Typography variant="subtitle2" sx={{ color: "red" }}>
          * กรุณาตรวจสอบข้อมูลก่อนกดยืนยัน
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {permission?.length !== 0 ? (
            <Grid
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
              spacing={1.5}
            >
              <TableContainer
                component={Paper}
                sx={{
                  border: "1px solid #DCDCDC",
                  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
                }}
              >
                <Table
                  sx={{
                    minWidth: 400,
                    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
                  }}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <span style={{ fontSize: "15px" }}>เลือก</span>
                      </TableCell>
                      <TableCell align="left">
                        <span style={{ fontSize: "15px" }}>รายละเอียด</span>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {permission?.map((item, index) => (
                      <TableRow
                        key={item.crm_permission_id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" width={30} scope="row">
                          <Checkbox
                            color="info"
                            value={item.approved}
                            onClick={(e) => {
                              let item = [...permission];
                              item[index].approved = e.target.checked;
                              setPermission(item);
                              handlerOpenButton();
                            }}
                          />
                        </TableCell>
                        <TableCell align="left" width={200}>
                          {`${item.crm_permission_name} | ${item.crm_permission_display_name}`}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Button
                disabled={disableButton}
                sx={{ mt: 3, boxShadow: 0, borderRadius: "3px" }}
                size="small"
                variant="contained"
                color="success"
                onClick={addPermission}
              >
                <>เพิ่มสิทธิ์</>
              </Button>
            </Grid>
          ) : (
            <Grid
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
              spacing={1.5}
            >
              <Grid sx={{ textAlign: "center" }}>
                <img
                  src="/image/permission-have.svg"
                  alt="image-permission-have"
                  style={{ maxWidth: "250px", maxHeight: "220px" }}
                />
              </Grid>
              <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
                มีครบทุกสิทธิ์
              </Typography>
              <Button
                variant="contained"
                sx={{ mt: 3, boxShadow: 0 }}
                color="success"
                fullWidth
                onClose={() => {
                  setDisableButton(true);
                  setOpen(false);
                }}
              >
                ปิดหน้าต่าง
              </Button>
            </Grid>
          )}
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}

export default CreatePermissionDialog;
