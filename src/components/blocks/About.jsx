import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "../../styles/about.css";

const About = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    console.log("Block2: useEffect started");

    if (!sectionRef.current || !textRef.current) {
      console.error("Block2: sectionRef or textRef is not defined", {
        sectionRef: sectionRef.current,
        textRef: textRef.current,
      });
      return;
    }

    // Находим все слова для анимации
    const words = textRef.current.querySelectorAll(".word");
    gsap.set(words, { opacity: 0, immediateRender: true });
    // Используем Intersection Observer для запуска анимации
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(words, {
              opacity: 1,
              duration: 0.1,
              stagger: 0.1, // Анимация для каждого слова
              ease: "power1.in",
            });
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.3, // Запускаем, когда 30% блока видно
      }
    );

    observer.observe(sectionRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Текст для печати
  const blockText =
    "Наша профессиональная команда по управлению проектами готова оказать поддержку на всех этапах реализации Вашего проекта, начиная с аудита земельного участка, обеспечивая быстрое и четкое определение места и условий будущего строительства, до передачи объекта в эксплуатацию.";
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

  return (
    <section ref={sectionRef} className="panel" id="block2">
      <div ref={textRef} className="text-container">
        {words}
      </div>
    </section>
  );
};

export default About;