// AdminHome.js
import React, { useEffect, useState } from "react";
import "./AdminHome.css";

const AdminHome = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [subSection, setSubSection] = useState("");

  // Placeholder data
  const totalEmployees = 50;
  const totalDepartments = 5;
  const totalLeaveTypes = 3;

  const renderContent = () => {
    if (activeSection === "dashboard") {
      return (
        <div className='dashboard'>
          <h2>Dashboard</h2>
          <div className='dashboard-boxes'>
            <div className='box'>
              <h3>Total Registered Employees</h3>
              <p>{totalEmployees}</p>
            </div>
            <div className='box'>
              <h3>Total Departments</h3>
              <p>{totalDepartments}</p>
            </div>
            <div className='box'>
              <h3>Total Leave Types</h3>
              <p>{totalLeaveTypes}</p>
            </div>
          </div>
        </div>
      );
    } else if (activeSection === "department") {
      return subSection === "add" ? <AddDepartment /> : <ManageDepartments />;
    } else if (activeSection === "leaveType") {
      return subSection === "add" ? <AddLeaveType /> : <ManageLeave />;
    } else if (activeSection === "employees") {
      return subSection === "add" ? <AddEmployee /> : <ManageEmployee />;
    } else if (activeSection === "leaveManagement") {
      return <LeaveManagement />;
    }
    return null;
  };

  return (
    <div className='admin-home'>
      <div className='sidebar'>
        <div className='sidebar-header'>
          <span className='profile-icon'>👤</span>
          <h3>Admin</h3>
        </div>
        <ul>
          <li
            onClick={() => {
              setActiveSection("dashboard");
              setSubSection("");
            }}
            className={activeSection === "dashboard" ? "active" : ""}
          >
            Dashboard
          </li>
          <li
            onClick={() => {
              setActiveSection("department");
              setSubSection("add");
            }}
            className={activeSection === "department" ? "active" : ""}
          >
            Department
          </li>
          {activeSection === "department" && (
            <ul>
              <li
                onClick={() => setSubSection("add")}
                className={subSection === "add" ? "active" : ""}
              >
                Add Department
              </li>
              <li
                onClick={() => setSubSection("manage")}
                className={subSection === "manage" ? "active" : ""}
              >
                Manage Department
              </li>
            </ul>
          )}
          <li
            onClick={() => {
              setActiveSection("leaveType");
              setSubSection("add");
            }}
            className={activeSection === "leaveType" ? "active" : ""}
          >
            Leave Type
          </li>
          {activeSection === "leaveType" && (
            <ul>
              <li
                onClick={() => setSubSection("add")}
                className={subSection === "add" ? "active" : ""}
              >
                Add Leave Type
              </li>
              <li
                onClick={() => setSubSection("manage")}
                className={subSection === "manage" ? "active" : ""}
              >
                Manage Leave Type
              </li>
            </ul>
          )}

          <li
            onClick={() => {
              setActiveSection("employees");
              setSubSection("add");
            }}
            className={activeSection === "employees" ? "active" : ""}
          >
            Employees
          </li>
          {activeSection === "employees" && (
            <ul>
              <li
                onClick={() => setSubSection("add")}
                className={subSection === "add" ? "active" : ""}
              >
                Add Employee
              </li>
              <li
                onClick={() => setSubSection("manage")}
                className={subSection === "manage" ? "active" : ""}
              >
                Manage Employee
              </li>
            </ul>
          )}
          <li
            onClick={() => {
              setActiveSection("leaveManagement");
              setSubSection("");
            }}
            className={activeSection === "leaveManagement" ? "active" : ""}
          >
            Leave Management
          </li>
          <li onClick={() => alert("Logout clicked")}>Logout</li>
        </ul>
      </div>
      <div className='content'>{renderContent()}</div>
    </div>
  );
};

