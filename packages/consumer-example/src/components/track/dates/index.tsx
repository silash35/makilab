import format from "date-fns/format";
import { useRouter } from "next/router";

import Product from "@/types/product";

import styles from "./dates.module.scss";
import en from "./locales/en";
import pt from "./locales/pt";

interface Props {
  product: Product;
}

export default function Dates({ product }: Props) {
  const router = useRouter();
  const t = router.locale === "en" ? en : pt;

  const dates = [];

  if (product.createdAt != null) {
    dates.push(<DateItem text={t.arrived} date={product.createdAt} key={1} />);
  }
  if (product.budgetedAt != null) {
    dates.push(<DateItem text={t.budgeted} date={product.budgetedAt} key={2} />);
  }
  if (product.budgetAnsweredAt != null) {
    dates.push(<DateItem text={t.budgetAnswered} date={product.budgetAnsweredAt} key={3} />);
  }
  if (product.repairedAt != null) {
    dates.push(<DateItem text={t.repaired} date={product.repairedAt} key={4} />);
  }
  if (product.deliveredToCustomerAt != null) {
    dates.push(
      <DateItem text={t.deliveredToCustomer} date={product.deliveredToCustomerAt} key={5} />
    );
  }

  return <ul className={styles.list}>{dates}</ul>;
}

interface DateItemProps {
  text: string;
  date: string;
}

function DateItem({ text, date }: DateItemProps) {
  const router = useRouter();
  const t = router.locale === "en" ? en : pt;

  return (
    <li className={styles.item}>
      <p>{format(new Date(date), t.dateFormat, { locale: t.dateLocale })}</p>

      <div className={styles.flex}>
        <p className={styles.time}>{format(new Date(date), "hh:mm a", { locale: t.dateLocale })}</p>
        <p className={styles.text}>{text}</p>
      </div>
    </li>
  );
}
