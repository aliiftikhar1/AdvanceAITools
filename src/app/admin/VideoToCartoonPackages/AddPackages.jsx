import React, { useState, useEffect, useRef } from "react";
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
import dynamic from "next/dynamic"; // Import Next.js dynamic for JoditEditor

// Dynamically import JoditEditor to only load it on the client side
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const VideoToCartoonPackages = () => {
  const [packages, setPackages] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);
  const [formData, setFormData] = useState({
    PackageName: "",
    Description: "",
    Credits: 0,
    Length: 0,
    Price: 0,
    Features: "",  // Added Features field
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "",
  });

  const editor = useRef(null);

  useEffect(() => {
    fetchPackages();
  }, []);

  // Fetch all packages
  const fetchPackages = async () => {
    try {
      const response = await axios.get(`https://advanceaitool.com/api/get_packages(vtc).php`);
      setPackages(response.data);
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
      PackageName: "",
      Description: "",
      Credits: 0,
      Length: 0,
      Price: 0,
      Features: "",  // Reset Features field
    });
    setOpenAddDialog(true);
  };

  const handleAddClose = () => {
    setOpenAddDialog(false);
  };

  const handleEditOpen = (pkg) => {
    setEditingPackage(pkg);
    setFormData({
      PackageName: pkg.PackageName,
      Description: pkg.Description,
      Credits: pkg.Credits,
      Length: pkg.Length,
      Price: pkg.Price,
      Features: pkg.Features || "",  // Added Features field
    });
    setOpenEditDialog(true);
  };

  const handleEditClose = () => {
    setOpenEditDialog(false);
    setEditingPackage(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "Credits" || name === "Length" || name === "Price" ? parseInt(value) : value,
    }));
  };

  const handleEditorChange = (content) => {
    setFormData((prevData) => ({
      ...prevData,
      Features: content,
    }));
  };

  // Add new package
  const handleAddSubmit = async (e) => {
    e.preventDefault();

    if (!formData.PackageName || !formData.Description || formData.Credits < 0 || formData.Price === null || formData.Price === undefined) {
      setSnackbar({
        open: true,
        message: "Please fill in all required fields.",
        type: "error",
      });
      return;
    }

    try {
      const newPackage = new FormData();
      newPackage.append("PackageName", formData.PackageName);
      newPackage.append("Description", formData.Description);
      newPackage.append("Credits", formData.Credits);
      newPackage.append("Length", formData.Length);
      newPackage.append("Price", formData.Price);
      newPackage.append("Features", formData.Features);  // Append Features field

      const response = await axios.post(`https://advanceaitool.com/api/savevideotocartoonpackages.php`, newPackage, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.status === "success") {
        setSnackbar({
          open: true,
          message: "Package added successfully.",
          type: "success",
        });
        fetchPackages(); // Refresh package list after adding
        handleAddClose();
      } else {
        throw new Error("Failed to add package: " + response.data.message);
      }
    } catch (error) {
      console.error("Error adding package:", error);
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Failed to add package.",
        type: "error",
      });
    }
  };

  // Update existing package
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    if (!formData.PackageName || !formData.Description || formData.Credits < 0 || formData.Price === null || formData.Price === undefined) {
      setSnackbar({
        open: true,
        message: "Please fill in all required fields.",
        type: "error",
      });
      return;
    }

    try {
      const updatedPackage = new FormData();
      updatedPackage.append("PackageName", formData.PackageName);
      updatedPackage.append("Description", formData.Description);
      updatedPackage.append("Credits", formData.Credits);
      updatedPackage.append("Length", formData.Length);
      updatedPackage.append("Price", formData.Price);
      updatedPackage.append("id", editingPackage.id);
      updatedPackage.append("Features", formData.Features);  // Append Features field

      await axios.post(`https://advanceaitool.com/api/savevideotocartoonpackages.php`, updatedPackage, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSnackbar({
        open: true,
        message: "Package updated successfully.",
        type: "success",
      });
      fetchPackages(); // Refresh package list after updating
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
      formdata.append('id', id);
      await axios.post(`https://advanceaitool.com/api/delete_packages(vtc).php`, formdata);
      setSnackbar({
        open: true,
        message: "Package deleted successfully.",
        type: "warning",
      });
      fetchPackages(); // Refresh package list after deletion
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
      { Header: "Package Name", accessor: "PackageName" },
      { Header: "Description", accessor: "Description" },
      { Header: "Credits", accessor: "Credits" },
      { Header: "Length", accessor: "Length" },
      { Header: "Price", accessor: "Price" },
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
    { columns, data: packages },
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
        rowsPerPageOptions={[5, 10, 25, { label: "All", value: packages.length }]}
        component="div"
        count={packages.length}
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
            <TextField label="Package Name" name="PackageName" value={formData.PackageName} onChange={handleInputChange} fullWidth required margin="normal" />
            <TextField label="Description" name="Description" value={formData.Description} onChange={handleInputChange} fullWidth required margin="normal" multiline rows={4} />
            <TextField label="Credits" name="Credits" value={formData.Credits} onChange={handleInputChange} fullWidth required margin="normal" type="number" />
            <TextField label="Length" name="Length" value={formData.Length} onChange={handleInputChange} fullWidth required margin="normal" type="number" />
            <TextField label="Price" name="Price" value={formData.Price} onChange={handleInputChange} fullWidth required margin="normal" type="number" />
            <div style={{ marginTop: '20px' }}>
              <label>Features</label>
              <JoditEditor
                ref={editor}
                value={formData.Features}
                onChange={handleEditorChange}
              />
            </div>
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
            <TextField label="Package Name" name="PackageName" value={formData.PackageName} onChange={handleInputChange} fullWidth required margin="normal" />
            <TextField label="Description" name="Description" value={formData.Description} onChange={handleInputChange} fullWidth required margin="normal" multiline rows={4} />
            <TextField label="Credits" name="Credits" value={formData.Credits} onChange={handleInputChange} fullWidth required margin="normal" type="number" />
            <TextField label="Length" name="Length" value={formData.Length} onChange={handleInputChange} fullWidth required margin="normal" type="number" />
            <TextField label="Price" name="Price" value={formData.Price} onChange={handleInputChange} fullWidth required margin="normal" type="number" />
            <div style={{ marginTop: '20px' }}>
              <label>Features</label>
              <JoditEditor
                ref={editor}
                value={formData.Features}
                onChange={handleEditorChange}
              />
            </div>
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

export default VideoToCartoonPackages;
