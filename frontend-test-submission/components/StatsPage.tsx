import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Divider } from "@mui/material";

interface Click {
  timestamp: string;
  source: string;
  location: string;
}

interface URLData {
  longUrl: string;
  createdAt: string;
  expiry: string;
  clicks: Click[];
}

export default function StatsPage() {
  const [urlStats, setUrlStats] = useState<{ code: string; data: URLData }[]>([]);

  useEffect(() => {
    const allData: { code: string; data: URLData }[] = [];

    for (let key in localStorage) {
      if (key.startsWith("short-")) {
        try {
          const data = JSON.parse(localStorage.getItem(key)!);
          allData.push({ code: key.replace("short-", ""), data });
        } catch {}
      }
    }
    setUrlStats(allData);
  }, []);

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>Shortened URL Stats</Typography>
      {urlStats.map(({ code, data }, idx) => (
        <Paper key={idx} sx={{ mb: 3, p: 2 }}>
          <Typography variant="h6">{`Short URL: http://localhost:3000/${code}`}</Typography>
          <Typography>Original: {data.longUrl}</Typography>
          <Typography>Created At: {new Date(data.createdAt).toLocaleString()}</Typography>
          <Typography>Expires At: {new Date(data.expiry).toLocaleString()}</Typography>
          <Typography>Total Clicks: {data.clicks?.length || 0}</Typography>
          <Divider sx={{ my: 1 }} />
          {data.clicks?.map((click, i) => (
            <Typography key={i}>
              {i + 1}. {click.timestamp} | Source: {click.source} | Location: {click.location}
            </Typography>
          ))}
        </Paper>
      ))}
    </Box>
  );
}
