import { useState, useEffect } from "react";

const images = ["/banner1.jpg", "/banner2.jpg", "/banner3.jpg"];

export default function Slider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-64 overflow-hidden rounded-lg shadow-lg">
      <img
        src={images[index]}
        alt="slider"
        className="w-full h-full object-cover transition-all duration-700"
      />
    </div>
  );
}
