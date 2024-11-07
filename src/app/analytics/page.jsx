"use client";
import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import axios from "axios";

const predictPrice = async (inputData) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:5000/predict",
      inputData
    );
    console.log("response", response);
    return response.data.predicted_price;
  } catch (error) {
    console.error("Error predicting price:", error);
    return null;
  }
};

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

const getRandomProjects = () => {
  const numProjectsToShow = Math.random() > 0.5 ? 4 : 3;
  const shuffledProjects = projects.sort(() => 0.5 - Math.random());
  return shuffledProjects.slice(0, numProjectsToShow);
};

const Page = () => {
  const [predictedPrice, setPredictedPrice] = useState(null);
  const [formData, setFormData] = useState({
    house_size: "",
    num_bedrooms: "",
    num_bathrooms: "",
    year_built: "",
    distance_from_city_center: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log("form filled", formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const price = await predictPrice(formData);
    setPredictedPrice(price);
  };

  const [randomProjects, setRandomProjects] = useState([]);

  useEffect(() => {
    const projects = getRandomProjects();
    setRandomProjects(projects);
  }, []);

  const [price, setPrice] = useState(null);

  const handlePredictPrice = () => {
    const randomPrice = (Math.random() * 10000).toFixed(2); // Generates a random price between 0 and 1000
    setPrice(`Predicted Price: $${randomPrice}`);
  };

  return (
    <div className="w-full h-full flex  mt-4">
      <div className="h-full w-2/3 flex gap-6 flex-col">
        <h1 className="text-5xl font-semibold text-blue-500">
          House Price Prediction
        </h1>
        <form
          onSubmit={handleSubmit}
          className="mt-10 border-4 border-gray-500 p-8 rounded-xl flex flex-col gap-6 w-full"
        >
          <label className="text-2xl font-semibold flex flex-col gap-4">
            <span>House Size:</span>
            <input
              type="text"
              name="house_size"
              value={formData.house_size}
              onChange={handleChange}
              className="border-2 border-gray-500 p-2 rounded-xl w-2/3"
            />
          </label>
          <label className="text-2xl font-semibold flex flex-col gap-4">
            <span>Number of Bedrooms:</span>
            <input
              type="text"
              name="num_bedrooms"
              value={formData.num_bedrooms}
              onChange={handleChange}
              className="border-2 border-gray-500 p-2 rounded-xl w-2/3"
            />
          </label>
          <label className="text-2xl font-semibold flex flex-col gap-4">
            <span>Number of Bathrooms:</span>
            <input
              type="text"
              name="num_bathrooms"
              value={formData.num_bathrooms}
              onChange={handleChange}
              className="border-2 border-gray-500 p-2 rounded-xl w-2/3"
            />
          </label>
          <label className="text-2xl font-semibold flex flex-col gap-4">
            <span>Year Built:</span>
            <input
              type="text"
              name="year_built"
              value={formData.year_built}
              onChange={handleChange}
              className="border-2 border-gray-500 p-2 rounded-xl w-2/3"
            />
          </label>
          <label className="text-2xl font-semibold flex flex-col gap-4">
            <span>Distance from City Center (km):</span>
            <input
              type="text"
              name="distance_from_city_center"
              value={formData.distance_from_city_center}
              onChange={handleChange}
              className="border-2 border-gray-500 p-2 rounded-xl w-2/3"
            />
          </label>

          <button
            type="submit"
            className="p-4 rounded-xl bg-blue-500  mx-auto text-white hover:scale-110 font-semibold duration-300"
            onClick={handlePredictPrice}
          >
            Predict Price!
          </button>
          {price && <div className="mt-4 text-lg text-center">{price}</div>}
        </form>
        {predictedPrice && (
          <p className="text-5xl ">
            <p className="text-7xl text-blue-700 font-bold">
              Predicted Price
            </p>
            : Rs {predictedPrice}
          </p>
        )}
      </div>

      <section className="h-full w-1/4 mx-auto">
        <h2 className="text-4xl text-blue-500 font-semibold mt-8">
          Hand Picked Recommendations
        </h2>
        <p>Apartments Recommended according to your pricing.</p>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 mt-4">
          {randomProjects.map((project) => (
            <motion.div
              key={project.id}
              className="border border-gray-200 rounded-xl overflow-hidden shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image
                src={project.imageUrl}
                alt={project.imageAlt}
                className="w-full h-40 object-cover"
                width={300}
                height={200}
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{project.title}</h3>
                <p className="text-sm text-gray-600">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Page;
