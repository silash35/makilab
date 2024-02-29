"use client";

import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { styled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { FormEventHandler, useState } from "react";

import useLocale from "@/hooks/useLocale";

const pt = { button: "Pesquisar" };
const en = { button: "Search" };

const Input = styled("input")({
  all: "unset",
  margin: "6px 12px",
  width: "600px",
  maxWidth: "50vw",
  height: "50px",
});

interface Props {
  handleSearch: FormEventHandler<HTMLFormElement>;
  inputProps: React.ComponentProps<typeof Input>;
}

const SearchBar = ({ handleSearch, inputProps }: Props) => {
  const { locale } = useLocale();
  const t = locale === "en" ? en : pt;

  const [paperElevation, setPaperElevation] = useState(4);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <form onSubmit={handleSearch}>
      <Paper
        sx={{
          display: "flex",
          overflow: "hidden",
        }}
        component="label"
        elevation={paperElevation}
        onMouseOut={() => setPaperElevation(4)}
        onMouseOver={() => setPaperElevation(8)}
      >
        <Input type="text" {...inputProps} />
        <Button
          sx={{ borderRadius: 0, fontSize: "1.2rem", letterSpacing: "0.12rem" }}
          type="submit"
          variant="contained"
        >
          {isMobile ? <SearchIcon /> : t.button}
        </Button>
      </Paper>
    </form>
  );
};

export default SearchBar;
