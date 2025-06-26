import { ImageResponse } from "next/og";
import { emoji } from "./meta.data";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          width: "100%",
          height: "100%",
        }}
      >
        {emoji}
      </div>
    ),
    {
      ...size,
    },
  );
}
