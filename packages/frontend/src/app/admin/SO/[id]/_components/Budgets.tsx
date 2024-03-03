"use client";

import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";

import useBudgets from "@/hooks/useBudgets";

import styles from "./budgets.module.scss";
import BudgetCard from "./cards/BudgetCard";
import NewBudgetCard from "./cards/NewBudgetCard";

interface Props {
  id: string;
}

const Budgets = ({ id }: Props) => {
  const { budgets, mutate } = useBudgets(id);

  if (!budgets) {
    return (
      <Stack alignItems="center" height="100%" justifyContent="center">
        <CircularProgress />
      </Stack>
    );
  }

  return (
    <div className={styles.container}>
      <h1>Orçamentos da OS {id}</h1>
      <div className={styles.budgets}>
        <NewBudgetCard mutate={mutate} number={budgets.length + 1} serviceOrderId={id} />

        {budgets.map((budget) => (
          <BudgetCard budget={budget} key={budget.id} mutate={mutate} />
        ))}
      </div>
    </div>
  );
};

export default Budgets;