const AddDepartment = () => {
  const [deptCode, setDeptCode] = useState("");
  const [deptName, setDeptName] = useState("");
  const [deptShortName, setDeptShortName] = useState("");
  const [error, setError] = useState(null); // ✅ Ensure setError is defined
  // const [success, setSuccess] = useState(null); // ✅ Ensure setSuccess is defined
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/departments/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            deptCode,
            name: deptName,
            shortName: deptShortName,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create department");
      }

      const data = await response.json();
      // setSuccess("Department created successfully!");
      setError(null); // ✅ Clear error state on success
      setMessage("✅ Department added successfully!");
      setDeptCode("");
      setDeptName("");
      setDeptShortName("");
    } catch (err) {
      setError(err.message); // ✅ Ensure setError is defined before using
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "10vh",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          width: "300px",
          padding: "20px",
          backgroundColor: "#f5f5f5",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Add Department
        </h2>

        <input
          type='text'
          placeholder='Enter Department Code'
          value={deptCode}
          onChange={(e) => setDeptCode(e.target.value)}
          style={{
            padding: "10px",
            border: "2px solid #ddd",
            borderRadius: "4px",
          }}
        />

        <input
          type='text'
          placeholder='Enter Department Name'
          value={deptName}
          onChange={(e) => setDeptName(e.target.value)}
          style={{
            padding: "10px",
            border: "2px solid #ddd",
            borderRadius: "4px",
          }}
        />

        <input
          type='text'
          placeholder='Enter Department Short Name'
          value={deptShortName}
          onChange={(e) => setDeptShortName(e.target.value)}
          style={{
            padding: "10px",
            border: "2px solid #ddd",
            borderRadius: "4px",
          }}
        />

        <button
          onClick={handleSubmit}
          style={{
            padding: "10px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "#45a049",
            },
          }}
        >
          Add Department
        </button>
        {/* Display success/error messages */}

        {error && (
          <div style={{ color: "red", marginTop: "10px" }}>{error}</div>
        )}
        {message && (
          <div style={{ color: "green", marginTop: "10px" }}>{message}</div>
        )}
      </div>
    </div>
  );
};

