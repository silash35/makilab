import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { useRef } from "react";

export default function EditDialog({ Inputs, URL, title, reload }) {
  const [openDialog, setOpenDialog] = useState(false);

  const form = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    var formData = new FormData(form.current);

    const data = Object.fromEntries(formData);

    const request = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    const res = await fetch(URL, request);

    if (res.status === 200) {
      setOpenDialog(false);
      reload();
    } else {
      const body = await res.json();
      alert("ERRO: " + body.error);
    }
  };

  return (
    <section>
      <Button onClick={() => setOpenDialog(true)}>{title}</Button>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        <Alert severity="warning" sx={{ maxWidth: " 90%", margin: "auto" }}>
          Você está editando uma OS que já foi impressa. Então é recomendado a reimpressão da OS com
          as novas informações.
        </Alert>
        <form ref={form} onSubmit={handleSubmit}>
          <DialogContent>{Inputs}</DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)} color="primary">
              Cancelar
            </Button>
            <Button variant="outlined" color="primary" type="submit">
              Enviar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </section>
  );
}
