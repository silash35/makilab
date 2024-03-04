import { styled } from "@mui/material/styles";

const Flex = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "16px",

  [theme.breakpoints.down("md")]: {
    flexWrap: "wrap",
    gap: 0,
  },
}));

export default Flex;
