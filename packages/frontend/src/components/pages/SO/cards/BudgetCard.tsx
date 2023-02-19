import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Link from "next/link";

import { ConfirmationDialogButton } from "@/components/common/dialogs/ConfirmationDialog";
import TBudget from "@/types/budget";
import centsToBRL from "@/utils/centsToBRL";
import deleteBudget from "@/utils/mutations/deleteBudget";

interface Props {
  budget: TBudget;
  mutate: () => void;
}

const BudgetCard = ({ budget, mutate }: Props) => {
  const reais = centsToBRL(budget.total);

  const handleDeleteBudget = async () => {
    const { error } = await deleteBudget(budget.id);
    mutate();
    return error;
  };

  return (
    <Card>
      <CardContent>
        <Typography component="div" variant="h5">
          {budget.name}
        </Typography>
        <Typography component="div" variant="h6">
          {reais}
        </Typography>
      </CardContent>
      <CardActions>
        <Button component={Link} href={`/admin/budget/${budget.id}`}>
          Ver mais
        </Button>

        <ConfirmationDialogButton
          confirmationDialogProps={{
            title: `Deletar ${budget.name}`,
            text: "Tem certeza que deseja excluir este orçamento? Não será possível recuperar depois.",
            yesButtonText: "Deletar",
            showLoading: true,
            submit: handleDeleteBudget,
          }}
          buttonProps={{ variant: "text" }}
          buttonText="Deletar"
        />
      </CardActions>
    </Card>
  );
};

export default BudgetCard;
