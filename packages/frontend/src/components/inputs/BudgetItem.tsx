import { TextFieldProps } from "@mui/material/TextField";

import TBudgetItem from "@/types/budgetItem";

import Integer from "./fields/Integer";
import Money from "./fields/Money";
import Text from "./fields/Text";
import Flex from "./Flex";

interface Props {
  item?: TBudgetItem;
}

const BudgetItemInputs = ({ item }: Props) => {
  const common = { required: true, fullWidth: true, margin: "normal" } as TextFieldProps;

  return (
    <>
      <Text
        textFieldProps={{
          name: "name",
          label: "Nome do item",
          ...common,
        }}
        defaultValue={item?.name}
      />
      <Flex>
        <Money
          textFieldProps={{
            name: "price",
            label: "Preço",
            ...common,
          }}
          defaultValue={item?.price ? String(item.price) : undefined}
        />
        <Integer
          textFieldProps={{
            name: "quantity",
            label: "Quantidade",
            ...common,
          }}
          defaultValue={item?.quantity ? String(item.quantity) : undefined}
        />
      </Flex>
    </>
  );
};

export default BudgetItemInputs;
