import {
  AppBar,
  createTheme,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import "./App.scss";
import Home from "./components/Home";
import mumsDealsLogo from "./assets/mumsDealsLogo.svg";

const theme = createTheme({
  palette: {
    primary: {
      main: "#a284ad",
    },
    secondary: {
      main: "#7fb3b5",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <AppBar position="static" className="appbar">
          <Toolbar className="toolbar">
            <img src={mumsDealsLogo} className="logo" alt="Mums deals logo" />
          </Toolbar>
        </AppBar>
        <Home />
      </div>
    </ThemeProvider>
  );
}

export default App;
