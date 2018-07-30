import axios from "axios";

const github = axios.create({
  baseURL: `https://api.github.com/repos/${process.env.VUE_APP_GITHUB_REPO}/`
});

export function issues(page /*category*/) {
  return github.get("issues", {
    headers: {
      Accept: "application/vnd.github.squirrel-girl-preview.full+json"
    },
    params: {
      state: "all",
      labels: "gib@blog",
      sort: "created",
      direction: "desc",
      page
    }
  });
}

export function issue(number) {
  return github.get(`issues/${number}`, {
    headers: {
      Accept: "application/vnd.github.squirrel-girl-preview.html+json"
    }
  });
}
