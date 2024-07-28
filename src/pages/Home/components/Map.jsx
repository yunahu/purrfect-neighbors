import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import Popup from "../../../components/Popup"

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const Map = ({ latitude, longitude, radius, selection }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [posts, setPosts] = useState([]);
  const [markers, setMarkers] = useState([]);

  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [popupContent, setPopupContent] = useState({});

  const fetchPosts = async () => {
    try {
      const endpoint = (selection == 'products') ? 'donations' : 'pets';
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/${endpoint}?latitude=${latitude}&longitude=${longitude}&radius=${radius}`);
      const data = await response.json();
      console.log(data);
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [selection]);

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [longitude, latitude],
      zoom: 12
    });
  });

  useEffect(() => {
    markers.forEach(marker => marker.remove());
    if (!posts.length) return;
    
    const link = (selection == 'products') ? 'product' : 'pet';
    const newMarkers = [];
    posts.forEach(post => {
      const marker = new mapboxgl.Marker()
        .setLngLat([post.longitude, post.latitude])
        .addTo(map.current);

      marker.getElement().addEventListener("click", (e) => {
        e.stopPropagation();
        const popupContent = {
          title: post.title,
          description: post.content,
          link: `/${link}/${post.id}`,
        };
        if (link == 'pet') {
          popupContent.image = post.image;
        }
        setPopupContent(popupContent);
        setPosition({
          x: e.pageX,
          y: e.pageY,
        });
        setVisible(true);
      });

      newMarkers.push(marker);
    });
    setMarkers(newMarkers);
  }, [posts]);

  return (
    <>
      <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
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