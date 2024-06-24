import { Button, Grid, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import MUIDataTable from "mui-datatables";
import { useState, useEffect } from "react";
import axios from "axios";
import { hostname } from "../../hostname";
import InfoIcon from "@mui/icons-material/Info";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import EditRoleDialog from "../../components/role/edit-role-dialog";
import ComponentInit from "../../utils/component-init";
import ConfigComponent from "../../components/role/config-component";

function RolePermission() {
  const [roles, setRoles] = useState([]);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [emitEditDialog, setEmitEditDialog] = useState({});
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [configRole, setConfigRole] = useState("");
  const [permission, setPermission] = useState([]);
  const [openPermission, setOpenPermission] = useState(false);

  const getRoles = async () => {
    try {
      setRoles([]);
      const { data } = await axios.get(`${hostname}/api/role/get-all`);
      if (data.status === "success") {
        let result = [];
        for (let item of data.result) {
          let htmlElement = ``;
          if (item.crm_permission_group.length !== 0) {
            for (let value of item.crm_permission_group) {
              if (value.activate === true) {
                htmlElement =
                  htmlElement +
                  `<li>${value.crm_permission_components.crm_permission_component_description}</li>`;
              }
            }
          } else {
            <></>;
          }
          await result.push({ ...item, htmlPermission: htmlElement });
        }
        setRoles(result);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const configPermission = async (role_id) => {
    try {
      const response = await axios.get(
        `${hostname}/api/permission/components/by-role/${role_id}`
      );
      const { data } = await axios.get(
        `${hostname}/api/permission/get-all/with-components`
      );
      if (data.status === "success") {
        let permissionResult = [];
        for (let i = 0; i < data.result.length; i++) {
          let item = data.result[i];
          let subResult = [];
          for (let j = 0; j < item.crm_permission_components.length; j++) {
            let component = item.crm_permission_components[j];
            let resultComponent = { ...component, have_permission: false };
            if (response.data.result.length !== 0) {
              for (let component_id of response.data.result) {
                if (
                  component_id.crm_permission_component_id ===
                  component.crm_permission_component_id
                ) {
                  resultComponent = { ...component, have_permission: true };
                }
              }
            }
            await subResult.push({ ...resultComponent });
          }
          await permissionResult.push({
            ...item,
            crm_permission_components: subResult,
          });
        }
        setConfigRole(role_id);
        setPermission(permissionResult);
        setOpenPermission(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const editHandler = async (data) => {
    setEmitEditDialog(data);
    setOpenEditDialog(true);
  };

  useEffect(() => {
    getRoles();
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
            <Button
              color="success"
              sx={{ boxShadow: 0 }}
              variant="contained"
              size="small"
            >
              <AddIcon fontSize="small" />
              <>{`เพิ่มสิทธิ์`}</>
            </Button>
          </Grid>
        </Stack>
        <Stack sx={{ mt: 2 }}>
          <MUIDataTable
            title={
              <Typography variant="h6">
                <>แสดงบทบาททั้งหมด (Role)</>
              </Typography>
            }
            data={roles}
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
                name: "crm_role_name",
                label: "ชื่อ",
                options: {
                  customBodyRender: (value) => <>{value}</>,
                },
              },
              {
                name: "crm_role_display_name",
                label: "ชื่อที่แสดงผล (Display)",
                options: {
                  customBodyRender: (value) => <>{value}</>,
                },
              },
              {
                name: "crm_role_description",
                label: "รายละเอียด",
                options: {
                  index: 5,
                },
              },
              {
                name: "",
                label: "",
                options: {
                  sort: false,
                  filter: false,
                  index: 0,
                  customBodyRenderLite: (index) => {
                    let element = roles[index];
                    return (
                      <Stack
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          flexDirection: "row",
                        }}
                      >
                        <ComponentInit
                          children={
                            <Button
                              color="primaryCustom"
                              sx={{
                                boxShadow: 0,
                                borderRadius: "3px",
                                mx: 1,
                              }}
                              variant="contained"
                              size="small"
                              onClick={() =>
                                configPermission(element.crm_role_id)
                              }
                            >
                              <InfoIcon fontSize="small" />
                              <>จัดการสิทธิ์</>
                            </Button>
                          }
                          component_key="role-detail-component"
                        />
                        <ComponentInit
                          children={
                            <Button
                              color="warning"
                              sx={{ boxShadow: 0, borderRadius: "3px" }}
                              variant="contained"
                              size="small"
                              onClick={() => editHandler(element)}
                            >
                              <DesignServicesIcon fontSize="small" />
                              <>แก้ไขสิทธิ์เข้าใช้งาน</>
                            </Button>
                          }
                          component_key="role-edit-component"
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
      <ConfigComponent
        open={openPermission}
        setOpen={setOpenPermission}
        role_id={configRole}
        permission={permission}
        setPermission={setPermission}
      />
      <EditRoleDialog
        open={openEditDialog}
        setOpen={setOpenEditDialog}
        emit={emitEditDialog}
        setEmit={setEmitEditDialog}
        callback={getRoles}
      />
    </Grid>
  );
}

export default RolePermission;
