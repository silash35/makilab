import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { FormEvent, useState } from "react";

import useBudget from "@/hooks/useBudget";
import useError from "@/hooks/useError";
import { TBudgetItemInput } from "@/types/budgetItem";
import centsToBRL from "@/utils/centsToBRL";
import addBudgetItem from "@/utils/mutations/addBudgetItem";

import styles from "./budget.module.scss";
import Item from "./item";
import NewItemDialog from "./newItemDialog";

interface Props {
  id: string;
}

export default function BudgetTable({ id }: Props) {
  const [openDialog, setOpenDialog] = useState(false);
  const { budget, mutate } = useBudget(id);
  const { setError } = useError();

  if (!budget) {
    return (
      <Stack height="100%" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Stack>
    );
  }

  const newItem = async (e: FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData) as unknown as TBudgetItemInput;

    const { error } = await addBudgetItem(Number(id), data);

    if (error) {
      setError(error);
      return false;
    } else {
      mutate();
      return true;
    }
  };

  const itens = budget.itens;

  return (
    <TableContainer component={Paper}>
      <div className={styles.header}>
        <h1>Editar Orçamento</h1>
        <Button onClick={() => setOpenDialog(true)}>Novo Item</Button>
        <Button>Gerar PDF</Button>
      </div>
      <Table size="small" aria-label="simple table">
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
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            {itens.length === 0 ? (
              <TableCell colSpan={5} align="center">
                <div className={styles.empty}>
                  <p>Orçamento Vazio</p>
                  <p>Comece adicionando um novo item</p>
                  <IconButton onClick={() => setOpenDialog(true)}>
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
        </TableBody>
      </Table>
      <NewItemDialog open={openDialog} setOpen={setOpenDialog} submit={newItem} />
    </TableContainer>
  );
}
