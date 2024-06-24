import { configureStore } from "@reduxjs/toolkit";
import permission from "../reducers/permission";
import component from "../reducers/component";
import role from "../reducers/role";
import page from "../reducers/page";

const store = configureStore({
    reducer: { permission: permission, component: component, role: role, page }
});

export default store;