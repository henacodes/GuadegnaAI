import { writable } from "svelte/store";

export default writable({
  extractedText: "",
  loading: false,
});
