import { useState, useEffect } from "react";

export default function LogInImageSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "/global.jpg",
      title: "Welcome to Global Dream Hotel",
      subtitle: "Where luxury meets comfort and every stay feels extraordinary.",
    },
    // {
    //   image: "/globaldr2.jpg",
    //   title: "Elegant & Modern Rooms",
    //   subtitle: "Designed for relaxation, crafted for unforgettable experiences.",
    // },
    // {
    //   image: "/globaldr3.jpg",
    //   title: "World-Class Service",
    //   subtitle: "Experience personalized hospitality tailored to your comfort.",
    // },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="flex w-full flex-col items-center">
      <div
        className="relative h-[800px] w-full max-w-4xl overflow-hidden rounded shadow-2xl"
        style={{
          backgroundImage: `url(${slides[currentSlide].image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "background-image 0.8s ease-in-out",
        }}
      >
        <div className="absolute inset-0 bg-black/15"></div>

        <div className="absolute right-0 bottom-20 left-0 z-20 p-8 pb-12 text-white">
          <h2 className="mb-2 text-3xl font-bold md:text-4xl">{slides[currentSlide].title}</h2>
          <p className="text-sm md:text-base">{slides[currentSlide].subtitle}</p>
        </div>

        <div className="absolute right-4 bottom-20 z-30 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`rounded-full transition-all duration-300 ${
                currentSlide === index ? "h-2 w-8 bg-white" : "h-2 w-2 bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
