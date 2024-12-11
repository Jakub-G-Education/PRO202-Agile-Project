import React, { useContext, useEffect } from "react";
import {
  parseISO,
  isToday,
  format,
  isValid,
  getMonth,
  addMonths,
} from "date-fns";
import styles from "./DashboardPage.module.css";
import QRCode from "qrcode.react";
import { MeetingsContext } from "../contexts/MeetingsContext";
import { BirthdaysContext } from "../contexts/BirthdaysContext";
import { InfosContext } from "../contexts/InfosContext";
import { WorkshopsContext } from "../contexts/WorkshopsContext";
import { EventsContext } from "../contexts/EventsContext";
import { MealsContext } from "../contexts/MealsContext";
import ImageCarousel from "../components/dashboard/ImageCarousel";

const DashboardPage = () => {
  const { meetings, getMeetingsFromService } = useContext(MeetingsContext);
  const { birthdays, getBirthdaysFromService } = useContext(BirthdaysContext);
  const { infos, getInfosFromService } = useContext(InfosContext);
  const { workshops, getWorkshopsFromService } = useContext(WorkshopsContext);
  const { events, getEventsFromService } = useContext(EventsContext);
  const { meals, getMealsFromService } = useContext(MealsContext);

  useEffect(() => {
    getMeetingsFromService();
    getBirthdaysFromService();
    getInfosFromService();
    getWorkshopsFromService();
    getEventsFromService();
    getMealsFromService();
  }, []);

  const todayMeetings = Array.isArray(meetings)
    ? meetings.filter((meeting) => isToday(parseISO(meeting.startDate)))
    : [];

  const sortedWorkshops = Array.isArray(workshops)
    ? workshops
        .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
        .filter((workshop) => new Date(workshop.startDate) >= new Date())
        .slice(0, 5)
    : [];

  const getMonthName = (date) => format(date, "MMMM");

  const groupedBirthdays = Array.isArray(birthdays)
    ? birthdays.reduce((acc, birthday) => {
        const birthDate = parseISO(birthday.birthDate);
        const monthName = getMonthName(birthDate);
        if (!acc[monthName]) {
          acc[monthName] = [];
        }
        acc[monthName].push(birthday);
        return acc;
      }, {})
    : {};

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const sortedBirthdayMonths = Object.keys(groupedBirthdays).sort(
    (a, b) => monthNames.indexOf(a) - monthNames.indexOf(b)
  );

  const currentMonth = new Date();
  const currentMonthName = getMonthName(currentMonth);

  const firstMonthIndex = sortedBirthdayMonths.findIndex(
    (month) => month === currentMonthName
  );

  const displayMonths = [
    ...sortedBirthdayMonths.slice(firstMonthIndex, firstMonthIndex + 3),
    ...sortedBirthdayMonths.slice(
      0,
      3 - sortedBirthdayMonths.length + firstMonthIndex
    ),
  ].slice(0, 3);

  const monthsWithBirthdays = displayMonths.map((month) => ({
    month,
    birthdays: groupedBirthdays[month] || [],
  }));

  return (
    <section className={styles.mainContainer}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <img src="images/kpmg_white.png" alt="KPMG logo." />
        </div>
        <br />
        <div className={styles.weather}>
          <div className={styles.weatherIcon}>☀️</div>
          <div className={styles.temperature}>20°C</div>
          <div className={styles.dateTime}>5. juni 17:00</div>
        </div>
        <br />
        <div className={styles.menu}>
          <h2>Ukens meny</h2>
          {Array.isArray(meals) &&
            meals.map((meal, index) => (
              <li key={index} style={{ marginBottom: "10px" }}>
                {meal.day}
                <br />
                {meal.food}
                <br />
                <hr />
              </li>
            ))}
        </div>
      </aside>
      <main className={styles.mainContent}>
        <div className={styles.funSection}>
          <div className={styles.header}>
            {Array.isArray(events) &&
              events.map((event, index) => {
                const parsedDate = event.date ? parseISO(event.date) : null;
                return (
                  <li key={index}>
                    <h2>{event.title}</h2>
                    {event.content}
                    <br />
                    <br />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-geo-alt-fill svg-space"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6
                        10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"
                      />
                    </svg>
                    {event.place}
                    <br />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-calendar3 svg-space"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 
                        0 0 0 2-2V2a2 2 0 0 0-2-2M1 3.857C1 3.384 1.448 3 2 3h12c.552
                        0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857z"
                      />
                      <path
                        d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 
                        0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3
                        0a1 1 0 1 0 0-2 1 1 0 0 0 0 2"
                      />
                    </svg>
                    {parsedDate && isValid(parsedDate)
                      ? format(parsedDate, "dd MMMM")
                      : "Invalid Date"}{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-clock-fill svg-space"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 3.5a.5.5 0 0 0-1 
                        0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"
                      />
                    </svg>
                    {event.time}
                  </li>
                );
              })}
          </div>
          <div className={styles.birthdays}>
            <h2>Bursdager</h2>
            <div className={styles.birthdayList}>
              {monthsWithBirthdays.map(({ month, birthdays }, index) => (
                <div key={index} className={styles.birthdayMonth}>
                  <h3>{month}</h3>
                  <ul>
                    {birthdays.map((birthday, bIndex) => (
                      <li key={bIndex}>
                        {birthday.name} -{" "}
                        {format(parseISO(birthday.birthDate), "dd MMMM")}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.scheduleSection}>
          <div className={styles.meetings}>
            <h2>Møter i dag</h2>
            <ul>
              {todayMeetings.map((meeting, index) => (
                <li key={index}>
                  <hr />
                  {meeting.startTime} til {meeting.endTime} {meeting.title}
                </li>
              ))}
            </ul>
            <hr />
          </div>
          <div className={styles.workshops}>
            <h2>Workshops</h2>
            <hr />
            <ul>
              {sortedWorkshops.map((workshop, index) => (
                <div className={styles.workshopInfo}>
                  {format(parseISO(workshop.startDate), "dd MMMM")}{" "}
                  {workshop.startTime}
                  <br />
                  {workshop.title}
                  {workshop.link && (
                    <QRCode
                      size={50}
                      bgColor="white"
                      fgColor="black"
                      value={workshop.link}
                      className={styles.qrCode}
                    />
                  )}
                </div>
              ))}
              <hr />
            </ul>
          </div>
          <div className={styles.images}>
            <ImageCarousel />
          </div>
        </div>
        <div className={styles.footer}>
          {Array.isArray(infos) &&
            infos.map((info, index) => <li key={index}>{info.content}</li>)}
        </div>
      </main>
    </section>
  );
};

export default DashboardPage;
