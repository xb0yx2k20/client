import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "../../styles/contacts.css";
import YandexMap from "./YandexMap";

const Contacts = () => {
  const sectionRef = useRef(null);
  const linksRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current || !linksRef.current || !mapRef.current) {
      console.error("Contacts: Refs are not defined", {
        sectionRef: sectionRef.current,
        linksRef: linksRef.current,
        mapRef: mapRef.current,
      });
      return;
    }

    // Анимация для карты
    gsap.set(mapRef.current, { opacity: 0, y: 20 });

    // Анимация для ссылок
    const links = linksRef.current.querySelectorAll(".contact-link");
    gsap.set(links, { opacity: 0, scale: 0.8 });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log("Contacts: Section is visible, starting animation");

            // Анимация карты
            gsap.to(mapRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power2.out",
              delay: 0.3,
            });

            // Анимация ссылок
            gsap.to(links, {
              opacity: 1,
              scale: 1,
              duration: 0.5,
              stagger: 0.1,
              ease: "back.out(1.7)",
              delay: 0.5,
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

  return (
    <section ref={sectionRef} className="panel" id="contacts">
      <div className="contacts-container">
        {/* Правая колонка: карта и ссылки */}
        <div className="contact-right">
          <div ref={mapRef} className="contact-map">
            <YandexMap />
          </div>
          <div ref={linksRef} className="contact-links">
            <a
              href="https://t.me/example"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              Telegram
            </a>
            <a href="mailto:info@example.com" className="contact-link">
              Email
            </a>
            <a href="tel:+1234567890" className="contact-link">
              Telephone
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacts;