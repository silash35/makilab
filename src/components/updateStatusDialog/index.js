import DateAdapter from "@mui/lab/AdapterDayjs";
import DateTimePicker from "@mui/lab/DateTimePicker";
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
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import ptBR from "dayjs/locale/pt-br";
import { useState } from "react";

import styles from "./updateStatusDialog.module.scss";

const UpdateStatusDialog = (props) => {
  const [createdAt, setCreatedAt] = useState(props.equipment.createdAt);

  const [registeredInManufacturerAt, setRegisteredInManufacturerAt] = useState(
    props.equipment.registeredInManufacturerAt
  );
  const [registeredInManufacturerAtSwitch, setRegisteredInManufacturerAtSwitch] = useState(
    registeredInManufacturerAt != null
  );

  const [avalietedAt, setAvalietedAt] = useState(props.equipment.avalietedAt);
  const [avalietedAtSwitch, setAvalietedAtSwitch] = useState(avalietedAt != null);

  const [budgetAnsweredAt, setBudgetAnsweredAt] = useState(props.equipment.budgetAnsweredAt);
  const [budgetAnsweredAtSwitch, setBudgetAnsweredAtSwitch] = useState(budgetAnsweredAt != null);

  const [isBudgetApproved, setIsBudgetApproved] = useState(props.equipment.isBudgetApproved);

  const [partsArrivedAt, setPartsArrivedAt] = useState(props.equipment.partsArrivedAt);
  const [partsArrivedAtSwitch, setPartsArrivedAtSwitch] = useState(partsArrivedAt != null);

  const [repairedAt, setRepairedAt] = useState(props.equipment.repairedAt);
  const [repairedAtSwitch, setRepairedAtSwitch] = useState(repairedAt != null);

  const [deliveredToCustomerAt, setDeliveredToCustomerAt] = useState(
    props.equipment.deliveredToCustomerAt
  );
  const [deliveredToCustomerAtSwitch, setDeliveredToCustomerAtSwitch] = useState(
    deliveredToCustomerAt != null
  );

  const onSwitchChange = (event, setSwitch, setInput) => {
    setSwitch(event.target.checked);

    if (event.target.checked) {
      setInput(new Date());
    } else {
      setInput(null);
    }
  };

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

    props.handleClose();
  };

  return (
    <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Atualizar Status</DialogTitle>
      <DialogContent>
        <DialogContentText>Altere o estado do produto</DialogContentText>

        <LocalizationProvider dateAdapter={DateAdapter} locale={ptBR}>
          <DateTimePicker
            label="Data de criação da OS"
            renderInput={(params) => <TextField fullWidth margin="normal" {...params} />}
            value={createdAt}
            onChange={(newValue) => {
              setCreatedAt(newValue);
            }}
          />

          {props.equipment.isUnderWarranty && (
            <div className={styles.flex}>
              <Switch
                checked={registeredInManufacturerAtSwitch}
                onChange={(e) => {
                  onSwitchChange(
                    e,
                    setRegisteredInManufacturerAtSwitch,
                    setRegisteredInManufacturerAt
                  );
                }}
              />
              <DateTimePicker
                label="Data de criação da OSF"
                disabled={!registeredInManufacturerAtSwitch}
                renderInput={(params) => <TextField fullWidth margin="normal" {...params} />}
                value={registeredInManufacturerAt}
                onChange={(newValue) => {
                  setRegisteredInManufacturerAt(newValue);
                }}
              />
            </div>
          )}

          <div className={styles.flex}>
            <Switch
              checked={avalietedAtSwitch}
              onChange={(e) => {
                onSwitchChange(e, setAvalietedAtSwitch, setAvalietedAt);
              }}
            />
            <DateTimePicker
              label="Data da Avaliação do produto"
              disabled={!avalietedAtSwitch}
              renderInput={(params) => <TextField fullWidth margin="normal" {...params} />}
              value={avalietedAt}
              onChange={(newValue) => {
                setAvalietedAt(newValue);
              }}
            />
          </div>

          {!props.equipment.isUnderWarranty && (
            <>
              <div className={styles.flex}>
                <Switch
                  checked={budgetAnsweredAtSwitch}
                  onChange={(e) => {
                    onSwitchChange(e, setBudgetAnsweredAtSwitch, setBudgetAnsweredAt);
                  }}
                />
                <DateTimePicker
                  label="Data da Resposta do Orçamento"
                  disabled={!budgetAnsweredAtSwitch}
                  renderInput={(params) => <TextField fullWidth margin="normal" {...params} />}
                  value={budgetAnsweredAt}
                  onChange={(newValue) => {
                    setBudgetAnsweredAt(newValue);
                  }}
                />
              </div>

              {budgetAnsweredAtSwitch && (
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
              )}
            </>
          )}

          <div className={styles.flex}>
            <Switch
              checked={partsArrivedAtSwitch}
              onChange={(e) => {
                onSwitchChange(e, setPartsArrivedAtSwitch, setPartsArrivedAt);
              }}
            />
            <DateTimePicker
              label="Data da chegada das peças"
              disabled={!partsArrivedAtSwitch}
              renderInput={(params) => <TextField fullWidth margin="normal" {...params} />}
              value={partsArrivedAt}
              onChange={(newValue) => {
                setPartsArrivedAt(newValue);
              }}
            />
          </div>

          <div className={styles.flex}>
            <Switch
              checked={repairedAtSwitch}
              onChange={(e) => {
                onSwitchChange(e, setRepairedAtSwitch, setRepairedAt);
              }}
            />
            <DateTimePicker
              label="Data do reparo do produto"
              disabled={!repairedAtSwitch}
              renderInput={(params) => <TextField fullWidth margin="normal" {...params} />}
              value={repairedAt}
              onChange={(newValue) => {
                setRepairedAt(newValue);
              }}
            />
          </div>

          <div className={styles.flex}>
            <Switch
              checked={deliveredToCustomerAtSwitch}
              onChange={(e) => {
                onSwitchChange(e, setDeliveredToCustomerAtSwitch, setDeliveredToCustomerAt);
              }}
            />
            <DateTimePicker
              label="Data da retirada do produto"
              disabled={!deliveredToCustomerAtSwitch}
              renderInput={(params) => <TextField fullWidth margin="normal" {...params} />}
              value={deliveredToCustomerAt}
              onChange={(newValue) => {
                setDeliveredToCustomerAt(newValue);
              }}
            />
          </div>
        </LocalizationProvider>
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
