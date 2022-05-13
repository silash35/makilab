import type { TextFieldProps } from "@mui/material/TextField";

import type TServiceOrder from "@/types/serviceOrder";

import Checkbox from "./fields/checkbox";
import DateTime from "./fields/dateTime";
import DateTimeWithSwitch from "./fields/dateTimeWithSwitch";

interface Props {
  serviceOrder?: TServiceOrder;
}

export default function ServiceOrderStatusInputs({ serviceOrder }: Props) {
  const common = { margin: "normal", fullWidth: true } as TextFieldProps;

  return (
    <>
      <DateTime
        name="createdAt"
        label="Data de criação da OS"
        defaultValue={serviceOrder?.createdAt}
        textFieldProps={{ required: true, ...common }}
      />

      {serviceOrder?.isUnderWarranty && (
        <DateTimeWithSwitch
          name="registeredInManufacturerAt"
          label="Data de criação da OSF"
          defaultValue={serviceOrder?.registeredInManufacturerAt}
          textFieldProps={common}
        />
      )}

      <DateTimeWithSwitch
        name="budgetedAt"
        label="Data da Avaliação do produto"
        defaultValue={serviceOrder?.budgetedAt}
        textFieldProps={common}
      />

      {!serviceOrder?.isUnderWarranty && (
        <>
          <DateTimeWithSwitch
            name="budgetAnsweredAt"
            label="Data da Resposta do Orçamento"
            defaultValue={serviceOrder?.budgetAnsweredAt}
            textFieldProps={common}
          >
            <Checkbox
              name="isBudgetApproved"
              label="Orçamento Aprovado"
              defaultValue={serviceOrder?.isBudgetApproved ? true : false}
            />
          </DateTimeWithSwitch>
        </>
      )}

      <DateTimeWithSwitch
        name="partsArrivedAt"
        label="Data da chegada das peças"
        defaultValue={serviceOrder?.partsArrivedAt}
        textFieldProps={common}
      />

      <DateTimeWithSwitch
        name="repairedAt"
        label="Data do reparo do produto"
        defaultValue={serviceOrder?.repairedAt}
        textFieldProps={common}
      />

      <DateTimeWithSwitch
        name="deliveredToCustomerAt"
        label="Data da retirada do produto"
        defaultValue={serviceOrder?.deliveredToCustomerAt}
        textFieldProps={common}
      />
    </>
  );
}
