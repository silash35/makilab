import config from "@config";
import { MetadataRoute } from "next";
const { SITE_URL, COMPANY } = config;

type Concrete<Type> = {
  [Property in keyof Type]-?: Type[Property];
};

type IconObject = Concrete<MetadataRoute.Manifest>["icons"][0];

export default function manifest(): MetadataRoute.Manifest {
  const createIconEntry = (size: string): IconObject => ({
    src: `${SITE_URL}/icons/android-chrome-${size}.png`,
    sizes: size,
    type: "image/png",
  });

  const normalIcons = ["192x192", "512x512"];

  return {
    name: "OpenSOM Tracker",
    short_name: "OpenSOM Tracker",
    description: COMPANY.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      ...normalIcons.map((size) => createIconEntry(size)),
      {
        src: `${SITE_URL}/icons/maskable_icon.png`,
        sizes: "196x196",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
