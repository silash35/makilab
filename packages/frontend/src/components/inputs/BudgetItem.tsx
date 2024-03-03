import { TextFieldProps } from "@mui/material/TextField";

import TBudgetItem from "@/types/budgetItem";

import Integer from "./fields/Integer";
import Money from "./fields/Money";
import Text from "./fields/Text";
import styles from "./inputs.module.scss";

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
      <div className={styles.flex}>
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
      </div>
    </>
  );
};

export default BudgetItemInputs;