const ManageDepartments = () => {
  const [departments, setDepartments] = useState([]);
  const [editDept, setEditDept] = useState(null);
  const [deptCode, setDeptCode] = useState("");
  const [deptName, setDeptName] = useState("");
  const [deptShortName, setDeptShortName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  // Fetch all departments
  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/departments", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Add if using authentication
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch departments: ${response.statusText}`);
      }

      const data = await response.json();
      setDepartments(data);
    } catch (error) {
      setError(error.message);
      console.error("Error fetching departments:", error.message);
    }
  };

  // Handle edit
  const handleEdit = (dept) => {
    setEditDept(dept.id);
    setDeptCode(dept.deptCode);
    setDeptName(dept.name);
    setDeptShortName(dept.shortName);
  };

  // Handle update
  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/departments/${editDept}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Add if required
          },
          body: JSON.stringify({
            deptCode,
            name: deptName,
            shortName: deptShortName,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update department");
      }

      setMessage("✅ Department updated successfully!");
      setEditDept(null);
      fetchDepartments(); // Refresh the list
    } catch (err) {
      setError("Error updating department");
    }
  };
  // const sectionStyle = {
  //   padding: "20px",
  //   border: "1px solid #ccc",
  //   borderRadius: "8px",
  //   marginBottom: "20px",
  // };

  const inputStyle = {
    padding: "8px",
    margin: "5px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  };

  const updateButtonStyle = {
    backgroundColor: "green",
    color: "white",
    padding: "5px 10px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  const editButtonStyle = {
    backgroundColor: "orange",
    color: "white",
    padding: "5px 10px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  const tableHeaderStyle = {
    backgroundColor: "green",
    fontWeight: "bold",
    padding: "10px",
    textAlign: "left",
  };

  const rowEvenStyle = {
    backgroundColor: "#f9f9f9",
  };

  const rowOddStyle = {
    backgroundColor: "#ffffff",
  };

  const tableCellStyle = {
    padding: "10px",
    borderBottom: "1px solid #ddd",
  };

  const editFormStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ marginBottom: "10px" }}>Manage Departments</h2>
      {message && (
        <p style={{ color: "green", fontWeight: "bold" }}>{message}</p>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div
        style={{
          overflowX: "auto",
          maxHeight: "400px",
          overflowY: "scroll",
          border: "1px solid #ddd",
          borderRadius: "8px",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            minWidth: "600px",
          }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: "#007BFF",
                color: "white",
                textAlign: "left",
              }}
            >
              <th style={tableHeaderStyle}>S.No</th>
              <th style={tableHeaderStyle}>Dept Code</th>
              <th style={tableHeaderStyle}>Name</th>
              <th style={tableHeaderStyle}>Short Name</th>
              <th style={tableHeaderStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {departments.length > 0 ? (
              departments.map((dept, index) => (
                <tr
                  key={dept.id}
                  style={index % 2 === 0 ? rowEvenStyle : rowOddStyle}
                >
                  <td style={tableCellStyle}>{index + 1}</td>
                  <td style={tableCellStyle}>{dept.deptCode}</td>
                  <td style={tableCellStyle}>{dept.name}</td>
                  <td style={tableCellStyle}>{dept.shortName}</td>
                  <td style={tableCellStyle}>
                    <button
                      style={editButtonStyle}
                      onClick={() => handleEdit(dept)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='5' style={tableCellStyle}>
                  No Departments Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {editDept && (
        <div style={editFormStyle}>
          <h3>Edit Department</h3>
          <input
            type='text'
            value={deptCode}
            onChange={(e) => setDeptCode(e.target.value)}
            placeholder='Dept Code'
            style={inputStyle}
          />
          <input
            type='text'
            value={deptName}
            onChange={(e) => setDeptName(e.target.value)}
            placeholder='Dept Name'
            style={inputStyle}
          />
          <input
            type='text'
            value={deptShortName}
            onChange={(e) => setDeptShortName(e.target.value)}
            placeholder='Dept Short Name'
            style={inputStyle}
          />
          <button onClick={handleUpdate} style={updateButtonStyle}>
            Update
          </button>
        </div>
      )}
    </div>
  );
};

// const sectionStyle = {
//   padding: "20px",
//   backgroundColor: "#f8f9fa",
//   borderRadius: "5px",
// };

// const inputStyle = {
//   padding: "8px",
//   margin: "5px",
//   border: "1px solid #ccc",
//   borderRadius: "4px",
// };

// const buttonStyle = {
//   padding: "8px 12px",
//   backgroundColor: "#007bff",
//   color: "white",
//   border: "none",
//   borderRadius: "5px",
//   cursor: "pointer",
// };

// const editButtonStyle = { ...buttonStyle, backgroundColor: "#28a745" };
// const updateButtonStyle = { ...buttonStyle, backgroundColor: "#ffc107" };

// const tableStyle = {
//   width: "100%",
//   borderCollapse: "collapse",
//   marginTop: "10px",
// };

// const headerStyle = {
//   fontWeight: "bold",
//   backgroundColor: "#e9ecef",
//   padding: "10px",
// };

// const rowStyle = {
//   borderBottom: "1px solid #ddd",
// };

const AddLeaveType = ({ onAdd }) => {
  const [leaveType, setLeaveType] = useState("");
  const [description, setDescription] = useState("");
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    // Reset any previous error messages
    setMessage("");

    // Log the form data being submitted
    console.log("📝 Form Data:", { leaveType, description });

    if (!leaveType || !description) {
      setMessage("❌ Please fill all fields");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("❌ No token found in localStorage");
      setMessage("❌ Authentication error: No token found");
      return;
    }

    console.log("🔍 Sending Token:", token);
    console.log(
      "📊 Token Decoded Header:",
      JSON.parse(atob(token.split(".")[0]))
    );
    console.log(
      "📊 Token Decoded Payload:",
      JSON.parse(atob(token.split(".")[1]))
    );

    try {
      console.log("🚀 Starting API request to add leave type");
      console.log(
        "🔄 Request Body:",
        JSON.stringify({ name: leaveType, description })
      );

      const response = await fetch("http://localhost:5000/api/leave-types", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: leaveType, description }),
      });

      console.log("📡 Response Status:", response.status, response.statusText);
      console.log(
        "📡 Response Headers:",
        Object.fromEntries([...response.headers])
      );

      // Try to get error details regardless of response status
      let responseBody;
      try {
        responseBody = await response.json();
        console.log("📡 Response Body:", responseBody);
      } catch (parseError) {
        console.error("📡 Error parsing response:", parseError);
        console.log("📡 Raw Response:", await response.text());
      }

      if (!response.ok) {
        console.error("❌ API Error:", {
          status: response.status,
          statusText: response.statusText,
          body: responseBody,
        });
        throw new Error(
          `Failed to add leave type: ${response.status} - ${response.statusText}` +
            (responseBody?.error ? ` - ${responseBody.error}` : "")
        );
      }
      // onAdd({
      //   id: responseBody?.id || Date.now(),
      //   name: leaveType,
      //   description,
      // });
      console.log("✅ Successfully added leave type:", responseBody);

      const newLeaveType = {
        id: responseBody?.id || Date.now(),
        name: leaveType,
        description,
      };

      // Add the new leave type to the local state
      setLeaveTypes([...leaveTypes, newLeaveType]);

      // Only add to the UI if we get a valid response
      setLeaveTypes([...leaveTypes, newLeaveType]);

      setLeaveType("");
      setDescription("");
      setMessage("✅ Leave Type Added Successfully!");
      setTimeout(() => setMessage(""), 2000);
    } catch (error) {
      console.error("❌ Detailed Error:", error);
      console.error("❌ Error Stack:", error.stack);
      setMessage(`❌ ${error.message}`);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "10vh",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          width: "300px",
          padding: "20px",
          backgroundColor: "#f5f5f5",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Add Leave Type
        </h2>

        <input
          type='text'
          placeholder='Leave Type'
          value={leaveType}
          onChange={(e) => setLeaveType(e.target.value)}
          style={{
            padding: "10px",
            border: "2px solid #ddd",
            borderRadius: "4px",
          }}
        />

        <textarea
          placeholder='Description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{
            padding: "10px",
            border: "2px solid #ddd",
            borderRadius: "4px",
            height: "80px", // Making description box wider
            resize: "none",
          }}
        />

        <button
          onClick={handleSubmit}
          style={{
            padding: "10px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Add Leave
        </button>

        {/* Display success/error messages */}
        {error && (
          <div style={{ color: "red", marginTop: "10px" }}>{error}</div>
        )}
        {message && (
          <div style={{ color: "green", marginTop: "10px" }}>{message}</div>
        )}
      </div>
    </div>
  );
};
const ManageLeave = () => {
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editLeaveType, setEditLeaveType] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  // 🔄 Fetch Leave Types from API
  const fetchLeaveData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/leave-types", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (!response.ok)
        throw new Error(data.message || "Failed to fetch leave types");

      setLeaveTypes(data); // Set state with fetched leave types
    } catch (error) {
      console.error("Error fetching leave types:", error);
    }
  };

  useEffect(() => {
    fetchLeaveData(); // Fetch leave types when page loads
  }, []);

  // ✏️ Start Editing a Leave Type
  const handleEdit = (leave) => {
    setEditId(leave.id);
    setEditLeaveType(leave.name);
    setEditDescription(leave.description);
  };

  // 🔄 Update Leave Type in Backend
  const handleUpdate = async () => {
    const token = localStorage.getItem("token");
    if (!editLeaveType || !editDescription) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/leave-types/${editId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: editLeaveType,
            description: editDescription,
          }),
        }
      );

      const result = await response.json();
      if (!response.ok)
        throw new Error(result.message || "Failed to update leave");

      alert("Leave Updated Successfully!");
      fetchLeaveData(); // Refresh list
      setEditId(null);
      setEditLeaveType("");
      setEditDescription("");
    } catch (error) {
      console.error("Error updating leave type:", error);
      alert("Failed to update leave type.");
    }
  };
  const inputStyle = {
    padding: "8px",
    margin: "5px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  };

  const updateButtonStyle = {
    backgroundColor: "green",
    color: "white",
    padding: "5px 10px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  const editButtonStyle = {
    backgroundColor: "orange",
    color: "white",
    padding: "5px 10px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  const tableHeaderStyle = {
    backgroundColor: "green",
    fontWeight: "bold",
    padding: "10px",
    textAlign: "left",
  };

  const rowEvenStyle = {
    backgroundColor: "#f9f9f9",
  };

  const rowOddStyle = {
    backgroundColor: "#ffffff",
  };

  const tableCellStyle = {
    padding: "10px",
    borderBottom: "1px solid #ddd",
  };

  const editFormStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  };
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ marginBottom: "10px" }}>Manage Leave Type</h2>
      {message && (
        <p style={{ color: "green", fontWeight: "bold" }}>{message}</p>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div
        style={{
          overflowX: "auto",
          maxHeight: "400px",
          overflowY: "scroll",
          border: "1px solid #ddd",
          borderRadius: "8px",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            minWidth: "600px",
          }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: "#007BFF",
                color: "white",
                textAlign: "left",
              }}
            >
              <th style={tableHeaderStyle}>S.No</th>
              <th style={tableHeaderStyle}>Leave Type</th>
              <th style={tableHeaderStyle}>Description</th>
              <th style={tableHeaderStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaveTypes.length > 0 ? (
              leaveTypes.map((lt, index) => (
                <tr
                  key={lt.id}
                  style={index % 2 === 0 ? rowEvenStyle : rowOddStyle}
                >
                  <td style={tableCellStyle}>{index + 1}</td>
                  <td style={tableCellStyle}>{lt.name}</td>
                  <td style={tableCellStyle}>{lt.description}</td>
                  <td style={tableCellStyle}>
                    <button
                      style={editButtonStyle}
                      onClick={() => handleEdit(lt)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='4' style={tableCellStyle}>
                  No Leave Types Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {editId && (
        <div style={editFormStyle}>
          <h3>Edit Leave Type</h3>
          <input
            type='text'
            value={editLeaveType}
            onChange={(e) => setEditLeaveType(e.target.value)}
            placeholder='Leave Type'
            style={inputStyle}
          />
          <input
            type='text'
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            placeholder='Description'
            style={inputStyle}
          />
          <button onClick={handleUpdate} style={updateButtonStyle}>
            Update
          </button>
        </div>
      )}
    </div>
  );
};

const AddEmployee = () => {
  const [name, setName] = useState("");
  const [jobPosition, setJobPosition] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [qualification, setQualification] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (!name || !jobPosition || !email || !phoneNumber || !qualification) {
      setError("All fields are required.");
      return;
    }
    const token = localStorage.getItem("token");
    console.log("Token:", token);

    try {
      const response = await fetch("http://localhost:5000/api/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          job_position: jobPosition,
          email,
          phone_number: phoneNumber,
          qualification,
        }),
      });

      const result = await response.json();

      console.log("Response:", result);
      if (!response.ok) throw new Error(result.error);

      setMessage("Employee added successfully!");
      setError(null);
      setName("");
      setJobPosition("");
      setEmail("");
      setPhoneNumber("");
      setQualification("");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "10vh",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "300px",
          padding: "20px",
          backgroundColor: "#f5f5f5",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Add Employee</h2>

        <input
          type='text'
          placeholder='Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type='text'
          placeholder='Job Position'
          value={jobPosition}
          onChange={(e) => setJobPosition(e.target.value)}
        />
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='text'
          placeholder='Phone Number'
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <input
          type='text'
          placeholder='Qualification'
          value={qualification}
          onChange={(e) => setQualification(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          style={{
            padding: "10px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Add Employee
        </button>

        {error && <div style={{ color: "red" }}>{error}</div>}
        {message && <div style={{ color: "green" }}>{message}</div>}
      </div>
    </div>
  );
};

const ManageEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const [newName, setNewName] = useState("");
  const [newJob, setNewJob] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newQualification, setNewQualification] = useState("");
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editJob, setEditJob] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editQualification, setEditQualification] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem("token");

      // Check if token exists
      if (!token) {
        setError("Authentication token not found. Please log in.");
        console.error("Authentication token not found.");
        return; // Stop fetching if no token
      }

      const response = await fetch("http://localhost:5000/api/employees", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Corrected template literal
        },
      });

      if (!response.ok) {
        const errorMessage = `Failed to fetch employees: ${response.status} - ${response.statusText}`;
        setError(errorMessage);
        console.error(errorMessage);
        try {
          const errorData = await response.json(); // Try to get more specific error info from the server
          console.error("Server error details:", errorData); // Log the server's error response
        } catch (parseError) {
          console.error(
            "Failed to parse error response from server:",
            parseError
          );
        }
        return; // Stop processing if the request failed.
      }

      const data = await response.json();
      setEmployees(data && Array.isArray(data) ? data : []);
      console.log("Employees fetched successfully:", data); // Add success log
    } catch (error) {
      setError(`Error fetching employees: ${error.message}`);
      console.error("Error fetching employees:", error); // Log the full error object
    }
  };
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/employees/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete employee");
      }

      fetchEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error.message);
    }
  };

  const handleAddEmployee = async () => {
    if (!newName || !newJob || !newEmail || !newPhone || !newQualification) {
      setError("All fields are required.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: newName,
          job_position: newJob,
          email: newEmail,
          phone_number: newPhone,
          qualification: newQualification,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add employee");
      }

      setMessage("Employee added successfully!");
      setNewName("");
      setNewJob("");
      setNewEmail("");
      setNewPhone("");
      setNewQualification("");
      fetchEmployees();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEdit = (employee) => {
    setEditId(employee.id);
    setEditName(employee.name);
    setEditJob(employee.job_position);
    setEditEmail(employee.email);
    setEditPhone(employee.phone_number);
    setEditQualification(employee.qualification);
  };

  const handleUpdate = async () => {
    if (
      !editName ||
      !editJob ||
      !editEmail ||
      !editPhone ||
      !editQualification
    ) {
      setError("All fields are required.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/employees/${editId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: editName,
            job_position: editJob,
            email: editEmail,
            phone_number: editPhone,
            qualification: editQualification,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update employee");
      }

      setMessage("Employee updated successfully!");
      setEditId(null);
      setEditName("");
      setEditJob("");
      setEditEmail("");
      setEditPhone("");
      setEditQualification("");
      fetchEmployees();
    } catch (error) {
      setError(error.message);
    }
  };
  const inputStyle = {
    padding: "8px",
    margin: "5px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  };
  const updateButtonStyle = {
    backgroundColor: "green",
    color: "white",
    padding: "5px 10px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };
  const editButtonStyle = {
    backgroundColor: "orange",
    color: "white",
    padding: "5px 10px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };
  const tableHeaderStyle = {
    backgroundColor: "green",
    fontWeight: "bold",
    padding: "10px",
    textAlign: "left",
  };
  const rowEvenStyle = { backgroundColor: "#f9f9f9" };
  const rowOddStyle = { backgroundColor: "#ffffff" };
  const tableCellStyle = { padding: "10px", borderBottom: "1px solid #ddd" };
  const editFormStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  };
  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
      }}
    >
      <h2 style={{ marginBottom: "10px" }}>Manage Employees</h2>
      {message && (
        <p style={{ color: "green", fontWeight: "bold" }}>{message}</p>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Add Employee Button */}
      {/* <button onClick={handleAddEmployee} style={updateButtonStyle}>
        <button onClick={() => handleDelete(employees.id)}></button>
      </button> */}

      {/* Table for Employees */}
      <div
        style={{
          overflowX: "auto",
          maxHeight: "400px",
          overflowY: "scroll",
          border: "1px solid #ddd",
          borderRadius: "8px",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            minWidth: "600px",
          }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: "#007BFF",
                color: "white",
                textAlign: "left",
              }}
            >
              <th style={tableHeaderStyle}>S.No</th>
              <th style={tableHeaderStyle}>Name</th>
              <th style={tableHeaderStyle}>Job Position</th>
              <th style={tableHeaderStyle}>Email</th>
              <th style={tableHeaderStyle}>Phone Number</th>
              <th style={tableHeaderStyle}>Qualification</th>
              <th style={tableHeaderStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 ? (
              employees.map((emp, index) => (
                <tr
                  key={emp.id}
                  style={index % 2 === 0 ? rowEvenStyle : rowOddStyle}
                >
                  <td style={tableCellStyle}>{index + 1}</td>
                  <td style={tableCellStyle}>{emp.name}</td>
                  <td style={tableCellStyle}>{emp.job_position}</td>
                  <td style={tableCellStyle}>{emp.email}</td>
                  <td style={tableCellStyle}>{emp.phone_number}</td>
                  <td style={tableCellStyle}>{emp.qualification}</td>
                  <td style={tableCellStyle}>
                    <button
                      style={editButtonStyle}
                      onClick={() => handleEdit(emp)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='7' style={tableCellStyle}>
                  No Employees Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Form */}
      {editId && (
        <div style={editFormStyle}>
          <h3>Edit Employee</h3>
          <input
            type='text'
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            placeholder='Name'
            style={inputStyle}
          />
          <input
            type='text'
            value={editJob}
            onChange={(e) => setEditJob(e.target.value)}
            placeholder='Job Position'
            style={inputStyle}
          />
          <input
            type='email'
            value={editEmail}
            onChange={(e) => setEditEmail(e.target.value)}
            placeholder='Email'
            style={inputStyle}
          />
          <input
            type='text'
            value={editPhone}
            onChange={(e) => setEditPhone(e.target.value)}
            placeholder='Phone Number'
            style={inputStyle}
          />
          <input
            type='text'
            value={editQualification}
            onChange={(e) => setEditQualification(e.target.value)}
            placeholder='Qualification'
            style={inputStyle}
          />
          <button onClick={handleUpdate} style={updateButtonStyle}>
            Update
          </button>
        </div>
      )}
    </div>
  );
};
const LeaveManagement = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

 useEffect(() => {
   fetchLeaves(); // Fetch leaves when the component mounts
 }, []);

 const fetchLeaves = async () => {
   setLoading(true);
   setError("");
   try {
     const token = localStorage.getItem("token");
     const response = await fetch(
       "http://localhost:5000/api/leave-applications",
       {
         method: "GET",
         headers: { Authorization: `Bearer ${token}` },
       }
     );
     if (!response.ok) {
       throw new Error("Failed to fetch leaves");
     }
     const data = await response.json();
     setLeaves(data.filter((leave) => leave.status === "Pending")); // Only show pending leaves
   } catch (err) {
     setError(err.message);
   } finally {
     setLoading(false);
   }
 };

const updateLeaveStatus = async (leaveId, newStatus) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `http://localhost:5000/api/leave-applications/update-status/${leaveId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update leave status");
    }

    const data = await response.json();
    console.log("Leave status updated:", data);

    // Re-fetch leaves to update the UI with the new status
    fetchLeaves(); // This will refresh the leaves list and filter for Pending leaves
  } catch (error) {
    console.error("Error updating leave status:", error);
    setError("Failed to update leave status: " + error.message);
  }
};

