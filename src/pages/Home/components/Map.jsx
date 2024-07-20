import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const Map = ({ latitude, longitude, radius }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/donations?latitude=${latitude}&longitude=${longitude}&radius=${radius}`);
      const data = await response.json();
      
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

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
    if (!posts.length) return;
    
    posts.forEach(post => {
      const popupContent = document.createElement('div');
      popupContent.innerHTML = `
        <h3>${post.title}</h3>
        <a href="/posts/${post.id}" style="color: blue; text-decoration:underline;">See Details</a>
        <p>${post.content}</p>
      `;
      new mapboxgl.Marker()
        .setLngLat([post.longitude, post.latitude])
        .setPopup(new mapboxgl.Popup().setDOMContent(popupContent))
        .addTo(map.current);
    });
  }, [posts]);

  return <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />;
};

export default Map;