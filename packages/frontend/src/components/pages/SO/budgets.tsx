import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";

import useBudgets from "@/hooks/useBudgets";

import styles from "./budgets.module.scss";
import BudgetCard from "./cards/budgetCard";
import NewBudgetCard from "./cards/newBudgetCard";

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
          <BudgetCard budget={budget} mutate={mutate} key={budget.id} />
        ))}
      </div>
    </div>
  );
}
