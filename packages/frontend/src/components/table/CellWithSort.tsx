import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import { useState } from "react";

interface Props<SortableProperty> {
  children: React.ReactNode;
  property: SortableProperty;
  setSortDirection: (direction: Direction) => void;
  setSortProperty: (property: SortableProperty) => void;
  align?: "inherit" | "left" | "center" | "right" | "justify";
}

const TableCellWithSort = <Properties,>({
  children,
  property,
  setSortDirection,
  setSortProperty,
  align,
}: Props<Properties>) => {
  const [sortDirection, setThisSortDirection] = useState<Direction>("asc");

  return (
    <TableCell align={align}>
      <TableSortLabel
        onClick={() => {
          const newSortDirection = sortDirection === "asc" ? "desc" : "asc";
          setSortProperty(property);
          setSortDirection(newSortDirection);
          setThisSortDirection(newSortDirection);
        }}
        direction={sortDirection}
      >
        {children}
      </TableSortLabel>
    </TableCell>
  );
};

export default TableCellWithSort;

export type Direction = "asc" | "desc";
