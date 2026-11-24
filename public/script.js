// stop the form and show an alert if the input box is empty
const forms = [document.getElementById("addForm"), document.getElementById("editForm")];

forms.forEach(function (form) {
  if (!form) return;

  form.addEventListener("submit", function (e) {
    const input = form.querySelector("input[name='text']");
    if (input.value.trim() === "") {
      e.preventDefault();
      alert("Please type a task first.");
      input.focus();
    }
  });
});
