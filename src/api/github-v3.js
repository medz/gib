import axios from "axios";

export function issues(page /*category*/) {
  return axios.get("https://api.github.com/repos/slimkit/plus/issues", {
    headers: {
      Accept: "application/vnd.github.squirrel-girl-preview.full+json"
    },
    params: {
      state: "all",
      // labels: ['gib@blog', category].toString(),
      sort: "created",
      direction: "desc",
      page
    }
  });
}
