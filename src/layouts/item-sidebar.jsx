import {
  List,
  ListItem,
  ListItemIcon,
  Typography,
  Collapse,
} from "@mui/material";
import * as React from "react";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import LockIcon from "@mui/icons-material/Lock";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";
import store from "../redux/store";
import "../animations/icon-rotate.css";

function ItemSidebar({ openSidebar, openPermission, setOpenPermission }) {
  const hintStyling = (page) => {
    const hilightMenu =
      store.getState().page === page
        ? { borderLeft: "5px solid #416393", background: "rgb(4 20 52 / 5%)" }
        : {};
    return hilightMenu;
  };

  return (
    <List
      sx={{
        mt: -1.1,
      }}
    >
      <ListItem
        className="icon-animation"
        sx={hintStyling("home")}
        button
        component={Link}
        to="/home"
      >
        <ListItemIcon>
          <HomeIcon
            className="icon-animated"
            color="primary"
            titleAccess="หน้าหลัก"
          />
        </ListItemIcon>
        <ListItemText
          sx={{ ml: -2, my: -1 }}
          primary={
            <Typography sx={{ mt: 0.5 }} variant="subtitle2">
              หน้าหลัก
            </Typography>
          }
        />
      </ListItem>

      <React.Fragment>
        <ListItem
          className="icon-animation"
          button
          style={hintStyling("permission")}
          onClick={() => {
            openSidebar();
            setOpenPermission(!openPermission);
          }}
        >
          <ListItemIcon>
            <VerifiedUserIcon
              className="icon-animated"
              color="primary"
              titleAccess="จัดการสิทธิ์"
            />
          </ListItemIcon>
          <ListItemText
            sx={{ ml: -2, my: -1 }}
            primary={
              <Typography sx={{ mt: 0.5 }} variant="subtitle2">
                จัดการสิทธิ์
              </Typography>
            }
          />
          {openPermission ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItem>
        <Collapse in={openPermission} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button component={Link} to="/permission/role-setting">
              <ListItemIcon></ListItemIcon>
              <ListItemText
                sx={{ ml: -1, my: -0.5 }}
                primary={
                  <Typography sx={{ mt: 0.5 }} variant="subtitle2">
                    จัดการบทบาท
                  </Typography>
                }
              />
            </ListItem>

            <ListItem
              button
              component={Link}
              to="/permission/permission-setting"
            >
              <ListItemIcon></ListItemIcon>
              <ListItemText
                sx={{ ml: -1, my: -0.5 }}
                primary={
                  <Typography sx={{ mt: 0.5 }} variant="subtitle2">
                    จัดการสิทธิ์การใช้งาน
                  </Typography>
                }
              />
            </ListItem>
          </List>
        </Collapse>
      </React.Fragment>

      <ListItem
        className="icon-animation"
        button
        style={hintStyling("password")}
        component={Link}
        to="/password"
      >
        <ListItemIcon>
          <LockIcon
            className="icon-animated"
            color="primary"
            titleAccess="เปลี่ยนรหัสผ่าน"
          />
        </ListItemIcon>
        <ListItemText
          sx={{ ml: -2, my: -1 }}
          primary={
            <Typography sx={{ mt: 0.5 }} variant="subtitle2">
              เปลี่ยนรหัสผ่าน
            </Typography>
          }
        />
      </ListItem>
    </List>
  );
}

export default ItemSidebar;
