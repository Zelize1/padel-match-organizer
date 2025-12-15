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
  // Reset the form fields when the page loads
  document.getElementById("form").reset();
};


const form = document.querySelector("#form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const submitButton = document.querySelector("#submit-form");
  submitButton.disabled = true;
  submitButton.textContent = "Sender...";

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: new FormData(form),
    });

    const data = await response.json();

    if (data.success) {
      window.location.href = "/public/submitted.html";
    } else {
      alert("Noe gikk galt. Prøv igjen.");
      submitButton.disabled = false;
      submitButton.textContent = "Send inn tidspunkt";
    }
  } catch (error) {
    alert("Kunne ikke sende skjemaet. Sjekk nettverket.");
    submitButton.disabled = false;
    submitButton.textContent = "Send inn tidspunkt";
  }
});

