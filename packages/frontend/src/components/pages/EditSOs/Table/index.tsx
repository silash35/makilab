import SearchIcon from "@mui/icons-material/Search";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import { useState } from "react";

import TableCellWithSort, { Direction } from "@/components/common/table/CellWithSort";
import { TServiceOrderWithClient as ServiceOrder } from "@/types/serviceOrder";
import compare from "@/utils/compare";

import Equipment from "../Row";
import styles from "./table.module.scss";

interface Props {
  serviceOrders: ServiceOrder[];
  mutate: () => void;
}

type SortableProperty = "id" | "equipment" | "brand" | "model" | "statusName";

export default function CollapsibleTable({ serviceOrders, mutate }: Props) {
  const [showEnded, setShowEnded] = useState(false);

  // Sort
  const [sortDirection, setSortDirection] = useState<Direction>("asc");
  const [sortProperty, setSortProperty] = useState<SortableProperty>("id");

  function sort(a: ServiceOrder, b: ServiceOrder) {
    // Put urgent equipments at the top
    if (a.isUrgent && !b.isUrgent) {
      return -1;
    }
    if (!a.isUrgent && b.isUrgent) {
      return 1;
    }

    if (sortDirection === "asc") {
      return compare(a[sortProperty], b[sortProperty]);
    } else {
      return compare(b[sortProperty], a[sortProperty]);
    }
  }

  // Search
  const [search, setSearch] = useState("");
  serviceOrders = serviceOrders.filter(({ equipment, id, brand, model, owner, statusName }) => {
    const searchText = equipment + id + brand + model + owner?.name + statusName;

    return (
      (showEnded || statusName !== "Finalizado") &&
      searchText.toLowerCase().includes(search.toLowerCase())
    );
  });
  serviceOrders.sort(sort);

  const common = { setSortDirection: setSortDirection, setSortProperty: setSortProperty };

  return (
    <TableContainer component={Paper}>
      <div className={styles.toolbar}>
        <div>
          <h1 className={styles.title}>Ordens de Serviço</h1>
          <FormControlLabel
            control={
              <Checkbox checked={showEnded} onChange={(e) => setShowEnded(e.target.checked)} />
            }
            label="Mostrar Finalizados"
          />
        </div>
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
      </div>
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
    </TableContainer>
  );
}
