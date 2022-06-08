import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import { ConfirmationDialogButton } from "@/components/common/dialogs/confirmationDialog";
import { FormDialogButton } from "@/components/common/dialogs/formDialog";
import BudgetItemInput from "@/components/common/inputs/budgetItem";
import TBudgetItem from "@/types/budgetItem";
import centsToBRL from "@/utils/centsToBRL";
import deleteBudgetItem from "@/utils/mutations/deleteBudgetItem";
import updateBudgetItem from "@/utils/mutations/updateBudgetItem";

interface Props {
  item: TBudgetItem;
  mutate: () => void;
}

export default function Item({ item, mutate }: Props) {
  const total = item.quantity * item.price;

  const deleteItem = async () => {
    const { error } = await deleteBudgetItem(item.id);
    mutate();
    return error;
  };

  const editItem = async (data: unknown) => {
    const { error } = await updateBudgetItem(item.id, data as TBudgetItem);
    mutate();
    return error;
  };

  return (
    <TableRow key={item.name}>
      <TableCell align="left">{item.name}</TableCell>
      <TableCell align="right">{item.quantity}</TableCell>
      <TableCell align="right">{centsToBRL(item.price)}</TableCell>
      <TableCell align="right">{centsToBRL(total)}</TableCell>
      <TableCell align="right">
        <ConfirmationDialogButton
          button={(props) => (
            <IconButton aria-label="Deletar Item" {...props}>
              <DeleteIcon />
            </IconButton>
          )}
          confirmationDialogProps={{
            title: "Deletar item",
            text: "Tem certeza que deseja deletar este item?",
            yesButtonText: "Deletar",
            showLoading: true,
            submit: deleteItem,
          }}
        />

        <FormDialogButton
          button={(props) => (
            <IconButton aria-label="Editar Item" {...props}>
              <EditIcon />
            </IconButton>
          )}
          formDialogProps={{
            title: "Editar item",
            children: <BudgetItemInput item={item} />,
            yesButtonText: "Confirmar",
            showLoading: true,
            submit: editItem,
          }}
        />
      </TableCell>
    </TableRow>
  );
}
