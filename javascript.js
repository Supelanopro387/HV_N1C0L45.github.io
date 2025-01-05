const toggleButton = document.getElementById('darkModeToggle');
const body = document.body;
const accordions = document.querySelectorAll('.accordion, .accordion-header, .accordion-button, .accordion-body'); // Selecciona los acordeones

// Verificar si ya hay un modo guardado en localStorage
if (localStorage.getItem('darkMode') === 'enabled') {
    body.classList.add('dark-mode');
    toggleButton.innerHTML = '<i class="bi bi-sun-fill"></i>'; // Sol cuando está en modo oscuro
    accordions.forEach((accordion) => {
        accordion.classList.add('dark-mode');
    });
}

// Alternar el modo oscuro
toggleButton.addEventListener('click', () => {
    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        accordions.forEach((accordion) => {
            accordion.classList.remove('dark-mode');
        });
        localStorage.setItem('darkMode', 'disabled');
        toggleButton.innerHTML = '<i class="bi bi-moon"></i>'; // Luna cuando está en modo claro
    } else {
        body.classList.add('dark-mode');
        accordions.forEach((accordion) => {
            accordion.classList.add('dark-mode');
        });
        localStorage.setItem('darkMode', 'enabled');
        toggleButton.innerHTML = '<i class="bi bi-sun-fill"></i>'; // Sol cuando está en modo oscuro
    }
});
