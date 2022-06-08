import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";

import { FormDialogButton } from "@/components/common/dialogs/FormDialog";
import ServiceOrderStatusInputs from "@/components/common/inputs/ServiceOrderStatus";
import type { TServiceOrderUpdateStatusInput } from "@/types/serviceOrder";
import { TServiceOrderWithClient } from "@/types/serviceOrder";
import updateStatusSO from "@/utils/mutations/updateStatusSO";

import DetailedInformation from "../DetailedInformation";
import styles from "./row.module.scss";

interface Props {
  serviceOrder: TServiceOrderWithClient;
  mutate: () => void;
}

export default function Equipment({ serviceOrder, mutate }: Props) {
  const [openRow, setOpenRow] = useState(false);

  const editStatusSO = async (data: unknown) => {
    const { error } = await updateStatusSO(serviceOrder.id, data as TServiceOrderUpdateStatusInput);
    mutate();
    return error;
  };

  return (
    <>
      <TableRow className={styles.row}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpenRow(!openRow)}>
            {openRow ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {serviceOrder.id}
        </TableCell>
        <TableCell align="right">{serviceOrder.equipment}</TableCell>
        <TableCell align="right">{serviceOrder.brand}</TableCell>
        <TableCell align="right">{serviceOrder.model}</TableCell>
        <TableCell className={serviceOrder.isUrgent ? styles.urgent : undefined} align="right">
          {serviceOrder.statusName}
          {serviceOrder.isUrgent && (
            <>
              <br />
              ATRASADO
            </>
          )}
        </TableCell>
        <TableCell align="right">
          <FormDialogButton
            buttonText="Atualizar Status"
            buttonProps={{ variant: "contained" }}
            formDialogProps={{
              title: "Atualizar Status",
              children: <ServiceOrderStatusInputs serviceOrder={serviceOrder} />,
              yesButtonText: "Salvar Alterações",
              showLoading: true,
              submit: editStatusSO,
            }}
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={openRow} timeout="auto" unmountOnExit>
            <DetailedInformation serviceOrder={serviceOrder} mutate={mutate} />
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
