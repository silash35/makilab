import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const rows = [
  {
    name: "Lorem ipsum dolor et eros augue",
    quantity: "2",
    price: "R$ 500,00",
    total: "R$ 1.500,00",
  },
  { name: "Lorem ipsum", price: "R$ 5,00", quantity: "0", total: "R$ 1.500,00" },
  { name: "Lorem ipsum dolor", price: "R$ 5000,00", quantity: "10", total: "R$ 1.500,00" },
];

export default function BudgetTable() {
  return (
    <TableContainer component={Paper}>
      <h1>Editar Orçamento</h1>

      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Nome</TableCell>
            <TableCell align="right">Quantidade</TableCell>
            <TableCell align="right">Valor unitário</TableCell>
            <TableCell align="right">Valor Total</TableCell>
            <TableCell align="right">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Item key={row.name} row={row} />
          ))}
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell align="left">Total</TableCell>
            <TableCell align="right">R$ 500,00</TableCell>
            <TableCell align="right">12</TableCell>
            <TableCell align="right">R$ 1000,00</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const Item = ({ item }: { item: typeof rows[0] }) => {
  return (
    <TableRow key={item.name}>
      <TableCell align="left">{item.name}</TableCell>
      <TableCell align="right">{item.quantity}</TableCell>
      <TableCell align="right">{item.price}</TableCell>
      <TableCell align="right">{item.total}</TableCell>
      <TableCell align="right">
        <IconButton aria-label="Deletar">
          <DeleteIcon />
        </IconButton>
        <IconButton aria-label="Editar">
          <EditIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};
