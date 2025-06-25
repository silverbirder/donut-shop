import type { MetadataRoute } from "next";
import { iconSizes } from "./icon";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ドーナツショップ",
    short_name: "ドーナツ",
    description: "ドーナツショップ",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
    icons: iconSizes.map((size) => ({
      src: `/icon/${size}`,
      sizes: `${size}x${size}`,
      type: "image/png",
    })),
  };
}
