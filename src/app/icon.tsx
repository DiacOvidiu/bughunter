import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#07090f",
          borderRadius: 16,
          border: "1px solid rgba(232,238,252,0.18)",
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 22,
            background:
              "radial-gradient(26px 26px at 30% 30%, rgba(124,92,255,0.9), rgba(124,92,255,0.35)), radial-gradient(26px 26px at 70% 70%, rgba(45,212,191,0.7), rgba(45,212,191,0.2))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ fontSize: 26, fontWeight: 800, color: "#07090f" }}>B</div>
        </div>
      </div>
    ),
    size,
  );
}
