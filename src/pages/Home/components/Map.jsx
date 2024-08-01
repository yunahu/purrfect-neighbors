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
  }, [latitude, longitude]);

  useEffect(() => {
    markers.forEach((marker) => marker.remove());
    if (!pets?.length && !products?.length) return;
    const link = selection == "products" ? "product" : "pet";
    const data = selection == "products" ? products : pets;
    const newMarkers = [];

    const groupData = data.reduce((acc, item) => {
      const key = `${item.latitude},${item.longitude}`;
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    }, {});

    Object.keys(groupData).forEach((key) => {
      const posts = groupData[key];
      const [latitude, longitude] = key.split(",").map(Number);
      const marker = new mapboxgl.Marker({ color: "var(--color-brand-100)" })
        .setLngLat([longitude, latitude])
        .addTo(map.current);

      marker.getElement().addEventListener("click", (e) => {
        e.stopPropagation();
        const popupContent = posts.map((post) => ({
          title: post.title || post.pet_name,
          description:
            post.content ||
            `${post.pet_type}, ${post.breed}, ${post.pet_address}`,
          link: `/${link}/${post.id}`,
          image: link === "pet" && post.image ? post.image.split(",")[0] : null
        }));

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
