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
import { useTable, useGlobalFilter, useSortBy, usePagination } from "react-table";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const Packages = () => {
  const [reviews, setReviews] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    mprice: 0, // Monthly price
    yprice: 0, // Yearly price
    characters: 0,
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    fetchReviews();
  }, []);

  // Fetch all packages
  const fetchReviews = async () => {
    try {
      const response = await axios.get(`https://aitools.pkstockhelper.info/api/get_packages.php`);
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching packages:", error);
      setSnackbar({
        open: true,
        message: "Failed to fetch packages.",
        type: "error",
      });
    }
  };

  const handleAddOpen = () => {
    setFormData({
      title: "",
      description: "",
      mprice: 0,
      yprice: 0,
      characters: 0,
    });
    setOpenAddDialog(true);
  };

  const handleAddClose = () => {
    setOpenAddDialog(false);
  };

  const handleEditOpen = (review) => {
    setEditingReview(review);
    setFormData({
      title: review.title,
      description: review.description,
      mprice: review.mprice,
      yprice: review.yprice,
      characters: review.characters,
    });
    setOpenEditDialog(true);
  };

  const handleEditClose = () => {
    setOpenEditDialog(false);
    setEditingReview(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "mprice" || name === "yprice" || name === "characters" ? parseInt(value) : value,
    }));
  };

  // Add new package
 // Add new package
