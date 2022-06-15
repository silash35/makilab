import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import TableCellWithSort, { Direction } from "@/components/common/table/CellWithSort";
import { TServiceOrderWithClient as ServiceOrder } from "@/types/serviceOrder";

import Equipment from "../Row";

export type SortableProperty = "id" | "equipment" | "brand" | "model" | "statusName";

interface Props {
  serviceOrders: ServiceOrder[];
  mutate: () => void;

  setSortDirection: (direction: Direction) => void;
  setSortProperty: (property: SortableProperty) => void;
}

export default function CollapsibleTable({ serviceOrders, mutate, ...props }: Props) {
  const common = {
    setSortDirection: props.setSortDirection,
    setSortProperty: props.setSortProperty,
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell />
          <TableCellWithSort property="id" {...common}>
            OS
          </TableCellWithSort>
          <TableCellWithSort align="right" property="equipment" {...common}>
            Equipamento
          </TableCellWithSort>
          <TableCellWithSort align="right" property="brand" {...common}>
            Marca
          </TableCellWithSort>
          <TableCellWithSort align="right" property="model" {...common}>
            Modelo
          </TableCellWithSort>
          <TableCellWithSort align="right" property="statusName" {...common}>
            Situação
          </TableCellWithSort>

          <TableCell align="right">Ações</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {serviceOrders.map((serviceOrder) => (
          <Equipment key={serviceOrder.id} serviceOrder={serviceOrder} mutate={mutate} />
        ))}
      </TableBody>
    </Table>
  );
}
