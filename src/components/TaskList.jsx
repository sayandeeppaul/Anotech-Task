import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Modal,
  Backdrop,
  Fade,
  Grid,
  TextField,
  Select,
  MenuItem,
  useTheme,
  // useMediaQuery,
} from "@mui/material";
import { Delete, Edit, Done } from "@mui/icons-material";
import {
  removeTodo,
  updateTodo,
  addCompletedTask,
} from "../features/todo/todoSlice";

const TaskList = () => {
  const todos = useSelector((state) => state.todo.todos);
  const dispatch = useDispatch();
  const theme = useTheme();
  // const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [deleteIndex, setDeleteIndex] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deleteSuccessOpen, setDeleteSuccessOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editPriority, setEditPriority] = useState("Low");
  const [completedIndex, setCompletedIndex] = useState(null);
  const [completedConfirmOpen, setCompletedConfirmOpen] = useState(false);
  const [filterPriority, setFilterPriority] = useState("All");
  const [sortOrder, setSortOrder] = useState("Recent");

  const handleDelete = (index) => {
    setDeleteIndex(index);
    setDeleteConfirmOpen(true);
  };

  const handleEdit = (index) => {
    const todo = todos[index];
    setEditIndex(index);
    setEditTitle(todo.title);
    setEditDescription(todo.description);
    setEditPriority(todo.priority || "Low");
  };

  const handleConfirmDelete = () => {
    if (deleteIndex !== null) {
      dispatch(removeTodo(deleteIndex));
      setDeleteIndex(null);
      setDeleteConfirmOpen(false);
      setDeleteSuccessOpen(true);
    }
  };

  const handleCancelDelete = () => {
    setDeleteIndex(null);
    setDeleteConfirmOpen(false);
  };

  const handleDeleteSuccessClose = () => {
    setDeleteSuccessOpen(false);
  };

  const handleEditSave = () => {
    if (editIndex !== null) {
      dispatch(
        updateTodo({
          index: editIndex,
          updatedTodo: {
            title: editTitle,
            description: editDescription,
            priority: editPriority,
          },
        })
      );
      setEditIndex(null);
    }
  };

  const handleComplete = (index) => {
    setCompletedIndex(index);
    setCompletedConfirmOpen(true);
  };

  const handleConfirmComplete = () => {
    if (completedIndex !== null) {
      const completedTask = todos[completedIndex];
      dispatch(addCompletedTask(completedTask));
      dispatch(removeTodo(completedIndex));
      setCompletedIndex(null);
      setCompletedConfirmOpen(false);
    }
  };

  const handleCancelComplete = () => {
    setCompletedIndex(null);
    setCompletedConfirmOpen(false);
  };

  const handleFilterChange = (event) => {
    setFilterPriority(event.target.value);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  const sortedTodos = [...todos].sort((a, b) => {
    if (sortOrder === "Recent") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
  });

  const filteredTodos =
    filterPriority === "All"
      ? sortedTodos
      : sortedTodos.filter((todo) => todo.priority === filterPriority);

  return (
    <Box
      py={6}
      px={{ xs: 2, lg: 10 }}
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Select
            value={filterPriority}
            onChange={handleFilterChange}
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="High">High</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} md={6}>
          <Select
            value={sortOrder}
            onChange={handleSortOrderChange}
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
          >
            <MenuItem value="Recent">Recent</MenuItem>
            <MenuItem value="Oldest">Oldest</MenuItem>
          </Select>
        </Grid>
        {filteredTodos.length === 0 ? (
          <Grid item xs={12}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="60vh"
              textAlign="center"
              color={
                theme.palette.mode === "dark"
                  ? "text.primary"
                  : "text.secondary"
              }
            >
              <Typography variant="h5">No tasks available</Typography>
            </Box>
          </Grid>
        ) : (
          filteredTodos.map((todo, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Box
                sx={{
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  padding: "10px",
                  height: "100%",
                  display: "flex",
                  marginBottom: "1rem",
                  gap: "1rem",
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
                {editIndex === index ? (
                  <Box>
                    <TextField
                      label="Title"
                      fullWidth
                      margin="normal"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                    />
                    <TextField
                      label="Description"
                      fullWidth
                      multiline
                      rows={4}
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                    />
                    <Select
                      label="Priority"
                      value={editPriority}
                      onChange={(e) => setEditPriority(e.target.value)}
                      fullWidth
                      variant="outlined"
                      sx={{ mt: 2, mb: 2 }}
                    >
                      <MenuItem value="Low">Low</MenuItem>
                      <MenuItem value="Medium">Medium</MenuItem>
                      <MenuItem value="High">High</MenuItem>
                    </Select>
                    <Box mt={2} display="flex" justifyContent="flex-end">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleEditSave}
                        sx={{
                          backgroundColor:
                            theme.palette.mode === "dark" ? "#fff" : "#000",
                          color:
                            theme.palette.mode === "dark" ? "#000" : "#fff",
                          mr: 2,
                          "&:hover": {
                            backgroundColor:
                              theme.palette.mode === "dark"
                                ? "#121212"
                                : "#EFEFEF",
                            color:
                              theme.palette.mode === "dark" ? "#fff" : "#000",
                          },
                        }}
                      >
                        Save
                      </Button>

                      <Button
                        variant="contained"
                        onClick={() => setEditIndex(null)}
                        sx={{
                          backgroundColor:
                            theme.palette.mode === "dark" ? "#fff" : "#000",
                          color:
                            theme.palette.mode === "dark" ? "#000" : "#fff",
                          mr: 2,
                          "&:hover": {
                            backgroundColor:
                              theme.palette.mode === "dark"
                                ? "#121212"
                                : "#EFEFEF",
                            color:
                              theme.palette.mode === "dark" ? "#fff" : "#000",
                          },
                        }}
                      >
                        Cancel
                      </Button>
                    </Box>
                  </Box>
                ) : (
                  <Box>
                    <Typography variant="h4">{todo.title}</Typography>
                    <Typography variant="body1">{todo.description}</Typography>
                    <Typography variant="body2">
                      Priority: {todo.priority || "Low"}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: {
                          xs: "space-between",
                          lg: "flex-end",
                        },
                        marginTop: "auto",
                      }}
                    >
                      <IconButton
                        color="primary"
                        onClick={() => handleEdit(index)}
                        sx={{
                          color:
                            theme.palette.mode === "dark" ? "#fff" : "#000",
                          marginRight: "10px",
                        }}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(index)}
                        sx={{
                          color:
                            theme.palette.mode === "dark" ? "#fff" : "#000",
                          marginRight: "10px",
                        }}
                      >
                        <Delete />
                      </IconButton>
                      <IconButton
                        color="primary"
                        onClick={() => handleComplete(index)}
                        sx={{
                          color:
                            theme.palette.mode === "dark" ? "#fff" : "#000",
                        }}
                      >
                        <Done />
                      </IconButton>
                    </Box>
                  </Box>
                )}
              </Box>
            </Grid>
          ))
        )}
      </Grid>

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
              Are you sure you want to delete this task?
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

      <Modal
        open={deleteSuccessOpen}
        onClose={handleDeleteSuccessClose}
        aria-labelledby="delete-success-modal-title"
        aria-describedby="delete-success-modal-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={deleteSuccessOpen}>
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
              id="delete-success-modal-title"
              variant="h6"
              component="h2"
              sx={{ color: theme.palette.mode === "dark" ? "#fff" : "#000" }}
            >
              Task deleted successfully!
            </Typography>
            <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                onClick={handleDeleteSuccessClose}
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
                Close
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>

      <Modal
        open={completedConfirmOpen}
        onClose={handleCancelComplete}
        aria-labelledby="completed-confirm-modal-title"
        aria-describedby="completed-confirm-modal-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={completedConfirmOpen}>
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
              width: { xs: "70%", lg: 400 },
            }}
          >
            <Typography
              id="completed-confirm-modal-title"
              variant="h6"
              component="h2"
              sx={{ color: theme.palette.mode === "dark" ? "#fff" : "#000" }}
            >
              Are you sure you want to mark this task as completed?
            </Typography>
            <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
              <Button
                onClick={handleConfirmComplete}
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
                onClick={handleCancelComplete}
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

export default TaskList;
