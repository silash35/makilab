import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Button } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";

import DetailedInformation from "../detailedInformation";
import styles from "./row.module.scss";

export default function Equipment({ client, reload }) {
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
          {client.name}
        </TableCell>
        <TableCell align="right">{client.email}</TableCell>
        <TableCell align="right">{client.whatsapp}</TableCell>
        <TableCell align="right">{client.tel}</TableCell>
        <TableCell align="center">{client.cpfOrCnpj}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={openRow} timeout="auto" unmountOnExit>
            <DetailedInformation client={client} reload={reload} />
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
