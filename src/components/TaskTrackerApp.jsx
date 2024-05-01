import React, { useEffect, useState } from "react";
import { Tabs, Tab, Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import CompletedTask from "./CompletedTask";
import { useSelector } from "react-redux";

const TaskTrackerApp = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const todos = useSelector((state) => state.todo.todos);
  const completedTasks = useSelector((state) => state.todo.completedTasks);
  const [todosCount, setTodosCount] = useState(0);
  const [completedTasksCount, setCompletedTasksCount] = useState(0);

  useEffect(() => {
    setTodosCount(todos.length);
  }, [todos]);

  useEffect(() => {
    setCompletedTasksCount(completedTasks.length);
  }, [completedTasks]);

  const bgColor = theme.palette.mode === "dark" ? "#efefef" : "#000";
  const textColor = theme.palette.mode === "dark" ? "#000" : "#efefef";

  const remainingHeight = `calc(100vh - 9vh - 5vh)`;

  return (
    <Box
      sx={{ width: "100%", backgroundColor: theme.palette.background.paper }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        centered={!isSmallScreen}
        variant={isSmallScreen ? "scrollable" : "standard"}
        sx={{ backgroundColor: theme.palette.background.paper, height: "5vh" }}
      >
        <Tab label="Create Task" />
        <Tab
          label={
            <span>
              View Task
              <span
                style={{
                  marginLeft: "5px",
                  backgroundColor: bgColor,
                  color: textColor,
                  padding: "2px 7px",
                  fontSize: "0.8rem",
                  borderRadius: "50%",
                }}
              >
                {todosCount}
              </span>
            </span>
          }
        />
        <Tab
          label={
            <span>
              Completed Tasks
              <span
                style={{
                  marginLeft: "5px",
                  backgroundColor: bgColor,
                  color: textColor,
                  padding: "2px 7px",
                  fontSize: "0.8rem",
                  borderRadius: "50%",
                }}
              >
                {completedTasksCount}
              </span>
            </span>
          }
        />
      </Tabs>
      <Box sx={{ minHeight: remainingHeight }}>
        {value === 0 && <TaskForm />}
        {value === 1 && <TaskList />}
        {value === 2 && <CompletedTask />}
      </Box>
    </Box>
  );
};

export default TaskTrackerApp;
