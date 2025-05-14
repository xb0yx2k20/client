import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Logo from "../../assets/logo.svg";
import "../../styles/main.css";

gsap.registerPlugin(ScrollTrigger);

const Main = () => {
  const logoRef = useRef(null);
  const sloganRef = useRef(null);
  const textRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Начальная установка
    const isMobile = window.innerWidth < 768;
    gsap.set(logoRef.current, { height: isMobile ? "20vh" : "60vh", opacity: 1 });
    gsap.set(sloganRef.current.querySelectorAll(".slogan-letter"), {
      opacity: 0,
      rotate: -15,
    });
    const words = textRef.current.querySelectorAll(".word");
    gsap.set(words, { opacity: 0, y: 30 });

    // Анимация появления
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const tl = gsap.timeline();
            tl.to(sloganRef.current.querySelectorAll(".slogan-letter"), {
              opacity: 1,
              rotate: 0,
              duration: 1.2,
              stagger: 0.1,
              ease: "power3.out",
            })
              .to(
                sloganRef.current.querySelectorAll(".slogan-letter"),
                {
                  opacity: 0,
                  y: -30,
                  filter: "blur(10px)",
                  duration: 1.2,
                  stagger: 0.1,
                  ease: "power3.in",
                },
                "-=0.6"
              )
              .to(
                logoRef.current,
                {
                  height: isMobile ? "10vh" : "15vh",
                  width: "auto",
                  duration: 1.2,
                  ease: "power3.out",
                },
                "-=1.2"
              )
              .to(
                words,
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.8,
                  stagger: 0.15,
                  ease: "power3.out",
                },
                "-=0.6"
              );

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(sectionRef.current);

    // Анимация логотипа при скролле
    

    return () => {
      observer.disconnect();
    };
  }, []);

  // Слоган
  const sloganText = "team";
  const sloganLetters = sloganText.split("").map((letter, index) => (
    <span key={index} className="slogan-letter">
      {letter}
    </span>
  ));

  // Текст
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
          style={{ display: "inline-block" }}
        >
          {char}
        </span>
      ))}
    </span>
  ));

  return (
    <>
      <div
        ref={logoRef}
        className="logo"
        style={{
          position: "fixed",
          top: "20px",
          left: "10px",
          zIndex: 1000,
          width: "auto",
          display: "flex",
        }}
      >
        <img
          src={Logo}
          style={{
            height: "100%",
            width: "auto",
          }}
          alt="Logo"
        />
      </div>

      <section
        ref={sectionRef}
        className="panel"
        id="block1"
        style={{
          flex: "0 0 100%",
          minHeight: "100vh",
          height: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          color: "#fff",
          boxSizing: "border-box",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div ref={textRef} className="text-container">
          {words}
        </div>

        <div
          ref={sloganRef}
          className="slogan"
          style={{
            position: "absolute",
            bottom: "100px",
            right: "50px",
            display: "block",
          }}
        >
          {sloganLetters}
        </div>
      </section>
    </>
  );
};

export default Main;