const handleAddSubmit = async (e) => {
  e.preventDefault();

  // Validation to ensure required fields are filled in
  if (!formData.title || !formData.description || formData.mprice === 0 || formData.yprice === 0) {
    setSnackbar({
      open: true,
      message: "Please fill in all required fields.",
      type: "error",
    });
    return;
  }

  try {
    // Create a new FormData object
    const newPackage = new FormData();
    newPackage.append("title", formData.title);
    newPackage.append("description", formData.description);
    newPackage.append("mprice", formData.mprice);
    newPackage.append("yprice", formData.yprice);
    newPackage.append("characters", formData.characters);

    // Call the API to add a new package
    const response = await axios.post(`https://aitools.pkstockhelper.info/api/packages.php`, newPackage, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    // Check if the response is successful
    if (response.data.status === "success") {
      setSnackbar({
        open: true,
        message: "Package added successfully.",
        type: "success",
      });
      fetchReviews(); // Refresh package list after adding
      handleAddClose();
    } else {
      throw new Error("Failed to add package");
    }
  } catch (error) {
    console.error("Error adding package:", error);
    setSnackbar({
      open: true,
      message: "Failed to add package.",
      type: "error",
    });
  }
};


  // Update existing package
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description || formData.mprice === 0 || formData.yprice === 0) {
      setSnackbar({
        open: true,
        message: "Please fill in all required fields.",
        type: "error",
      });
      return;
    }

    try {
      const updatedPackage = new FormData();
      updatedPackage.append("title", formData.title);
      updatedPackage.append("description", formData.description);
      updatedPackage.append("mprice", formData.mprice);
      updatedPackage.append("yprice", formData.yprice);
      updatedPackage.append("characters", formData.characters);
      updatedPackage.append("id", editingReview.id); // Assuming 'id' is needed for updating

      await axios.post(`https://aitools.pkstockhelper.info/api/packages.php`, updatedPackage, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSnackbar({
        open: true,
        message: "Package updated successfully.",
        type: "success",
      });
      fetchReviews(); // Refresh package list after updating
      handleEditClose();
    } catch (error) {
      console.error("Error updating package:", error);
      setSnackbar({
        open: true,
        message: "Failed to update package.",
        type: "error",
      });
    }
  };

  // Delete package
  const handleDelete = async (id) => {
    try {
      const formdata = new FormData();
      formdata.append('id',id);
      await axios.post(`https://aitools.pkstockhelper.info/api/delete_packages.php`, formdata );
      setSnackbar({
        open: true,
        message: "Package deleted successfully.",
        type: "warning",
      });
      fetchReviews(); // Refresh package list after deletion
    } catch (error) {
      console.error("Error deleting package:", error);
      setSnackbar({
        open: true,
        message: "Failed to delete package.",
        type: "error",
      });
    }
  };

  const columns = React.useMemo(
    () => [
      { Header: "Title", accessor: "title" },
      { Header: "Description", accessor: "description" },
      { Header: "Monthly Price", accessor: "mprice" },
      { Header: "Yearly Price", accessor: "yprice" },
      { Header: "Total Characters", accessor: "characters" },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <div className="flex gap-2">
            <FaEdit
              onClick={() => handleEditOpen(row.original)}
              style={{ fontSize: "20px", cursor: "pointer", color: "#1976d2" }}
            />
            <MdDeleteForever
              onClick={() => handleDelete(row.original.id)}
              style={{ fontSize: "20px", cursor: "pointer", color: "#d32f2f" }}
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
    { columns, data: reviews },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { pageIndex, pageSize, globalFilter } = state;

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <Toolbar>
          <InputBase
            value={globalFilter || ""}
            onChange={(e) => setGlobalFilter(e.target.value || undefined)}
            placeholder="Search"
            style={{ padding: "6px 10px", backgroundColor: "#eaeaea", borderRadius: "4px" }}
          />
        </Toolbar>
        <Button variant="contained" color="primary" onClick={handleAddOpen}>
          Add New Package
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
                  No packages found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25, { label: "All", value: reviews.length }]}
        component="div"
        count={reviews.length}
        rowsPerPage={pageSize}
        page={pageIndex}
        onPageChange={(event, newPage) => gotoPage(newPage)}
        onRowsPerPageChange={(event) => setPageSize(Number(event.target.value))}
      />

      {/* Add Package Dialog */}
      <Dialog open={openAddDialog} onClose={handleAddClose} maxWidth="xl" fullWidth disableEnforceFocus>
        <DialogTitle>
          Add New Package
          <IconButton
            aria-label="close"
            onClick={handleAddClose}
            sx={{ position: "absolute", right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleAddSubmit}>
            <TextField label="Title" name="title" value={formData.title} onChange={handleInputChange} fullWidth required margin="normal" />
            <TextField label="Description" name="description" value={formData.description} onChange={handleInputChange} fullWidth required margin="normal" multiline rows={4} />
            <TextField label="Monthly Price" name="mprice" value={formData.mprice} onChange={handleInputChange} fullWidth required margin="normal" type="number" />
            <TextField label="Yearly Price" name="yprice" value={formData.yprice} onChange={handleInputChange} fullWidth required margin="normal" type="number" />
            <TextField label="Total Characters" name="characters" value={formData.characters} onChange={handleInputChange} fullWidth required margin="normal" type="number" />

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

      {/* Edit Package Dialog */}
      <Dialog open={openEditDialog} onClose={handleEditClose} maxWidth="xl" fullWidth disableEnforceFocus>
        <DialogTitle>
          Edit Package
          <IconButton
            aria-label="close"
            onClick={handleEditClose}
            sx={{ position: "absolute", right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleEditSubmit}>
            <TextField label="Title" name="title" value={formData.title} onChange={handleInputChange} fullWidth required margin="normal" />
            <TextField label="Description" name="description" value={formData.description} onChange={handleInputChange} fullWidth required margin="normal" multiline rows={4} />
            <TextField label="Monthly Price" name="mprice" value={formData.mprice} onChange={handleInputChange} fullWidth required margin="normal" type="number" />
            <TextField label="Yearly Price" name="yprice" value={formData.yprice} onChange={handleInputChange} fullWidth required margin="normal" type="number" />
            <TextField label="Total Characters" name="characters" value={formData.characters} onChange={handleInputChange} fullWidth required margin="normal" type="number" />

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

      {/* Snackbar for alerts */}
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

export default Packages;
