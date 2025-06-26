import type { MetadataRoute } from "next";
import { iconSizes } from "./icon";
import { title, description } from "./meta.data";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: title,
    short_name: title,
    description: description,
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
