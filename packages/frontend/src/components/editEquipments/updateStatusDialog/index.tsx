import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { FormEvent, useState } from "react";

import ServiceOrderStatusInputs from "@/components/common/inputs/serviceOrderStatus";
import type { TServiceOrder, TServiceOrderUpdateStatusInput } from "@/types/serviceOrder";
import updateStatusSO from "@/utils/mutations/updateStatusSO";

interface Props {
  serviceOrder: TServiceOrder;
  reload: () => void;
}

const UpdateStatusDialog = ({ serviceOrder, reload }: Props) => {
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData) as unknown as TServiceOrderUpdateStatusInput;

    const { status } = await updateStatusSO(serviceOrder.id, data);
    if (status === 200) {
      reload();
      setOpen(false);
    }
  };

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Atualizar Status
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Atualizar Status</DialogTitle>
        <form onSubmit={handleSubmit} style={{ display: "contents" }}>
          <DialogContent>
            <DialogContentText>Altere o estado do produto</DialogContentText>
            <ServiceOrderStatusInputs serviceOrder={serviceOrder} />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancelar</Button>
            <Button variant="outlined" type="submit">
              Salvar Alterações
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default UpdateStatusDialog;
