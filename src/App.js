import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Select,
  MenuItem,
} from "@mui/material";

const AttendanceApp = () => {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("Present");
  const [editIndex, setEditIndex] = useState(null);
  const [open, setOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("attendanceData")) || [];
    setStudents(storedData);
  }, []);

  useEffect(() => {
    localStorage.setItem("attendanceData", JSON.stringify(students));
  }, [students]);

  const handleAddOrUpdate = () => {
    if (name.trim() === "") return;
    if (editIndex !== null) {
      const updatedStudents = [...students];
      updatedStudents[editIndex] = { name, status };
      setStudents(updatedStudents);
      setEditIndex(null);
    } else {
      setStudents([...students, { name, status }]);
    }
    setName("");
    setStatus("Present");
  };

  const handleEdit = (index) => {
    setName(students[index].name);
    setStatus(students[index].status);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    setDeleteIndex(index);
    setOpen(true);
  };

  const confirmDelete = () => {
    const updatedStudents = students.filter((_, i) => i !== deleteIndex);
    setStudents(updatedStudents);
    setOpen(false);
    setDeleteIndex(null);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Attendance Management System</h2>
      <TextField
        label="Student Name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Select value={status} onChange={(e) => setStatus(e.target.value)}>
        <MenuItem value="Present">Present</MenuItem>
        <MenuItem value="Absent">Absent</MenuItem>
      </Select>
      <Button variant="contained" color="primary" onClick={handleAddOrUpdate}>
        {editIndex !== null ? "Update" : "Add"}
      </Button>
      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student, index) => (
              <TableRow key={index}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.status}</TableCell>
                <TableCell>
                  <Button color="secondary" onClick={() => handleEdit(index)}>
                    Edit
                  </Button>
                  <Button color="error" onClick={() => handleDelete(index)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this record?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AttendanceApp;
