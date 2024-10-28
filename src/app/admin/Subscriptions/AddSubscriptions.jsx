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
} from "@mui/material";

import { FaUserEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const AddRecord = () => {
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null); // Store the record being edited
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "",
  });

  const [formData, setFormData] = useState({
    userid: "",
    pkgid: "",
    duration: "",
    details: "",
  });

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const response = await axios.get("https://aitools.pkstockhelper.info/api/get_subscriptipons.php");
      setRecords(response.data);
      setFilteredRecords(response.data);
    } catch (error) {
      console.error("Error fetching records:", error);
      setSnackbar({
        open: true,
        message: "Failed to fetch records.",
        type: "error",
      });
    }
  };

  // Filter records by search query
  useEffect(() => {
    let filtered = records;

    // Apply search query filter
    if (searchQuery) {
      filtered = filtered.filter((record) =>
        record.details.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredRecords(filtered);
  }, [searchQuery, records]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleAddOpen = () => {
    setFormData({
      userid: "",
      pkgid: "",
      duration: "",
      details: "",
    });
    setOpenAddDialog(true);
  };

  const handleAddClose = () => {
    setOpenAddDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "userid" || name === "pkgid" || name === "duration" ? parseInt(value) : value, // Ensure numeric fields are integers
    }));
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();

    const { userid, pkgid, duration, details } = formData;

    if (!userid || !pkgid || !duration || !details) {
      setSnackbar({
        open: true,
        message: "Please fill in all required fields.",
        type: "error",
      });
      return;
    }

    try {
      const response = await axios.post(`https://aitools.pkstockhelper.info/api/subscriptions.php`, formData);
      setSnackbar({
        open: true,
        message: "Record added successfully.",
        type: "success",
      });
      console.log("Response",response.data);
      fetchRecords();
      handleAddClose();
    } catch (error) {
      console.error("Error adding record:", error);
      setSnackbar({
        open: true,
        message: "Failed to add record.",
        type: "error",
      });
    }
  };

  const handleEditOpen = (record) => {
    setEditingRecord(record);
    setFormData({
      userid: record.userid,
      pkgid: record.pkgid,
      duration: record.duration,
      details: record.details,
    });
    setOpenEditDialog(true);
  };

  const handleEditClose = () => {
    setOpenEditDialog(false);
    setEditingRecord(null);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const { userid, pkgid, duration, details } = formData;

    if (!userid || !pkgid || !duration || !details) {
      setSnackbar({
        open: true,
        message: "Please fill in all required fields.",
        type: "error",
      });
      return;
    }

    try {
      await axios.put(`https://aitools.pkstockhelper.info/api/subscriptions.php/${editingRecord.id}`, formData);
      setSnackbar({
        open: true,
        message: "Record updated successfully.",
        type: "success",
      });
      fetchRecords();
      handleEditClose();
    } catch (error) {
      console.error("Error updating record:", error);
      setSnackbar({
        open: true,
        message: "Failed to update record.",
        type: "error",
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      console.log("id is", id);
  
      // Create FormData and append the id to it
      const deletedata = new FormData();
      deletedata.append('id', id);
  
      console.log("Id to be deleted", deletedata);
  
      // Use POST to send the delete request with FormData
      const deleteresponse = await axios.post("https://aitools.pkstockhelper.info/api/delete_subscription.php", deletedata);
  
      console.log("Delete response", deleteresponse);
  
      setSnackbar({
        open: true,
        message: "Record deleted successfully.",
        type: "warning",
      });
  
      fetchRecords(); // Refresh or refetch the data after deletion
  
    } catch (error) {
      console.error("Error deleting record:", error);
  
      setSnackbar({
        open: true,
        message: "Failed to delete record.",
        type: "error",
      });
    }
  };
  

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* Toolbar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <Toolbar>
          <InputBase
            placeholder="Search records"
            value={searchQuery}
            onChange={handleSearch}
            style={{
              padding: "6px 10px",
              backgroundColor: "#eaeaea",
              borderRadius: "4px",
            }}
          />
        </Toolbar>
        <Button variant="contained" color="primary" onClick={handleAddOpen}>
          Add New Record
        </Button>
      </div>

      {/* Table displaying records */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>User ID</TableCell>
              <TableCell>Package ID</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Details</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRecords
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.id}</TableCell>
                  <TableCell>{record.userid}</TableCell>
                  <TableCell>{record.pkgid}</TableCell>
                  <TableCell>{record.duration}</TableCell>
                  <TableCell>{record.details}</TableCell>
                  <TableCell>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <FaUserEdit
                        onClick={() => handleEditOpen(record)}
                        style={{
                          fontSize: "20px",
                          color: "#1976d2",
                          cursor: "pointer",
                        }}
                      />
                      <MdDeleteForever
                        onClick={() => handleDelete(record.id)}
                        style={{
                          fontSize: "20px",
                          color: "#d32f2f",
                          cursor: "pointer",
                        }}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredRecords.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />

      {/* Add Record Dialog */}
      <Dialog
        open={openAddDialog}
        onClose={handleAddClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Add New Record
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
              label="User ID"
              name="userid"
              value={formData.userid}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
              type="number"
            />
            <TextField
              label="Package ID"
              name="pkgid"
              value={formData.pkgid}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
              type="number"
            />
            <TextField
              label="Duration"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
              type="number"
            />
            <TextField
              label="Details"
              name="details"
              value={formData.details}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
              multiline
              rows={4}
            />
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

      {/* Edit Record Dialog */}
      <Dialog
        open={openEditDialog}
        onClose={handleEditClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Edit Record
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
              label="User ID"
              name="userid"
              value={formData.userid}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
              type="number"
            />
            <TextField
              label="Package ID"
              name="pkgid"
              value={formData.pkgid}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
              type="number"
            />
            <TextField
              label="Duration"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
              type="number"
            />
            <TextField
              label="Details"
              name="details"
              value={formData.details}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
              multiline
              rows={4}
            />
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

      {/* Snackbar Notifications */}
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

export default AddRecord;
