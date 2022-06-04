import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import LinearProgress from "@mui/material/LinearProgress";
import { FormEvent, useState } from "react";

import BudgetItemInputs from "@/components/common/inputs/budgetItem";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;

  submit: (e: FormEvent<HTMLFormElement>) => Promise<boolean>;
}

export default function NewItemDialog({ open, setOpen, submit }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    if (await submit(event)) {
      setOpen(false);
    }

    setIsLoading(false);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title" sx={{ paddingBottom: 0 }}>
        Criar Novo Item
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ paddingTop: 0 }}>
          <BudgetItemInputs />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button variant="outlined" type="submit">
            Enviar
          </Button>
        </DialogActions>
      </form>
      {isLoading ? <LinearProgress /> : <div style={{ height: 4 }} />}
    </Dialog>
  );
}
