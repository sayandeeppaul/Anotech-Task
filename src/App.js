import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import NavBar from "./components/NavBar";
import TaskTrackerApp from "./components/TaskTrackerApp";
import { Provider } from "react-redux";
import store from "./store/configureStore";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#fff",
    },
    text: {
      primary: "#000",
    },
  },
  typography: {
    fontFamily: "Poppins, Arial, sans-serif",
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#000",
    },
    text: {
      primary: "#fff",
    },
  },
  typography: {
    fontFamily: "Poppins, Arial, sans-serif",
  },
});

const App = () => {
  const [theme, setTheme] = useState(lightTheme);

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === lightTheme ? darkTheme : lightTheme
    );
  };

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <div>
          <NavBar toggleTheme={toggleTheme} />
          <TaskTrackerApp />
        </div>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
