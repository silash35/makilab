import { Dispatch, FormEvent, useId } from "react";

import SearchInput from "@/components/SearchBar";
import useLocale from "@/hooks/useLocale";

import en from "./locales/en";
import pt from "./locales/pt";

interface Props {
  setSearch: Dispatch<string>;
  setEnabled: Dispatch<boolean>;
}

const SearchBar = ({ setSearch, setEnabled }: Props) => {
  const { t } = useLocale({ en, pt });

  const inputId = useId();

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
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
    <SearchInput
      handleSearch={handleSearch}
      inputProps={{ id: inputId, placeholder: t.placeholder }}
    />
  );
};

export default SearchBar;
