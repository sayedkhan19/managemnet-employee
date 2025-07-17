import React, { useState, useEffect } from "react";

const sliderData = [
  {
    image:
      "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=1500&q=80",
    text: "Company Success Highlights 1",
  },
  {
    image:
      "https://images.unsplash.com/photo-1581091012184-7f08c45d7f8b?auto=format&fit=crop&w=1500&q=80",
    text: "Company Success Highlights 2",
  },
  {
    image:
      "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=1500&q=80",
    text: "Company Success Highlights 3",
  },
  {
    image:
      "https://images.unsplash.com/photo-1581091870627-7f08c45d7f8b?auto=format&fit=crop&w=1500&q=80",
    text: "Company Success Highlights 4",
  },
];

const ImageSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === sliderData.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () =>
    setCurrent(current === 0 ? sliderData.length - 1 : current - 1);
  const nextSlide = () =>
    setCurrent(current === sliderData.length - 1 ? 0 : current + 1);

  return (
    <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] overflow-hidden">
      {sliderData.map((slide, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={slide.image}
            alt={`Slide ${index}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <h2 className="text-white text-xl sm:text-2xl md:text-4xl font-bold text-center px-4">
              {slide.text}
            </h2>
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-40 text-white p-2 rounded-full hover:bg-opacity-60 z-20"
      >
        ❮
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-40 text-white p-2 rounded-full hover:bg-opacity-60 z-20"
      >
        ❯
      </button>
    </div>
  );
};

export default ImageSlider;
