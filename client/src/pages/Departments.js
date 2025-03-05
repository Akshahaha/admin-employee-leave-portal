// client/src/pages/Departments.js
import React, { useState, useEffect } from "react";
import { departmentService } from "../services/departmentService"; // Import departmentService
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Box,
  CircularProgress, // Import CircularProgress for loading state
} from "@mui/material"; // Import Material-UI components
import { Link } from "react-router-dom"; // Import Link

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); //Add error state

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        setLoading(true); // Set loading to true before fetching
        const data = await departmentService.getAllDepartments();
        setDepartments(data);
      } catch (error) {
        console.error("Error fetching departments:", error);
        setError(error.message || "Failed to load departments."); // Set error message
      } finally {
        setLoading(false); // Set loading to false after fetching (success or error)
      }
    };

    fetchDepartments();
  }, []);

  if (loading) {
    return (
      <Container>
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          height='200px'
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography color='error' align='center' mt={4}>
          Error: {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Box
        mt={4}
        display='flex'
        justifyContent='space-between'
        alignItems='center'
      >
        <Typography variant='h4' component='h1'>
          Departments
        </Typography>
        <Button
          variant='contained'
          color='primary'
          component={Link}
          to='/admin/departments/add'
        >
          Add New Department
        </Button>
      </Box>

      <List>
        {departments.map((department) => (
          <ListItem key={department.id} divider>
            <ListItemText
              primary={department.name}
              secondary={department.description}
            />
            <Button
              component={Link}
              to={`/admin/departments/edit/${department.id}`}
            >
              Edit
            </Button>
            <Button
              color='error'
              onClick={() => console.log(`Delete ${department.name}`)}
            >
              Delete
            </Button>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Departments;
