import type { MetadataRoute } from "next";

type Manifest = MetadataRoute.Manifest;
type IconObject = Required<Manifest>["icons"][0];

const CreateManifest = (manifest: Manifest, siteURL: string, normalIcons: string[]): Manifest => {
  const createIconEntry = (size: string): IconObject => ({
    src: `${siteURL}/icons/android-chrome-${size}.png`,
    sizes: size,
    type: "image/png",
  });

  return {
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",

    icons: [
      ...normalIcons.map((size) => createIconEntry(size)),
      {
        src: `${siteURL}/icons/maskable_icon.png`,
        sizes: "196x196",
        type: "image/png",
        purpose: "maskable",
      },
    ],

    ...manifest,
  };
};

export default CreateManifest;
