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

const Budget = ({ id }: Props) => {
  const [openDialog, setOpenDialog] = useState(false);
  const { budget, mutate } = useBudget(id);

  if (!budget) {
    return (
      <Stack alignItems="center" height="100%" justifyContent="center">
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
                  textFieldProps={{
                    name: "name",
                    label: "Nome do orçamento",
                    margin: "dense",
                    required: true,
                    fullWidth: true,
                  }}
                  defaultValue={budget.name}
                />
              ),
              yesButtonText: "Confirmar",
              showLoading: true,
              submit: editBudget,
            }}
          />
        </div>
        <Button component={Link} href={`/admin/SO/${budget.serviceOrderId}/budgets`}>
          Voltar
        </Button>
        <Button onClick={() => setOpenDialog(true)}>Novo Item</Button>
        <Button component={Link} href={`/admin/budget/${budget.id}/pdf`}>
          Gerar PDF
        </Button>
      </div>

      <BudgetTable budget={budget} mutate={mutate} openNewItemDialog={() => setOpenDialog(true)} />

      <FormDialog
        open={openDialog}
        setOpen={setOpenDialog}
        showLoading={true}
        submit={newItem}
        title="Criar Novo Item"
        yesButtonText="Enviar"
      >
        <BudgetItemInputs />
      </FormDialog>
    </TableContainer>
  );
};

export default Budget;
