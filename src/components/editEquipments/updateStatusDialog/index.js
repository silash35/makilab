import DateAdapter from "@mui/lab/AdapterDayjs";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import ptBR from "dayjs/locale/pt-br";
import { useState } from "react";

import { DateTime, DateTimeWithSwitch } from "./fields";

const UpdateStatusDialog = (props) => {
  const [open, setOpen] = useState(false);

  const [createdAt, setCreatedAt] = useState(props.equipment.createdAt);
  const [registeredInManufacturerAt, setRegisteredInManufacturerAt] = useState(
    props.equipment.registeredInManufacturerAt
  );
  const [avalietedAt, setAvalietedAt] = useState(props.equipment.avalietedAt);
  const [budgetAnsweredAt, setBudgetAnsweredAt] = useState(props.equipment.budgetAnsweredAt);
  const [isBudgetApproved, setIsBudgetApproved] = useState(props.equipment.isBudgetApproved);
  const [partsArrivedAt, setPartsArrivedAt] = useState(props.equipment.partsArrivedAt);
  const [repairedAt, setRepairedAt] = useState(props.equipment.repairedAt);
  const [deliveredToCustomerAt, setDeliveredToCustomerAt] = useState(
    props.equipment.deliveredToCustomerAt
  );

  const sendData = async () => {
    const data = {};

    data.createdAt = createdAt;
    data.registeredInManufacturerAt = registeredInManufacturerAt;
    data.avalietedAt = avalietedAt;
    data.budgetAnsweredAt = budgetAnsweredAt;
    data.isBudgetApproved = isBudgetApproved;
    data.partsArrivedAt = partsArrivedAt;
    data.repairedAt = repairedAt;
    data.deliveredToCustomerAt = deliveredToCustomerAt;

    const request = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: props.equipment.id, data: data }),
    };

    await fetch("/api/admin/equipments", request);
    await props.reload();

    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Atualizar Status
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Atualizar Status</DialogTitle>
        <DialogContent>
          <DialogContentText>Altere o estado do produto</DialogContentText>

          <LocalizationProvider dateAdapter={DateAdapter} locale={ptBR}>
            <DateTime label="Data de criação da OS" value={createdAt} setValue={setCreatedAt} />

            {props.equipment.isUnderWarranty && (
              <DateTimeWithSwitch
                label="Data de criação da OSF"
                input={registeredInManufacturerAt}
                setInput={setRegisteredInManufacturerAt}
              />
            )}

            <DateTimeWithSwitch
              label="Data da Avaliação do produto"
              input={avalietedAt}
              setInput={setAvalietedAt}
            />

            {!props.equipment.isUnderWarranty && (
              <>
                <DateTimeWithSwitch
                  label="Data da Resposta do Orçamento"
                  input={budgetAnsweredAt}
                  setInput={setBudgetAnsweredAt}
                >
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={isBudgetApproved}
                          onChange={(e) => {
                            setIsBudgetApproved(e.target.checked);
                          }}
                        />
                      }
                      label="Orçamento Aprovado"
                    />
                  </FormGroup>
                </DateTimeWithSwitch>
              </>
            )}

            <DateTimeWithSwitch
              label="Data da chegada das peças"
              input={partsArrivedAt}
              setInput={setPartsArrivedAt}
            />

            <DateTimeWithSwitch
              label="Data do reparo do produto"
              input={repairedAt}
              setInput={setRepairedAt}
            />

            <DateTimeWithSwitch
              label="Data da retirada do produto"
              input={deliveredToCustomerAt}
              setInput={setDeliveredToCustomerAt}
            />
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Cancelar</Button>
          <Button variant="outlined" onClick={sendData}>
            Salvar Alterações
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UpdateStatusDialog;
