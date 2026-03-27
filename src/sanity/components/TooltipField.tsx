"use client";
import React, { useState } from "react";
import { InfoOutlineIcon } from "@sanity/icons";
import type { FieldProps } from "sanity";

/**
 * Custom Sanity Studio field wrapper.
 *
 * Renders the field normally (label + input + validation) but:
 * - Removes the always-visible description text
 * - Adds a small ℹ icon absolutely-positioned next to the label
 * - On hover over the icon → shows a fixed-position tooltip with the description
 *
 * Applied via: components: { field: TooltipField }
 */
export function TooltipField(props: FieldProps) {
  const { description, renderDefault } = props;
  const [tooltipPos, setTooltipPos] = useState<{
    top: number;
    left: number;
  } | null>(null);

  // No description → nothing to do, render normally.
  if (!description) {
    return <>{renderDefault(props)}</>;
  }

  return (
    <div style={{ position: "relative", paddingLeft: 20 }}>
      {/* Render the field without the description (we'll show it in tooltip) */}
      {renderDefault({ ...props, description: undefined })}

      {/* ℹ icon overlaid in the top-right corner of the field label area */}
      <span
        onMouseEnter={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setTooltipPos({
            top: rect.bottom + 6,
            left: rect.left + rect.width / 2,
          });
        }}
        onMouseLeave={() => setTooltipPos(null)}
        style={{
          position: "absolute",
          top: 3,
          left: 0,
          cursor: "help",
          color: "#7b8ea4",
          display: "inline-flex",
          alignItems: "center",
          padding: "2px",
          zIndex: 2,
        }}
      >
        <InfoOutlineIcon style={{ width: 14, height: 14 }} />
      </span>

      {/* Tooltip rendered at fixed position so it's never clipped */}
      {tooltipPos !== null && (
        <div
          style={{
            position: "fixed",
            top: tooltipPos.top,
            left: tooltipPos.left,
            transform: "translateX(-50%)",
            backgroundColor: "#1e2530",
            color: "#dce4f0",
            padding: "10px 14px",
            borderRadius: 8,
            fontSize: 12,
            lineHeight: 1.65,
            maxWidth: 320,
            width: "max-content",
            zIndex: 99999,
            whiteSpace: "pre-wrap",
            boxShadow: "0 4px 20px rgba(0,0,0,0.45)",
            pointerEvents: "none",
          }}
        >
          {String(description)}
          {/* caret pointing up */}
          <span
            style={{
              position: "absolute",
              top: -6,
              left: "50%",
              transform: "translateX(-50%)",
              width: 0,
              height: 0,
              borderLeft: "6px solid transparent",
              borderRight: "6px solid transparent",
              borderBottom: "6px solid #1e2530",
            }}
          />
        </div>
      )}
    </div>
  );
}
