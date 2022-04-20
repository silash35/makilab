import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";

import ServiceOrder from "@/types/serviceOrder";

import DetailedInformation from "../detailedInformation";
import UpdateStatusDialog from "../updateStatusDialog";
import styles from "./row.module.scss";

interface Props {
  serviceOrder: ServiceOrder;
  reload: () => void;
}

export default function Equipment({ serviceOrder, reload }: Props) {
  const [openRow, setOpenRow] = useState(false);

  return (
    <>
      <TableRow className={styles.row}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpenRow(!openRow)}>
            {openRow ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {serviceOrder.id}
        </TableCell>
        <TableCell align="right">{serviceOrder.equipment}</TableCell>
        <TableCell align="right">{serviceOrder.brand}</TableCell>
        <TableCell align="right">{serviceOrder.model}</TableCell>
        <TableCell className={serviceOrder.isUrgent ? styles.urgent : undefined} align="right">
          {serviceOrder.statusName}
          {serviceOrder.isUrgent && (
            <>
              <br />
              ATRASADO
            </>
          )}
        </TableCell>
        <TableCell align="right">
          <UpdateStatusDialog serviceOrder={serviceOrder} />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={openRow} timeout="auto" unmountOnExit>
            <DetailedInformation serviceOrder={serviceOrder} reload={reload} />
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
