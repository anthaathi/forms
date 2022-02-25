export default function startWithCapital(value: string) {
  return (
    (value as string).charCodeAt(0) >= 65 &&
    (value as string).charCodeAt(0) <= 90
  );
}
