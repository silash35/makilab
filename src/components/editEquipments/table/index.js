import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Toolbar from "@mui/material/Toolbar";

import Equipment from "../row";
import styles from "./table.module.scss";

export default function CollapsibleTable({ equipments, reload }) {
  return (
    <TableContainer component={Paper}>
      <Toolbar>
        <h1 className={styles.title}>Ordens de Serviço</h1>
      </Toolbar>
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
            <Equipment key={equipment.id} equipment={equipment} reload={reload} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
