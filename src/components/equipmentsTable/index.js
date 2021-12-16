import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { useState } from "react";

import UpdateStatusDialog from "../updateStatusDialog";
import SendMail from "./sendMail";

function Equipment({ equipment, reload }) {
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
          {equipment.OS_number}
        </TableCell>
        <TableCell align="right">{equipment.name}</TableCell>
        <TableCell align="right">{equipment.brand}</TableCell>
        <TableCell align="right">{equipment.model}</TableCell>
        <TableCell align="right">{getEquipmentStatus(equipment)}</TableCell>
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

              <p>
                {equipment.isUnderWarranty
                  ? "Equipamento em Garantia"
                  : "Equipamento Fora de Garantia"}
              </p>
              <p>{equipment.accessories ? `Acessorios: ${equipment.accessories}` : undefined}</p>
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

              <SendMail equipment={equipment} />
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

export default function CollapsibleTable({ equipments, reload }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>OS</TableCell>
            <TableCell align="right">Nome</TableCell>
            <TableCell align="right">Marca</TableCell>
            <TableCell align="right">Modelo</TableCell>
            <TableCell align="right">Situação</TableCell>
            <TableCell align="right">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {equipments.map((equipment) => (
            <Equipment key={equipment.OS_number} equipment={equipment} reload={reload} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const getEquipmentStatus = (equipment) => {
  if (equipment.deliveredToCustomerAt != null) {
    return "Finalizado";
  }

  if (equipment.repairedAt != null) {
    return "Aguardando Retirada";
  }

  if (equipment.isBudgetApproved === true || equipment.partsArrivedAt != null) {
    return "Aguardando Reparo";
  }

  if (equipment.isBudgetApproved === false) {
    return "Orçamento Negado";
  }

  if (equipment.avalietedAt != null) {
    if (equipment.isUnderWarranty) {
      return "Aguardando Peças";
    } else {
      return "Aguardando Aprovação do Orçamento";
    }
  }

  if (equipment.registeredInManufacturerAt != null) {
    return "Esperando Avaliação";
  }

  if (equipment.isUnderWarranty) {
    return "Esperando criar OSF";
  } else {
    return "Esperando Avaliação";
  }
};
