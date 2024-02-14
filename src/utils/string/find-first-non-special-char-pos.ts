// Not actually the correct regex, just doing it for what I need for now
const regex = /[a-zA-Z0-9]/;

export const findFirstNonSpecialCharPos = (str: string) => {
  const idx = str.search(regex);
  return idx > -1 ? idx : null;
};
