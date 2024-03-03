import Stack from "@mui/material/Stack";

import ProductContainer from "./_components/ProductContainer";
import SearchBar from "./_components/SearchBar";
import Text from "./_components/Text";

const SearchPage = () => {
  return (
    <Stack alignItems="center" component="main" direction="column" gap={4} marginBottom="auto">
      <Text />
      <SearchBar />
      <ProductContainer />
    </Stack>
  );
};

export default SearchPage;
