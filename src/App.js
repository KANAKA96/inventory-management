import React, { useState } from "react";
import Switch from "@mui/material/Switch";
import { ThemeProvider } from "@mui/material/styles";
import LogoutIcon from "@mui/icons-material/Logout";
import darkTheme from "./utils/darkTheme";
import "./index.css";
import Body from "./components/Body";

const App = () => {
  const [checked, setChecked] = useState(false);
  const handleChange = () => {
    setChecked((prev) => !prev);
  };
  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <div className="flex items-center justify-end">
          <div className="text-white text-lg">Admin</div>
          <Switch
            checked={checked}
            onChange={handleChange}
            sx={{ color: "white" }}
          />
          <div className="text-white text-lg">User</div>
          <LogoutIcon sx={{ color: "white" }} className="mr-5 ml-[30px]" />
        </div>
      </ThemeProvider>
      <Body toggleState={checked} />
    </div>
  );
};

export default App;
