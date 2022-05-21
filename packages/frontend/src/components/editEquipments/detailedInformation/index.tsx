import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Link from "next/link";
import type { FormEvent } from "react";

import DeleteDialog from "@/components/common/deleteDialog";
import EditDialog from "@/components/common/editDialog";
import ServiceOrderInputs from "@/components/common/inputs/serviceOrder";
import SendMailDialog from "@/components/common/sendMailDialog";
import { TServiceOrderInput, TServiceOrderWithClient as ServiceOrder } from "@/types/serviceOrder";
import deleteSO from "@/utils/mutations/deleteSO";
import updateSO from "@/utils/mutations/updateSO";

import UpdateStatusDialog from "../updateStatusDialog";
import styles from "./detailedInformation.module.scss";

interface Props {
  serviceOrder: ServiceOrder;
  reload: () => void;
}

export default function DetailedInformation({ serviceOrder, reload }: Props) {
  const owner = serviceOrder.owner;

  const handleDeleteSO = async () => {
    const { status } = await deleteSO(serviceOrder.id);
    reload();
    return status === 200;
  };

  const handleEditSO = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData) as unknown as TServiceOrderInput;

    const { status } = await updateSO(serviceOrder.id, data);
    reload();
    return status === 200;
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
        <DeleteDialog
          title={`Deletar ${serviceOrder.id}`}
          text={`Tem certeza que deseja excluir a OS ${serviceOrder.id}?`}
          submit={handleDeleteSO}
        />
        {owner.email && <SendMailDialog to={owner.email} defaultText={serviceOrder.defaultEmail} />}
        <EditDialog title="Editar Equipamento" submit={handleEditSO}>
          <ServiceOrderInputs serviceOrder={serviceOrder} />
        </EditDialog>
        <Link href={`/admin/SO?id=${serviceOrder.id}`} passHref>
          <Button variant="outlined" component="a">
            Gerar PDF
          </Button>
        </Link>
        <UpdateStatusDialog serviceOrder={serviceOrder} reload={reload} />
      </div>
    </Box>
  );
}
