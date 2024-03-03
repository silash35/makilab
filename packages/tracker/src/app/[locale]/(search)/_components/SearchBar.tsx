"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useId } from "react";

import SearchInput from "@/components/SearchBar";
import useLocale from "@/hooks/useLocale";

import en from "./locales/en";
import pt from "./locales/pt";

const SearchBar = () => {
  const { t } = useLocale({ en, pt });

  const inputId = useId();

  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  const queryClient = useQueryClient();

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const inputValue = event.currentTarget[inputId].value as string;
    router.push(`?search=${inputValue}`, { scroll: false });
    queryClient.invalidateQueries({ queryKey: ["product"] });
  };

  return (
    <SearchInput
      inputProps={{
        id: inputId,
        placeholder: t.placeholder,
        defaultValue: search === null ? "" : search,
      }}
      handleSearch={handleSearch}
    />
  );
};

export default SearchBar;
