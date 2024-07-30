import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";

import "mapbox-gl/dist/mapbox-gl.css";

import Popup from "../../../components/Popup";
import { useSearch } from "../../../context/useSearch";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const Map = () => {
  const { geolocation, filter, pets, products } = useSearch();
  const { latitude, longitude } = geolocation;
  const { selection } = filter;

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [markers, setMarkers] = useState([]);
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [popupContent, setPopupContent] = useState({});

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [longitude, latitude],
      zoom: 12
    });
  });

  useEffect(() => {
    markers.forEach((marker) => marker.remove());
    if (!pets?.length && !products?.length) return;
    const link = selection == "products" ? "product" : "pet";
    const data = selection == "products" ? products : pets;
    const newMarkers = [];
    data.forEach((post) => {
      const marker = new mapboxgl.Marker()
        .setLngLat([post.longitude, post.latitude])
        .addTo(map.current);

      marker.getElement().addEventListener("click", (e) => {
        e.stopPropagation();
        const popupContent = {
          title: post.title || post.pet_name,
          description:
            post.content ||
            `${post.pet_type}, ${post.breed}, ${post.pet_address}`,
          link: `/${link}/${post.id}`
        };
        if (link == "pet") {
          popupContent.image = post.image ? post.image.split(",")[0] : null;
        }
        setPopupContent(popupContent);
        setPosition({
          x: e.pageX,
          y: e.pageY
        });
        setVisible(true);
      });

      newMarkers.push(marker);
    });
    setMarkers(newMarkers);
  }, [pets, products, selection]);

  return (
    <>
      <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />
      {visible && (
        <Popup
          open={visible}
          onClose={() => setVisible(false)}
          position={position}
          content={popupContent}
        />
      )}
    </>
  );
};

export default Map;
