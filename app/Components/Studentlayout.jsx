// "use client";
// import React, { Suspense, useEffect, useState } from "react";
// import styles from "../css/layout.module.css";
// import LeftSidebar from "./StudentDashBoard/LeftSidebar";
// import { usePathname } from "next/navigation";
// import RightSidebar from "./StudentDashBoard/RightSidebar";
// import { useUser } from "./StudentDashBoard/context/UserProvider";
// const Layout = ({ children }) => {
//   const { user, isLoading, checkUser, setUser } = useUser();
//   const [headerTitle, setHeaderTitle] = useState("Dashboard");
//   const pathName = usePathname();
//   const generateTitle = (path) => {
//     const parts = path.split("/");
//     const formattedParts = parts.slice(2).map((part) => {
//       return part
//         .replace(/-/g, " ") // Replace hyphens with spaces
//         .replace(/\b\w/g, (match) => match.toUpperCase()); // Capitalize each word
//     });
//     return formattedParts.join(" / ");
//   };

//   useEffect(() => {
//     if (!checkUser()) {
//       return;
//     }
//   }, [user, isLoading, checkUser]);

//   useEffect(() => {
//     const title = generateTitle(pathName);
//     setHeaderTitle(title || "Dashboard");
//   }, [pathName]);

//   if (isLoading) {
//     return (
//       <div className={styles.loadingContainer}>
//         {" "}
//         <div className={styles.spinner}></div> {/* New: Spinner element */}
//       </div>
//     );
//   }
//   return (
//     <div className={styles.LayoutGrid}>
//       <div className={styles.left}>
//         <Suspense>
//           <LeftSidebar setUser={setUser} />
//         </Suspense>
//       </div>
//       <div className={styles.middle}>
//         <div className={styles.header}>
//           <h1>{headerTitle}</h1>
//         </div>
//         <div className={styles.content}>{children}</div>
//       </div>
//       <div className={styles.right}>
//         <RightSidebar user={user} />
//       </div>
//     </div>
//   );
// };

// export default Layout;

"use client";
import React, { useEffect, useState } from "react";
import styles from "../css/layout.module.css";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useUser } from "./StudentDashBoard/context/UserProvider";

// Dynamically import components to prevent server-side issues
const LeftSidebar = dynamic(() => import("./StudentDashBoard/LeftSidebar"), {
  suspense: true,
});
const RightSidebar = dynamic(() => import("./StudentDashBoard/RightSidebar"));

const Layout = ({ children }) => {
  const userContext = useUser();
  const user = userContext?.user || null;
  const isLoading = userContext?.isLoading || false;
  const checkUser = userContext?.checkUser || (() => {});
  const setUser = userContext?.setUser || (() => {});

  const [headerTitle, setHeaderTitle] = useState("Dashboard");
  const pathName = usePathname();

  // Function to generate a readable title from the pathname
  const generateTitle = (path) => {
    if (!path) return "Dashboard";
    const parts = path.split("/");
    return parts.slice(2).map(part =>
      part.replace(/-/g, " ").replace(/\b\w/g, (match) => match.toUpperCase())
    ).join(" / ");
  };

  // Ensure `checkUser` is only called if defined
  useEffect(() => {
    if (checkUser && typeof checkUser === "function") {
      checkUser();
    }
  }, [user, isLoading, checkUser]);

  // Update header title based on pathname
  useEffect(() => {
    if (!pathName) return;
    setHeaderTitle(generateTitle(pathName) || "Dashboard");
  }, [pathName]);

  // Show loading spinner if user data is still being fetched
  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div> {/* Loading Spinner */}
      </div>
    );
  }

  return (
    <div className={styles.LayoutGrid}>
      <div className={styles.left}>
        <LeftSidebar setUser={setUser} />
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
