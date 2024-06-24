import store from "../redux/store";

const ComponentDisabled = async (component_key) => {
  let component = await store?.getState().component;
  let role = await store?.getState().role;
  let filter = await component.filter((item) => item === component_key);
  if (filter.length !== 0 || role.crm_role_name === "SU") {
    return false;
  } else {
    return true;
  }
};

export { ComponentDisabled };
