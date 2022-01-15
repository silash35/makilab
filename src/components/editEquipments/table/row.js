import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";

import UpdateStatusDialog from "../updateStatusDialog";
import DetailedInformation from "./detailedInformation";

export default function Equipment({ equipment, reload }) {
  const [openRow, setOpenRow] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
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
          <Button variant="contained" onClick={() => setOpenDialog(true)}>
            Atualizar Status
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={openRow} timeout="auto" unmountOnExit>
            <DetailedInformation equipment={equipment} reload={reload} />
          </Collapse>
        </TableCell>
      </TableRow>

      <UpdateStatusDialog
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
        reload={reload}
        equipment={equipment}
      />
    </>
  );
}
