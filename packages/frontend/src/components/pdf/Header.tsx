import config from "@config";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

const { COMPANY } = config;

const Ul = styled("ul")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignContent: "center",
  padding: 0,
  listStyle: "none",
});

interface Props {
  title: string;
}

const PdfHeader = ({ title }: Props) => (
  <Stack alignContent="center" direction="row" justifyContent="space-between">
    <img alt={`Logo da ${COMPANY.name}`} src="/YOUR_COMPANY_LOGO.svg" width={100} />
    <h2>{title}</h2>
    <Ul>
      <li>{COMPANY.name}</li>
      <li>{COMPANY.phones.join(" | ")}</li>
      <li>{COMPANY.email}</li>
    </Ul>
  </Stack>
);

export default PdfHeader;
