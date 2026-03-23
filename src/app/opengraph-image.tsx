import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#07090f",
        backgroundImage:
          "radial-gradient(900px 420px at 10% 10%, rgba(124,92,255,0.55), transparent 60%), radial-gradient(800px 380px at 90% 20%, rgba(45,212,191,0.38), transparent 60%)",
        color: "#e8eefc",
        fontFamily:
          "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
      }}
    >
      <div
        style={{
          width: 980,
          display: "flex",
          flexDirection: "column",
          gap: 16,
          padding: 56,
          borderRadius: 36,
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(232,238,252,0.18)",
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            opacity: 0.8,
          }}
        >
          Comunitate QA din România
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
          }}
        >
          BugHunter
        </div>
        <div style={{ fontSize: 28, opacity: 0.9, lineHeight: 1.4 }}>
          Discord-first • resurse • evenimente • articole despre QA Testing și
          Quality Engineering
        </div>
      </div>
    </div>,
    size,
  );
}
