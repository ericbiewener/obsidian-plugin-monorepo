export const removeElsWithClassName = (cn: string) => {
  const els = document.getElementsByClassName(cn);
  for (const el of Array.from(els)) el.remove();
};
