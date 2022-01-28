import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { useRef } from "react";

import request from "@/utils/request";

export default function EditDialog({ Inputs, URL, title, reload }) {
  const [openDialog, setOpenDialog] = useState(false);

  const form = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    var formData = new FormData(form.current);
    const data = Object.fromEntries(formData);

    if ((await request(URL, "POST", data)) != "ERROR") {
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
        <form ref={form} onSubmit={handleSubmit}>
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
