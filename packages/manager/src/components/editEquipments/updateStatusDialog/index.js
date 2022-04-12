import DateAdapter from "@mui/lab/AdapterDateFns";
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
import ptBR from "date-fns/locale/pt-BR";
import { useState } from "react";

import request from "@/utils/request";

import { DateTime, DateTimeWithSwitch } from "./fields";

const UpdateStatusDialog = ({ equipment, reload }) => {
  const [open, setOpen] = useState(false);

  const [createdAt, setCreatedAt] = useState(equipment.createdAt);
  const [registeredInManufacturerAt, setRegisteredInManufacturerAt] = useState(
    equipment.registeredInManufacturerAt
  );
  const [budgetedAt, setBudgetedAt] = useState(equipment.budgetedAt);
  const [budgetAnsweredAt, setBudgetAnsweredAt] = useState(equipment.budgetAnsweredAt);
  const [isBudgetApproved, setIsBudgetApproved] = useState(equipment.isBudgetApproved);
  const [partsArrivedAt, setPartsArrivedAt] = useState(equipment.partsArrivedAt);
  const [repairedAt, setRepairedAt] = useState(equipment.repairedAt);
  const [deliveredToCustomerAt, setDeliveredToCustomerAt] = useState(
    equipment.deliveredToCustomerAt
  );

  const sendData = async () => {
    const data = {};

    data.createdAt = createdAt;
    data.registeredInManufacturerAt = registeredInManufacturerAt;
    data.budgetedAt = budgetedAt;
    data.budgetAnsweredAt = budgetAnsweredAt;
    data.isBudgetApproved = isBudgetApproved;
    data.partsArrivedAt = partsArrivedAt;
    data.repairedAt = repairedAt;
    data.deliveredToCustomerAt = deliveredToCustomerAt;

    if (
      (await request("/api/admin/equipments", "PUT", { id: equipment.id, data: data })) != "ERROR"
    ) {
      await reload();
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
        <DialogContent>
          <DialogContentText>Altere o estado do produto</DialogContentText>

          <LocalizationProvider dateAdapter={DateAdapter} locale={ptBR}>
            <DateTime label="Data de criação da OS" value={createdAt} setValue={setCreatedAt} />

            {equipment.isUnderWarranty && (
              <DateTimeWithSwitch
                label="Data de criação da OSF"
                input={registeredInManufacturerAt}
                setInput={setRegisteredInManufacturerAt}
              />
            )}

            <DateTimeWithSwitch
              label="Data da Avaliação do produto"
              input={budgetedAt}
              setInput={setBudgetedAt}
            />

            {!equipment.isUnderWarranty && (
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
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button variant="outlined" onClick={sendData}>
            Salvar Alterações
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UpdateStatusDialog;
