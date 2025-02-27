"use client";
import React from "react";
import styles2 from "./dashboard.module.css";
import styles from "../../../css/layout.module.css";
import Layout from "../../../Components/Studentlayout";
import { useUser } from "../context/UserProvider";
import { IoWalletOutline } from "react-icons/io5";
import { LuNotepadText } from "react-icons/lu";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { RiBookShelfLine } from "react-icons/ri";
import { BiPieChart } from "react-icons/bi";
import { LiaHeartbeatSolid } from "react-icons/lia";

const Studentdashboard = () => {
  const { user, isLoading } = useUser();

  const overview = [
    {
      id: "Fees",
      icon: <IoWalletOutline size={50} />,
      title: "School Fees Payment",
      description: "Pay fees seamlessly",
    },
    {
      id: "result",
      icon: <LuNotepadText size={50} />,
      title: "Result",
      description: "View continous assessment",
    },
    {
      id: "attendance",
      icon: <BiPieChart size={50} />,
      title: "Attendance",
      description: "View class and  event attendance",
    },
    {
      id: "Registration",
      icon: <RiBookShelfLine size={50} />,
      title: "Subject Registration",
      description: "Register subjects for the session",
    },
    {
      id: "timetable",
      icon: <MdOutlineCalendarMonth size={50} />,
      title: "Timetable",
      description: "Be on track with every class",
    },
    {
      id: "health",
      icon: <LiaHeartbeatSolid size={50} />,
      title: "Health Record",
      description: "Document your medical history",
    },
  ];

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        {" "}
        <div className={styles.spinner}></div> {/* New: Spinner element */}
      </div>
    );
  }
  const name = user.username.split(" ")[0];
  return (
    <Layout>
      <div className={styles2.DashboardContainer}>
        <div className={styles2.top}>
          <div className={styles2.greeting}>
            <h1>Hi, {name}</h1>
            <p>Welcome to the official Foursquare student portal.</p>
          </div>
          <div className={styles2.topImg}>
            <img src="/female_teacher.svg" alt="" />
          </div>
        </div>
        <div className={styles2.overview}>
          <h2>Overview</h2>
          <div className={styles2.overviewCards}>
            {overview.map((item, index) => {
              const cardClass = styles2[item.id];
              const fullClass = `${styles2.overviewCardItem} ${cardClass}`;

              return (
                <div key={index} className={fullClass}>
                  <div className={styles2.iconContainer}>{item.icon}</div>
                  <div className={styles2.content}>
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Studentdashboard;
