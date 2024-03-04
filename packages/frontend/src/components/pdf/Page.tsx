import { styled } from "@mui/material/styles";

const Page = styled("article")({
  margin: "auto",
  border: "1px solid black",
  backgroundColor: "white",
  padding: "16px",
  width: "210mm",
  maxWidth: "210mm",
  minHeight: "297mm",
  color: "#212121",
  fontSize: "12px",

  hr: {
    border: "1px black dashed",
  },
  "> section": {
    pageBreakInside: "avoid",
  },
  "@media print": {
    position: "absolute",
    top: "0",
    left: "0",
    zIndex: "9999",
    border: "none",

    width: "auto",
    minWidth: "100%",
    height: "auto",
    minHeight: "100%",
  },
});

export default Page;
