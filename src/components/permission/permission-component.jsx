import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import MUIDataTable from "mui-datatables";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import axios from "axios";
import { hostname } from "../../hostname";
import { toast } from "react-toastify";
import { Input, Modal } from "antd";

function PermissionComponent({
  open,
  setOpen,
  component,
  setComponent,
  permission,
}) {
  const [createData, setCreateData] = useState({});
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteData, setDeleteData] = useState({});

  const refreshTable = async () => {
    try {
      const { data } = await axios.get(
        `${hostname}/api/permission-component/get-by-permission/${permission.crm_permission_id}`
      );
      if (data.status === "success") {
        setComponent(data.result);
      }
    } catch (err) {
      alert(err);
    }
  };

  const createHandler = async () => {
    try {
      const { data } = await axios.post(
        `${hostname}/api/permission-component/create/${permission.crm_permission_id}`,
        createData
      );
      if (data.status === "success") {
        refreshTable();
        setCreateData({});
        toast.success("สร้างฟังก์ชันสำเร็จ");
      }
    } catch (err) {
      alert(err);
    }
  };

  const deleteHanlder = async () => {
    try {
      const { data } = await axios.delete(
        `${hostname}/api/permission-component/destroy/${deleteData.crm_permission_component_id}`
      );
      if (data.status === "success") {
        refreshTable();
        toast.success("ลบฟังก์ชันสำเร็จ");
        setOpenDelete(false);
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Modal
      title={
        <Typography variant="h5">จัดการฟังก์ชันการใช้งานของสิทธิ์</Typography>
      }
      open={open}
      onCancel={() => setOpen(false)}
      width={900}
    >
      <Stack direction="column" sx={{ mt: 1 }} spacing={1}>
        <Typography variant="h6">เพิ่มฟังก์ชันของสิทธิ์</Typography>
        <Input
          addonBefore="ชื่อ"
          onChange={(e) =>
            setCreateData({
              ...createData,
              ["crm_permission_component_name"]: e.target.value,
            })
          }
        />
        <Input
          addonBefore="ชื่อที่แสดงผล"
          onChange={(e) =>
            setCreateData({
              ...createData,
              ["crm_permission_component_display_name"]: e.target.value,
            })
          }
        />
        <Typography variant="subtitle2" sx={{ mt: -1, mb: -1}}>รายละเอียด</Typography>
        <Input.TextArea
          onChange={(e) =>
            setCreateData({
              ...createData,
              ["crm_permission_component_description"]: e.target.value,
            })
          }
        />
        <Button
          sx={{ boxShadow: 0, borderRadius: "3px", mt: 1 }}
          variant="contained"
          color="success"
          disabled={
            createData?.crm_permission_component_name === undefined ||
            createData?.crm_permission_component_display_name === undefined ||
            createData?.crm_permission_component_description === undefined ||
            createData?.crm_permission_component_name === "" ||
            createData?.crm_permission_component_display_name === "" ||
            createData?.crm_permission_component_description === ""
          }
          size="small"
          onClick={createHandler}
        >
          สร้างฟังก์ชัน
        </Button>
        <MUIDataTable
          title={`แสดงฟังก์ชันทั้งหมด`}
          data={component}
          options={{
            viewColumns: false,
            alignItems: "center",
            filter: true,
            print: false,
            download: false,
            selectableRows: false,
            rowsPerPage: 10,
            rowsPerPageOptions: [5, 10, 15, 20],
            textLabels: {
              body: {
                noMatch: "ไม่พบข้อมูล",
              },
            },
          }}
          columns={[
            {
              name: "crm_permission_component_name",
              label: "ชื่อฟังก์ชัน",
            },
            {
              name: "crm_permission_component_display_name",
              label: "ชื่อที่แสดงผล (display)",
            },
            {
              name: "crm_permission_component_description",
              label: "รายละเอียด",
            },
            {
              name: "",
              label: "",
              options: {
                customBodyRenderLite: (index) => {
                  let element = component[index];
                  return (
                    <Stack
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: { md: "row", xs: "column" },
                      }}
                    >
                      <Button
                        color="danger"
                        sx={{ boxShadow: 0, borderRadius: "3px" }}
                        variant="contained"
                        size="small"
                        onClick={() => {
                          setDeleteData(element);
                          setOpenDelete(true);
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                        ลบสิทธิ์
                      </Button>
                    </Stack>
                  );
                },
              },
            },
          ]}
        />
      </Stack>
      <Dialog
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        PaperProps={{
          sx: {
            borderRadius: "15px",
            boxShadow: 0,
          },
        }}
        maxWidth="sm"
      >
        <DialogTitle>ต้องการลบรายการนี้</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography>
              คุณแน่ใจหรือไม่ว่าต้องการลบ{" "}
              {deleteData?.crm_permission_component_name} ?
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ mr: "15px", mb: "15px", mt: "8px" }}>
          <Button onClick={() => setOpenDelete(false)} color="inherit">
            ยกเลิก
          </Button>
          <Button color="danger" variant="contained" onClick={deleteHanlder}>
            ตกลง
          </Button>
        </DialogActions>
      </Dialog>
    </Modal>
  );
}

export default PermissionComponent;
