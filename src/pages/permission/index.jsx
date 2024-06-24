import { Button, Grid, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MUIDataTable from "mui-datatables";
import { useState, useEffect } from "react";
import axios from "axios";
import { hostname } from "../../hostname";
import DeleteIcon from "@mui/icons-material/Delete";
import CreatePermissionDialog from "../../components/permission/create-permission-dialog";
import DeletePermissionDialog from "../../components/permission/delete-permission-dialog";
import { Settings } from "@mui/icons-material";
import PermissionComponent from "../../components/permission/permission-component";
import ComponentInit from "../../utils/component-init";

function Permission() {
  const [permissions, setPermissions] = useState([]);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [deleteData, setDeleteData] = useState({});
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [component, setComponent] = useState([]);
  const [selectComponentData, setSelectComponentData] = useState({});
  const [openConfigComponent, setOpenConfigComponent] = useState(false);

  const getPermission = async () => {
    try {
      setPermissions([]);
      const { data } = await axios.get(`${hostname}/api/permission/get-all`);
      if (data.status === "success") {
        setPermissions(data.result);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getComponent = async (element) => {
    setSelectComponentData(element);
    try {
      const { data } = await axios.get(
        `${hostname}/api/permission-component/get-by-permission/${element.crm_permission_id}`
      );
      if (data.status === "success") {
        setComponent(data.result);
        setOpenConfigComponent(true);
      }
    } catch (err) {
      alert(err);
    }
  };

  const deleteHandler = async (element) => {
    setDeleteData(element);
    setOpenDeleteDialog(true);
  };

  useEffect(() => {
    getPermission();
  }, []);
  return (
    <Grid container sx={{ mt: -2 }}>
      <Grid item xs={12} md={12}>
        <Stack sx={{ display: "flex", flexDirection: "row" }}>
          <Grid item xs={8} />
          <Grid
            item
            xs={4}
            sx={{
              flexDirection: "column",
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            <ComponentInit
              children={
                <Button
                  color="success"
                  sx={{ boxShadow: 0, borderRadius: "3px" }}
                  size="small"
                  variant="contained"
                  onClick={() => setOpenCreateDialog(true)}
                >
                  <AddIcon fontSize="small" />
                  <>{`เพิ่มสิทธิ์การใช้งาน`}</>
                </Button>
              }
              component_key="create-permission-component"
            />
          </Grid>
        </Stack>
        <Stack sx={{ mt: 2 }}>
          <MUIDataTable
            title={<Typography variant="h6"><>แสดงสิทธิ์การใช้งานทั้งหมด (Permission)</></Typography>}
            data={permissions}
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
                name: "crm_permission_name",
                label: "ชื่อ",
                options: {
                  customBodyRender: value => <>{value}</>
                }
              },
              {
                name: "crm_permission_display_name",
                label: "ชื่อที่แสดงผล (Display)",
              },
              {
                name: "crm_permission_description",
                label: "รายละเอียด",
              },
              {
                name: "",
                label: "",
                options: {
                  sort: false,
                  filter: false,
                  customBodyRenderLite: (index) => {
                    let element = permissions[index];
                    return (
                      <Stack
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          flexDirection: { md: "row", xs: "column" },
                        }}
                      >
                        <ComponentInit
                          children={
                            <Button
                              color="primaryCustom"
                              sx={{
                                boxShadow: 0,
                                borderRadius: "3px",
                                height: "30px",
                                mr: { md: 1, xs: 0 },
                                mb: { md: 0, xs: 1 },
                              }}
                              variant="contained"
                              size="small"
                              onClick={() => getComponent(element)}
                            >
                              <Settings fontSize="small" />
                              <>จัดการฟังก์ชัน</>
                            </Button>
                          }
                          component_key="config-permission-component"
                        />
                        <ComponentInit
                          children={
                            <Button
                              color="danger"
                              sx={{ boxShadow: 0, borderRadius: "3px", height: "30px" }}
                              variant="contained"
                              size="small"
                              onClick={() => deleteHandler(element)}
                            >
                              <DeleteIcon fontSize="small" />
                              <>ลบสิทธิ์</>
                            </Button>
                          }
                          component_key="delete-permission-component"
                        />
                      </Stack>
                    );
                  },
                },
              },
            ]}
          />
        </Stack>
      </Grid>
      <CreatePermissionDialog
        open={openCreateDialog}
        setOpen={setOpenCreateDialog}
        callback={getPermission}
      />
      <PermissionComponent
        open={openConfigComponent}
        setOpen={setOpenConfigComponent}
        component={component}
        setComponent={setComponent}
        permission={selectComponentData}
      />
      <DeletePermissionDialog
        open={openDeleteDialog}
        setOpen={setOpenDeleteDialog}
        emit={deleteData}
        callback={getPermission}
      />
    </Grid>
  );
}

export default Permission;
