import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";

import DetailedInformation from "../detailedInformation";
import UpdateStatusDialog from "../updateStatusDialog";
import styles from "./row.module.scss";

export default function Equipment({ equipment, reload }) {
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
          {equipment.id}
        </TableCell>
        <TableCell align="right">{equipment.name}</TableCell>
        <TableCell align="right">{equipment.brand}</TableCell>
        <TableCell align="right">{equipment.model}</TableCell>
        <TableCell align="right">{equipment.statusName}</TableCell>
        <TableCell align="right">
          <UpdateStatusDialog reload={reload} equipment={equipment} />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={openRow} timeout="auto" unmountOnExit>
            <DetailedInformation equipment={equipment} reload={reload} />
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
