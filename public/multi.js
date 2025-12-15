let entries = JSON.parse(
  localStorage.getItem("availabilityEntries") || "[]"
);

const entriesList = document.getElementById("entries-list");
const submitButton = document.getElementById("submit-form");


function updateSubmitState() {
  submitButton.disabled = entries.length === 0;
}

function renderEntries() {
  entriesList.innerHTML = "";

  if (entries.length === 0) {
    entriesList.innerHTML = "<li>Ingen tidspunkter lagt til ennå</li>";
    updateSubmitState();
    return;
  }

  entries.forEach((e, index) => {
    const li = document.createElement("li");
    li.textContent = `${e.date} – ${e.timeStart} til ${e.timeEnd}${
      e.message ? ` (${e.message})` : ""
    }`;

    const btn = document.createElement("button");
    btn.textContent = "×";
    btn.type = "button";
    btn.classList.add("delete-entry");

    btn.addEventListener("click", () => {
      entries.splice(index, 1);
      localStorage.setItem("availabilityEntries", JSON.stringify(entries));
      renderEntries();
    });

    li.appendChild(btn);
    entriesList.appendChild(li);
  });

  updateSubmitState();
}

// Initial render
renderEntries();

document.getElementById("add-entry").addEventListener("click", () => {
  const entry = {
    date: document.getElementById("date").value,
    timeStart: document.getElementById("time_start").value,
    timeEnd: document.getElementById("time_end").value,
    message: document.getElementById("message").value,
  };

  if (!entry.date || !entry.timeStart || !entry.timeEnd) {
    alert("Fyll ut dato og tidsrom før du legger til.");
    return;
  }

  entries.push(entry);
  localStorage.setItem("availabilityEntries", JSON.stringify(entries));

  // Clear only time-related fields
  document.getElementById("date").value = "";
  document.getElementById("time_start").value = "";
  document.getElementById("time_end").value = "";
  document.getElementById("message").value = "";

  renderEntries();
});
