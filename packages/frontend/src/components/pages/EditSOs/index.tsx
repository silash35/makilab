import SearchIcon from "@mui/icons-material/Search";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TableContainer from "@mui/material/TableContainer";
import TextField from "@mui/material/TextField";
import { useState } from "react";

import ErrorComponent from "@/components/common/ErrorComponent";
import type { Direction } from "@/components/common/table/CellWithSort";
import useServiceOrders from "@/hooks/useServiceOrders";
import { TServiceOrderWithClient as ServiceOrder } from "@/types/serviceOrder";
import compare from "@/utils/compare";

import styles from "./editSOs.module.scss";
import EquipmentsTable, { SortableProperty } from "./Table";

export default function EditSOs() {
  const [showEnded, setShowEnded] = useState(false);

  const { serviceOrders, mutate, error } = useServiceOrders(
    showEnded ? "?showFinalized=true" : undefined
  );

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

  if (!serviceOrders) {
    return (
      <Stack height="100%" justifyContent="center" alignItems="center">
        {error ? <ErrorComponent /> : <CircularProgress />}
      </Stack>
    );
  }

  const showedSOs = serviceOrders.filter(({ equipment, id, brand, model, owner, statusName }) => {
    const searchText = equipment + id + brand + model + owner?.name + statusName;
    return searchText.toLowerCase().includes(search.toLowerCase());
  });

  showedSOs.sort(sort);

  return (
    <>
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
        <EquipmentsTable
          serviceOrders={showedSOs}
          mutate={mutate}
          setSortDirection={setSortDirection}
          setSortProperty={setSortProperty}
        />
      </TableContainer>
    </>
  );
}
