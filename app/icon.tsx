import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
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
          backgroundColor: "#B8CC30",
          borderRadius: 4,
        }}
      >
        <span
          style={{
            fontSize: 18,
            fontWeight: 900,
            color: "#000000",
            letterSpacing: -1,
          }}
        >
          AM
        </span>
      </div>
    ),
    { ...size }
  );
}
