import { writable } from "svelte/store";

export default writable({
  messages: [],
  loading: false,
});
