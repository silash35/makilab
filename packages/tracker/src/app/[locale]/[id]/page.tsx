import Stack from "@mui/material/Stack";

import ProductContainer from "@/app/[locale]/components/Index/ProductContainer";

const ProductPage = ({ params: { id } }: { params: { id: string } }) => {
  return (
    <Stack alignItems="center">
      <ProductContainer productId={Number(id.replace(/\D/g, ""))} enabled />
    </Stack>
  );
};
export default ProductPage;
