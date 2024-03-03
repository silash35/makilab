import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import type ServiceOrder from "@/types/serviceOrder";

interface Props {
  serviceOrder: ServiceOrder;
}

const ServiceOrderCard = ({ serviceOrder }: Props) => (
  <Card variant="outlined">
    <CardContent>
      <h3>{serviceOrder.id && "OS " + serviceOrder.id}</h3>
      <p>
        Equipamento:
        {serviceOrder.equipment && " " + serviceOrder.equipment}
        {serviceOrder.brand && " " + serviceOrder.brand}
        {serviceOrder.model && " " + serviceOrder.model}
      </p>
      <p>{serviceOrder.statusName && `Situação: ${serviceOrder.statusName}`}</p>
      <p>{serviceOrder.batchOrImei && `N° de Serie ou IMEI: ${serviceOrder.batchOrImei}`}</p>
      <p>{serviceOrder.productNumber && `Product Number: ${serviceOrder.productNumber}`}</p>
      <p>
        {serviceOrder.isUnderWarranty ? "Equipamento em Garantia" : "Equipamento Fora de Garantia"}
      </p>
      <p>
        {(() => {
          if (serviceOrder.isUnderWarranty === false) {
            if (serviceOrder.isBudgetApproved === null) {
              return "Orçamento ainda não aprovado";
            } else if (serviceOrder.isBudgetApproved === false) {
              return "Orçamento Negado";
            } else if (serviceOrder.isBudgetApproved === true) {
              return "Orçamento Aprovado";
            }
          }
        })()}
      </p>
    </CardContent>
  </Card>
);

export default ServiceOrderCard;
