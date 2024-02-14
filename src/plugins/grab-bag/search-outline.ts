import * as o from "obsidian";
import { addCommand } from "../../add-command";
import { assert } from "../../utils/assert";

const getSearchInput = () =>
  document.querySelector<HTMLInputElement | null>(
    "[data-type=outline] .search-input-container",
  );

const searchOutline = ({ app }: o.Plugin) => {
  app.commands.executeCommandById("outline:open");
  const searchInput = getSearchInput();

  assert(searchInput, "No search input found");

  const searchButton = document.querySelector<HTMLElement>(
    "[data-type=outline] [aria-label='Show search filter']",
  );

  if (!searchButton.classList.contains("is-active")) {
    searchButton.click();
  } else {
    searchInput.querySelector("input").focus();
  }
};

export const addSearchOutlineCmd = addCommand("Search Outline", searchOutline);
