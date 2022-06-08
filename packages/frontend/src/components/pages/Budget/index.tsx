import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TableContainer from "@mui/material/TableContainer";
import Link from "next/link";
import { useState } from "react";

import { FormDialog, FormDialogButton } from "@/components/common/dialogs/FormDialog";
import BudgetItemInputs from "@/components/common/inputs/BudgetItem";
import TextInput from "@/components/common/inputs/fields/Text";
import useBudget from "@/hooks/useBudget";
import { TBudgetInput } from "@/types/budget";
import { TBudgetItemInput } from "@/types/budgetItem";
import addBudgetItem from "@/utils/mutations/addBudgetItem";
import updateBudget from "@/utils/mutations/updateBudget";

import styles from "./budget.module.scss";
import BudgetTable from "./Table";

interface Props {
  id: string;
}

export default function Budget({ id }: Props) {
  const [openDialog, setOpenDialog] = useState(false);
  const { budget, mutate } = useBudget(id);

  if (!budget) {
    return (
      <Stack height="100%" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Stack>
    );
  }

  const newItem = async (data: unknown) => {
    const { error } = await addBudgetItem(Number(id), data as TBudgetItemInput);
    mutate();
    return error;
  };

  const editBudget = async (data: unknown) => {
    const { error } = await updateBudget(Number(id), data as TBudgetInput);
    mutate();
    return error;
  };

  return (
    <TableContainer component={Paper}>
      <div className={styles.header}>
        <div className={styles.side}>
          <h1>{budget.name}</h1>
          <FormDialogButton
            button={(props) => (
              <IconButton aria-label="Editar Orçamento" size="small" {...props}>
                <EditIcon fontSize="small" />
              </IconButton>
            )}
            formDialogProps={{
              title: "Editar Orçamento",
              children: (
                <TextInput
                  defaultValue={budget.name}
                  textFieldProps={{
                    name: "name",
                    label: "Nome do orçamento",
                    margin: "dense",
                    required: true,
                    fullWidth: true,
                  }}
                />
              ),
              yesButtonText: "Confirmar",
              showLoading: true,
              submit: editBudget,
            }}
          />
        </div>
        <Link href={`/admin/SO/${budget.serviceOrderId}/budgets`} passHref>
          <Button component="a">Voltar</Button>
        </Link>
        <Button onClick={() => setOpenDialog(true)}>Novo Item</Button>
        <Link href={`/admin/budget/${budget.id}/pdf`} passHref>
          <Button component="a">Gerar PDF</Button>
        </Link>
      </div>

      <BudgetTable budget={budget} openNewItemDialog={() => setOpenDialog(true)} mutate={mutate} />

      <FormDialog
        title="Criar Novo Item"
        yesButtonText="Enviar"
        showLoading={true}
        submit={newItem}
        open={openDialog}
        setOpen={setOpenDialog}
      >
        <BudgetItemInputs />
      </FormDialog>
    </TableContainer>
  );
}
