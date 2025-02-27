"use client";
import React, { useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoChevronBackSharp } from "react-icons/io5";
import { IoChevronForward } from "react-icons/io5";
import styles from "../../css/layout.module.css";
import {
  format,
  startOfWeek,
  endOfWeek,
  addMonths,
  subMonths,
  eachDayOfInterval,
  isSameMonth,
  parseISO,
  isSameDay,
} from "date-fns";

const RightSidebar = ({ user }) => {
  const dummyevents = [
    {
      date: "2025-02-27",
      title: "Upcoming Fees Payment for the 2023/2024 Session",
      description: "Updates on school fees for all junior and senior students",
    },
    {
      date: "2025-02-01",
      title: "Parents and Teachers Meeting on Zoom",
      description:
        "Conference call with all parents having  a child in JSS1 and 2 in preparation for the upcoming session",
    },
  ];

  const dummyNotifications = [
    {
      title: "Inter-House Sports",
      description:
        "The 2nd term Inter-House sports has been rescheduled for  Thur 15th - Fri 16th October 2023",
    },
    {
      title: "Mid-term Tests",
      description: "Mid term tests will start on Monday 25th October, 2023",
    },
    {
      title: "Boarders Meeting",
      description:
        " All JSS1-SS3 boarding school students will be having a meeting by 3pm on Friday 29th October, 2023",
    },
  ];
  const [clickedEventIndex, setClickedEventIndex] = useState(null);

  const handleItemClick = (index) => {
    setClickedEventIndex(index);
  };

  const [currentDate, setCurrentDate] = useState(new Date());

  const handleMonthChange = (direction) => {
    if (direction === "next") {
      setCurrentDate(addMonths(currentDate, 1));
    } else {
      setCurrentDate(subMonths(currentDate, 1));
    }
  };

  const start = startOfWeek(currentDate, { weekStartsOn: 0 });
  const end = endOfWeek(currentDate, { weekStartsOn: 0 });
  const days = eachDayOfInterval({ start, end });

  const [isnotification, setIsnotification] = useState(true);

  console.log(user);
  return (
    <div className={styles.Rightcontainer}>
      <div className={styles.NotificationProfile}>
        <div className={styles.icon}>
          <IoNotificationsOutline
            size={30}
            onClick={() => setIsnotification(!isnotification)}
          />
          <div
            className={
              isnotification
                ? styles.notificationcount
                : styles.notificationcounthide
            }
          ></div>
        </div>
        <div className={styles.profilename}>
          <div className={styles.profileimg}>
            {user && user.profilePic && <img src={user.profilePic} alt="" />}
          </div>
          <p>
            {user.username}{" "}
            <span>
              <IoChevronDownOutline size={12} />
            </span>
          </p>
        </div>
      </div>
      <div className={styles.down}>
        <div className={styles.events}>
          <div className={styles.top}>
            <h1>Events</h1>
            <div className={styles.calender}>
              <p className={styles.title}>Date</p>
              <div className={styles.MonthArrow}>
                <p className={styles.day}>{format(currentDate, "MMM yyy")}</p>
                <div className={styles.arrows}>
                  <div onClick={() => handleMonthChange("prev")}>
                    <IoChevronBackSharp />
                  </div>
                  <div onClick={() => handleMonthChange("next")}>
                    <IoChevronForward />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.Dategrid}>
              <div className={styles.weekdays}>
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day) => (
                    <div key={day}>{day}</div>
                  )
                )}
              </div>
              <div className={styles.dates}>
                {days.map((day) => (
                  <div key={day.toISOString()} className={styles.date}>
                    {format(day, "d")}
                    {dummyevents
                      .filter((event) => {
                        const eventDate = parseISO(event.date);
                        return (
                          isSameDay(eventDate, day) &&
                          isSameMonth(eventDate, day)
                        );
                      })
                      .map((index) => (
                        <div key={index} className={styles.eventDot}></div>
                      ))}
                  </div>
                ))}
              </div>
              <hr />
            </div>
          </div>
          <div className={styles.eventlist}>
            <ul>
              {dummyevents.map((event, index) => (
                <li
                  key={index}
                  className={clickedEventIndex === index ? styles.changebg : ""}
                >
                  <div className={styles.eventItem}>
                    <div
                      className={`${styles.eventDate} ${
                        clickedEventIndex === index
                          ? styles.eventDateClicked
                          : "" // Apply color change
                      }`}
                    >
                      <span className={styles.day}>
                        {format(parseISO(event.date), "EEE")}
                      </span>{" "}
                      <span className={styles.date}>
                        {format(parseISO(event.date), "dd")}
                      </span>{" "}
                    </div>
                    <div
                      className={styles.detailsCont}
                      onClick={() => {
                        handleItemClick(index);
                      }}
                    >
                      <div className={styles.eventDetails}>
                        <h4>{event.title}</h4>
                        <p
                          className={
                            clickedEventIndex === index
                              ? styles.eventDetailsClicked
                              : "" // Apply description color change
                          }
                        >
                          {event.description}
                        </p>
                      </div>
                      <div className={styles.detailarrow}>
                        <IoChevronForward />
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.notification}>
          <div className={styles.TopN}>
            <h1>Notification</h1>
            <hr />
          </div>
          <div className={styles.notificationList}>
            <ul>
              {dummyNotifications.map((item, index) => {
                return (
                  <li key={index}>
                    <div className={styles.notificationdetails}>
                      <span className={styles.Ntitle}>{item.title}</span>
                      <span className={styles.Ndesc}>{item.description}</span>
                    </div>
                    <div className={styles.Narrow}>
                      <IoChevronForward />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
