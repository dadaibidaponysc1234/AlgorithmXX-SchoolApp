"use client";
import React, { Suspense, useEffect, useState } from "react";
import styles from "../css/layout.module.css";
import LeftSidebar from "./StudentDashBoard/LeftSidebar";
import { usePathname } from "next/navigation";
import RightSidebar from "./StudentDashBoard/RightSidebar";
import { useUser } from "./StudentDashBoard/context/UserProvider";
const Layout = ({ children }) => {
  const { user, isLoading, checkUser, setUser } = useUser();
  const [headerTitle, setHeaderTitle] = useState("Dashboard");
  const pathName = usePathname();
  const generateTitle = (path) => {
    const parts = path.split("/");
    const formattedParts = parts.slice(2).map((part) => {
      return part
        .replace(/-/g, " ") // Replace hyphens with spaces
        .replace(/\b\w/g, (match) => match.toUpperCase()); // Capitalize each word
    });
    return formattedParts.join(" / ");
  };

  useEffect(() => {
    if (!checkUser()) {
      return;
    }
  }, [user, isLoading, checkUser]);

  useEffect(() => {
    const title = generateTitle(pathName);
    setHeaderTitle(title || "Dashboard");
  }, [pathName]);

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        {" "}
        <div className={styles.spinner}></div> {/* New: Spinner element */}
      </div>
    );
  }
  return (
    <div className={styles.LayoutGrid}>
      <div className={styles.left}>
        <Suspense>
          <LeftSidebar setUser={setUser} />
        </Suspense>
      </div>
      <div className={styles.middle}>
        <div className={styles.header}>
          <h1>{headerTitle}</h1>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
      <div className={styles.right}>
        <RightSidebar user={user} />
      </div>
    </div>
  );
};

export default Layout;
