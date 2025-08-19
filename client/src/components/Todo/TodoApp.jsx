import React, { useState, useEffect } from "react";
import CustomCard from "./CustomCard.jsx";
import CustomTable from "./CustomTable.jsx";
import CustomModal from "./CustomModal.jsx";
import CustomButton from "./CustomButton.jsx";
import InputField from "./InputField.jsx";
import api from "../../utils/api";
import { toast } from "react-toastify";
import {
  Box,
  Typography,
  Paper,
  Chip,
  IconButton,
  Pagination,
  Tooltip,
} from "@mui/material";
import { Delete, Edit, CheckCircle, Search } from "@mui/icons-material";
import Switch from "@mui/material/Switch";

const TodoApp = () => {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [todoTitle, setTodoTitle] = useState("");
  const [todoDescription, setTodoDescription] = useState("");
  const [todoDate, setTodoDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [todoTime, setTodoTime] = useState("");
  const [priority, setPriority] = useState("Low");
  const [todos, setTodos] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [editTodoId, setEditTodoId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCompleted, setShowCompleted] = useState(false);
  const [page, setPage] = useState(1);
  const todosPerPage = 5;

  // Highlight helper
  const highlightMatch = (text, highlight) => {
    if (!highlight.trim()) return text;
    const regex = new RegExp(`(${highlight})`, "gi");
    return text.split(regex).map((part, i) =>
      regex.test(part) ? (
        <span key={i} style={{ backgroundColor: "yellow", fontWeight: "bold" }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  // Load logged-in user
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Axios config
  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  // Fetch todos
  useEffect(() => {
    if (user) {
      api
        .get("/todos")
        .then((res) => setTodos(res.data))
        .catch((err) => console.error(err));
    }
  }, [user]);

  // Summary cards
  const cards = [
    { id: 1, title: "Total Tasks", count: todos.length },
    {
      id: 2,
      title: "Pending Tasks",
      count: todos.filter((t) => !t.completed).length,
    },
    {
      id: 3,
      title: "Completed Tasks",
      count: todos.filter((t) => t.completed).length,
    },
  ];

  // Add Todo
  const handleSubmit = () => {
    api
      .post("/todos", {
        title: todoTitle,
        description: todoDescription,
        date: todoDate,
        time: todoTime,
        priority,
        completed: false,
      })
      .then((res) => {
        setTodos([...todos, res.data]);
        resetForm();
        setOpen(false);
        toast.success("Todo added successfully!");
      })
      .catch((err) => console.error(err));
  };

  // Edit Todo
  const handleEditSubmit = () => {
    api
      .put(`/todos/${editTodoId}`, {
        title: todoTitle,
        description: todoDescription,
        date: todoDate,
        time: todoTime,
        priority,
      })
      .then((res) => {
        setTodos(
          todos.map((todo) => (todo._id === editTodoId ? res.data : todo))
        );
        resetForm();
        setEditOpen(false);
        setEditTodoId(null);
        toast.success("Todo updated successfully!");
      })
      .catch((err) => console.error(err));
  };

  // Delete Todo
  const deleteTodo = (id) => {
    api
      .delete(`/todos/${id}`)
      .then(() => {
        setTodos(todos.filter((todo) => todo._id !== id));
        toast.info("Todo deleted successfully!");
      })
      .catch((err) => console.error(err));
  };

  // Toggle complete
  const toggleComplete = (id) => {
    api
      .patch(`/todos/${id}/toggle`, {})
      .then((res) => {
        setTodos(todos.map((todo) => (todo._id === id ? res.data : todo)));
        toast.success(
          res.data.completed
            ? "Todo marked as completed!"
            : "Todo marked as pending"
        );
      })
      .catch((err) => console.error(err));
  };

  // Start editing
  const startEditing = (id) => {
    const todo = todos.find((t) => t._id === id);
    if (todo) {
      setTodoTitle(todo.title);
      setTodoDescription(todo.description || "");
      setTodoDate(todo.date || "");
      setTodoTime(todo.time || "");
      setPriority(todo.priority || "Low");
      setEditTodoId(id);
      setEditOpen(true);
    }
  };

  const resetForm = () => {
    setTodoTitle("");
    setTodoDescription("");
    setTodoDate(new Date().toISOString().split("T")[0]);
    setTodoTime("");
    setPriority("Low");
  };

  // Priority sorting
  const priorityOrder = { High: 1, Medium: 2, Low: 3 };
  const sortedTodos = [...todos].sort(
    (a, b) =>
      priorityOrder[a.priority] - priorityOrder[b.priority] ||
      new Date(a.date) - new Date(b.date) ||
      new Date(`1970-01-01T${a.time}`) - new Date(`1970-01-01T${b.time}`)
  );

  // Rows for table
  const rows = sortedTodos.map((todo) => ({
    id: todo._id,
    title: todo.title,
    description: todo.description || "",
    date: todo.date || "",
    time: todo.time || "",
    priority: todo.priority || "Low",
    status: todo.completed ? "Completed" : "Pending",
  }));

  //  Filter rows based on search term + switch
  const filteredRows = rows.filter((row) => {
    const matchesSearch = row.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    let matchesCompletion;
    if (showCompleted) {
      // Show only completed
      matchesCompletion = row.status === "Completed";
    } else {
      // Show only pending
      matchesCompletion = row.status !== "Completed";
    }

    return matchesSearch && matchesCompletion;
  });

  // Columns for table
  const columns = [
    {
      field: "title",
      headerName: "Title",
      renderCell: ({ value }) => <>{highlightMatch(value, searchTerm)}</>,
    },
    {
      field: "description",
      headerName: "Description",
      renderCell: ({ value }) => (
        <Tooltip title={value} arrow>
          <Typography
            noWrap
            sx={{
              maxWidth: 200, // adjust width as needed
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {value}
          </Typography>
        </Tooltip>
      ),
    },
    { field: "date", headerName: "Date" },
    { field: "time", headerName: "Time" },
    { field: "priority", headerName: "Priority" },
    {
      field: "status",
      headerName: "Status",
      renderCell: ({ value }) => (
        <Chip
          label={value}
          sx={{
            backgroundColor: value === "Completed" ? "#008A61" : "#AC6E10",
            color: "white",
            fontWeight: "bold",
          }}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      renderCell: ({ row }) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          {row.status !== "Completed" && (
            <IconButton color="success" onClick={() => toggleComplete(row.id)}>
              <CheckCircle />
            </IconButton>
          )}
          {row.status !== "Completed" && (
            <IconButton color="primary" onClick={() => startEditing(row.id)}>
              <Edit />
            </IconButton>
          )}
          <IconButton color="error" onClick={() => deleteTodo(row.id)}>
            <Delete />
          </IconButton>
        </Box>
      ),
    },
  ];

  //  Pagination logic
  const totalPages = Math.ceil(filteredRows.length / todosPerPage);
  const paginatedRows = filteredRows.slice(
    (page - 1) * todosPerPage,
    page * todosPerPage
  );

  return (
    <Box sx={{ p: 4, maxWidth: 1100, margin: "0 auto" }}>
      {/* User Info */}
      {user && (
        <Paper
          sx={{
            p: 2,
            mb: 3,
            background: "linear-gradient(90deg, #1e3c72 0%, #2a5298 100%)",
            borderRadius: 3,
            display: "flex",
            alignItems: "center",
            gap: 2,
            color: "white",
          }}
          elevation={3}
        >
          <Box>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Welcome, {user.name}
            </Typography>
            <Typography variant="body2">{user.email}</Typography>
          </Box>
        </Paper>
      )}

      {/* Cards */}
      <Box
        sx={{
          width: "100%",
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill, minmax(min(250px, 100%), 1fr))",
          gap: 2,
          mb: 3,
        }}
      >
        {cards.map((card, index) => (
          <CustomCard
            key={card.id}
            title={card.title}
            count={Number(card.count)}
            gradient={
              index === 0
                ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                : index === 1
                ? "linear-gradient(135deg, #f7971e 0%, #ffd200 100%)"
                : "linear-gradient(135deg, #43cea2 0%, #185a9d 100%)"
            }
            onClick={() => setSelectedCard(index)}
            isActive={selectedCard === index}
            activeStyles={{ boxShadow: "0 0 15px rgba(255,255,255,0.6)" }}
          />
        ))}
      </Box>

      {/* Add Task Button */}
      <Box sx={{ mb: 3, display: "flex", justifyContent: "flex-end" }}>
        <CustomButton
          variant="contained"
          onClick={() => {
            setOpen(true);
          }}
        >
          Add Task
        </CustomButton>
      </Box>

      {/* Search Bar */}
      <Box sx={{ mb: 2, display: "flex", justifyContent: "flex-end" }}>
        <InputField
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => {
            setPage(1); // reset to first page when search term changes
            setSearchTerm(e.target.value);
          }}
          icon={<Search />}
        />
      </Box>

      {/* Show Completed Todos Switch */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Typography variant="body1" sx={{ fontWeight: "bold", mr: 1 }}>
          Show Completed Todo's
        </Typography>
        <Switch
          checked={showCompleted}
          onChange={(e) => {
            setShowCompleted(e.target.checked);
            setPage(1); // reset to first page when filter changes
          }}
        />
      </Box>

      {/* Todo Table with Pagination */}
      <CustomTable columns={columns} rows={paginatedRows} minWidth={900} />

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, value) => setPage(value)}
            color="primary"
          />
        </Box>
      )}

      {/* Add Todo Modal */}
      {open && (
        <CustomModal
          open={open}
          handleClose={() => {
            resetForm();
            setOpen(false);
          }}
          title="Add New Todo"
          todoTitle={todoTitle}
          todoDescription={todoDescription}
          todoDate={todoDate}
          setTodoDate={setTodoDate}
          todoTime={todoTime}
          setTodoTime={setTodoTime}
          priority={priority}
          setPriority={setPriority}
          setTodoTitle={setTodoTitle}
          setTodoDescription={setTodoDescription}
          onSubmit={handleSubmit}
        />
      )}

      {/* Edit Todo Modal */}
      {editOpen && (
        <CustomModal
          open={editOpen}
          handleClose={() => {
            resetForm();
            setEditOpen(false);
          }}
          title="Edit Todo"
          todoTitle={todoTitle}
          todoDescription={todoDescription}
          todoDate={todoDate}
          setTodoDate={setTodoDate}
          todoTime={todoTime}
          setTodoTime={setTodoTime}
          priority={priority}
          setPriority={setPriority}
          setTodoTitle={setTodoTitle}
          setTodoDescription={setTodoDescription}
          onSubmit={handleEditSubmit}
        />
      )}
    </Box>
  );
};

export default TodoApp;
