import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Ensure Next uses this folder as the workspace root
    root: __dirname,
  },
  // Silence LAN dev warning and allow opening via local network IP
  allowedDevOrigins: [
    "http://localhost:3001",
    "http://127.0.0.1:3001",
    "http://192.168.1.2:3001",
    "http://localhost:3002",
    "http://127.0.0.1:3002",
    "http://192.168.1.2:3002",
  ],
};

export default nextConfig;
