import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableFooter from "@mui/material/TableFooter";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useRouter } from "next/router";
import { useState } from "react";

import TableCellWithSort, { Direction } from "@/components/common/table/CellWithSort";
import { TClientWithSOs as Client } from "@/types/client";

import ClientRow from "../Row";

export type SortableProperty = "id" | "name" | "email";

interface Props {
  clients: Client[];
  mutate: () => void;

  setSortDirection: (direction: Direction) => void;
  setSortProperty: (property: SortableProperty) => void;
}

const CollapsibleTable = ({ clients, mutate, ...props }: Props) => {
  const router = useRouter();

  const [rowsPerPage, setRowsPerPage] = useState(50);
  const page = router.query.page ? parseInt(router.query.page as string) : 0;

  const setPage = (page: number) => {
    router.push(`/admin/editClients?page=${page}`, undefined, { shallow: true });
  };

  if (clients.length < page * rowsPerPage && page > 0) {
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
          <TableCellWithSort property="name" {...common}>
            Nome
          </TableCellWithSort>
          <TableCellWithSort align="right" property="email" {...common}>
            E-mail
          </TableCellWithSort>
          <TableCell align="right">WhatsApp</TableCell>
          <TableCell align="right">Telefone</TableCell>
          <TableCell align="center">CPF ou CNPJ</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {clients.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((client) => (
          <ClientRow client={client} key={client.id} mutate={mutate} />
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
            count={clients.length}
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
