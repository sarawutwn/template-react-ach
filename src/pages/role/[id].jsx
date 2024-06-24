import {
  Box,
  Breadcrumbs,
  Button,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { hostname } from "../../hostname";
import AddIcon from "@mui/icons-material/Add";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import MUIDataTable from "mui-datatables";
import DeleteIcon from "@mui/icons-material/Delete";
import CreatePermissionDialog from "../../components/role/role-permission/create-permission-dialog";
import ConfigRoleComponent from "../../components/role/role-permission/config-role-component";
import DeletePermission from "../../components/role/role-permission/delete-permission";

function RoleDetail() {
  const [role, setRole] = useState({});
  const [createPermission, setCreatePermission] = useState([]);
  const [permission, setPermission] = useState([]);
  const [component, setComponent] = useState([]);
  const [openConfigComponent, setOpenConfigComponent] = useState(false);
  const [openCreatePermission, setOpenCreatePermission] = useState(false);
  const [deleteData, setDeleteData] = useState({});
  const [openDeletePermission, setOpenDeletePermission] = useState(false);
  const { id } = useParams();

  const getPermissionByRoleId = async () => {
    try {
      const { data } = await axios.get(
        `${hostname}/api/permission-group/get-permission/by-role/${id}`
      );
      if (data.status === "success") {
        setPermission(data.result);
        setRole(data.roleData);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getCreatePermission = async () => {
    try {
      const { data } = await axios.get(
        `${hostname}/api/permission/get-by-not/role/${id}`
      );
      if (data.status === "success") {
        setCreatePermission(data.result);
        setOpenCreatePermission(true);
      }
    } catch (err) {
      alert(err);
    }
  };

  const getComponent = async (permissionId) => {
    try {
      const { data } = await axios.get(
        `${hostname}/api/permission-group/get-component/role/${id}/permission/${permissionId}`
      );
      if (data.status === "success") {
        setComponent(data.result);
        setOpenConfigComponent(true);
      }
    } catch (err) {
      alert(err);
    }
  };

  const deletePermissionHandler = async (element) => {
    setDeleteData(element);
    setOpenDeletePermission(true);
  };

  useEffect(() => {
    getPermissionByRoleId();
  }, []);
  return (
    <>
      <Box sm={{ display: "flex", flexDirection: "row", alignItems: "start" }}>
        <Breadcrumbs separator="›" aria-label="breadcrumb">
          <Link to="/role" style={{ textDecoration: "none" }}>
            <Typography variant="subtitle2" sx={{ color: "#043478" }}>
              จัดการสิทธิ์เริ่มต้น
            </Typography>
          </Link>
          <Typography
            variant="subtitle2"
            sx={{ color: "grey", textDecoration: "none" }}
          >{`จัดการสิทธิ์ ${role.crm_role_display_name}`}</Typography>
        </Breadcrumbs>
      </Box>
      <Grid container>
        <Grid item xs={12} md={12}>
          <Stack sx={{ display: "flex", flexDirection: "row" }}>
            <Grid item xs={8}>
              <Typography variant="h6" sx={{}}>
                รายละเอียดสิทธิ์ของ {`${role.crm_role_display_name}`}
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{ color: "#888888" }}
              >{`การตั้งค่า(permission)`}</Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                flexDirection: "column",
                display: "flex",
                alignItems: "flex-end",
              }}
            >
              <Button
                color="info"
                sx={{ boxShadow: 0 }}
                variant="contained"
                size="small"
                onClick={() => getCreatePermission()}
              >
                <AddIcon fontSize="small" />
                <>{`เพิ่มสิทธิ์ ${role.crm_role_name}`}</>
              </Button>
            </Grid>
          </Stack>
          <Stack sx={{ mt: 2 }}>
            <MUIDataTable
              // title={`permission ของ ${role.crm_role_display_name}`}
              data={permission}
              options={{
                viewColumns: false,
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
                  name: "crm_permissions",
                  label: "ชื่อ",
                  options: {
                    sort: true,
                    filter: true,
                    customBodyRender: (value) => {
                      return <>{`${value?.crm_permission_name}`}</>;
                    },
                  },
                },
                {
                  name: "crm_permissions",
                  label: "ชื่อที่แสดงผล (Display)",
                  options: {
                    sort: true,
                    filter: true,
                    customBodyRender: (value) => {
                      return <>{`${value?.crm_permission_display_name}`}</>;
                    },
                  },
                },
                {
                  name: "crm_permissions",
                  label: "รายละเอียด",
                  options: {
                    sort: true,
                    filter: true,
                    customBodyRender: (value) => {
                      return (
                        <span
                          style={{ color: "gray" }}
                        >{`${value?.crm_permission_description}`}</span>
                      );
                    },
                  },
                },
                {
                  name: "",
                  label: "",
                  options: {
                    sort: false,
                    filter: false,
                    customBodyRenderLite: (index) => {
                      let element = permission[index];
                      return (
                        <Stack
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: { md: "row", sx: "column" },
                          }}
                        >
                          <Button
                            color="warning"
                            sx={{
                              boxShadow: 0,
                              borderRadius: "3px",
                              mr: { md: 1, xs: 0 },
                            }}
                            variant="contained"
                            size="small"
                            onClick={() =>
                              getComponent(element.crm_permission_id)
                            }
                          >
                            <ManageAccountsIcon
                              fontSize="small"
                              sx={{ marginTop: "-2px" }}
                            />
                            <>จัดการส่วนที่ใช้งาน</>
                          </Button>
                          <Button
                            color="danger"
                            sx={{
                              boxShadow: 0,
                              borderRadius: "3px",
                              mt: { md: 0, xs: 1 },
                            }}
                            variant="contained"
                            size="small"
                            onClick={() => deletePermissionHandler(element)}
                          >
                            <DeleteIcon fontSize="small" />
                            <>ลบสิทธิ์</>
                          </Button>
                        </Stack>
                      );
                    },
                  },
                },
              ]}
            />
          </Stack>
          <CreatePermissionDialog
            open={openCreatePermission}
            setOpen={setOpenCreatePermission}
            permission={createPermission}
            setPermission={setCreatePermission}
            id={id}
            callback={getPermissionByRoleId}
          />
          <ConfigRoleComponent
            open={openConfigComponent}
            setOpen={setOpenConfigComponent}
            id={id}
            component={component}
            setComponent={setComponent}
          />
          <DeletePermission
            open={openDeletePermission}
            setOpen={setOpenDeletePermission}
            callback={getPermissionByRoleId}
            role={role}
            permission={deleteData}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default RoleDetail;
