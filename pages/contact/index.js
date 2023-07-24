import { Container } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import React, { useRef, useEffect, useState, Suspense } from "react";

import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
mapboxgl.accessToken =
  "pk.eyJ1IjoibW9oYW1tYWRtdXJhZCIsImEiOiJjbGdjOGp1bDUwMHU1M2RtbmVyMHZwbm1iIn0.t8yZPXleQUIxIKYHKiqA4w";

const ContactUs = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(36.347791932439534);
  const [lat, setLat] = useState(31.582314110181446);
  const [zoom, setZoom] = useState(6);
  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });
  });

  return (
    <Container style={{ marginTop: 20 }}>
      <Suspense fallback={<p>Loading Map...</p>}>
        <div ref={mapContainer} className="map-container" />
      </Suspense>
      <Suspense fallback={<p>Loading Locations List...</p>}>
        <Accordion defaultActiveKey="0" style={{ marginTop: 90 }}>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Amman</Accordion.Header>
            <Accordion.Body>Amman - Jordan</Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Macca</Accordion.Header>
            <Accordion.Body>Macca - KSA</Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Macca</Accordion.Header>
            <Accordion.Body>Al-Madenah - KSA</Accordion.Body>
          </Accordion.Item>
        </Accordion>{" "}
      </Suspense>
    </Container>
  );
};

export default ContactUs;
