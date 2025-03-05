import React, { useState, useEffect } from "react";
import "./EmployeeHome.css";

const EmployeeHome = ({ user })  => {
  const [activeSection, setActiveSection] = useState("profile");
  const [profile, setProfile] = useState(null);
  const [subSection, setSubSection] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user || !user.id) {
        console.error("User data not available or ID is missing");
        return;
      }

      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      console.log("Fetching profile for ID:", user.id); // Double-check the id

      try {
        const response = await fetch(
          `http://localhost:5000/api/employees/profile/${user.id}`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`); // Improve error message
        }

        const data = await response.json();
        console.log("Profile Data:", data);
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setProfile(null);
      }
    };

    fetchProfile();
  }, [user]);

  const renderContent = () => {
    if (activeSection === "profile") {
      return profile ? (
        <MyProfile profile={profile} />
      ) : (
        <p>Loading profile...</p>
      );
    } else if (activeSection === "leaves") {
      return subSection === "apply" ? (
        <ApplyLeave emp_id={profile?.id} />
      ) : (
        <LeaveHistory emp_id={profile?.id} />
      );
    }
    return null;
  };

  return (
    <div className='employee-home'>
      <div className='sidebar'>
        <div className='sidebar-header'>
          <span className='profile-icon'>👤</span>
          <h3>Employee</h3>
        </div>
        <ul>
          <li
            onClick={() => {
              setActiveSection("profile");
              setSubSection("");
            }}
            className={activeSection === "profile" ? "active" : ""}
          >
            My Profile
          </li>
          <li
            onClick={() => {
              setActiveSection("leaves");
              setSubSection("apply");
            }}
            className={activeSection === "leaves" ? "active" : ""}
          >
            Leaves
          </li>
          {activeSection === "leaves" && (
            <ul>
              <li
                onClick={() => setSubSection("apply")}
                className={subSection === "apply" ? "active" : ""}
              >
                Apply Leave
              </li>
              <li
                onClick={() => setSubSection("manage")}
                className={subSection === "manage" ? "active" : ""}
              >
                Manage Leave
              </li>
            </ul>
          )}
          <li onClick={() => alert("Logout clicked")}>Logout</li>
        </ul>
      </div>
      <div className='content'>{renderContent()}</div>
    </div>
  );
};

const MyProfile = ({ profile }) => {
  return (
    <div className='profile-container'>
      <h2>My Profile</h2>
      <table className='profile-table'>
        <tbody>
          <tr>
            <th>ID</th>
            <td>{profile.id}</td>
          </tr>
          <tr>
            <th>Name</th>
            <td>{profile.name}</td>
          </tr>
          <tr>
            <th>Job Position</th>
            <td>{profile.job_position}</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>{profile.email}</td>
          </tr>
          <tr>
            <th>Phone Number</th>
            <td>{profile.phone_number}</td>
          </tr>
          <tr>
            <th>Qualification</th>
            <td>{profile.qualification}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
const ApplyLeave = ({ user_id }) => {
  const [description, setDescription] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!fromDate || !toDate) {
      setError("Start date and end date are required.");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("user");

      if (!token || !userData) {
        setError("User is not logged in. Please log in again.");
        setLoading(false);
        return;
      }

      const user = JSON.parse(userData);
      console.log("Applying leave for User ID:", user.id); // Debugging

     const requestBody = {
       emp_id: user.id, // Use the authenticated user ID
       userId: user.id, // Use the authenticated user ID
       description: description, // Use description (matches backend and table)
       from_date: fromDate, // Use from_date (matches backend and table)
       to_date: toDate, // Use to_date (matches backend and table)
       status: "Pending", // Default status (matches backend and table)
     };

      const response = await fetch(
        "http://localhost:5000/api/leave-applications/apply",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestBody),
        }
      );

      const data = await response.json();
      console.log("Response data:", data);

      if (!response.ok) throw new Error(data.error || "Failed to apply leave");

      alert(data.message);
      setDescription("");
      setFromDate("");
      setToDate("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

 return (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "50vh",
    }}
  >
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        width: "320px",
        padding: "20px",
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "10px" }}>
        Apply for Leave
      </h2>

      {error && (
        <div style={{ color: "red", textAlign: "center" }}>{error}</div>
      )}

      <input
        type='date'
        value={fromDate}
        onChange={(e) => setFromDate(e.target.value)}
        placeholder='From Date'
        required
        style={{
          padding: "10px",
          border: "2px solid #ddd",
          borderRadius: "4px",
        }}
      />

      <input
        type='date'
        value={toDate}
        onChange={(e) => setToDate(e.target.value)}
        placeholder='To Date'
        required
        style={{
          padding: "10px",
          border: "2px solid #ddd",
          borderRadius: "4px",
        }}
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder='Enter Leave Description'
        style={{
          padding: "10px",
          border: "2px solid #ddd",
          borderRadius: "4px",
          resize: "none",
          height: "80px",
        }}
      />

      <button
        type='submit'
        onClick={handleSubmit}
        disabled={loading}
        style={{
          padding: "10px",
          backgroundColor: loading ? "#ccc" : "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Submitting..." : "Apply Leave"}
      </button>
    </div>
  </div>
);
};
const tableStyles = {
  width: "100%",
  borderCollapse: "collapse",
  minWidth: "600px",
};

const tableHeaderStyle = {
  backgroundColor: "green",
  fontWeight: "bold",
  padding: "10px",
  textAlign: "left",
  color: "white",
};

const tableCellStyle = {
  padding: "10px",
  borderBottom: "1px solid #ddd",
};

const rowEvenStyle = {
  backgroundColor: "#f9f9f9",
};

const rowOddStyle = {
  backgroundColor: "#ffffff",
};

const LeaveHistory = () => {
  const [leaveHistory, setLeaveHistory] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLeaveHistory = async () => {
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("user");
console.log("User Data:", userData);



      if (!token || !userData) {
        setError("User is not logged in.");
        return;
      }

      const user = JSON.parse(userData);

      console.log(leaveHistory); // Debug to check if API response contains all fields

      try {
        const response = await fetch(
          `http://localhost:5000/api/leave-applications/history/${user.id}`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch leave history");
        }

        const data = await response.json();
        setLeaveHistory(data);
      } catch (err) {
        console.error("Error fetching leave history:", err);
        setError(err.message);
      }
    };

  
    fetchLeaveHistory();
  }, []);

 

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Manage Leave</h2>
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
        <table style={tableStyles}>
          <thead>
            <tr>
              <th style={tableHeaderStyle}>S.No</th>
              <th style={tableHeaderStyle}>From Date</th>
              <th style={tableHeaderStyle}>To Date</th>
              <th style={tableHeaderStyle}>Description</th>
              <th style={tableHeaderStyle}>Status</th>
            </tr>
          </thead>
          <tbody>
            {leaveHistory.length > 0 ? (
              leaveHistory.map((leave, index) => (
                <tr
                  key={leave.id}
                  style={index % 2 === 0 ? rowEvenStyle : rowOddStyle}
                >
                  <td style={tableCellStyle}>{index + 1}</td>
                  <td style={tableCellStyle}>
                    {new Date(leave.from_date).toISOString().split("T")[0]}
                  </td>
                  <td style={tableCellStyle}>
                    {new Date(leave.to_date).toISOString().split("T")[0]}
                  </td>
                  <td style={tableCellStyle}>{leave.description}</td>

                  <td style={tableCellStyle}>{leave.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='5' style={tableCellStyle}>
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


export default EmployeeHome;
