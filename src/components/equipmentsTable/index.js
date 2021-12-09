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
import * as React from "react";

import UpdateStatusDialog from "../updateStatusDialog";

/*
OS_number: 22
PartsArrivedAt: null
accessories: null
attendedBy: "Silas Henrique"
attendedOn: "balcão"
avalietedAt: null
batchOrImei: null
brand: ""
budgetApprovedAt: null
createdAt: "2011-01-12T11:38:00.000Z"
deliveredToCustomerAt: null
id: 21
isBudgetApproved: null
isUnderWarranty: false
listOfServices: null
model: "52352345"
name: "Multimetro"
ownerId: 1
problemDescription: null
productCondition: null
product_number: null
registeredInManufacturerAt: null
repairedAt: null
wasEdited: false
*/

function Equipment({ equipment }) {
  const [openRow, setOpenRow] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);

  return (
    <React.Fragment>
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
        <TableCell align="right">{"Aguardando aprovação"}</TableCell>
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
              <p>{equipment.attendedBy ? `Atendido Por: ${equipment.attendedBy}` : undefined}</p>
              <p>
                {equipment.attendedOn ? `Local de Atendimento: ${equipment.attendedOn}` : undefined}
              </p>
              <p>
                {() => {
                  if (equipment.isUnderWarranty === false) {
                    if (equipment.isBudgetApproved === null) {
                      return "Orçamento ainda não aprovado";
                    } else if (equipment.isBudgetApproved === false) {
                      return "Orçamento Negado";
                    } else if (equipment.isBudgetApproved === true) {
                      return "Orçamento Aprovado";
                    }
                  }
                }}
              </p>

              {/*
listOfServices: null
model: "52352345"
name: "Multimetro"
ownerId: 1
problemDescription: null
productCondition: null
product_number: null
registeredInManufacturerAt: null
repairedAt: null
wasEdited: false
              */}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>

      <UpdateStatusDialog open={openDialog} handleClose={() => setOpenDialog(false)} />
    </React.Fragment>
  );
}

export default function CollapsibleTable({ equipments }) {
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
            <Equipment key={equipment.OS_number} equipment={equipment} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
