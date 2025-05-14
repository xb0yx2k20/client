import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "../styles/main.css";
import Main from "./blocks/Main";
import About from "./blocks/About";
import Projects from "./blocks/Projects";
import Services from "./blocks/Services";
import Adv from "./blocks/Adv";
import Directors from "./blocks/Directors";
import Partners from "./blocks/Partners";
import Contacts from "./blocks/Contacts";



import NavigationMenu from "./Menu";

gsap.registerPlugin(ScrollTrigger);

const HorizontalScroll = () => {
  const containerRef = useRef(null);
  const [activeBlock, setActiveBlock] = useState(1);
  const [showMenu, setShowMenu] = useState(false);

  // Таймер для показа меню через 7 секунд
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMenu(true);
    }, 7000);

    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    const container = containerRef.current;
    const panels = gsap.utils.toArray(".panel", container);

    if (!container || !panels.length) return;

    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      if (!isMobile) {
        // Horizontal scroll
        gsap.to(panels, {
          xPercent: -100 * (panels.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: container,
            pin: true,
            scrub: 0.3,
            snap: {
              snapTo: 1 / (panels.length - 1),
              duration: { min: 0.2, max: 0.4 },
              ease: "power1.inOut",
            },
            end: () => `+=${container.offsetWidth * (panels.length - 1)}`,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const progress = self.progress;
              const blockIndex = Math.round(progress * (panels.length - 1)) + 1;
              setActiveBlock(blockIndex);

              // Показать меню начиная со второго блока || 7s
              if (progress >= 1 / (panels.length - 1) || showMenu) {
                setShowMenu(true);
              }
            },
          },
        });
      } else {
        // Mobile vertical scroll
        panels.forEach((panel, index) => {
          ScrollTrigger.create({
            trigger: panel,
            start: "top 50%",
            end: "bottom 50%",
            onEnter: () => {
              setActiveBlock(index + 1);
              setShowMenu(index >= 1 || showMenu);
            },
            onEnterBack: () => {
              setActiveBlock(index + 1);
            },
          });
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const blocks = [
    { id: 1, label: "Начало" },
    // { id: 2, label: "О нас" },
    { id: 2, label: "Услуги" },
    { id: 3, label: "Проекты" },
    { id: 4, label: "Преимущества" },
    { id: 5, label: "Руководство" },
    { id: 6, label: "Партнеры" },
    { id: 7, label: "Контакты" },
  ];

  return (
    <>
    <div className="container" ref={containerRef}>
      <Main />
      <Services />
      <Projects />
      <Adv />
      <Directors />
      <Partners />
      <Contacts />
      <NavigationMenu
        activeBlock={activeBlock}
        setActiveBlock={setActiveBlock}
        containerRef={containerRef}
        blocks={blocks}
        visible={showMenu}
      />
    </div>
    </>
    
  );
};

export default HorizontalScroll;