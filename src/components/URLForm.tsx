import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
} from "@mui/material";

interface URLInput {
  longUrl: string;
  shortcode: string;
  validity: string;
  shortUrl?: string;
  expiry?: string;
}

export default function URLForm() {
  const [urls, setUrls] = useState<URLInput[]>(
    Array(5).fill({ longUrl: "", shortcode: "", validity: "" })
  );

  const handleChange = (index: number, field: keyof URLInput, value: string) => {
    setUrls((prev) =>
      prev.map((url, i) =>
        i === index ? { ...url, [field]: value } : url
      )
    );
  };

  const handleSubmit = () => {
    const newUrls = urls.map((urlData) => {
      const { longUrl, shortcode, validity } = urlData;
      try {
        new URL(longUrl);
      } catch {
        return { ...urlData, shortUrl: "❌ Invalid URL" };
      }
      const code = shortcode || Math.random().toString(36).substring(2, 7);
      const minutes = parseInt(validity || "30", 10);
      const expireAt = new Date(Date.now() + minutes * 60000);
      const shortUrl = `http://localhost:3000/${code}`;
      localStorage.setItem(
        `short-${code}`,
        JSON.stringify({
          longUrl,
          createdAt: new Date().toISOString(),
          expiry: expireAt.toISOString(),
          clicks: [],
        })
      );
      return {
        ...urlData,
        shortUrl,
        expiry: expireAt.toLocaleString(),
      };
    });
    setUrls(newUrls);
  };

  return (
    <Box
      sx={{
        p: 4,
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "800px",
          background: "rgba(255, 255, 255, 0.9)",
          borderRadius: 3,
          boxShadow: "0 8px 32px rgba(31, 38, 135, 0.15)",
          p: 4,
          backdropFilter: "blur(8px)",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "#3f51b5",
            textAlign: "center",
            mb: 3,
          }}
        >
          URL Shortener
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ color: "#555", textAlign: "center", mb: 3 }}
        >
          Shorten up to 5 URLs at once
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {urls.map((urlData, index) => (
            <Paper
              elevation={3}
              sx={{
                p: 3,
                borderRadius: 2,
                background: "rgba(255, 255, 255, 0.9)",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
                "&:hover": {
                  transform: "translateY(-2px)",
                  transition: "transform 0.2s",
                },
              }}
              key={index}
            >
              <TextField
                label="Long URL"
                fullWidth
                value={urlData.longUrl}
                onChange={(e) => handleChange(index, "longUrl", e.target.value)}
                sx={{ mb: 2 }}
                variant="outlined"
                color="primary"
              />
              <TextField
                label="Custom Shortcode (optional)"
                fullWidth
                value={urlData.shortcode}
                onChange={(e) =>
                  handleChange(index, "shortcode", e.target.value)
                }
                sx={{ mb: 2 }}
                variant="outlined"
                color="primary"
              />
              <TextField
                label="Validity (minutes)"
                fullWidth
                value={urlData.validity}
                onChange={(e) =>
                  handleChange(index, "validity", e.target.value)
                }
                variant="outlined"
                color="primary"
              />
              {urlData.shortUrl && (
                <Box
                  sx={{
                    mt: 2,
                    p: 2,
                    borderRadius: 1,
                    background: "#e3f2fd",
                    color: "#1976d2",
                  }}
                >
                  <Typography variant="body1">
                    <strong>Short URL:</strong> {urlData.shortUrl}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Expires:</strong> {urlData.expiry}
                  </Typography>
                </Box>
              )}
            </Paper>
          ))}
        </Box>
        <Button
          variant="contained"
          color="primary"
          sx={{
            mt: 4,
            width: "100%",
            py: 1.5,
            fontSize: "1rem",
            fontWeight: "bold",
            borderRadius: 2,
            boxShadow: "0 4px 12px rgba(63, 81, 181, 0.3)",
            "&:hover": {
              boxShadow: "0 6px 16px rgba(63, 81, 181, 0.4)",
            },
          }}
          onClick={handleSubmit}
        >
          Shorten All
        </Button>
      </Box>
    </Box>
  );
}
