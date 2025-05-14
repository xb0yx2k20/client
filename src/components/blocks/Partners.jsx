import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "../../styles/partners.css";

// Пример логотипов
import PartnerLogo1 from "../../assets/partners/ssk.svg";
import PartnerLogo2 from "../../assets/partners/nits.svg";
import PartnerLogo3 from "../../assets/partners/oko.svg";
import PartnerLogo4 from "../../assets/partners/aspace.svg";
import PartnerLogo5 from "../../assets/partners/status.svg";
import PartnerLogo6 from "../../assets/partners/berkano.svg";
import PartnerLogo7 from "../../assets/partners/sawatzky.svg";
import PartnerLogo8 from "../../assets/partners/mikaz.svg";

const partners = [
  { id: 1, logo: PartnerLogo1, name: "ssk", url: "https://gkcck.ru" },
  { id: 2, logo: PartnerLogo2, name: "nits", url: "https://stroyexp.info" },
  { id: 3, logo: PartnerLogo3, name: "oko", url: "https://oko-pm.ru" },
  { id: 4, logo: PartnerLogo4, name: "aspace", url: "https://www.skavangard.ru" },
  { id: 5, logo: PartnerLogo5, name: "status", url: "https://gkstatus.com.ru" },
  { id: 6, logo: PartnerLogo6, name: "berkano", url: "https://expertiza-berkano.ru" },
  { id: 7, logo: PartnerLogo7, name: "sawatzky", url: "https://www.sawatzky.ru" },
  { id: 8, logo: PartnerLogo8, name: "mikaz", url: "https://www.mikaz.net" },
];

const Partners = () => {
  const partnersRef = useRef(null);
  const gridRef = useRef(null);

  // Анимация для сетки
  useEffect(() => {
    if (!gridRef.current) {
      console.error("Partners: gridRef is not defined", {
        gridRef: gridRef.current,
      });
      return;
    }

    gsap.fromTo(
      gridRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        ease: "power2.inOut",
      }
    );
  }, []);

  // Анимация для логотипов
  useEffect(() => {
    if (!partnersRef.current) {
      console.error("Partners: partnersRef is not defined", {
        partnersRef: partnersRef.current,
      });
      return;
    }

    const logos = partnersRef.current.querySelectorAll(".partner-logo");
    gsap.set(logos, { y: 20, opacity: 0, immediateRender: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log("Partners: Section is visible, starting logo animation");
            gsap.to(logos, {
              y: 0,
              opacity: 1,
              duration: 0.5,
              stagger: 0.1,
              ease: "power2.inOut",
            });
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.3,
      }
    );

    observer.observe(partnersRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Обработка касаний на мобильных
  useEffect(() => {
    const links = partnersRef.current.querySelectorAll(".partner-link");
    links.forEach((link) => {
      link.addEventListener("touchstart", () => {
        console.log("Touchstart on link:", link);
        link.classList.add("active");
      });
      link.addEventListener("touchend", () => {
        console.log("Touchend on link:", link);
        link.classList.remove("active");
      });
    });
  }, []);

  return (
    <section id="partners" className="panel" ref={partnersRef}>
      <div className="partners-container">
        <div className="partners-grid" ref={gridRef}>
          {partners.map((partner) => (
            <div key={partner.id} className="partner-item">
              <a
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="partner-link"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="partner-logo"
                />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners; 