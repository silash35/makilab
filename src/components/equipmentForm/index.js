import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import styles from "./equipmentForm.module.scss";

export default function EquipmentForm() {
  const common = { variant: "outlined", fullWidth: true };

  return (
    <form className={styles.form} action="/api/places" method="POST">
      <h2>Cadastrar Equipamento</h2>
      <TextField
        name="id"
        label="N° da Ordem de Serviço"
        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
        required
        {...common}
      />
      <TextField name="userMail" label="Seu E-Mail" type="email" required {...common} />

      <h2>Dados básicos do local</h2>
      <TextField name="name" label="Nome" required {...common} />
      <TextField name="address" label="Endereço" required {...common} />
      <TextField name="description" label="Descrição" multiline required {...common} />
      <TextField
        name="key"
        label="Chave para alteração"
        helperText="Autenticação para editar as informações cadastradas"
        type="password"
        required
        {...common}
      />

      <h2>Informações extras</h2>
      <TextField name="email" label="Email do local" {...common} type="email" />
      <TextField
        name="phone"
        label="Telefone do local"
        type="tel"
        {...common}
        inputProps={{ pattern: "[0-9,\\-,\\(,\\), ]{8,}" }}
      />
      <TextField name="website" label="Site do local" type="url" {...common} />
      <TextField
        name="imageURL"
        label="Foto do local"
        helperText="Cole a URL de uma imagem da Web"
        type="url"
        {...common}
      />

      <Button variant="outlined" color="primary" size="large" type="submit">
        Cadastrar
      </Button>
    </form>
  );
}
