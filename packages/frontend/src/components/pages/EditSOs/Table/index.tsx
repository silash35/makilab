import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableFooter from "@mui/material/TableFooter";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

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

const CollapsibleTable = ({ serviceOrders, mutate, ...props }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [rowsPerPage, setRowsPerPage] = useState(50);
  const page = Number(searchParams.get("page"));

  const setPage = (page: number) => {
    router.push(`/admin/editSOs?page=${page}`);
  };

  if (serviceOrders.length < page * rowsPerPage && page > 0) {
    setPage(page - 1);
  }

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
        {serviceOrders
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((serviceOrder) => (
            <Equipment key={serviceOrder.id} mutate={mutate} serviceOrder={serviceOrder} />
          ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TablePagination
            SelectProps={{
              inputProps: {
                "aria-label": "Linhas por página",
              },
            }}
            onRowsPerPageChange={(event) => {
              setRowsPerPage(parseInt(event.target.value, 10));
              setPage(0);
            }}
            colSpan={7}
            count={serviceOrders.length}
            onPageChange={(e, newPage) => setPage(newPage)}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[50, 100, 200, 300]}
          />
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default CollapsibleTable;
