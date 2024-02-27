import { Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import { Dispatch, FormEvent, useId, useState } from "react";

import useLocale from "@/hooks/useLocale";

import en from "./locales/en";
import pt from "./locales/pt";
import styles from "./search.module.scss";

interface Props {
  setSearch: Dispatch<string>;
  setEnabled: Dispatch<boolean>;
}

const SearchBar = ({ setSearch, setEnabled }: Props) => {
  const { locale } = useLocale();
  const t = locale === "en" ? en : pt;

  const [paperElevation, setPaperElevation] = useState(4);

  const inputId = useId();

  const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const inputValue = event.currentTarget[inputId].value as string;
    setSearch(inputValue);

    if (inputValue === "") {
      setEnabled(false);
    } else {
      setEnabled(true);
    }
  };

  return (
    <>
      <h1>
        {t.title} <span>{t.titleSpan}</span>
      </h1>
      <form onSubmit={handleSearch}>
        <Paper
          className={styles.search}
          component="label"
          elevation={paperElevation}
          onMouseOut={() => setPaperElevation(4)}
          onMouseOver={() => setPaperElevation(8)}
        >
          <input id={inputId} placeholder={t.placeholder} type="text"></input>
          <Button type="submit" variant="contained">
            {t.button}
          </Button>
        </Paper>
      </form>
    </>
  );
};

export default SearchBar;
