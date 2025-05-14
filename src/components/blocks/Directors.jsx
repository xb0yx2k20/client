import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "../../styles/directors.css";

const Directors = () => {
  const sectionRef = useRef(null);
  const directorsRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current || !directorsRef.current) return;

    const items = directorsRef.current.querySelectorAll(".director-card");
    gsap.set(items, { opacity: 0, scale: 0.9, immediateRender: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(items, {
              opacity: 1,
              scale: 1,
              duration: 0.5,
              stagger: 0.3,
              ease: "power1.in",
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

  const directors = [
    {
      name: "Фамилия Имя Отчество",
      position: "Генеральный директор",
      photo: "https://justvision.org/sites/default/files/2019-11/ofer-shinar.png", // Пример фото, замени на своё
    },
    {
      name: "Фамилия Имя Отчество",
      position: "Заместитель ген директора",
      photo: "https://justvision.org/sites/default/files/2019-11/ofer-shinar.png", // Пример фото, замени на своё
    },
  ];

  return (
    <section ref={sectionRef} className="panel" id="directors">
      <div className="directors-container">
        <div ref={directorsRef} className="directors-grid">
          {directors.map((director, index) => (
            <div key={index} className="director-card">
              <div
                className="director-photo"
                style={{ backgroundImage: `url(${director.photo})` }}
              ></div>
              <h3 className="director-name">{director.name}</h3>
              <p className="director-position">{director.position}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Directors;