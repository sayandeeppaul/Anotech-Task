import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Typography,
  Grid,
  useTheme,
  useMediaQuery,
  IconButton,
  Modal,
  Backdrop,
  Fade,
  Button,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { removeCompletedTask } from "../features/todo/todoSlice";

const CompletedTasks = () => {
  const completedTasks = useSelector((state) => state.todo.completedTasks);
  const dispatch = useDispatch();
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const paddingX = isSmallScreen ? 2 : 10;

  const handleDelete = (index) => {
    setDeleteIndex(index);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deleteIndex !== null) {
      dispatch(removeCompletedTask(deleteIndex));
      setDeleteIndex(null);
      setDeleteConfirmOpen(false);
    }
  };

  const handleCancelDelete = () => {
    setDeleteIndex(null);
    setDeleteConfirmOpen(false);
  };

  return (
    <Box
      px={paddingX}
      py={6}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      {completedTasks.length === 0 ? (
        <Typography
          variant="h5"
          align="center"
          color={
            theme.palette.mode === "dark" ? "text.primary" : "text.secondary"
          }
        >
          No Task Completed yet
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {completedTasks.map((task, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Box
                sx={{
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  padding: "10px",
                  marginBottom: "10px",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? "#333"
                      : theme.palette.background.paper,
                  color:
                    theme.palette.mode === "dark"
                      ? "#fff"
                      : theme.palette.text.primary,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="h6" component="h2">
                    {task.title}
                  </Typography>
                  <IconButton
                    onClick={() => handleDelete(index)}
                    sx={{
                      color: theme.palette.mode === "dark" ? "#fff" : "#000",
                    }}
                  >
                    <Delete />
                  </IconButton>
                </Box>
                <Typography color="textSecondary" gutterBottom>
                  {task.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}

      <Modal
        open={deleteConfirmOpen}
        onClose={handleCancelDelete}
        aria-labelledby="delete-confirm-modal-title"
        aria-describedby="delete-confirm-modal-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={deleteConfirmOpen}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor:
                theme.palette.mode === "dark"
                  ? "#333"
                  : theme.palette.background.paper,
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
              width: { xs: "80%", lg: 400 },
            }}
          >
            <Typography
              id="delete-confirm-modal-title"
              variant="h6"
              component="h2"
              sx={{ color: theme.palette.mode === "dark" ? "#fff" : "#000" }}
            >
              Are you sure you want to delete the task?
            </Typography>
            <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                color="error"
                onClick={handleConfirmDelete}
                sx={{
                  mr: 2,
                  backgroundColor:
                    theme.palette.mode === "dark" ? "#fff" : "#000",
                  color: theme.palette.mode === "dark" ? "#000" : "#fff",
                  "&:hover": {
                    backgroundColor:
                      theme.palette.mode === "dark" ? "#121212" : "#EFEFEF",
                    color: theme.palette.mode === "dark" ? "#fff" : "#000",
                  },
                }}
              >
                Yes
              </Button>
              <Button
                variant="contained"
                onClick={handleCancelDelete}
                sx={{
                  backgroundColor:
                    theme.palette.mode === "dark" ? "#fff" : "#000",
                  color: theme.palette.mode === "dark" ? "#000" : "#fff",
                  mr: 2,
                  "&:hover": {
                    backgroundColor:
                      theme.palette.mode === "dark" ? "#121212" : "#EFEFEF",
                    color: theme.palette.mode === "dark" ? "#fff" : "#000",
                  },
                }}
              >
                No
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default CompletedTasks;
