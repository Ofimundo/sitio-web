function nextStep() {
    document.getElementById("step-1").classList.add("hidden");
    document.getElementById("step-2").classList.remove("hidden");
}

function prevStep() {
    document.getElementById("step-2").classList.add("hidden");
    document.getElementById("step-1").classList.remove("hidden");
}

function resetForm() {
    document.querySelectorAll("input, textarea").forEach(el => el.value = "");
}

function submitForm() {
    alert("Formulario enviado");
    // aquí puedes conectar con backend o email
}