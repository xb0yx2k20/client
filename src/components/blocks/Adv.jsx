import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "../../styles/adv.css";

const Adv = () => {
  const sectionRef = useRef(null);
  const advantagesRef = useRef(null);
  const downloadButtonRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current || !advantagesRef.current ||  !downloadButtonRef.current) {
      return;
    };

    const items = advantagesRef.current.querySelectorAll(".advantage-card");
    const downloadButton = downloadButtonRef.current;
    gsap.set([...items, downloadButton], { opacity: 0, y: 20, immediateRender: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to([...items, downloadButton], {
              opacity: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.2,
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

  const advantages = [
    {
      title: "Оптимизация затрат",
      description:
        "Генерируем готовые решения, направленные на оптимизацию затрат при реализации проекта.",
    },
    {
      title: "Прозрачность",
      description:
        "Работаем в отлаженной прозрачной системе взаимодействия нашей команды.",
    },
    {
      title: "Цифровизация",
      description:
        "Предлагаем уникальную платформу для взаимодействия со всеми участниками проекта.",
    },
    {
      title: "Экспертность",
      description: "Делимся своим опытом и компетенциями.",
    },
  ];

  return (
    <section ref={sectionRef} className="panel" id="block6">
      <div className="advantages-container">
        <div ref={advantagesRef} className="advantages-grid">
          {advantages.map((advantage, index) => (
            <div key={index} className="advantage-card">
              <h3 className="advantage-title">{advantage.title}</h3>
              <p className="advantage-description">{advantage.description}</p>
            </div>
          ))}
        </div>
        <a
          ref={downloadButtonRef}
          href="https://drive.google.com/uc?export=download&id=1xhHCYkJhojScgk4UJMacmFIk9r_8mi69"
          download
          className="download-button"
        >
          Скачать презентацию
        </a>
      </div>
    </section>
  );
};

export default Adv;