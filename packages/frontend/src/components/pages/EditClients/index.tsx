import SearchIcon from "@mui/icons-material/Search";
import CircularProgress from "@mui/material/CircularProgress";
import InputAdornment from "@mui/material/InputAdornment";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TableContainer from "@mui/material/TableContainer";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import { useState } from "react";

import ErrorComponent from "@/components/common/ErrorComponent";
import { Direction } from "@/components/common/table/CellWithSort";
import useClients from "@/hooks/useClients";
import { TClientWithSOs as Client } from "@/types/client";
import compare from "@/utils/compare";

import styles from "./editClients.module.scss";
import ClientsTable, { SortableProperty } from "./Table";

export default function EditClients() {
  const { clients, mutate, error } = useClients();

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

  // Search
  const [search, setSearch] = useState("");
  const lowerCaseSearch = search.toLowerCase();

  const showedClients = clients
    ? clients.filter(({ name, email, zip, whatsapp, tel, cpfOrCnpj, address }) => {
        const searchText = name + email + zip + whatsapp + tel + cpfOrCnpj + address;

        return searchText.toLowerCase().includes(lowerCaseSearch);
      })
    : [];

  showedClients.sort(sort);

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
      {clients ? (
        <ClientsTable
          clients={showedClients}
          mutate={mutate}
          setSortDirection={setSortDirection}
          setSortProperty={setSortProperty}
        />
      ) : (
        <Stack height="50vh" justifyContent="center" alignItems="center">
          {error ? <ErrorComponent /> : <CircularProgress />}
        </Stack>
      )}
    </TableContainer>
  );
}
