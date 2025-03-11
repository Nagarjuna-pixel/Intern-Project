import React, { useState } from "react";
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  PieChartOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Button, Menu } from "antd";
import { useNavigate } from "react-router-dom";

const Dashboard_Sidebar = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState(""); // Track selected key to display button conditionally

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleMenuClick = ({ key }) => {
    setSelectedKey(key); // Update the selected key when a menu item is clicked
    navigate(key); // Navigate to the selected route
  };

  const items = [
    { key: "/AdminDashboard", icon: <PieChartOutlined />, label: "Home" },
    { key: "/Employees", icon: <DesktopOutlined />, label: "Employees" },
    { key: "/EmployeeAttendance", icon: <ContainerOutlined />, label: "Employee Attendance" },
    {
      key: "sub1",
      label: "Leave",
      icon: <MailOutlined />,
      children: [
        { key: "/Adminapplyleave", label: "Apply Leave" },
        { key: "/Adminleaverequest", label: "Leave Request" },
      ],
    },
    {
      key: "sub2",
      label: "Training",
      icon: <AppstoreOutlined />,
      children: [
        { key: "/Admintrainingschedule", label: "Training Schedule" },
        { key: "/Admintrainingattendance", label: "Training Attendance History" },
        { key: "/Admintrainingfeedback", label: "Training Feedback" },
        { key: "/AdminQuestionscreatingfeedback", label: "Training Questions Feedback" },
      ],
    },
    {
      key: "sub3",
      label: "Resignation",
      icon: <AppstoreOutlined />,
      children: [
        { key: "/Adminapplyresignation", label: "Apply Resignation" },
        { key: "/Adminresignationrequest", label: "Resignation History" },
      ],
    },
  ];

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: collapsed ? 80 : 256,
        height: "117vh",
        backgroundColor: "#001529",
        zIndex: 1000,
        paddingTop: "10px",
        transition: "width 0.3s ease-in-out",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Sidebar Header */}
      <div style={{ display: "flex", alignItems: "center", padding: "0 10px", marginBottom: "10px" }}>
        {/* Sidebar Toggle Button (Always Visible) */}
        <Button
          type="primary"
          onClick={toggleCollapsed}
          style={{
            width: "50px",
            height: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: "10px", // Push the AMS heading to the right
          }}
        >
          {collapsed ? <MenuUnfoldOutlined style={{ fontSize: "20px", marginRight: "50px" }} /> : <MenuFoldOutlined style={{ fontSize: "20px", marginRight: "50px" }} />}
        </Button>
      </div>

      {/* Sidebar Title "AMS" (Always Visible) */}
      <h1
        style={{
          color: "whitesmoke",
          whiteSpace: "nowrap",
          fontSize: collapsed ? "30px" : "30px",
          transition: "font-size 0.3s ease",
          textAlign: "center",
        }}
      >
        AMS
      </h1>

      {/* Sidebar Menu */}
      <Menu
      className="menuitem"
        onClick={handleMenuClick}
        selectedKeys={[selectedKey]} // Highlight the selected menu item
        defaultSelectedKeys={["/AdminDashboard"]}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
        style={{ width: "100%"}}
        // Add margin bottom for each menu item using inline style or customize further
        renderItem={(item) => (
          <Menu.Item key={item.key} style={{ marginBottom: "10px" }}>
            {item.icon}
            {item.label}
          </Menu.Item>
        )}
      />
    </div>
  );
};

export default Dashboard_Sidebar;


