export const toColor = (string: string) => {
  const colors = [
    "#e51c23",
    "#e91e63",
    "#9c27b0",
    "#673ab7",
    "#3f51b5",
    "#5677fc",
    "#03a9f4",
    "#00bcd4",
    "#009688",
    "#259b24",
    "#8bc34a",
    "#afb42b",
    "#ff9800",
    "#ff5722",
    "#795548",
    "#607d8b",
  ];

  let hash = 0;
  if (string.length === 0) return colors[0] as string;
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }
  hash = ((hash % colors.length) + colors.length) % colors.length;
  return colors[hash] as string;
};
