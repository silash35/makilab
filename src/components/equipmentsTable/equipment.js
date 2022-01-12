import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { useState } from "react";

import SendMail from "../sendMail";
import UpdateStatusDialog from "../updateStatusDialog";

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
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={openRow} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Informações Detalhadas
              </Typography>

              <p>{equipment.accessories ? `Acessórios: ${equipment.accessories}` : undefined}</p>
              <p>{equipment.batchOrImei ? `Lote ou IMEI: ${equipment.batchOrImei}` : undefined}</p>
              <p>
                {equipment.equipment_number
                  ? `Numero de Serie: ${equipment.equipment_number}`
                  : undefined}
              </p>
              <p>{equipment.attendedBy ? `Atendido Por: ${equipment.attendedBy}` : undefined}</p>
              <p>
                {equipment.attendedOn ? `Local de Atendimento: ${equipment.attendedOn}` : undefined}
              </p>
              <p>
                {equipment.isUnderWarranty
                  ? "Equipamento em Garantia"
                  : "Equipamento Fora de Garantia"}
              </p>
              <p>
                {(() => {
                  if (equipment.isUnderWarranty === false) {
                    if (equipment.isBudgetApproved === null) {
                      return "Orçamento ainda não aprovado";
                    } else if (equipment.isBudgetApproved === false) {
                      return "Orçamento Negado";
                    } else if (equipment.isBudgetApproved === true) {
                      return "Orçamento Aprovado";
                    }
                  }
                })()}
              </p>
              <br />
              <p>
                {equipment.equipmentCondition
                  ? `Condição do equipamento: ${equipment.equipmentCondition}`
                  : undefined}
              </p>
              <p>
                {equipment.problemDescription
                  ? `Descrição do problema: ${equipment.problemDescription}`
                  : undefined}
              </p>
              <p>
                {equipment.listOfServices
                  ? `Lista de serviços: ${equipment.listOfServices}`
                  : undefined}
              </p>

              {equipment.owner.email ? <SendMail equipment={equipment} /> : undefined}
            </Box>
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
