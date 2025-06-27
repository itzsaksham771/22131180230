import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function RedirectHandler() {
  const { shortcode } = useParams();

  useEffect(() => {
    const dataStr = localStorage.getItem(`short-${shortcode}`);
    if (!dataStr) {
      alert("Invalid or expired short URL.");
      return;
    }

    const data = JSON.parse(dataStr);
    const now = new Date();
    const expiry = new Date(data.expiry);

    if (now > expiry) {
      alert("Link has expired.");
      return;
    }

    const newClick = {
      timestamp: now.toISOString(),
      source: document.referrer || "Direct",
      location: "India", // You can use dummy location as per requirement
    };

    const updatedClicks = [...(data.clicks || []), newClick];
    data.clicks = updatedClicks;
    localStorage.setItem(`short-${shortcode}`, JSON.stringify(data));

    window.location.href = data.longUrl;
  }, [shortcode]);

  return <div>Redirecting...</div>;
}
