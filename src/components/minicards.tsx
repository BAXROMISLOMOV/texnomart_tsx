"use client";

import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

interface Category {
  title: string;
  image: string;
}

const Categories: React.FC = () => {
  const [sections, setSections] = useState<Category[]>([]);

  useEffect(() => {
    axios
      .get("https://gw.texnomart.uz/api/web/v1/home/special-categories")
      .then((res) => {
        if (res.data?.data?.data) {
          setSections(res.data.data.data);
        }
      })
      .catch((err) => console.error("Error occurred:", err));
  }, []);

  const moveForward = useCallback((): void => {
    if (sections.length > 0) {
      setSections((prev) => [...prev.slice(1), prev[0]]);
    }
  }, [sections]);

  const moveBackward = useCallback((): void => {
    if (sections.length > 0) {
      setSections((prev) => [prev[prev.length - 1], ...prev.slice(0, -1)]);
    }
  }, [sections]);

  return (
    <div className="container mx-auto px-5 pt-8 relative flex items-center justify-center">
      <button
        className="absolute left-3 ml-10 md:left-0 top-1/2 transform -translate-y-1/2 bg-amber-300 cursor-pointer p-3 rounded-full shadow-lg transition-all duration-300 z-10"
        onClick={moveBackward}
        aria-label="Previous Sections"
      >
        <LeftOutlined className="text-white text-xl" />
      </button>
      
      <div className="w-full overflow-hidden rounded-xl shadow-lg">
        <div className="flex gap-4 md:gap-5 justify-center items-center transition-transform duration-500">
          {sections.slice(0, 5).map((element, index) => (
            <div
              key={index}
              className="p-4 md:p-5 flex flex-col items-center rounded-xl shadow-md border bg-white transition-all w-1/3 sm:w-1/4 md:w-1/5"
            >
              {element.image && (
                <img
                  className="w-24 md:w-32 object-contain duration-300"
                  src={element.image}
                  alt={element.title || "Category Image"}
                />
              )}
              <p className="text-center text-sm md:text-base font-semibold mt-3">
                {element.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      <button
        className="absolute right-3 mr-10 md:right-0 top-1/2 transform -translate-y-1/2 bg-amber-300 cursor-pointer p-3 rounded-full shadow-lg transition-all duration-300 z-10"
        onClick={moveForward}
        aria-label="Next Sections"
      >
        <RightOutlined className="text-white text-xl" />
      </button>
    </div>
  );
};

export default Categories;
