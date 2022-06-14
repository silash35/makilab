import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import { useState } from "react";

import TableCellWithSort, { Direction } from "@/components/common/table/CellWithSort";
import { TClientWithSOs as Client } from "@/types/client";
import compare from "@/utils/compare";

import ClientRow from "../Row";
import styles from "./table.module.scss";

interface TableProps {
  clients: Client[];
  mutate: () => void;
}

type SortableProperty = "id" | "name" | "email";

export default function CollapsibleTable({ clients, mutate }: TableProps) {
  // Sort
  const [sortDirection, setSortDirection] = useState<Direction>("asc");
  const [sortProperty, setSortProperty] = useState<SortableProperty>("id");
  function sort(a: Client, b: Client) {
    if (sortDirection === "asc") {
      return compare(a[sortProperty], b[sortProperty]);
    } else {
      return compare(b[sortProperty], a[sortProperty]);
    }
  }

  clients.sort(sort);

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
