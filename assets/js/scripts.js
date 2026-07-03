function copyLink(link) {
  navigator.clipboard.writeText(link);

  alert(link + " is naar je klembord gekopieerd.");
}

document.addEventListener("DOMContentLoaded", function () {
  const schedule = document.getElementsByClassName("schedule")[0];
  if (!schedule) return;

  const now = new Date().toISOString().split("T")[0];
  let next = false;
  for (const child of schedule.children) {
    const date = child.id;
    if (date < now) {
      child.classList.remove("upcoming");
      child.classList.add("past");
    } else {
      if (!next) {
        const nextLink = document.getElementById("next-training-link");
        nextLink.href = nextLink.href.replace("#next", "#" + date);
        next = true;
      }
    }
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const trainers = document.querySelectorAll(".grid.trainers")[0];
  if (!trainers) return;

  const now = new Date().toISOString().split("T")[0];
  for (const trainer of trainers.children) {
    for (const training of trainer.querySelectorAll("tr")) {
      if (training.classList.contains("empty")) continue;
      const date = training.getAttribute("data-date");
      if (date < now) {
        training.remove();
      }
    }

    if (trainer.querySelectorAll("tr").length === 0) {
      trainer.querySelector("table").innerHTML = '<tr class="empty"><td colspan="3">geen trainingen</td></tr>';
    }
  }
});
