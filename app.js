const app = document.querySelector("#app");
let issues = [
    {
      id: 1,
      title: "Button focus ring",
      status: "Open",
      priority: "High",
      assignee: "Ria",
    },
    {
      id: 2,
      title: "Mobile spacing",
      status: "In progress",
      priority: "Medium",
      assignee: "Omar",
    },
    {
      id: 3,
      title: "Copy review",
      status: "Open",
      priority: "Low",
      assignee: "Ria",
    },
  ],
  status = "all",
  priority = "all";
function render() {
  const view = issues
    .filter(
      (i) =>
        (status === "all" || i.status === status) &&
        (priority === "all" || i.priority === priority),
    )
    // Order priorities by severity instead of alphabetically.
    .sort(
      (a, b) =>
        ["High", "Medium", "Low"].indexOf(a.priority) -
        ["High", "Medium", "Low"].indexOf(b.priority),
    );
  // Keep the visible filter selections in sync with the active filter state.
  app.innerHTML = `<div class="row space"><div><span class="label">Triage queue</span><h2>${view.length} issues</h2></div><div class="row"><select id="status"><option value="all" ${status === "all" ? "selected" : ""}>All status</option><option ${status === "Open" ? "selected" : ""}>Open</option><option ${status === "In progress" ? "selected" : ""}>In progress</option><option ${status === "Closed" ? "selected" : ""}>Closed</option></select><select id="priority"><option value="all" ${priority === "all" ? "selected" : ""}>All priority</option><option ${priority === "High" ? "selected" : ""}>High</option><option ${priority === "Medium" ? "selected" : ""}>Medium</option><option ${priority === "Low" ? "selected" : ""}>Low</option></select></div></div><div class="list">${view.map((i) => `<article class="item"><div><strong>${i.title}</strong><span class="muted small">${i.assignee} · ${i.priority}</span></div><select data-status="${i.id}"><option ${i.status === "Open" ? "selected" : ""}>Open</option><option ${i.status === "In progress" ? "selected" : ""}>In progress</option><option ${i.status === "Closed" ? "selected" : ""}>Closed</option></select></article>`).join("")}</div>`;
  document.querySelector("#status").onchange = (e) => {
    status = e.target.value;
    render();
  };
  document.querySelector("#priority").onchange = (e) => {
    priority = e.target.value;
    render();
  };
  document.querySelectorAll("[data-status]").forEach(
    (s) =>
      (s.onchange = () => {
        issues = issues.map((i) =>
          i.id === Number(s.dataset.status)
            // Changing workflow status must preserve the issue's assignment.
            ? { ...i, status: s.value }
            : i,
        );
        render();
      }),
  );
}
render();
