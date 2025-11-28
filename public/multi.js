let entries = JSON.parse(
        localStorage.getItem("availabilityEntries") || "[]"
      );

      function renderEntries() {
        const list = document.getElementById("entries-list");
        list.innerHTML = "";

        entries.forEach((e, index) => {
          const li = document.createElement("li");
          li.textContent = `${index + 1}. ${e.date} – ${e.timeStart} til ${
            e.timeEnd
          } (${e.message || "ingen notat"})`;

          const btn = document.createElement("button");
          btn.textContent = "×"; // Just an X now
          btn.type = "button";
          btn.classList.add("delete-entry");
          btn.addEventListener("click", () => {
            entries.splice(index, 1);
            localStorage.setItem(
              "availabilityEntries",
              JSON.stringify(entries)
            );
            renderEntries();
          });

          li.appendChild(btn);
          list.appendChild(li);
        });
      }

      // Render existing entries at page load
      renderEntries();

      document.getElementById("add-entry").addEventListener("click", () => {
        const entry = {
          name: document.getElementById("name").value,
          date: document.getElementById("date").value,
          timeStart: document.getElementById("time-start").value,
          timeEnd: document.getElementById("time-end").value,
          message: document.getElementById("message").value,
        };

        if (!entry.name || !entry.date || !entry.timeStart || !entry.timeEnd) {
          alert("Vennligst fyll ut alle nødvendige felter før du legger til.");
          return;
        }

        entries.push(entry);
        localStorage.setItem("availabilityEntries", JSON.stringify(entries));

        // Clear only fields related to date/time
        document.getElementById("date").value = "";
        document.getElementById("time-start").value = "";
        document.getElementById("time-end").value = "";
        document.getElementById("message").value = "";

        alert("Tidspunkt lagt til!");
        renderEntries();
      });

      document.getElementById("submit-form").addEventListener("click", () => {
        if (entries.length === 0) {
          alert("Du må legge til minst ett tidspunkt før du sender inn.");
          return;
        }

        const formatted = entries
          .map(
            (e, i) =>
              `#${i + 1}\nNavn: ${e.name}\nDato: ${e.date}\nFra: ${
                e.timeStart
              }\nTil: ${e.timeEnd}\nNotat: ${e.message || "-"}`
          )
          .join("\n\n");

        document.getElementById("all-entries").value = formatted;
        localStorage.removeItem("availabilityEntries");
      });