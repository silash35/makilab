import Stack from "@mui/material/Stack";

const layout = ({ children }: { children: React.JSX.Element }) => (
  <Stack alignItems="center">{children}</Stack>
);

export const revalidate = 0;

export default layout;
