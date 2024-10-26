"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Toolbar,
  InputBase,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
  IconButton,
  TablePagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import { useTable, useGlobalFilter, useSortBy, usePagination } from "react-table";
import { FaUserEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const Users = () => {
  const [adminUsers, setAdminUsers] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "",
  });

  const [formData, setFormData] = useState({
    id: "",
    fullname: "",
    username: "",
    password: "",
    confirmPassword: "",
    role: "",
    status: "",
  });

  useEffect(() => {
    fetchAdminUsers();
  }, []);

  const fetchAdminUsers = async () => {
    try {
      const response = await axios.get("https://advanceaitool.com/api/get_users.php");
      setAdminUsers(response.data);
      console.log("All users: ", response.data);
    } catch (error) {
      console.error("Error fetching admin users:", error);
      setSnackbar({
        open: true,
        message: "Failed to fetch users.",
        type: "error",
      });
    }
  };

  const handleAddOpen = () => {
    setFormData({
      id: "",
      fullname: "",
      username: "",
      password: "",
      confirmPassword: "",
      role: "",
      status: "",
    });
    setOpenAddDialog(true);
  };

  const handleAddClose = () => {
    setOpenAddDialog(false);
  };

  const handleEditOpen = (user) => {
    setEditingUser(user);
    setFormData({
      id: user.id,
      fullname: user.fullname,
      username: user.username,
      password: "",
      confirmPassword: "",
      role: user.role === "Customer" ? "Customer" : user.role === "Admin" ? "Admin" : "",
      status: user.status === "Pending" ? "Pending" : user.status === "Verified" ? "Verified" : "",
    });
    setOpenEditDialog(true);
  };

  const handleEditClose = () => {
    setOpenEditDialog(false);
    setEditingUser(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();

    const { fullname, username, password, confirmPassword, role, status } = formData;

    if (!fullname || !username || !password || !confirmPassword || !role || !status) {
      setSnackbar({
        open: true,
        message: "Please fill in all required fields.",
        type: "error",
      });
      return;
    }

    if (password !== confirmPassword) {
      setSnackbar({
        open: true,
        message: "Passwords do not match.",
        type: "error",
      });
      return;
    }

    try {
      const form = new FormData();
      form.append("fullname", fullname);
      form.append("username", username);
      form.append("password", password);
      form.append("role", role);
      form.append("status", status);

      const response = await axios.post("https://advanceaitool.com/api/signup.php", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        setSnackbar({
          open: true,
          message: "User added successfully.",
          type: "success",
        });
        fetchAdminUsers();
        handleAddClose();
      } else {
        setSnackbar({
          open: true,
          message: "Failed to add user.",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Error adding user:", error);
      setSnackbar({
        open: true,
        message: "Failed to add user.",
        type: "error",
      });
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const { id, fullname, username, password, confirmPassword, role, status } = formData;

    if (!fullname || !username || !role || !status) {
      setSnackbar({
        open: true,
        message: "Please fill in all required fields.",
        type: "error",
      });
      return;
    }

    if (password && password !== confirmPassword) {
      setSnackbar({
        open: true,
        message: "Passwords do not match.",
        type: "error",
      });
      return;
    }

    try {
      const form = new FormData();
      form.append("id", id);
      form.append("fullname", fullname);
      form.append("username", username);
      if (password) form.append("password", password);
      form.append("role", role);
      form.append("status", status);

      const response = await axios.put("https://advanceaitool.com/api/signup.php", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        setSnackbar({
          open: true,
          message: "User updated successfully.",
          type: "success",
        });
        fetchAdminUsers();
        handleEditClose();
      } else {
        setSnackbar({
          open: true,
          message: "Failed to update user.",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Error updating user:", error);
      setSnackbar({
        open: true,
        message: "Failed to update user.",
        type: "error",
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      const deleteuser = new FormData();
      deleteuser.append("id", id);
      console.log("User to be deleted: ", id);
      await axios.post("https://advanceaitool.com/api/delete_user.php", deleteuser, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSnackbar({
        open: true,
        message: "User deleted successfully.",
        type: "warning",
      });
      fetchAdminUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      setSnackbar({
        open: true,
        message: "Failed to delete user.",
        type: "error",
      });
    }
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Full Name",
        accessor: "fullname",
      },
      {
        Header: "Username",
        accessor: "username",
      },
      {
        Header: "Role",
        accessor: "role",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <div style={{ display: "flex", gap: "10px" }}>
            <FaUserEdit
              onClick={() => handleEditOpen(row.original)}
              style={{ fontSize: "20px", color: "#1976d2", cursor: "pointer" }}
            />
            <MdDeleteForever
              onClick={() => handleDelete(row.original.id)}
              style={{ fontSize: "20px", color: "#d32f2f", cursor: "pointer" }}
            />
          </div>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    setGlobalFilter,
    gotoPage,
    setPageSize,
  } = useTable(
    {
      columns,
      data: adminUsers,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { pageIndex, pageSize, globalFilter } = state;

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <Toolbar>
          <InputBase
            value={globalFilter || ""}
            onChange={(e) => setGlobalFilter(e.target.value || undefined)}
            placeholder="Search"
            style={{
              padding: "6px 10px",
              backgroundColor: "#eaeaea",
              borderRadius: "4px",
            }}
          />
        </Toolbar>
        <Button variant="contained" color="primary" onClick={handleAddOpen}>
          Add New User
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <TableCell key={column.id} {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <TableRow key={row.id} {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <TableCell key={cell.id} {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
            {page.length === 0 && (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25, { label: "All", value: adminUsers.length }]}
        component="div"
        count={adminUsers.length}
        rowsPerPage={pageSize}
        page={pageIndex}
        onPageChange={(event, newPage) => gotoPage(newPage)}
        onRowsPerPageChange={(event) => setPageSize(Number(event.target.value))}
      />

      {/* Add User Dialog */}
      <Dialog open={openAddDialog} onClose={handleAddClose} maxWidth="md" fullWidth>
        <DialogTitle>
          Add New User
          <IconButton
            aria-label="close"
            onClick={handleAddClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleAddSubmit}>
            <TextField
              label="Full Name"
              name="fullname"
              value={formData.fullname}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
            />
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Role</InputLabel>
              <Select name="role" value={formData.role} onChange={handleInputChange}>
                <MenuItem value="Customer">Customer</MenuItem>
                <MenuItem value="Admin">Admin</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Status</InputLabel>
              <Select name="status" value={formData.status} onChange={handleInputChange}>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Verified">Verified</MenuItem>
              </Select>
            </FormControl>
            <DialogActions>
              <Button onClick={handleAddClose} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary" variant="contained">
                Save
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={openEditDialog} onClose={handleEditClose} maxWidth="md" fullWidth>
        <DialogTitle>
          Edit User
          <IconButton
            aria-label="close"
            onClick={handleEditClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleEditSubmit}>
            <TextField
              label="Full Name"
              name="fullname"
              value={formData.fullname}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              helperText="Leave blank to keep current password."
            />
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              helperText="Leave blank to keep current password."
            />
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Role</InputLabel>
              <Select name="role" value={formData.role} onChange={handleInputChange}>
                <MenuItem value="Customer">Customer</MenuItem>
                <MenuItem value="Admin">Admin</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Status</InputLabel>
              <Select name="status" value={formData.status} onChange={handleInputChange}>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Verified">Verified</MenuItem>
              </Select>
            </FormControl>
            <DialogActions>
              <Button onClick={handleEditClose} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary" variant="contained">
                Update
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.type}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Users;
