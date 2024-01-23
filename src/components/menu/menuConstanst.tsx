import { MdBackup, MdBarChart, MdCalendarMonth, MdCategory, MdFormatBold, MdGrade, MdGroup, MdHome, MdList, MdLogin, MdNote, MdPerson, MdQuiz, MdSettings, MdSubject } from "react-icons/md";
import { slugs } from "../../constant";
export const menu = [
  {
    id: 1,
    title: "main",
    listItems: [
      {
        id: 1,
        title: "Home",
        url: "/",
        icon: <MdHome />,
      },
      {
        id: 2,
        title: "Profile",
        url: `${slugs.USER}`,
        icon: <MdPerson />,
      },
    ],
  },
  {
    id: 2,
    title: "lists",
    listItems: [
      {
        id: 1,
        title: "Users",
        url: `${slugs.USER}`,
        icon: <MdGroup />,
      },
      {
        id: 2,
        title: "Exams",
        url: `${slugs.EXAM}`,
        icon: <MdQuiz />,
      },
      {
        id: 3,
        title: "Exam Categorys",
        url: `${slugs.EXAM_CATEGORY}`,
        icon: <MdCategory />,
      },
      {
        id: 4,
        title: "Subjects",
        url: `${slugs.SUBJECT}`,
        icon: <MdSubject />,
      },
      {
        id: 5,
        title: "Login",
        url: `${slugs.LOGIN}`,
        icon: <MdLogin />,
      },
    ],
  },
  {
    id: 3,
    title: "general",
    listItems: [
      {
        id: 1,
        title: "Elements",
        url: "/",
        icon: <MdGrade />,
      },
      {
        id: 2,
        title: "Notes",
        url: "/",
        icon: <MdNote />,
      },
      {
        id: 3,
        title: "Forms",
        url: "/",
        icon: <MdFormatBold />,
      },
      {
        id: 4,
        title: "Calendar",
        url: "/",
        icon: <MdCalendarMonth />,
      },
    ],
  },
  {
    id: 4,
    title: "Maintenance",
    listItems: [
      {
        id: 1,
        title: "Settings",
        url: "/",
        icon: <MdSettings />,
      },
      {
        id: 2,
        title: "Backups",
        url: "/",
        icon: <MdBackup />,
      },
    ],
  },
  {
    id: 5,
    title: "analytics",
    listItems: [
      {
        id: 1,
        title: "Charts",
        url: "/",
        icon: <MdBarChart />,
      },
      {
        id: 2,
        title: "Logs",
        url: "/",
        icon: <MdList />,
      },
    ],
  },
];
