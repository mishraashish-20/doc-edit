import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Button, TextField, Typography, Tabs, Tab } from "@mui/material";

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      navigate("/");
    }
  }, [navigate]);

  const handleTabChange = (_, newValue) => {
    setActiveTab(newValue);
    setFormData({ name: "", email: "", password: "" }); // Reset form data
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const apiUrl =
      activeTab === "login"
        ? "http://localhost:5000/login"
        : "http://localhost:5000/register";

    try {
      const response = await axios.post(apiUrl, formData, {
        withCredentials: true,
      });
      console.log("Response:", response.data);
      alert(`Success: ${response.data.message}`);
      if (activeTab === "login") {
        localStorage.setItem("isLoggedIn", "true");
        navigate("/");
      } else {
        setActiveTab("login");
      }
    } catch (error) {
      console.error("Error:", error);
      alert(
        `Error: ${error.response?.data?.message || "Something went wrong!"}`
      );
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 400,
        margin: "auto",
        mt: 8,
        p: 2,
        border: "1px solid #ccc",
        borderRadius: 2,
      }}
    >
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        centered
        textColor="primary"
        indicatorColor="primary"
      >
        <Tab label="Login" value="login" />
        <Tab label="Register" value="register" />
      </Tabs>

      {activeTab === "register" && (
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          margin="normal"
        />
      )}

      <TextField
        fullWidth
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        margin="normal"
      />

      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
        onClick={handleSubmit}
      >
        {activeTab === "login" ? "Login" : "Register"}
      </Button>
    </Box>
  );
};

export default AuthPage;
