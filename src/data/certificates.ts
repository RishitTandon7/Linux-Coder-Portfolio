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
        id: "Best Student",
        title: "Outstanding Student of 1st year",
        issuer: "C.Tech Department",
        date: "2024",
        link: "/certificates/IMG-20250502-WA0090.jpg",
        image: "/certificates/IMG-20250502-WA0090.jpg",
        description: "Outstanding Student of 1st year, for winning multiple hackathons and making projects.",
        type: "certificate",
        fileName: "IMG-20250502-WA0090.jpg"
    },
    {
        id: "cert-91",
        title: "Certificate 91",
        issuer: "Issuer Name",
        date: "2024",
        link: "/certificates/IMG-20250502-WA0091.jpg",
        image: "/certificates/IMG-20250502-WA0091.jpg",
        description: "Certificate description goes here.",
        type: "certificate",
        fileName: "IMG-20250502-WA0091.jpg"
    },
    {
        id: "cert-92",
        title: "Certificate 92",
        issuer: "Issuer Name",
        date: "2024",
        link: "/certificates/IMG-20250502-WA0092.jpg",
        image: "/certificates/IMG-20250502-WA0092.jpg",
        description: "Certificate description goes here.",
        type: "certificate",
        fileName: "IMG-20250502-WA0092.jpg"
    },
    {
        id: "cert-93",
        title: "Certificate 93",
        issuer: "Issuer Name",
        date: "2024",
        link: "/certificates/IMG-20250502-WA0093.jpg",
        image: "/certificates/IMG-20250502-WA0093.jpg",
        description: "Certificate description goes here.",
        type: "certificate",
        fileName: "IMG-20250502-WA0093.jpg"
    },
    {
        id: "cert-94",
        title: "Certificate 94",
        issuer: "Issuer Name",
        date: "2024",
        link: "/certificates/IMG-20250502-WA0094.jpg",
        image: "/certificates/IMG-20250502-WA0094.jpg",
        description: "Certificate description goes here.",
        type: "certificate",
        fileName: "IMG-20250502-WA0094.jpg"
    },
    {
        id: "cert-95",
        title: "Certificate 95",
        issuer: "Issuer Name",
        date: "2024",
        link: "/certificates/IMG-20250502-WA0095.jpg",
        image: "/certificates/IMG-20250502-WA0095.jpg",
        description: "Certificate description goes here.",
        type: "certificate",
        fileName: "IMG-20250502-WA0095.jpg"
    },
    {
        id: "cert-96",
        title: "Certificate 96",
        issuer: "Issuer Name",
        date: "2024",
        link: "/certificates/IMG-20250502-WA0096.jpg",
        image: "/certificates/IMG-20250502-WA0096.jpg",
        description: "Certificate description goes here.",
        type: "certificate",
        fileName: "IMG-20250502-WA0096.jpg"
    },
    {
        id: "cert-97",
        title: "Certificate 97",
        issuer: "Issuer Name",
        date: "2024",
        link: "/certificates/IMG-20250502-WA0097.jpg",
        image: "/certificates/IMG-20250502-WA0097.jpg",
        description: "Certificate description goes here.",
        type: "certificate",
        fileName: "IMG-20250502-WA0097.jpg"
    },
    {
        id: "cert-98",
        title: "Certificate 98",
        issuer: "Issuer Name",
        date: "2024",
        link: "/certificates/IMG-20250502-WA0098.jpg",
        image: "/certificates/IMG-20250502-WA0098.jpg",
        description: "Certificate description goes here.",
        type: "certificate",
        fileName: "IMG-20250502-WA0098.jpg"
    },
    {
        id: "cert-99",
        title: "Certificate 99",
        issuer: "Issuer Name",
        date: "2024",
        link: "/certificates/IMG-20250502-WA0099.jpg",
        image: "/certificates/IMG-20250502-WA0099.jpg",
        description: "Certificate description goes here.",
        type: "certificate",
        fileName: "IMG-20250502-WA0099.jpg"
    },
    {
        id: "cert-100",
        title: "Certificate 100",
        issuer: "Issuer Name",
        date: "2024",
        link: "/certificates/IMG-20250502-WA0100.jpg",
        image: "/certificates/IMG-20250502-WA0100.jpg",
        description: "Certificate description goes here.",
        type: "certificate",
        fileName: "IMG-20250502-WA0100.jpg"
    },
    {
        id: "cert-101",
        title: "Certificate 101",
        issuer: "Issuer Name",
        date: "2024",
        link: "/certificates/IMG-20250502-WA0101.jpg",
        image: "/certificates/IMG-20250502-WA0101.jpg",
        description: "Certificate description goes here.",
        type: "certificate",
        fileName: "IMG-20250502-WA0101.jpg"
    },
    {
        id: "cert-102",
        title: "Certificate 102",
        issuer: "Issuer Name",
        date: "2024",
        link: "/certificates/IMG-20250502-WA0102.jpg",
        image: "/certificates/IMG-20250502-WA0102.jpg",
        description: "Certificate description goes here.",
        type: "certificate",
        fileName: "IMG-20250502-WA0102.jpg"
    },
    // Certifications
    ...Array.from({ length: 12 }, (_, i) => {
        const num = 103 + i;
        const fileName = `IMG-20250502-WA0${num}.jpg`; // WA0103 to WA0114
        return {
            id: `certification-${num}`,
            title: `Certification ${num}`,
            issuer: "Issuer Name",
            date: "2024",
            link: `/certifications/${fileName}`,
            image: `/certifications/${fileName}`,
            description: "Certification description goes here.",
            type: "certification" as const,
            fileName: fileName
        };
    })
];
