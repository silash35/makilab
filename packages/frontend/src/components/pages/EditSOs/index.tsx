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

const EditSOs = () => {
  const [showEnded, setShowEnded] = useState(false);

  const { serviceOrders, mutate, error } = useServiceOrders(
    showEnded ? "?showFinalized=true" : undefined,
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
  const lowerCaseSearch = search.toLowerCase();

  const showedSOs = serviceOrders
    ? serviceOrders.filter(({ equipment, id, brand, model, owner, statusName }) => {
        const searchText = equipment + id + brand + model + owner?.name + statusName;
        return searchText.toLowerCase().includes(lowerCaseSearch);
      })
    : [];

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
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            margin="normal"
            onChange={(event) => setSearch(event.target.value)}
            value={search}
          />
        </div>
        {serviceOrders ? (
          <EquipmentsTable
            mutate={mutate}
            serviceOrders={showedSOs}
            setSortDirection={setSortDirection}
            setSortProperty={setSortProperty}
          />
        ) : (
          <Stack alignItems="center" height="50vh" justifyContent="center">
            {error ? <ErrorComponent /> : <CircularProgress />}
          </Stack>
        )}
      </TableContainer>
    </>
  );
};

export default EditSOs;
