"use client";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/authContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthProvider } from "@/contexts/authContext";

const projects = [
  {
    id: 1,
    title: "Mandavi Acropolis",
    description: "A residential project in Manipal, Karnataka.",
    imageUrl: "/acropolis.jpeg",
    imageAlt: "Project 1",
    bullets: ["2bhk", "ID Mandatory Entry", "Pool, Sports and Gym"],
  },
  {
    id: 2,
    title: "Mandavi Emerald",
    description: "A residential project in Udupi, Karnataka.",
    imageUrl: "/emerald.jpeg",
    imageAlt: "Project 2",
    bullets: ["3bhk", "ID not Mandatory Entry", "Pool, Sports"],
  },
  {
    id: 3,
    title: "Mandavi Greens",
    description: "A residential project in Manipal, Karnataka.",
    imageUrl: "/greens.jpeg",
    imageAlt: "Project 3",
    bullets: ["2bhk", "ID Mandatory Entry", "Pool, Sports and Gym"],
  },
  {
    id: 4,
    title: "Harmony Apartments",
    description: "A residential project in Udupi, Karnataka.",
    imageUrl: "/harmony.jpg",
    imageAlt: "Project 4",
    bullets: ["3bhk", "ID Mandatory Entry", "Pool, Sports and Gym"],
  },
  {
    id: 5,
    title: "Mandavi Pearl",
    description: "A residential project in Manipal, Karnataka.",
    imageUrl: "/pearl.jpg",
    imageAlt: "Project 5",
    bullets: ["2bhk", "ID Mandatory Entry", "Pool, Sports and Gym"],
  },
  {
    id: 6,
    title: "Prince Palace",
    description: "A residential project in Udupi, Karnataka.",
    imageUrl: "/prince palace.jpeg",
    imageAlt: "Project 6",
    bullets: ["3bhk", "ID Mandatory Entry", "Pool, Sports and Gym"],
  },
  {
    id: 7,
    title: "Mandavi Royal Embassy",
    description: "A residential project in Udupi, Karnataka.",
    imageUrl: "/royalemb.jpeg",
    imageAlt: "Project 6",
    bullets: ["2bhk", "ID Mandatory Entry", "Pool, Sports"],
  },
  {
    id: 8,
    title: "Mandavi Sapphire",
    description: "A residential project in Udupi, Karnataka.",
    imageUrl: "/sapphire.jpeg",
    imageAlt: "Project 6",
    bullets: ["3bhk", "ID not Mandatory Entry", "Pool, Sports"],
  },
];

const ProjectModal = ({ project, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
    onClick={onClose}
  >
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white p-6 rounded-lg shadow-lg"
      onClick={(e) => e.stopPropagation()}
    >
      <h2 className="text-2xl font-semibold mb-4">{project.title}</h2>
      <div className="mb-4">
        <Image
          src={project.imageUrl}
          alt={project.imageAlt}
          width={300}
          height={200}
        />
      </div>
      <p className="mb-4">{project.description}</p>
      <ul className="list-disc pl-6 mb-4">
        {project.bullets.map((bullet, index) => (
          <li key={index}>{bullet}</li>
        ))}
      </ul>
      <Button>
        <Link href="/payment">Buy</Link>
      </Button>
    </motion.div>
  </motion.div>
);

export default function Component() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    space: "",
    idMandatory: false,
    gym: false,
  });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  const filterRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowFilters(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesSpace =
      filters.space === "" || project.bullets.includes(filters.space);
    const matchesIdMandatory =
      !filters.idMandatory || project.bullets.includes("ID Mandatory Entry");
    const matchesGym = !filters.gym || project.bullets.includes("Gym");
    return matchesSearch && matchesSpace && matchesIdMandatory && matchesGym;
  });

  return (
    <AuthProvider>
      {isLoggedIn && router.replace("/")}

      <div className="flex flex-col h-full">
        <section className="py-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                className="w-64 h-10 px-10 pr-4 rounded-md border border-gray-200 focus:outline-none focus:ring focus:ring-gray-300"
                placeholder="Search..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a4 4 0 1 1-8 0 4 4 0 0 1 8 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.5 17.5l-2.5-2.5"
                />
              </svg>
            </div>
            <Button>Search</Button>
            <div className="relative" ref={filterRef}>
              <button
                className={`h-10 px-4 rounded-md bg-gray-900 text-gray-50  ${
                  showFilters ? "bg-blue-500" : ""
                }`}
                onClick={() => setShowFilters(!showFilters)}
              >
                Filter
              </button>
              {showFilters && (
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-md z-50">
                  <button
                    className={`block w-full px-4 py-2 text-left hover:bg-gray-100 ${
                      filters.space === "" ? "bg-blue-200" : ""
                    }`}
                    onClick={() => handleFilterChange("space", "")}
                  >
                    Clear
                  </button>
                  <button
                    className={`block w-full px-4 py-2 text-left hover:bg-gray-100 ${
                      filters.space === "2bhk" ? "bg-blue-200" : ""
                    }`}
                    onClick={() => handleFilterChange("space", "2bhk")}
                  >
                    2bhk
                  </button>
                  <button
                    className={`block w-full px-4 py-2 text-left hover:bg-gray-100 ${
                      filters.space === "3bhk" ? "bg-blue-200" : ""
                    }`}
                    onClick={() => handleFilterChange("space", "3bhk")}
                  >
                    3bhk
                  </button>
                  <button
                    className={`block w-full px-4 py-2 text-left hover:bg-gray-100 ${
                      filters.idMandatory ? "bg-blue-200" : ""
                    }`}
                    onClick={() =>
                      handleFilterChange("idMandatory", !filters.idMandatory)
                    }
                  >
                    ID Mandatory
                  </button>
                  <button
                    className={`block w-full px-4 py-2 text-left hover:bg-gray-100 ${
                      filters.gym ? "bg-blue-200" : ""
                    }`}
                    onClick={() => handleFilterChange("gym", !filters.gym)}
                  >
                    Gym
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
        <main className="flex flex-col">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 w-full mx-auto">
            {filteredProjects.map((project) => (
              <Card
                key={project.id}
                className="shadow-slate-700 shadow-lg hover:scale-105 duration-200 cursor-pointer w-80 z-30"
              >
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="grid gap-1">
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="grid gap-2">
                  <Image
                    alt={project.imageAlt}
                    className="w-full h-40 rounded-md"
                    height="50"
                    src={project.imageUrl}
                    width="100"
                  />
                  <ul className="text-sm list-disc pl-4">
                    {project.bullets.map((bullet, index) => (
                      <li key={index}>{bullet}</li>
                    ))}
                  </ul>
                  <Button onClick={() => setSelectedProject(project)}>
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          {selectedProject && (
            <ProjectModal
              project={selectedProject}
              onClose={() => setSelectedProject(null)}
            />
          )}
        </main>
      </div>
    </AuthProvider>
  );
}
