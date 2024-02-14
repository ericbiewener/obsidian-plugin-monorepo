import * as o from "obsidian";

type Config<S> = Pick<
  o.FuzzySuggestModal<S>,
  "getItems" | "getItemText" | "onChooseItem"
>;

export const createFuzzySuggestModal = <S>(
  { app }: o.Plugin,
  config: Config<S>,
  open = true,
) => {
  class CustomFuzzySuggestModal extends o.FuzzySuggestModal<S> {
    getItems = config.getItems;
    getItemText = config.getItemText;
    onChooseItem = config.onChooseItem;
  }

  const modal = new CustomFuzzySuggestModal(app);
  if (open) modal.open();
};
