function copyLink(link) {
  navigator.clipboard.writeText(link);

  alert(link + " is naar je klembord gekopieerd.");
}

document.addEventListener("DOMContentLoaded", function () {
  const now = new Date();
  const schedule = document.getElementsByClassName("schedule")[0];
  let next = false;
  for (const child of schedule.children) {
    const date = new Date(child.id);
    if (date < now) {
      child.classList.remove("upcoming");
      child.classList.add("past");
    } else {
      if (!next) {
        child.classList.add("next");
        next = true;
      }
    }
  }
});
