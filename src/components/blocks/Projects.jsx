import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "../../styles/projects.css";

const Projects = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const galleryRef = useRef(null);
  const [showGallery, setShowGallery] = useState(false);
  const [activeItemId, setActiveItemId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [countdown, setCountdown] = useState(null);

  useEffect(() => {
    if (!sectionRef.current || !textRef.current || !galleryRef.current) return;

    const isTouchDevice = () =>
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsMobile(isTouchDevice());

    // Начальная установка для слов
    const words = textRef.current.querySelectorAll(".word");
    gsap.set(words, { opacity: 0, y: 30, immediateRender: true });
    gsap.set(galleryRef.current, { opacity: 0, display: "none" });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(words, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.15,
              ease: "power3.out",
              onComplete: () => {
                setCountdown(3);
                let timer = setInterval(() => {
                  setCountdown((prev) => {
                    if (prev === 1) {
                      clearInterval(timer);
                      gsap.to(textRef.current, {
                        opacity: 0,
                        duration: 0.5,
                        ease: "power1.out",
                        onComplete: () => {
                          setShowGallery(true);
                          gsap.to(galleryRef.current, {
                            opacity: 1,
                            display: "grid",
                            duration: 0.5,
                            ease: "power1.in",
                          });
                        },
                      });
                    }
                    return prev - 1;
                  });
                }, 1000);
              },
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(sectionRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleTextClick = () => {
    if (!showGallery) {
      gsap.to(textRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power1.out",
        onComplete: () => {
          setShowGallery(true);
          gsap.to(galleryRef.current, {
            opacity: 1,
            display: "grid",
            duration: 0.5,
            ease: "power1.in",
          });
        },
      });
    }
  };

  const handleItemClick = (id) => {
    if (!isMobile) return;
    setActiveItemId((prevId) => (prevId === id ? null : id));
  };

  const blockText =
    "Опыт команды А+ включает в себя большое количество успешно реализованных проектов как жилого, так и коммерческого назначения";

  const words = blockText.split(" ").map((word, index) => (
    <span
      key={index}
      className="word"
      style={{ display: "inline-block", marginRight: "8px" }}
    >
      {word.split("").map((char, charIndex) => (
        <span
          key={charIndex}
          className="letter"
          style={{ display: "inline-block", position: "relative" }}
        >
          {char}
        </span>
      ))}
    </span>
  ));

  const galleryItems = [
    {
      id: 1,
      img: "https://optim.tildacdn.com/tild6237-6137-4436-b961-396663353934/-/format/webp/image.png",
      title: "ЖК «Сердце столицы»",
      className: "tall",
    },
    {
      id: 2,
      img: "https://optim.tildacdn.com/tild6436-3134-4934-a463-316236333665/-/format/webp/img11.jpg",
      title: "Проект 2",
    },
    {
      id: 3,
      img: "https://optim.tildacdn.com/tild6232-3539-4164-b530-373836663734/-/format/webp/img7.jpg",
      title: "Проект 3",
    },
    {
      id: 4,
      img: "https://optim.tildacdn.com/tild3964-6264-4366-a430-613738306164/-/format/webp/img8.jpg",
      title: "Проект 4",
    },
    {
      id: 5,
      img: "https://optim.tildacdn.com/tild3963-3836-4236-b837-373461303366/-/format/webp/img10.jpg",
      title: "Проект 5",
      className: "wide",
    },
    {
      id: 6,
      img: "https://optim.tildacdn.com/tild3139-3564-4333-b563-663039326361/-/format/webp/IMG_9466.jpg",
      title: "Проект 6",
    },
    {
      id: 7,
      img: "https://optim.tildacdn.com/tild3133-6466-4638-b061-323561386339/-/format/webp/IMG_9471.png",
      title: "Проект 7",
      className: "tall",
    },
    {
      id: 8,
      img: "https://optim.tildacdn.com/tild3838-3335-4639-b961-306436643061/-/format/webp/IMG_9473.jpeg",
      title: "Проект 8",
      className: "tall",
    },
    {
      id: 9,
      img: "https://optim.tildacdn.com/tild3738-6239-4537-a266-646533313064/-/format/webp/IMG_9479.png",
      title: "Проект 9",
    },
    {
      id: 10,
      img: "https://optim.tildacdn.com/tild3863-3739-4634-b830-666537303236/-/format/webp/image.png",
      title: "Проект 10",
      className: "wide",
    },
  ];

  return (
    <section ref={sectionRef} className="panel" id="block3">
      <div
        ref={textRef}
        className="text-container"
        onClick={handleTextClick}
        style={{ display: showGallery ? "none" : "block" }}
      >
        {words}
        {countdown !== null && (
          <span className="countdown-inline">...{countdown}</span>
        )}
      </div>

      <div ref={galleryRef} className="gallery-container">
        {galleryItems.map((item) => {
          const isActive = activeItemId === item.id;
          return (
            <div
              key={item.id}
              className={`gallery-item ${item.className || ""} ${
                isActive ? "touch-active" : ""
              }`}
              onTouchStart={() => handleItemClick(item.id)}
              style={{
                backgroundImage: `url(${item.img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                ...(isMobile && {
                  transform: isActive ? "scale(1.4)" : "scale(1)",
                  filter: isActive ? "brightness(1)" : "",
                  zIndex: isActive ? 2 : 1,
                }),
              }}
            >
              <div className="gallery-title">{item.title}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Projects;