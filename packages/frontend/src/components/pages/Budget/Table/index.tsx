import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableFooter from "@mui/material/TableFooter";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import TBudget from "@/types/budget";
import centsToBRL from "@/utils/centsToBRL";

import Item from "./Item";
import styles from "./table.module.scss";

interface Props {
  budget: TBudget;
  openNewItemDialog: () => void;
  mutate: () => void;
}

export default function BudgetTable({ budget, openNewItemDialog, mutate }: Props) {
  const itens = budget.itens;
  return (
    <Table size="small" aria-label="Lista de Itens do Orçamento">
      <TableHead>
        <TableRow>
          <TableCell align="left">Nome</TableCell>
          <TableCell align="right">Quantidade</TableCell>
          <TableCell align="right">Valor unitário</TableCell>
          <TableCell align="right">Valor Total</TableCell>
          <TableCell align="right">Ações</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {itens.map((item) => (
          <Item key={item.id} item={item} mutate={mutate} />
        ))}
      </TableBody>
      <TableFooter>
        <TableRow className={styles.footer}>
          {itens.length === 0 ? (
            <TableCell colSpan={5} align="center">
              <div className={styles.empty}>
                <p>Orçamento Vazio</p>
                <p>Comece adicionando um novo item</p>
                <IconButton aria-label="adicionar novo item" onClick={openNewItemDialog}>
                  <AddIcon color="primary" />
                </IconButton>
              </div>
            </TableCell>
          ) : (
            <>
              <TableCell align="left">Total</TableCell>
              <TableCell align="right">
                {itens.reduce((acc, item) => acc + item.quantity, 0)}
              </TableCell>
              <TableCell align="right">
                {centsToBRL(itens.reduce((acc, item) => acc + item.price, 0))}
              </TableCell>
              <TableCell align="right">{centsToBRL(budget.total)}</TableCell>
              <TableCell align="right"></TableCell>
            </>
          )}
        </TableRow>
      </TableFooter>
    </Table>
  );
}
