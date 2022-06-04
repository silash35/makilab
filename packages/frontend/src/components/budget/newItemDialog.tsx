import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import LinearProgress from "@mui/material/LinearProgress";
import TextField from "@mui/material/TextField";
import { FormEvent, useState } from "react";

import centsToBRL from "@/utils/centsToBRL";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;

  submit: (e: FormEvent<HTMLFormElement>) => Promise<boolean>;
}

export default function NewItemDialog({ open, setOpen, submit }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [priceValue, setPriceValue] = useState("R$ 0,00");
  const [quantityValue, setQuantityValue] = useState("1");

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
          <TextField
            name="name"
            label="Nome do item"
            required={true}
            fullWidth={true}
            margin="normal"
          />
          <TextField
            name="price"
            label="Preço"
            required={true}
            fullWidth={true}
            margin="normal"
            value={priceValue}
            onChange={(e) => {
              const input = e.target.value.replace(/\D/g, "");
              const newValue = centsToBRL(Number(input));
              setPriceValue(newValue);
            }}
          />
          <TextField
            name="quantity"
            label="Quantidade"
            required={true}
            fullWidth={true}
            margin="normal"
            value={quantityValue}
            onChange={(e) => {
              const newValue = e.target.value.replace(/\D/g, "");
              if (newValue.length === 0) {
                setQuantityValue("0");
              } else {
                setQuantityValue(newValue);
              }
            }}
          />
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
