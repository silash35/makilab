import config from "@config";
import DateAdapter from "@mui/lab/AdapterDateFns";
import DateTimePicker from "@mui/lab/DateTimePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import Input from "./fields/text";
import type TServiceOrder from "@/types/serviceOrder";
import ptBR from "date-fns/locale/pt-BR";
import { useState } from "react";

import styles from "./inputs.module.scss";

const { ATTENDANTS, SERVICE_PLACES } = config;

interface Props {
  serviceOrder?: TServiceOrder;
}

export default function ServiceOrderStatusInputs({ serviceOrder }: Props) {
  const [createdAt, setCreatedAt] = useState<Date | null>(serviceOrder.createdAt);
  const [registeredInManufacturerAt, setRegisteredInManufacturerAt] = useState(
    serviceOrder.registeredInManufacturerAt
  );
  const [budgetedAt, setBudgetedAt] = useState(serviceOrder.budgetedAt);
  const [budgetAnsweredAt, setBudgetAnsweredAt] = useState(serviceOrder.budgetAnsweredAt);
  const [isBudgetApproved, setIsBudgetApproved] = useState<boolean>(
    serviceOrder.isBudgetApproved ? true : false
  );
  const [partsArrivedAt, setPartsArrivedAt] = useState(serviceOrder.partsArrivedAt);
  const [repairedAt, setRepairedAt] = useState(serviceOrder.repairedAt);
  const [deliveredToCustomerAt, setDeliveredToCustomerAt] = useState(
    serviceOrder.deliveredToCustomerAt
  );

  useEffect(() => {
    setCreatedAt(serviceOrder.createdAt);
    setRegisteredInManufacturerAt(serviceOrder.registeredInManufacturerAt);
    setBudgetedAt(serviceOrder.budgetedAt);
    setBudgetAnsweredAt(serviceOrder.budgetAnsweredAt);
    setIsBudgetApproved(serviceOrder.isBudgetApproved ? true : false);
    setPartsArrivedAt(serviceOrder.partsArrivedAt);
    setRepairedAt(serviceOrder.repairedAt);
    setDeliveredToCustomerAt(serviceOrder.deliveredToCustomerAt);
  }, [serviceOrder]);

  const common = { variant: "outlined", margin: "normal", fullWidth: true } as TextFieldProps;
  return (
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
  );
}
