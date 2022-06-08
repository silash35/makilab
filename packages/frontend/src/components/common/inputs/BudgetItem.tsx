import { TextFieldProps } from "@mui/material/TextField";

import TBudgetItem from "@/types/budgetItem";

import Integer from "./fields/Integer";
import Money from "./fields/Money";
import Text from "./fields/Text";
import styles from "./inputs.module.scss";

interface Props {
  item?: TBudgetItem;
}

export default function BudgetItemInputs({ item }: Props) {
  const common = { required: true, fullWidth: true, margin: "normal" } as TextFieldProps;

  return (
    <>
      <Text
        defaultValue={item?.name}
        textFieldProps={{
          name: "name",
          label: "Nome do item",
          ...common,
        }}
      />
      <div className={styles.flex}>
        <Money
          defaultValue={item?.price ? String(item.price) : undefined}
          textFieldProps={{
            name: "price",
            label: "Preço",
            ...common,
          }}
        />
        <Integer
          defaultValue={item?.quantity ? String(item.quantity) : undefined}
          textFieldProps={{
            name: "quantity",
            label: "Quantidade",
            ...common,
          }}
        />
      </div>
    </>
  );
}
