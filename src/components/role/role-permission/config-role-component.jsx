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

function ConfigRoleComponent({ open, setOpen, component, setComponent }) {
  const updateConfig = async () => {
    let formData = [];
    await component.forEach((element) => {
      formData.push({
        crm_permission_group_id: element.crm_permission_group_id,
        activate: element.activate,
      });
    });
    try {
      const { data } = await axios.put(
        `${hostname}/api/permission-group/activate-config`,
        { activate: formData }
      );
      if (data.status === "success") {
        setOpen(false);
        toast.success("สำเร็จ");
        setComponent([]);
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={() => {
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
          <Typography variant="h6">
            <>{`เพิ่ม Perission`}</>
          </Typography>
          <Typography sx={{ color: "red", fontSize: "12px" }}>
            * กรุณาตรวจสอบข้อมูลก่อนกดยืนยัน
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
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
                  border: "1px solid #dcdcdc",
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
                    {component?.length !== 0 &&
                      component?.map((item, index) => (
                        <TableRow
                          key={index}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" width={30} scope="row">
                            <Checkbox
                              color="info"
                              checked={item.activate}
                              onClick={(e) => {
                                let items = [...component];
                                items[index].activate = e.target.checked;

                                setComponent(items);
                              }}
                            />
                          </TableCell>
                          <TableCell align="left" width={200}>
                            {`${item.crm_permission_components.crm_permission_component_name} | ${item.crm_permission_components.crm_permission_component_display_name}`}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Button
                sx={{ mt: 1.5, boxShadow: 0, borderRadius: "3px" }}
                variant="contained"
                color="success"
                size="small"
                onClick={updateConfig}
              >
                <>บันทึก</>
              </Button>
            </Grid>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ConfigRoleComponent;
