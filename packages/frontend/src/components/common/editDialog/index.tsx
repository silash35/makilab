import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { FormEvent, useState } from "react";

import request from "@/utils/request";

interface Props {
  Inputs: React.ReactChild;
  url: string;
  method?: "POST" | "PUT";
  title: string;
  reload: () => void;
}

export default function EditDialog({ Inputs, url, method = "POST", title, reload }: Props) {
  const [openDialog, setOpenDialog] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);

    if ((await request({ URL: url, method, body: data })).status !== 200) {
      setOpenDialog(false);
      reload();
    }
  };

  return (
    <>
      <Button variant="outlined" onClick={() => setOpenDialog(true)}>
        {title}
      </Button>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>{Inputs}</DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
            <Button variant="outlined" type="submit">
              Enviar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
