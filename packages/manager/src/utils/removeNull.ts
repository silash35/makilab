export default function removeNull(string: string | undefined | null): string {
  if (string != null) {
    return string;
  } else {
    return "";
  }
}
