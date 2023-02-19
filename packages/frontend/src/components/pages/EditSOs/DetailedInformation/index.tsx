import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Link from "next/link";

import { ConfirmationDialogButton } from "@/components/common/dialogs/ConfirmationDialog";
import { FormDialogButton } from "@/components/common/dialogs/FormDialog";
import ServiceOrderInputs from "@/components/common/inputs/ServiceOrder";
import ServiceOrderStatusInputs from "@/components/common/inputs/ServiceOrderStatus";
import SendMailDialog from "@/components/common/SendMailDialog";
import type { TServiceOrderUpdateStatusInput } from "@/types/serviceOrder";
import { TServiceOrderInput, TServiceOrderWithClient as ServiceOrder } from "@/types/serviceOrder";
import deleteSO from "@/utils/mutations/deleteSO";
import updateSO from "@/utils/mutations/updateSO";
import updateStatusSO from "@/utils/mutations/updateStatusSO";

import styles from "./detailedInformation.module.scss";

interface Props {
  serviceOrder: ServiceOrder;
  mutate: () => void;
}

const DetailedInformation = ({ serviceOrder, mutate }: Props) => {
  const owner = serviceOrder.owner;

  const handleDeleteSO = async () => {
    const { error } = await deleteSO(serviceOrder.id);
    mutate();
    return error;
  };

  const editSO = async (data: unknown) => {
    const { error } = await updateSO(serviceOrder.id, data as TServiceOrderInput);
    mutate();
    return error;
  };

  const editStatusSO = async (data: unknown) => {
    const { error } = await updateStatusSO(serviceOrder.id, data as TServiceOrderUpdateStatusInput);
    mutate();
    return error;
  };

  return (
    <Box className={styles.detailedInformation}>
      <h2>Informações Detalhadas</h2>

      <Box className={styles.cardsContainer}>
        <Card variant="outlined">
          <CardContent>
            <h3>Sobre o Equipamento</h3>
            <p>{serviceOrder.batchOrImei && `N° de Serie ou IMEI: ${serviceOrder.batchOrImei}`}</p>
            <p>{serviceOrder.productNumber && `Product Number: ${serviceOrder.productNumber}`}</p>
            <p>
              {serviceOrder.isUnderWarranty
                ? "Equipamento em Garantia"
                : "Equipamento Fora de Garantia"}
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
            <p>{serviceOrder.accessories && `Acessórios: ${serviceOrder.accessories}`}</p>
            <p>
              {serviceOrder.productCondition &&
                `Condição do equipamento: ${serviceOrder.productCondition}`}
            </p>
            <p>
              {serviceOrder.problemDescription &&
                `Descrição do problema: ${serviceOrder.problemDescription}`}
            </p>
            <p>Tensão: {serviceOrder.voltage}</p>

            {serviceOrder.notes && (
              <>
                <p>Obervações Extras:</p> <p className={styles.bigText}>{serviceOrder.notes}</p>
              </>
            )}
          </CardContent>
        </Card>

        <Card variant="outlined">
          <CardContent>
            <h3>Sobre o Cliente</h3>
            <p>{owner.name && `Nome: ${owner.name}`}</p>
            <p>{owner.email && `Email: ${owner.email}`}</p>
            <p>{owner.address && `Endereço: ${owner.address}`}</p>
            <p>{owner.zip && `CEP: ${owner.zip}`}</p>
            <p>{owner.whatsapp && `WhatsApp: ${owner.whatsapp}`}</p>
            <p>{owner.tel && `Telefone: ${owner.tel}`}</p>
            <p>{owner.cpfOrCnpj && `CPF ou CNPJ: ${owner.cpfOrCnpj}`}</p>
          </CardContent>
        </Card>

        <Card variant="outlined">
          <CardContent>
            <h3>Sobre o Atendimento</h3>
            <p>{serviceOrder.attendedBy && `Atendido Por: ${serviceOrder.attendedBy}`}</p>
            <p>{serviceOrder.attendedOn && `Local de Atendimento: ${serviceOrder.attendedOn}`}</p>
            <p>
              {serviceOrder.listOfServices && `Lista de serviços: ${serviceOrder.listOfServices}`}
            </p>
          </CardContent>
        </Card>
      </Box>

      <div className={styles.buttonsContainer}>
        <ConfirmationDialogButton
          confirmationDialogProps={{
            title: `Deletar ${serviceOrder.id}`,
            text: `Tem certeza que deseja excluir a OS ${serviceOrder.id}?`,
            yesButtonText: "Deletar",
            showLoading: true,
            submit: handleDeleteSO,
          }}
          buttonText="Deletar"
        />
        {owner.email && <SendMailDialog defaultText={serviceOrder.defaultEmail} to={owner.email} />}
        <FormDialogButton
          formDialogProps={{
            title: "Editar Equipamento",
            children: <ServiceOrderInputs serviceOrder={serviceOrder} />,
            yesButtonText: "Confirmar",
            showLoading: true,
            submit: editSO,
          }}
          buttonText="Editar Equipamento"
        />

        <Button component={Link} href={`/admin/SO/${serviceOrder.id}`} variant="outlined">
          Gerar PDF
        </Button>
        <Button component={Link} href={`/admin/SO/${serviceOrder.id}/budgets`} variant="outlined">
          Orçamentos
        </Button>

        <FormDialogButton
          formDialogProps={{
            title: "Atualizar Status",
            children: <ServiceOrderStatusInputs serviceOrder={serviceOrder} />,
            yesButtonText: "Salvar Alterações",
            showLoading: true,
            submit: editStatusSO,
          }}
          buttonProps={{ variant: "contained" }}
          buttonText="Atualizar Status"
        />
      </div>
    </Box>
  );
};

export default DetailedInformation;
