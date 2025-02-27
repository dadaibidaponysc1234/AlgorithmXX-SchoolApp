"use client";
import styles from "../../css/layout.module.css";
import { TbDashboard } from "react-icons/tb";
import { IoWalletOutline } from "react-icons/io5";
import { LuNotepadText } from "react-icons/lu";
import { BiPieChartAlt2 } from "react-icons/bi";
import { RiBookShelfLine } from "react-icons/ri";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { LiaHeartbeatSolid } from "react-icons/lia";
import { FaRegUser } from "react-icons/fa6";
import { TbLogout } from "react-icons/tb";
import { useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
const LeftSidebar = ({ setUser }) => {
  const searchParams = useSearchParams();
  const schoolId = searchParams.get("schoolid");
  const userId = searchParams.get("userid");
  const pathname = usePathname();
  const handleLogout = () => {
    setUser(null);
  };
  const StudentLeft = [
    {
      Name: "Dashboard",
      icon: <TbDashboard />,
      route: "/Student/DashBoard",
    },
    {
      Name: "Fees Payment",
      icon: <IoWalletOutline />,
      route: "/Student/Fees-Payment",
    },
    {
      Name: "Result",
      icon: <LuNotepadText />,
    },
    {
      Name: "Attendance",
      icon: <BiPieChartAlt2 />,
    },
    { Name: "Subject Registration", icon: <RiBookShelfLine /> },
    {
      Name: "Timetable",
      icon: <MdOutlineCalendarMonth />,
    },
    {
      Name: "Health Record",
      icon: <LiaHeartbeatSolid />,
    },
    {
      Name: "Profile",
      icon: <FaRegUser />,
    },
  ];
  return (
    <>
      <div className={styles.Logo}>
        <div className={styles.logoimg}>
          <img src="/logo.svg" alt="logo" />
        </div>
        <div className={styles.logoTxt}>
          <p>Foursquare</p>
          <p>Student Portal</p>
        </div>
      </div>
      <div className={styles.leftList}>
        <ul>
          {StudentLeft.map((item, index) => {
            return (
              <li key={index} className={styles.leftListItem}>
                <Link
                  href={`${item.route}?schoolid=${schoolId}&userid=${userId}`}
                >
                  <span
                    className={pathname === item.route ? styles.active : ""}
                  >
                    {item.icon}
                  </span>
                  <span
                    className={pathname === item.route ? styles.active : ""}
                  >
                    {item.Name}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className={styles.logout}>
          <button onClick={handleLogout}>
            <span>
              <TbLogout size={22} />
            </span>
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default LeftSidebar;
