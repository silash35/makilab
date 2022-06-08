import AddIcon from "@mui/icons-material/Add";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";

import { FormDialogButton } from "@/components/common/dialogs/FormDialog";
import TextInput from "@/components/common/inputs/fields/text";
import type { TBudgetInput } from "@/types/budget";
import addBudget from "@/utils/mutations/addBudget";

import styles from "./newBudgetCard.module.scss";

interface Props {
  serviceOrderId: string;
  number: number;
  mutate: () => void;
}

export default function NewBudgetCard({ serviceOrderId, number, mutate }: Props) {
  const newBudget = async (data: unknown) => {
    const { error } = await addBudget(Number(serviceOrderId), data as TBudgetInput);
    mutate();
    return error;
  };

  return (
    <div className={styles.addCard}>
      <Card>
        <FormDialogButton
          button={(props) => (
            <CardActionArea {...props}>
              <div className={styles.buttonContent}>
                <AddIcon fontSize="large" />
                <Typography variant="body1" component="p">
                  Novo Orçamento
                </Typography>
              </div>
            </CardActionArea>
          )}
          formDialogProps={{
            title: "Criar Novo Orçamento",
            children: (
              <TextInput
                defaultValue={`Novo Orçamento #${number}`}
                textFieldProps={{
                  name: "name",
                  label: "Nome do novo orçamento",
                  required: true,
                  fullWidth: true,
                  margin: "normal",
                }}
              />
            ),
            yesButtonText: "Enviar",
            showLoading: true,
            submit: newBudget,
          }}
        />
      </Card>
    </div>
  );
}
