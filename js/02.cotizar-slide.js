function openSidebar() {
    document.getElementById('sidebarOverlay').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeSidebar() {
    const sidebar = document.getElementById('sidebarOverlay');
    sidebar.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Close sidebar on ESC key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeSidebar();
    }
});


/* =========================
   BOTONES COTIZACIÓN
========================= */

document.querySelectorAll('.btn-cotizar').forEach(button => {
    button.addEventListener('click', function () {

        const card = this.closest('.card-hover');
        const nombre = card.querySelector('.nombre-producto').textContent.trim();

        document.getElementById('nombre_equipo').textContent = nombre;

        openSidebar();
    });
});
