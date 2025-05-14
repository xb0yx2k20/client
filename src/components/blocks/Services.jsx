import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "../../styles/services.css";

const Services = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const [openCategories, setOpenCategories] = useState({});

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const elements = contentRef.current.querySelectorAll(".category-title");
    gsap.set(elements, { opacity: 0, immediateRender: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(elements, {
              opacity: 1,
              duration: 0.1,
              stagger: 0.1,
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

  const toggleCategory = (index) => {
    setOpenCategories((prev) => {
      const isOpen = !!prev[index];
      const list = contentRef.current.querySelector(`#service-list-${index}`);
      const items = list.querySelectorAll(".service-item");

      if (isOpen) {
        // Закрываем
        gsap.to(items, {
          opacity: 0,
          height: 0,
          margin: 0,
          duration: 0.3,
          ease: "power1.out",
          onComplete: () => {
            gsap.set(list, { height: 0 });
          },
        });
      } else {
        // Открываем
        gsap.set(list, { height: "auto" });
        gsap.fromTo(
          items,
          { opacity: 0, height: 0, margin: 0 },
          {
            opacity: 1,
            height: "auto",
            marginBottom: 15,
            duration: 0.3,
            stagger: 0.1,
            ease: "power1.in",
          }
        );
      }

      return { ...prev, [index]: !isOpen };
    });
  };

  const services = [
    {
      category: "Технический заказчик",
      items: [
        "Формирование Исходно-разрешительной документации (ИРД)",
        "Оформление земельно-правовых отношений на Объект",
        "Сопровождение разработки и утверждения проектов планировки территорий (ППТ)",
        "Получение градостроительного плана земельного участка (ГПЗУ)",
        "Подготовка документов для градостроительной земельной комиссии (ГЗК)",
        "Внесение изменений в правила землепользования и застройки (ПЗЗ)",
        "Реализация проектов включённых в комплексное развитие территорий (КРТ)",
        "Разработка и согласование архитектурно-градостроительной концепции (АГК)",
        "Разработка и согласование архитектурно-градостроительного решения (АГР)",
        "Организация инженерных изысканий",
        "Получение технических условий на подключение к инженерным сетям",
        "Техническое сопровождение предпроектных и проектных работ",
        "Согласование предпроектной и проектной документации",
        "Сопровождение проведения экспертизы проекта",
        "Получение разрешения на строительство (РнС)",
        "Сопровождение сдачи законченного строительством объекта и получение ЗОС",
        "Получение разрешения на ввод объекта в эксплуатацию (РнВ)",
        "Сопровождение передачи объекта управляющей компании",
      ],
    },
    {
      category: "Управление проектами",
      items: [
        "Управление тендерами и закупками, комплектация Объектов",
        "Управление маркетингом и продажами",
        "Управление проектированием",
        "Управление строительством",
        "Управление эксплуатацией",
      ],
    },
    {
      category: "Строительный контроль",
      items: [
        "Проверка соблюдения технологии производства СМР и сроков строительства",
        "Проверка достоверности документирования результатов работ",
        "Освидетельствование скрытых работ и промежуточная приемка возведенных строительных конструкций",
        "Проверка соответствия фактически выполненных объемов",
        "Проверка соответствия законченного строительством объекта требованиям проектной документации и технических регламентов",
        "Осуществление иных видов работ по строительному контролю",
      ],
    },
    {
      category: "Аудит и консалтинг",
      items: [
        "Градостроительный аудит объекта",
        "Финансово-технический аудит",
        "Технический аудит проектов",
      ],
    },
  ];

  return (
    <section ref={sectionRef} className="panel" id="block4">
      <div ref={contentRef} className="services-container">
        {services.map((category, index) => (
          <div key={index} className="service-category">
            <h3
              className="category-title"
              onClick={() => toggleCategory(index)}
            >
              <span>{category.category}</span>
              <span className="toggle-button">
                {openCategories[index] ? "−" : "+"}
              </span>
            </h3>
            <ul
              id={`service-list-${index}`}
              className="service-list"
              style={{ height: 0 }}
            >
              {category.items.map((item, idx) => (
                <li key={idx} className="service-item">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;