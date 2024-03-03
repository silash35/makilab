import config from "@config";
import { styled } from "@mui/material/styles";
import NextLink from "next/link";

import useLocale from "@/hooks/useLocale";

import en from "./locales/en";
import pt from "./locales/pt";

const { COMPANY } = config;

const Header = styled("header")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  margin: "auto",
  marginTop: 0,
  marginBottom: 0,
  padding: theme.spacing(3),
  width: "80%",
  [theme.breakpoints.up("md")]: {
    justifyContent: "space-between",
  },
}));

const ImageLink = styled(NextLink)({ lineHeight: 0 });

const Nav = styled("nav")(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(3),
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const Link = styled(NextLink)({
  color: "black",
  fontWeight: "bold",
  fontSize: "1.2rem",
  textDecoration: "none",
  textTransform: "uppercase",
  margin: "auto",
  borderBottom: "transparent 2px solid",
  "&:hover, &:focus, &:active": {
    borderBottom: "black 2px solid",
  },
});

const LayoutHeader = () => {
  const { t } = useLocale({ en, pt });

  return (
    <Header>
      <ImageLink href="/">
        <img alt={`OpenSOM logo`} height="40" src="/wordmark.svg" />
      </ImageLink>

      <Nav>
        <Link href={`mailto:${COMPANY.email}`}>E-mail</Link>
        <Link href={`tel:${COMPANY.phones[0].replace(/[^0-9]/g, "")}`}>{t.phone}</Link>
        <Link
          sx={{
            color: "primary.main",
            "&:hover, &:focus, &:active": {
              borderColor: "primary.main",
            },
          }}
          href={`https://wa.me/${COMPANY.whatsapp.replace(/[^0-9]/g, "")}`}
        >
          WhatsApp
        </Link>
      </Nav>
    </Header>
  );
};

export default LayoutHeader;
