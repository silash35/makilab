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

import Equipment from "../row";
import styles from "./table.module.scss";

export default function CollapsibleTable({ equipments, reload }) {
  const [sortDirection, setSortDirection] = useState("desc");

  // Search
  const [search, setSearch] = useState("");
  equipments = equipments.filter(({ name, id, brand, model, owner, statusName }) => {
    const searchText = name + id + brand + model + owner.name + statusName;

    return searchText.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <TableContainer component={Paper}>
      <Toolbar className={styles.toolbar}>
        <h1 className={styles.title}>Ordens de Serviço</h1>
        <TextField
          margin="normal"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment>
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
            <TableCell>
              <TableSortLabel
                direction={sortDirection}
                onClick={() => setSortDirection(sortDirection === "asc" ? "desc" : "asc")}
              >
                OS
              </TableSortLabel>
            </TableCell>
            <TableCell align="right">Nome</TableCell>
            <TableCell align="right">Marca</TableCell>
            <TableCell align="right">Modelo</TableCell>
            <TableCell align="right">Situação</TableCell>
            <TableCell align="right">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {equipments.map((equipment) => (
            <Equipment key={equipment.id} equipment={equipment} reload={reload} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
