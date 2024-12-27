document.addEventListener('DOMContentLoaded', function() {
    var lastScrollTop = 0;
    var navbar = document.querySelector('nav');

    window.addEventListener('scroll', function() {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop) {
            // Scroll down
            navbar.style.top = '-60px';
        } else {
            // Scroll up
            navbar.style.top = '0';
        }

        lastScrollTop = scrollTop;
    });
});
