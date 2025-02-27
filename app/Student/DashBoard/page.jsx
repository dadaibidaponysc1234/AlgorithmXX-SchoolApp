"use client";
import { UserProvider } from "@/app/Components/StudentDashBoard/context/UserProvider";
import Studentdashboard from "@/app/Components/StudentDashBoard/Pages/Studentdashboard";
import React from "react";

const Dashboard = () => {
  return (
    <UserProvider>
      <Studentdashboard />
    </UserProvider>
  );
};

export default Dashboard;
