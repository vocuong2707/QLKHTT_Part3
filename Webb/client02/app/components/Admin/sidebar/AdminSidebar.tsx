"use client";

import React, { FC, useEffect, useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useSelector } from "react-redux";
import { MenuItem, ProSidebar, Menu } from "react-pro-sidebar";
import {
  ArrowBackIosIcon,
  ArrowForwardIosIcon,
  HomeOutlinedIcon,
  GroupsIcon,
  ReceiptOutlinedIcon,
  VideoCallIcon,
  OndemandVideoIcon,
  WebIcon,
  QuizIcon,
  WysiwygIcon,
  SettingsIcon,
  ExitToAppIcon,
} from "./icon";
import Image from "next/image";
import avatarDefault from "../../../../public/asstes/avatar.png";

interface ItemProps {
  title: string;
  to: string;
  icon: JSX.Element;
  selected: string;
  setSelected: any;
}

const Item: FC<ItemProps> = ({ title, to, icon, selected, setSelected }) => {
  return (
    <MenuItem
      active={selected === title}
      onClick={() => setSelected(title)}
      icon={icon}
      className="menu-item"
    >
      <Link href={to} passHref>
        <Typography className="!text-[15px] !font-Poppins cursor-pointer hover:underline">
          {title}
        </Typography>
      </Link>
    </MenuItem>
  );
};

const Sidebar: FC = () => {
  const { user } = useSelector((state: any) => state.auth);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const { theme } = useTheme();

  return (
    <Box
      className={`transition-all duration-300 ${
        isCollapsed ? "w-[5rem]" : "w-[16rem]"
      }`}
      sx={{
        "& .pro-sidebar-inner": {
          background:
            theme === "dark"
              ? "linear-gradient(180deg, #1a1f37 0%, #1c253c 100%)"
              : "linear-gradient(180deg, #ffffff 0%, #f4f6fa 100%)",
          boxShadow:
            theme === "dark"
              ? "0 4px 15px rgba(0,0,0,0.3)"
              : "0 4px 15px rgba(0,0,0,0.05)",
        },
        "& .pro-menu-item": {
          color: theme === "dark" ? "#ffffffc1" : "#333",
        },
        "& .pro-menu-item.active": {
          backgroundColor:
            theme === "dark" ? "rgba(91,111,230,0.2)" : "rgba(63,81,181,0.1)",
          color: theme === "dark" ? "#5b6fe6" : "#3f51b5",
        },
      }}
    >
      <ProSidebar
        collapsed={isCollapsed}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          transition: "all 0.3s ease-in-out",
          overflowY: "auto",
        }}
      >
        <Menu iconShape="square">
          {/* LOGO & COLLAPSE ICON */}
          <MenuItem
            icon={isCollapsed ? <ArrowForwardIosIcon /> : undefined}
            onClick={() => setIsCollapsed(!isCollapsed)}
            style={{
              margin: "10px 0",
              background: "inherit",
            }}
          >
            {!isCollapsed && (
              <Box display="flex" alignItems="center" ml="15px">
                <Link href="/">
                  <Typography
                    variant="h6"
                    className="text-gray-800 dark:text-white font-bold cursor-pointer"
                  >
                    ELearning
                  </Typography>
                </Link>
                <IconButton
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className="ml-auto"
                >
                  <ArrowBackIosIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {/* USER INFO */}
          {!isCollapsed && (
            <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
              <Image
                src={user?.avatar?.url || avatarDefault}
                alt="profile-user"
                width={80}
                height={80}
                className="rounded-full border-[2px] border-gray-300"
              />
              <Typography
                variant="subtitle1"
                sx={{
                  color: theme === "dark" ? "#e3e4ff" : "#3f51b5",
                  mt: 2,
                }}
              >
                {user?.name || "User Name"}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: theme === "dark" ? "#aaa" : "#666",
                  fontSize: "0.9rem",
                }}
              >
                {user?.role || "User Role"}
              </Typography>
            </Box>
          )}

          {/* MENU ITEMS */}
          <Box paddingLeft={isCollapsed ? undefined : "10%"} mt={3}>
            <Item
              title="Dashboard"
              to="/admin"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Users"
              to="/admin/users"
              icon={<GroupsIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Invoices"
              to="/admin/invoices"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Create Course"
              to="/admin/create-course"
              icon={<VideoCallIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Live Courses"
              to="/admin/courses"
              icon={<OndemandVideoIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Hero"
              to="/admin/hero"
              icon={<WebIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="FAQ"
              to="/admin/faq"
              icon={<QuizIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Categories"
              to="/admin/categories"
              icon={<WysiwygIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Settings"
              to="/admin/settings"
              icon={<SettingsIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Logout"
              to="/logout"
              icon={<ExitToAppIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
