import type { TextFieldProps } from "@mui/material/TextField";

import type TServiceOrder from "@/types/serviceOrder";

import Checkbox from "./fields/Checkbox";
import DateTime from "./fields/DateTime";
import DateTimeWithSwitch from "./fields/DateTimeWithSwitch";

interface Props {
  serviceOrder?: TServiceOrder;
}

const ServiceOrderStatusInputs = ({ serviceOrder }: Props) => {
  const common = { margin: "normal", fullWidth: true } as TextFieldProps;

  return (
    <>
      <DateTime
        defaultValue={serviceOrder?.createdAt}
        label="Data de criação da OS"
        name="createdAt"
        textFieldProps={{ required: true, ...common }}
      />

      {serviceOrder?.isUnderWarranty && (
        <DateTimeWithSwitch
          defaultValue={serviceOrder?.registeredInManufacturerAt}
          label="Data de criação da OSF"
          name="registeredInManufacturerAt"
          textFieldProps={common}
        />
      )}

      <DateTimeWithSwitch
        defaultValue={serviceOrder?.budgetedAt}
        label="Data da Avaliação do produto"
        name="budgetedAt"
        textFieldProps={common}
      />

      {!serviceOrder?.isUnderWarranty && (
        <>
          <DateTimeWithSwitch
            defaultValue={serviceOrder?.budgetAnsweredAt}
            label="Data da Resposta do Orçamento"
            name="budgetAnsweredAt"
            textFieldProps={common}
          >
            <Checkbox
              defaultValue={serviceOrder?.isBudgetApproved ? true : false}
              label="Orçamento Aprovado"
              name="isBudgetApproved"
            />
          </DateTimeWithSwitch>
        </>
      )}

      <DateTimeWithSwitch
        defaultValue={serviceOrder?.partsArrivedAt}
        label="Data da chegada das peças"
        name="partsArrivedAt"
        textFieldProps={common}
      />

      <DateTimeWithSwitch
        defaultValue={serviceOrder?.repairedAt}
        label="Data do reparo do produto"
        name="repairedAt"
        textFieldProps={common}
      />

      <DateTimeWithSwitch
        defaultValue={serviceOrder?.deliveredToCustomerAt}
        label="Data da retirada do produto"
        name="deliveredToCustomerAt"
        textFieldProps={common}
      />
    </>
  );
};

export default ServiceOrderStatusInputs;
