import { Checkbox, Modal, Row, Table, Typography } from "antd";
import axios from "axios";
import { hostname } from "../../hostname";
import { toast } from "react-toastify";

export default function ConfigComponent(props) {
  const handleClose = () => {
    props.setPermission([]);
    props.setOpen(false);
  };

  const handleCheck = async (id, value) => {
    let result = [];
    for (let i = 0; i < props.permission.length; i++) {
      let item = props.permission[i];
      let permission = { ...item };
      let index = await item.crm_permission_components.findIndex(
        (items) => items.crm_permission_component_id === id
      );
      if (index !== -1) {
        permission.crm_permission_components[index].have_permission = value;
      }
      await result.push(permission);
    }
    props.setPermission([...result]);
  };

  const handleSave = async () => {
    let request = [];
    for (let item of props.permission) {
      let filterPermission = await item.crm_permission_components.filter(
        (value) => value.have_permission === true
      );
      if (filterPermission.length !== 0) {
        for (let value of filterPermission) {
          await request.push({
            crm_role_id: props.role_id,
            crm_permission_id: item.crm_permission_id,
            crm_permission_component_id: value.crm_permission_component_id,
          });
        }
      }
    }
    try {
      const { data } = await axios.post(
        `${hostname}/api/permission-group/force-update/${props.role_id}`,
        {
          component_groups: request,
        }
      );
      if (data.status === "success") {
        toast.success("บันทึกสำเร็จ");
        props.setOpen(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal
      title={<Typography style={{ fontSize: "24px" }}>จัดการสิทธ์</Typography>}
      closable={false}
      open={props.open}
      onOk={handleSave}
      onCancel={handleClose}
      width={550}
      style={{ top: 0 }}
    >
      <Table
        dataSource={props.permission}
        size="small"
        pagination={false}
        columns={[
          {
            title: "หน้าต่าง",
            dataIndex: "crm_permission_display_name",
            key: "crm_permission_display_name",
            render: (value) => {
              return <div style={{ fontSize: "14px" }}>{value}</div>;
            },
          },
          {
            title: "สิทธ์การใช้งาน",
            dataIndex: "crm_permission_components",
            key: "crm_permission_components",
            align: "left",
            render: (value, record) => {
              return (
                <>
                  {value.length !== 0 &&
                    value.map((items) => {
                      return (
                        <Row key={items.crm_permission_component_name}>
                          <Checkbox
                            checked={items.have_permission}
                            onChange={(e) =>
                              handleCheck(
                                items.crm_permission_component_id,
                                e.target.checked
                              )
                            }
                          >
                            <span style={{ fontSize: "13px" }}>
                              {items.crm_permission_component_description}
                            </span>
                          </Checkbox>
                        </Row>
                      );
                    })}
                </>
              );
            },
          },
        ]}
      />
    </Modal>
  );
}
