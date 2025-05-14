import { useEffect, useRef } from "react";
import markerIcon from "../../assets/icons/marker.svg"; 

const YandexMap = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://api-maps.yandex.ru/2.1/?lang=ru_RU";
    script.async = true;
    script.onload = () => {
      if (window.ymaps) {
        window.ymaps.ready(() => {
          const coords = [55.749577, 37.681281];

          const map = new window.ymaps.Map(mapRef.current, {
            center: coords,
            zoom: 15,
            controls: ["zoomControl", "fullscreenControl"],
          });

          const placemark = new window.ymaps.Placemark(
            coords,
            {
              balloonContentHeader: "ООО 'Мое'",
              balloonContentBody:
                "улица Московский Вал, 1, г. Москва, Россия<br/>ИНН: 1234567890 / КПП: 098765432",
              hintContent: "ООО 'Мое'",
            },
            {
              iconLayout: "default#image",
              iconImageHref: markerIcon,
              iconImageSize: [40, 40], // подгони под твой SVG
              iconImageOffset: [-20, -20],
            }
          );

          map.geoObjects.add(placemark);
          placemark.balloon.open();
        });
      }
    };

    document.head.appendChild(script);
  }, []);

  return <div ref={mapRef} style={{ width: "100%", height: "40vh", borderRadius: "15px", overflow: "hidden" }} />;
};

export default YandexMap;