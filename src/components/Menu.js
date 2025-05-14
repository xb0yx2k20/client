import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import "../styles/menu.css";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Menu = ({ activeBlock, setActiveBlock, containerRef, blocks, visible }) => {
  const menuRef = useRef(null);
  const itemsWrapperRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuRef.current) return;

    if (visible) {
      gsap.to(menuRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
        pointerEvents: "auto",
      });
    } else {
      gsap.to(menuRef.current, {
        y: 100,
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
        pointerEvents: "none",
      });
    }
  }, [visible]);

  useEffect(() => {
    if (!itemsWrapperRef.current) return;

    const isMobile = window.innerWidth < 768; // Проверяем, мобильная ли версия

    if (!isMobile) return; // Если не мобильная версия, пропускаем анимацию

    const wrapper = itemsWrapperRef.current;
    const items = wrapper.querySelectorAll(".menu-item");

    if (isMenuOpen) {
      // Анимация появления фона
      gsap.fromTo(
        wrapper,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        }
      );

      // Анимация появления пунктов меню
      gsap.fromTo(
        items,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
        }
      );
    } else {
      // Анимация исчезновения фона
      gsap.to(wrapper, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });

      // Анимация исчезновения пунктов меню
      gsap.to(items, {
        y: 20,
        opacity: 0,
        duration: 0.3,
        stagger: 0.05,
        ease: "power2.in",
      });
    }
  }, [isMenuOpen]);

  const handleBlockClick = (blockId) => {
    const container = containerRef.current;
    const panels = gsap.utils.toArray(".panel", container);

    if (!panels.length || !container) return;

    const panel = panels[blockId - 1];
    if (!panel) return;

    if (window.innerWidth < 768) {
      panel.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsMenuOpen(false);
      return;
    }

    const totalScroll = ScrollTrigger.maxScroll(window);
    const targetScroll = ((blockId - 1) / (panels.length - 1)) * totalScroll;

    gsap.to(window, {
      scrollTo: targetScroll,
      duration: 1,
      ease: "power2.inOut",
    });
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className={`scroll-menu ${isMenuOpen ? "open" : ""}`} ref={menuRef}>
      <div className="burger-menu" onClick={toggleMenu}>
        <span className={`burger-icon ${isMenuOpen ? "open" : ""}`}></span>
      </div>
      <div className="menu-items-wrapper" ref={itemsWrapperRef}>
        {blocks.map((block) => (
          <div
            key={block.id}
            className={`menu-item ${activeBlock === block.id ? "active" : ""}`}
            onClick={() => handleBlockClick(block.id)}
          >
            {block.label}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Menu;