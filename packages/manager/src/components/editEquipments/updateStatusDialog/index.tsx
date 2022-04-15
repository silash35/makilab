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

import type { ProcessedSO } from "@/types/serviceOrder";
import request from "@/utils/frontend/request";

import { DateTime, DateTimeWithSwitch } from "./fields";

interface Props {
  serviceOrder: ProcessedSO;
}

const UpdateStatusDialog = ({ serviceOrder }: Props) => {
  const [open, setOpen] = useState(false);

  const [createdAt, setCreatedAt] = useState<Date | null>(serviceOrder.createdAt);
  const [registeredInManufacturerAt, setRegisteredInManufacturerAt] = useState(
    serviceOrder.registeredInManufacturerAt
  );
  const [budgetedAt, setBudgetedAt] = useState(serviceOrder.budgetedAt);
  const [budgetAnsweredAt, setBudgetAnsweredAt] = useState(serviceOrder.budgetAnsweredAt);
  const [isBudgetApproved, setIsBudgetApproved] = useState(serviceOrder.isBudgetApproved);
  const [partsArrivedAt, setPartsArrivedAt] = useState(serviceOrder.partsArrivedAt);
  const [repairedAt, setRepairedAt] = useState(serviceOrder.repairedAt);
  const [deliveredToCustomerAt, setDeliveredToCustomerAt] = useState(
    serviceOrder.deliveredToCustomerAt
  );

  const sendData = async () => {
    const data = {
      createdAt: createdAt,
      registeredInManufacturerAt: registeredInManufacturerAt,
      budgetedAt: budgetedAt,
      budgetAnsweredAt: budgetAnsweredAt,
      isBudgetApproved: isBudgetApproved,
      partsArrivedAt: partsArrivedAt,
      repairedAt: repairedAt,
      deliveredToCustomerAt: deliveredToCustomerAt,
    };

    if (
      (await request("/api/admin/equipments", "PUT", { id: serviceOrder.id, data: data })) !=
      "ERROR"
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

            {serviceOrder.isUnderWarranty && (
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

            {!serviceOrder.isUnderWarranty && (
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
                          checked={isBudgetApproved ? isBudgetApproved : false}
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
