import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Modal,
  Backdrop,
  Fade,
  // useMediaQuery,
  Select,
  MenuItem,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/todo/todoSlice";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/system";

const ModalContent = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#333" : "#fff",
  color: theme.palette.mode === "dark" ? "#fff" : "#000",
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 0 10px rgba(255, 255, 255, 0.1)"
      : "0 0 10px rgba(0, 0, 0, 0.1)",
  padding: "20px",
  borderRadius: "8px",
  textAlign: "center",
}));

const TaskForm = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  // const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [rendered, setRendered] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    setRendered(true);
  }, []);

  const handleSubmit = () => {
    if (!title.trim() || !description.trim()) {
      setShowWarning(true);
      return;
    }

    const createdAt = new Date().toISOString();

    dispatch(
      addTodo({
        title,
        description,
        priority,
        createdAt,
      })
    );

    setTitle("");
    setDescription("");
    setPriority("Low");

    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
    }, 1000);
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
  };

  return (
    rendered && (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        py={12}
        px={2}
        sx={{
          backgroundColor: theme.palette.mode === "dark" ? "#121212" : "#fff",
          color: theme.palette.mode === "dark" ? "#fff" : "#000",
        }}
      >
        <Box
          sx={{
            backgroundColor: theme.palette.mode === "dark" ? "#121212" : "#fff",
            padding: "20px",
            borderRadius: "8px",
            boxShadow:
              theme.palette.mode === "dark"
                ? "0 0 10px rgba(255, 255, 255, 0.1)"
                : "0 0 10px rgba(0, 0, 0, 0.1)",
            width: { xs: "85%", md: "50%" },
          }}
        >
          {showWarning && (
            <Typography
              variant="subtitle2"
              color="error"
              align="center"
              sx={{ marginBottom: "10px" }}
            >
              All fields are required
            </Typography>
          )}
          <TextField
            label="Task Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            autoComplete="off"
            sx={{
              "& label": {
                color: theme.palette.mode === "dark" ? "#fff" : "#000",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: theme.palette.mode === "dark" ? "#fff" : "#000",
                },
                "&:hover fieldset": {
                  borderColor: theme.palette.mode === "dark" ? "#fff" : "#000",
                },
                "&.Mui-focused fieldset": {
                  borderColor: theme.palette.mode === "dark" ? "#fff" : "#000",
                },
                "& input": {
                  color: theme.palette.mode === "dark" ? "#fff" : "#000",
                },
              },
            }}
          />
          <TextField
            label="Task Description"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            sx={{
              marginTop: "20px",
              "& label": {
                color: theme.palette.mode === "dark" ? "#fff" : "#000",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: theme.palette.mode === "dark" ? "#fff" : "#000",
                },
                "&:hover fieldset": {
                  borderColor: theme.palette.mode === "dark" ? "#fff" : "#000",
                },
                "&.Mui-focused fieldset": {
                  borderColor: theme.palette.mode === "dark" ? "#fff" : "#000",
                },
                "& input": {
                  color: theme.palette.mode === "dark" ? "#fff" : "#000",
                },
              },
            }}
          />
          <Select
            label="Priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            fullWidth
            variant="outlined"
            sx={{
              marginTop: "20px",
              "& label": {
                color: theme.palette.mode === "dark" ? "#fff" : "#000",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: theme.palette.mode === "dark" ? "#fff" : "#000",
                },
                "&:hover fieldset": {
                  borderColor: theme.palette.mode === "dark" ? "#fff" : "#000",
                },
                "&.Mui-focused fieldset": {
                  borderColor: theme.palette.mode === "dark" ? "#fff" : "#000",
                },
                "& input": {
                  color: theme.palette.mode === "dark" ? "#fff" : "#000",
                },
              },
            }}
          >
            <MenuItem
              value="Low"
              sx={{ color: theme.palette.mode === "dark" ? "#fff" : "#000" }}
            >
              Low
            </MenuItem>
            <MenuItem
              value="Medium"
              sx={{ color: theme.palette.mode === "dark" ? "#fff" : "#000" }}
            >
              Medium
            </MenuItem>
            <MenuItem
              value="High"
              sx={{ color: theme.palette.mode === "dark" ? "#fff" : "#000" }}
            >
              High
            </MenuItem>
          </Select>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
            sx={{
              marginTop: "20px",
              backgroundColor: theme.palette.mode === "dark" ? "#fff" : "#000",
              color: theme.palette.mode === "dark" ? "#000" : "#fff",
              "&:hover": {
                backgroundColor:
                  theme.palette.mode === "dark" ? "#000" : "#efefef",
                color: theme.palette.mode === "dark" ? "white" : "#000",
              },
            }}
          >
            Create Task
          </Button>
        </Box>
        <Modal
          open={showSuccessModal}
          onClose={handleCloseModal}
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Fade in={showSuccessModal}>
            <ModalContent>
              <Typography variant="h6">Task Added Successfully!</Typography>
            </ModalContent>
          </Fade>
        </Modal>
      </Box>
    )
  );
};

export default TaskForm;
