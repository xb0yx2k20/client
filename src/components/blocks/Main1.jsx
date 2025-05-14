import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Logo from "../../assets/logo.svg";

gsap.registerPlugin(ScrollTrigger);

const Main = () => {
  const logoRef = useRef(null);
  const sloganRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Начальная анимация появления логотипа и слогана
    gsap.set(logoRef.current, { x: -100, y: -100, opacity: 0 });
    gsap.set(sloganRef.current, { x: 100, y: 100, opacity: 0 });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 20%",
          toggleActions: "play none none none",
          once: true,
        },
      });

      tl.fromTo(
        logoRef.current,
        { x: -100, y: -100, opacity: 0 },
        { x: 0, y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
      ).fromTo(
        sloganRef.current,
        { x: 100, y: 100, opacity: 0 },
        { x: 0, y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.5"
      );
    });

    // Анимация логотипа при скролле
    const logoAnimation = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top", // Когда верх секции достигает верха вьюпорта
          end: "bottom top", // Когда низ секции достигает верха вьюпорта
          scrub: true,
          toggleActions: "play reverse play reverse",
        },
      });

      tl.to(logoRef.current, {
        height: "10vh", // Уменьшаем логотип
        width: "auto",
        x: 0, // Сбрасываем трансформацию по x
        y: 0, // Сбрасываем трансформацию по y
        top: "20px", // Фиксируем вверху
        left: "20px", // Фиксируем слева
        duration: 0.3,
      });
    });

    return () => {
      ctx.revert();
      logoAnimation.revert();
    };
  }, []);

  // Разбиваем слоган на буквы
  const sloganText = "management";
  const sloganLetters = sloganText.split("").map((letter, index) => (
    <span key={index} className="slogan-letter">
      {letter}
    </span>
  ));

  return (
    <>
      {/* Логотип вынесен за пределы section */}
      <div
        ref={logoRef}
        className="logo"
        style={{
          position: "fixed",
          top: "20px",
          left: "20px",
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
          minHeight: "100dvh",
          height: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px",
          color: "#fff",
          boxSizing: "border-box",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Плейсхолдер для логотипа (опционально, если нужно сохранить место) */}
        <div style={{ height: "60vh", width: "auto", alignSelf: "flex-start" }}></div>

        <div
          ref={sloganRef}
          className="slogan"
          style={{
            position: "absolute",
            alignSelf: "flex-end",
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