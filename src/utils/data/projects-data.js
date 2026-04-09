import ayla from "../../Images/ayla.jpg";

export const projectsData = [
  {
    id: 1,
    name: "GraminSetu – Rural Service Platform",
    description:
      "Built a full-stack MERN application to provide digital services and real-time updates for rural communities. Implemented real-time notifications using Socket.io, designed scalable REST APIs, and integrated OpenWeatherMap API with caching to improve performance. Implemented JWT authentication and role-based access control.",
    tools: [
      "MongoDB",
      "Express.js",
      "React.js",
      "Node.js",
      "Socket.io",
      "JWT",
      "Tailwind CSS",
      "REST APIs",
      "OpenWeatherMap API",
    ],
    role: "Full-Stack Developer",
    code:"https://graminsetu.in/",
    demo:"https://github.com/Bhogesh02"
  },

  {
    id: 2,
    name: "AI Mock Interview Platform",
    description:
      "Developed an AI-powered interview platform that generates dynamic questions and provides real-time feedback. Built scalable backend APIs to handle AI responses and designed a responsive UI for smooth user experience.",
    tools: [
      "MongoDB",
      "Express.js",
      "React.js",
      "Node.js",
      "Gemini AI",
      "REST APIs",
      "Tailwind CSS",
    ],
    role: "Full-Stack Developer",
    code:"https://mockup-ai.netlify.app/",
    demo:"https://github.com/Bhogesh02"

    
  },

  {
    id: 3,
    name: "Real-Time Chat Application",
    description:
      "Built a real-time messaging system supporting one-to-one and group chats using Socket.io. Implemented secure authentication using JWT and designed efficient database schema for message storage and retrieval.",
    tools: [
      "MongoDB",
      "Express.js",
      "React.js",
      "Node.js",
      "Socket.io",
      "JWT",
    ],
    role: "Full-Stack Developer",
  },

  {
    id: 4,
    name: "TeleHealth Platform",
    description:
      "Developed a telehealth platform for online doctor consultations. Implemented real-time video communication using WebRTC and built role-based dashboards for admin, doctors, and patients with responsive UI.",
    tools: ["React.js", "Firebase", "WebRTC", "Tailwind CSS"],
    role: "Frontend Developer",
  },
];