if (loading) {
  return <div>Loading...</div>;
}

if (error) {
  return <div style={{ color: "red" }}>{error}</div>;
}
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Leave Management</h2>

      <div
        style={{
          overflowX: "auto",
          maxHeight: "400px",
          overflowY: "scroll",
          border: "1px solid #ddd",
          borderRadius: "8px",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
          }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Employee ID</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaves.length > 0 ? (
              leaves.map((leave) => (
                <tr
                  key={leave.id}
                  style={{
                    backgroundColor:
                      leave.status === "Pending" ? "#f9f9f9" : "#dff0d8",
                  }}
                >
                  <td>{leave.id}</td>
                  <td>{leave.emp_id}</td>
                  <td>
                    {new Date(leave.from_date).toISOString().split("T")[0]}
                  </td>
                  <td>{new Date(leave.to_date).toISOString().split("T")[0]}</td>
                  <td>{leave.description || "N/A"}</td>
                  <td>{leave.status}</td>
                  <td>
                    {leave.status === "Pending" ? (
                      <>
                        <button
                          onClick={() =>
                            updateLeaveStatus(leave.id, "Approved")
                          }
                          style={{
                            marginRight: "5px",
                            padding: "5px",
                            backgroundColor: "green",
                            color: "white",
                          }}
                        >
                          ✅ Approve
                        </button>
                        <button
                          onClick={() =>
                            updateLeaveStatus(leave.id, "Rejected")
                          }
                          style={{
                            padding: "5px",
                            backgroundColor: "red",
                            color: "white",
                          }}
                        >
                          ❌ Reject
                        </button>
                      </>
                    ) : (
                      <span>Updated</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='7' style={{ textAlign: "center" }}>
                  No Leave Records Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default AdminHome;
