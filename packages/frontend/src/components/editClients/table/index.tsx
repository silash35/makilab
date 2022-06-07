import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import { useState } from "react";

import { TClientWithSOs as Client } from "@/types/client";

import ClientRow from "../row";
import styles from "./table.module.scss";

interface TableProps {
  clients: Client[];
  mutate: () => void;
}

type SortableProperty = "id" | "name" | "email";
type Direction = "asc" | "desc";

export default function CollapsibleTable({ clients, mutate }: TableProps) {
  const [sortDirection, setSortDirection] = useState<Direction>("asc");
  const [sortProperty, setSortProperty] = useState<SortableProperty>("id");

  function compare(a: Client, b: Client) {
    const aValue = a[sortProperty];
    const bValue = b[sortProperty];

    if (sortDirection == "asc") {
      if (aValue === null) {
        return -1;
      }
      if (bValue === null) {
        return 1;
      }

      if (aValue < bValue) {
        return -1;
      }
      if (aValue > bValue) {
        return 1;
      }
    } else {
      if (aValue === null) {
        return 1;
      }
      if (bValue === null) {
        return -1;
      }

      if (aValue < bValue) {
        return 1;
      }
      if (aValue > bValue) {
        return -1;
      }
    }
    return 0;
  }
  clients.sort(compare);

  // Search
  const [search, setSearch] = useState("");
  clients = clients.filter(({ name, email, zip, whatsapp, tel, cpfOrCnpj, address }) => {
    const searchText = name + email + zip + whatsapp + tel + cpfOrCnpj + address;

    return searchText.toLowerCase().includes(search.toLowerCase());
  });

  const common = { setSortDirection: setSortDirection, setSortProperty: setSortProperty };

  return (
    <TableContainer component={Paper}>
      <Toolbar className={styles.toolbar}>
        <h1 className={styles.title}>Clientes</h1>
        <TextField
          margin="normal"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Toolbar>
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
          {clients.map((client) => (
            <ClientRow key={client.id} client={client} mutate={mutate} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

interface CellProps {
  children: React.ReactNode;
  property: SortableProperty;
  setSortDirection: (direction: Direction) => void;
  setSortProperty: (property: SortableProperty) => void;
  align?: "inherit" | "left" | "center" | "right" | "justify";
}

function TableCellWithSort({
  children,
  property,
  setSortDirection,
  setSortProperty,
  align,
}: CellProps) {
  const [sortDirection, setThisSortDirection] = useState<Direction>("asc");

  return (
    <TableCell align={align}>
      <TableSortLabel
        direction={sortDirection}
        onClick={() => {
          const newSortDirection = sortDirection === "asc" ? "desc" : "asc";
          setSortProperty(property);
          setSortDirection(newSortDirection);
          setThisSortDirection(newSortDirection);
        }}
      >
        {children}
      </TableSortLabel>
    </TableCell>
  );
}
