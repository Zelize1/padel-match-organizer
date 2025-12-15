function openTab(evt, tabName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

document.getElementById("defaultOpen").click();

const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.textContent = isOpen ? '✖' : '☰';
  hamburger.classList.toggle('open', isOpen); // <-- NEW
  hamburger.blur();
});

mobileMenu.querySelectorAll('button').forEach(btn => {
  btn.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.textContent = '☰';
    hamburger.classList.remove('open'); // <-- reset color
    hamburger.blur();
  });
});

window.onload = function () {
  document.getElementById("date").value = "";
  document.getElementById("time-start").value = "";
  document.getElementById("time-end").value = "";
  document.getElementById("message").value = "";
};



const form = document.querySelector("#form");
const allEntriesInput = document.getElementById("all-entries");


form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const submitButton = document.querySelector("#submit-form");

  const name = document.getElementById("name").value.trim();

  if (!name) {
    alert("Vennligst fyll inn navn før innsending.");
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = "Sender...";
  let entriesToSend = [];

  if (typeof entries !== "undefined" && entries.length > 0) {
    entriesToSend = entries;
  } else {
    entriesToSend = [
      {
        date: document.getElementById("date").value,
        timeStart: document.getElementById("time-start").value,
        timeEnd: document.getElementById("time-end").value,
        message: document.getElementById("message").value,
      },
    ];
  }

  const formattedEntries = `
Navn: ${name}

${entriesToSend
      .map(
        (e, i) =>
          `Tidspunkt ${i + 1}
Dato: ${e.date}
Fra: ${e.timeStart}
Til: ${e.timeEnd}
Notat: ${e.message || "-"}`
      )
      .join("\n\n")}
`;


  allEntriesInput.value = formattedEntries;
  localStorage.removeItem("availabilityEntries");

  const formData = new FormData(form);

  document.getElementById("date").value = "";
  document.getElementById("time-start").value = "";
  document.getElementById("time-end").value = "";
  document.getElementById("message").value = "";

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });


    const data = await response.json();

    if (data.success) {
      window.location.href = "/public/submitted.html";
    } else {
      throw new Error("Submission failed");
    }
  } catch (error) {
    alert("Kunne ikke sende skjemaet. Prøv igjen.");
    submitButton.disabled = false;
    submitButton.textContent = "Send inn alle tidspunkter";
  }
});


