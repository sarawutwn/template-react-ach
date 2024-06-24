import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Outlet } from "react-router-dom";
import ItemSidebar from "./item-sidebar";
import { Stack } from "@mui/material";

const drawerWidth = 220;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(0)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(7)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Layout() {
  const theme = useTheme();

  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpenLinePage(false);
    setOpenPointRewardPage(false);
    setOpenPermissionSidebar(false);
    setOpenCustomerSidebar(false);
    setOpenUserSidebar(false);
    setOpenReport(false);
    setOpen(!open);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const onLogOut = async () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      sx={{ boxShadow: 0 }}
    >
      <MenuItem onClick={onLogOut}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <LogoutIcon />
        </IconButton>
        <p style={{ marginTop: "10px" }}>ออกจากระบบ</p>
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={onLogOut}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <LogoutIcon />
        </IconButton>
        <p>ออกจากระบบ</p>
      </MenuItem>
    </Menu>
  );

  const [dateState, setDateState] = React.useState(new Date());
  const [topScreen, setTopScreen] = React.useState(0);
  const [openPermissionSidebar, setOpenPermissionSidebar] =
    React.useState(false);
  const [openCustomerSidebar, setOpenCustomerSidebar] = React.useState(false);
  const [openUserSidebar, setOpenUserSidebar] = React.useState(false);
  const [openLinePage, setOpenLinePage] = React.useState(false);
  const [openPointRewardPage, setOpenPointRewardPage] = React.useState(false);
  const [openReport, setOpenReport] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = (event) => {
      setTopScreen(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    setInterval(() => setDateState(new Date()), 1000);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        sx={{
          backgroundColor:
            topScreen <= 15
              ? "rgb(255,255,255, 0)"
              : "rgba(255, 255, 255, 0.5)",
          backdropFilter: topScreen <= 15 ? "blur(0px)" : "blur(2px)",
          transition: "all .2s ease",
          boxShadow: topScreen <= 20 ? 0 : "0",
          zIndex: "101 !important",
        }}
        position="fixed"
        open={open}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              ml: -2,
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon sx={{ color: "#416393" }} />
          </IconButton>
          <Stack direction="column" sx={{ ml: { xs: -4, md: 0 } }}>
            <Typography sx={{ fontWeight: "500" }} noWrap component="div">
              <>CRM APPLICATION</>
              <br />
            </Typography>
            <span style={{ fontSize: "12px", marginTop: -5 }}>
              ระบบจัดการคะแนนผู้ใช้
            </span>
          </Stack>
          <Box sx={{ flexGrow: 1 }} />
          <Typography
            sx={{ fontWeight: "500", display: { xs: "none", md: "inline" } }}
            noWrap
            component="div"
          >
            <>
              {`${dateState.toLocaleDateString("th-TH", {
                weekday: "long",
                day: "numeric",
                month: "short",
                year: "numeric",
              })}-
            ${dateState.toLocaleString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
              second: "numeric",
            })}`}
            </>
          </Typography>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon sx={{ color: "" }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <img
            src="/logo-acg.png"
            style={{ width: "99px", height: "40px", marginRight: "50px" }}
          />
          <IconButton sx={{ ml: 2 }} onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon sx={{ color: "" }} />
            ) : (
              <MenuIcon sx={{ color: "" }} />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <ItemSidebar
          openSidebar={handleDrawerOpen}
          openPermission={openPermissionSidebar}
          setOpenPermission={setOpenPermissionSidebar}
        />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: { xs: 1, md: 3 } }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
}
