import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import NewBudgetCard from "@/components/budgets/newBudgetCard";
import useBudgets from "@/hooks/useBudgets";
import TBudget from "@/types/budget";

import styles from "./budgets.module.scss";

interface Props {
  id: string;
}

export default function Budgets({ id }: Props) {
  const { budgets, mutate } = useBudgets(id);

  if (!budgets) {
    return (
      <Stack height="100%" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Stack>
    );
  }

  return (
    <div className={styles.container}>
      <h1>Orçamentos da OS {id}</h1>
      <div className={styles.budgets}>
        <NewBudgetCard serviceOrderId={id} number={budgets.length + 1} mutate={mutate} />

        {budgets.map((budget) => (
          <BudgetCard budget={budget} key={budget.id} />
        ))}
      </div>
    </div>
  );
}

const BudgetCard = ({ budget }: { budget: TBudget }) => {
  const reais = (budget.total / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {budget.name}
        </Typography>
        <Typography variant="h6" component="div">
          {reais}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Ver mais</Button>
        <Button size="small">Deletar</Button>
      </CardActions>
    </Card>
  );
};
