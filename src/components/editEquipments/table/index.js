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
  const [sortDirection, setSortDirection] = useState("asc");
  const [sortProperty, setSortProperty] = useState("id");

  function compare(a, b) {
    if (sortDirection == "asc") {
      if (a[sortProperty] < b[sortProperty]) {
        return -1;
      }
      if (a[sortProperty] > b[sortProperty]) {
        return 1;
      }
    } else {
      if (a[sortProperty] < b[sortProperty]) {
        return 1;
      }
      if (a[sortProperty] > b[sortProperty]) {
        return -1;
      }
    }
    return 0;
  }
  equipments.sort(compare);

  // Search
  const [search, setSearch] = useState("");
  equipments = equipments.filter(({ name, id, brand, model, owner, statusName }) => {
    const searchText = name + id + brand + model + owner.name + statusName;

    return searchText.toLowerCase().includes(search.toLowerCase());
  });

  const common = { setSortDirection: setSortDirection, setSortProperty: setSortProperty };

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
            <TableCellWithSort property="id" {...common}>
              OS
            </TableCellWithSort>
            <TableCellWithSort align="right" property="name" {...common}>
              Equipamento
            </TableCellWithSort>
            <TableCellWithSort align="right" property="brand" {...common}>
              Marca
            </TableCellWithSort>
            <TableCellWithSort align="right" property="Model" {...common}>
              Modelo
            </TableCellWithSort>
            <TableCellWithSort align="right" property="statusName" {...common}>
              Situação
            </TableCellWithSort>

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

function TableCellWithSort({ children, property, setSortDirection, setSortProperty, align }) {
  const [sortDirection, setThisSortDirection] = useState("asc");

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
