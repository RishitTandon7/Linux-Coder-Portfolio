export interface Certificate {
    id: string;
    title: string;
    issuer: string;
    date: string;
    link: string;
    image: string; // Path relative to public folder, e.g., "/certificates/my-cert.png"
    description: string;
    type: "certificate" | "certification";
    fileName?: string; // For FileExplorer, e.g., "AWS_Architect.pdf"
}

export const certificatesData: Certificate[] = [
    {
        id: "js-algo",
        title: "JavaScript Algorithms and Data Structures",
        issuer: "freeCodeCamp",
        date: "2024",
        link: "#",
        image: "/certificates/js-algo.png",
        description: "Completed comprehensive course on JavaScript algorithms, data structures, and problem-solving techniques.",
        type: "certificate",
        fileName: "JS_Algo.pdf"
    },
    {
        id: "responsive-web",
        title: "Responsive Web Design",
        issuer: "freeCodeCamp",
        date: "2023",
        link: "#",
        image: "/certificates/responsive.png",
        description: "Mastered responsive web design principles, CSS flexbox, grid, and mobile-first development.",
        type: "certificate",
        fileName: "Responsive_Web.pdf"
    },
    {
        id: "frontend-libs",
        title: "Front End Development Libraries",
        issuer: "freeCodeCamp",
        date: "2023",
        link: "#",
        image: "/certificates/frontend.png",
        description: "Expertise in React, Redux, SASS, and modern front-end development frameworks and tools.",
        type: "certificate",
        fileName: "Frontend_Libs.pdf"
    },
    {
        id: "aws-arch",
        title: "AWS Certified Solutions Architect",
        issuer: "Amazon Web Services",
        date: "2024",
        link: "#",
        image: "/certifications/aws.png",
        description: "Professional certification in designing and deploying scalable, highly available systems on AWS.",
        type: "certification",
        fileName: "AWS_Architect.png"
    },
    {
        id: "fullstack",
        title: "Full Stack Web Development",
        issuer: "Coursera",
        date: "2023",
        link: "#",
        image: "/certifications/fullstack.png",
        description: "Complete full-stack development specialization covering front-end, back-end, and databases.",
        type: "certification",
        fileName: "Full_Stack.png"
    },
    {
        id: "react-dev",
        title: "React Developer Certification",
        issuer: "Meta",
        date: "2023",
        link: "#",
        image: "/certifications/react.png",
        description: "Advanced React certification covering hooks, state management, and modern React patterns.",
        type: "certification",
        fileName: "React_Dev.png"
    }
];
