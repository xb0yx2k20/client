import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "../../styles/contacts.css";
import YandexMap from "./YandexMap"; 

const Contacts = () => {
  const sectionRef = useRef(null);
  const formTitleRef = useRef(null);
  const formRef = useRef(null);
  const linksRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (
      !sectionRef.current ||
      !formTitleRef.current ||
      !formRef.current ||
      !linksRef.current ||
      !mapRef.current
    ) {
      console.error("Contacts: Refs are not defined", {
        sectionRef: sectionRef.current,
        formTitleRef: formTitleRef.current,
        formRef: formRef.current,
        linksRef: linksRef.current,
        mapRef: mapRef.current,
      });
      return;
    }

    // Анимация для заголовка формы
    const formTitleWords = formTitleRef.current.querySelectorAll(".word");
    gsap.set(formTitleWords, { opacity: 0, y: 10, immediateRender: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log("Contacts: Section is visible, starting animation");

            // Анимация карты
            gsap.fromTo(
              mapRef.current,
              { opacity: 0, y: 20 },
              {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: "power2.out",
                delay: 0.3,
              }
            );

            // Анимация заголовка формы
            gsap.to(formTitleWords, {
              opacity: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.1,
              ease: "power2.out",
              delay: 0.5,
            });

            // Анимация формы
            const formElements = formRef.current.querySelectorAll(
              ".form-group, .submit-button"
            );
            gsap.fromTo(
              formElements,
              { opacity: 0, y: 20 },
              {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.1,
                ease: "power2.out",
                delay: 0.7,
              }
            );

            // Анимация ссылок
            const links = linksRef.current.querySelectorAll(".contact-link");
            gsap.fromTo(
              links,
              { opacity: 0, scale: 0.8 },
              {
                opacity: 1,
                scale: 1,
                duration: 0.5,
                stagger: 0.1,
                ease: "back.out(1.7)",
                delay: 0.9,
              }
            );

            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.3,
      }
    );

    observer.observe(sectionRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  const formTitleText = "Форма обратной связи";

  const formTitleWords = formTitleText.split(" ").map((word, index) => (
    <span
      key={`formtitle-${index}`}
      className="word"
      style={{ display: "inline-block", marginRight: "6px" }}
    >
      {word}
    </span>
  ));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name")?.trim(),
      email: formData.get("email")?.trim(),
      message: formData.get("message")?.trim(),
    };
  
    try {
      const response = await fetch("https://localhost:3001/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        alert("Сообщение успешно отправлено!");
        e.target.reset();
      } else {
        alert("Ошибка при отправке сообщения. Попробуйте снова.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Произошла ошибка. Проверьте соединение и попробуйте снова.");
    }
  };

  return (
    <section ref={sectionRef} className="panel" id="contacts">
      <div className="contacts-container">
        {/* Левая колонка: только форма */}
        <div className="contact-left">
          <div className="form-wrapper">
            <div ref={formTitleRef} className="contact-title">
              {formTitleWords}
            </div>
            <div ref={formRef} className="contact-form">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Ваше имя"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Ваш email"
                    required
                  />
                </div>
                <div className="form-group">
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Ваше сообщение"
                    rows="4"
                    required
                  ></textarea>
                </div>
                <button type="submit" className="submit-button">
                  Отправить
                </button>
              </form>
            </div>
          </div>
        </div>

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
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacts;