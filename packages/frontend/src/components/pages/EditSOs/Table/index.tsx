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
import TableSortLabel from "@mui/material/TableSortLabel";
import TextField from "@mui/material/TextField";
import { useState } from "react";

import { TServiceOrderWithClient as ServiceOrder } from "@/types/serviceOrder";
import compare from "@/utils/compare";

import Equipment from "../Row";
import styles from "./table.module.scss";

interface Props {
  serviceOrders: ServiceOrder[];
  mutate: () => void;
}

type SortableProperty = "id" | "equipment" | "brand" | "model" | "statusName";
type Direction = "asc" | "desc";

export default function CollapsibleTable({ serviceOrders, mutate }: Props) {
  const [sortDirection, setSortDirection] = useState<Direction>("asc");
  const [sortProperty, setSortProperty] = useState<SortableProperty>("id");
  const [search, setSearch] = useState("");
  const [showEnded, setShowEnded] = useState(false);

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
