"use client";

import apiBase from "@/services/api-base-instance";
import { useEffect } from "react";

interface TrackVisitPayload {
  ip: string;
  location: string;
}

export default function useTrackVisit() {
  useEffect(() => {
    const trackVisit = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const ipData = await res.json();

        const payload: TrackVisitPayload = {
          ip: ipData.ip,
          location: `${ipData.city}, ${ipData.country_name}`,
        };

        await apiBase.post('/track-visit/', payload);
      } catch (err) {
        console.error("Error tracking visit:", err);
      }
    };

    trackVisit();
  }, []);
}