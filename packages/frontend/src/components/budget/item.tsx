import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import TBudgetItem from "@/types/budgetItem";
import centsToBRL from "@/utils/centsToBRL";

interface Props {
  item: TBudgetItem;
}

export default function Item({ item }: Props) {
  const total = item.quantity * item.price;

  return (
    <TableRow key={item.name}>
      <TableCell align="left">{item.name}</TableCell>
      <TableCell align="right">{item.quantity}</TableCell>
      <TableCell align="right">{centsToBRL(item.price)}</TableCell>
      <TableCell align="right">{centsToBRL(total)}</TableCell>
      <TableCell align="right">
        <IconButton aria-label="Deletar">
          <DeleteIcon />
        </IconButton>
        <IconButton aria-label="Editar">
          <EditIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
