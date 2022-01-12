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

  const owner = equipment.owner;

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
              <Typography variant="h5" gutterBottom component="div">
                Informações Detalhadas
              </Typography>

              <Typography variant="h6" gutterBottom component="div">
                Sobre o Equipamento
              </Typography>
              <p>{equipment.batchOrImei && `Lote ou IMEI: ${equipment.batchOrImei}`}</p>
              <p>
                {equipment.equipment_number && `Numero de Serie: ${equipment.equipment_number}`}
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
              <p>{equipment.accessories && `Acessórios: ${equipment.accessories}`}</p>
              <p>
                {equipment.equipmentCondition &&
                  `Condição do equipamento: ${equipment.equipmentCondition}`}
              </p>
              <p>
                {equipment.problemDescription &&
                  `Descrição do problema: ${equipment.problemDescription}`}
              </p>

              <Typography variant="h6" gutterBottom component="div">
                Sobre o Atendimento
              </Typography>
              <p>{equipment.attendedBy && `Atendido Por: ${equipment.attendedBy}`}</p>
              <p>{equipment.attendedOn && `Local de Atendimento: ${equipment.attendedOn}`}</p>
              <p>{equipment.listOfServices && `Lista de serviços: ${equipment.listOfServices}`}</p>

              <Typography variant="h6" gutterBottom component="div">
                Sobre o Cliente
              </Typography>
              <p>{owner.name && `Nome: ${owner.name}`}</p>
              <p>{owner.email && `Email: ${owner.email}`}</p>
              <p>{owner.address && `Endereço: ${owner.address}`}</p>
              <p>{owner.zip && `CEP: ${owner.zip}`}</p>
              <p>{owner.whatsapp && `WhatsApp: ${owner.whatsapp}`}</p>
              <p>{owner.tel && `Telefone: ${owner.tel}`}</p>
              <p>{owner.cpfOrCnpj && `CPF: ${owner.cpfOrCnpj}`}</p>

              {owner.email && <SendMail equipment={equipment} />}
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
