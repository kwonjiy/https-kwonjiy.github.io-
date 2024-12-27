document.addEventListener('DOMContentLoaded', function() {
    const currentPath = window.location.pathname;
    const buttons = document.querySelectorAll('.main-buttons button');
    
    buttons.forEach(button => {
        const buttonPath = button.getAttribute('onclick').match(/'([^']+)'/)[1];
        if (currentPath === buttonPath) {
            button.classList.add('active');
        }
    });
});
