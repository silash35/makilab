import { Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

import en from "./locales/en";
import pt from "./locales/pt";
import styles from "./search.module.scss";

interface Props {
  load: (s: string) => Promise<void>;
}

const SearchBar = ({ load }: Props) => {
  const router = useRouter();
  const t = router.locale === "en" ? en : pt;

  const [search, setSearch] = useState<string>("");
  const [paperElevation, setPaperElevation] = useState(4);

  const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    load(search);
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
          <input
            onChange={(event) => setSearch(event.target.value)}
            placeholder={t.placeholder}
            type="text"
            value={search}
          ></input>
          <Button type="submit" variant="contained">
            {t.button}
          </Button>
        </Paper>
      </form>
    </>
  );
};

export default SearchBar;
