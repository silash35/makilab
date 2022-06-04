import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import { FormEvent, useState } from "react";

import TextInput from "@/components/common/inputs/fields/text";
import useError from "@/hooks/useError";
import type { TBudgetInput } from "@/types/budget";
import addBudget from "@/utils/mutations/addBudget";

import styles from "./newBudgetCard.module.scss";

interface Props {
  serviceOrderId: string;
  number: number;
  mutate: () => void;
}

export default function NewBudgetCard({ serviceOrderId, number, mutate }: Props) {
  const [openDialog, setOpenDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { setError } = useError();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData) as unknown as TBudgetInput;

    const { error } = await addBudget(Number(serviceOrderId), data);

    if (error) {
      setError(error);
    } else {
      mutate();
      setOpenDialog(false);
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className={styles.addCard}>
        <Card>
          <CardActionArea
            onClick={() => {
              setOpenDialog(true);
            }}
          >
            <div className={styles.buttonContent}>
              <AddIcon fontSize="large" />
              <Typography variant="body1" component="p">
                Novo Orçamento
              </Typography>
            </div>
          </CardActionArea>
        </Card>
      </div>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Criar Novo Orçamento</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextInput
              defaultValue={`Novo Orçamento #${number}`}
              textFieldProps={{
                name: "name",
                label: "Nome do novo orçamento",
                required: true,
                fullWidth: true,
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
            <Button variant="outlined" type="submit">
              Enviar
            </Button>
          </DialogActions>
        </form>
        {isLoading ? <LinearProgress /> : <div style={{ height: 4 }} />}
      </Dialog>
    </>
  );
}
