import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useRef } from "react";

const UpdateStatusDialog = (props) => {
  const keyInputRef = useRef(null);

  const sendData = async () => {
    const key = keyInputRef.current?.value;

    const data = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: key }),
    };

    let res = {};
    if (key != "") {
      res = await fetch(`/api/place?id=${props.id}`, data);
    }

    if (res.status == 200) {
      props.handleClose();
      window.location.href = `/locais/${props.id}`;
    } else {
      props.setError(true);
      props.setErrorText("Senha incorreta");
    }
  };

  return (
    <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Atualizar Status</DialogTitle>
      <DialogContent>
        <DialogContentText>Selecione o estado atual do produto</DialogContentText>
        <TextField autoFocus margin="dense" label="chave" inputRef={keyInputRef} fullWidth />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          Cancelar
        </Button>
        <Button variant="outlined" color="primary" onClick={sendData}>
          Salvar Alterações
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateStatusDialog;
