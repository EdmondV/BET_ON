export function clearFix() {
  return `
  &:before, &:after {
    content: " ";
    display: table;
  }
  &:after {
    clear: both;
  }
  `;
}
