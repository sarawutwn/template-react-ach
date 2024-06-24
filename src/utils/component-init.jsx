import { useState } from "react";
import { useEffect } from "react";
import store from "../redux/store";

function ComponentInit({ children, component_key }) {
    const [activate, setActivate] = useState(false);
    
    let component = store?.getState().component;
    let role = store?.getState().role;

    const checkComponent = async () => {
        let filter = await component.filter((item) => item === component_key);
        if (filter.length !== 0 ) {
            setActivate(true);
        }
    }

    useEffect(() => {
        if(role.crm_role_name === "SU") {
            setActivate(true);
        }else {
            checkComponent();
        }
    }, []);

    if(activate) {
        return <>{children}</>
    }else {
        return <></>
    }
}
export default ComponentInit;