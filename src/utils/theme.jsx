import { createTheme } from "@mui/material/styles";

const Theme = createTheme({
  palette: {
    primary: {
      main: "#043478",
      light: "#10254a",
      text: "#343A40",
    },
    primaryCustom: {
      main: "#23c6c8",
      dark: "#1FB2B4",
      contrastText: "#fff",
    },
    info: {
      main: "#1C84C6",
      dark: "#416393",
      contrastText: "#fff",
    },
    success: {
      main: "#6fbf73",
      dark: "#3e8e46",
      contrastText: "#fff",
    },
    warning: {
      main: "#f8AC59",
      dark: "#ffa000",
      contrastText: "#fff",
    },
    danger: {
      main: "#ED5565",
      dark: "#D54C5A",
      contrastText: "#fff",
    },
  },
  typography: {
    fontFamily: "Kanit, sans-serif",
    allVariants: {
      color: "#343A40",
    },
  },
});

export default Theme;
