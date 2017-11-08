const token = getToken();
const userName = 'Meeekks'
const baseApi = 'https://api.github.com/'

function getToken() {
  return 'f19a76dfe60ce4b469e1a5e9345c550386bad0af'
}

function forkRepo() {
  const repo = "learn-co-curriculum/javascript-fetch-lab"
  fetch(`${baseApi}repos/${repo}/forks`, {
    method: "post",
    headers: {
      Authorization: `token ${token}`
    }
  })
    .then(res => res.json())
    .then(json => showForkedRepo(json));
}

function showForkedRepo(json) {
  const results = document.querySelector("#results");
  const link = document.createElement("a");
  link.href = json.html_url;
  link.innerText = `Fork ${userName}'s Repository`;
  results.append(link);
}

function createIssue() {
  const repo = "/javascript-fetch-lab/issues"
  const issue = {
    title: document.querySelector("#title").value,
    body: document.querySelector("#body").value
  }
  fetch(`${baseApi}repos/${userName}${repo}`, {
    method: "post",
    headers: {
      Authorization: `token ${token}`
    },
    body: JSON.stringify(issue)
  })
    .then(res => res.json())
    .then(json => getIssues(json));
}

function getIssues(json) {
  const repo = "/javascript-fetch-lab/issues"
  fetch(`${baseApi}repos/${userName}${repo}`, {
    headers: {
      Authorization: `token ${token}`
    }
  })
    .then(res => res.json())
    .then(json => showIssues(json))
}

function showIssues(json) {
  const issues = document.getElementById("#issues");
  return json.forEach(function(issue) {
    const ul = document.createElement("ul");
    const li = document.createElement("li");
    li.innerText = issue.title;
    ul.append(li);
    return issues.append(ul);
  });
}
