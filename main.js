document.addEventListener('DOMContentLoaded', function () {

    var reveals = document.querySelectorAll('.reveal');

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -60px 0px'
    });

    reveals.forEach(function (el) {
        observer.observe(el);
    });

    var navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            var href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                var target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    var images = document.querySelectorAll('.artist-img');
    images.forEach(function (img) {
        var wrapper = img.parentElement;
        wrapper.addEventListener('mousemove', function (e) {
            var rect = wrapper.getBoundingClientRect();
            var x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
            var y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
            img.style.transform = 'scale(1.06) translate(' + x + 'px, ' + y + 'px)';
        });
        wrapper.addEventListener('mouseleave', function () {
            img.style.transform = 'scale(1)';
        });
    });

    var cards = document.querySelectorAll('.artist-card');
    var cardObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var children = entry.target.querySelectorAll('.artist-genre, .artist-name, .artist-bio, .artist-album');
                children.forEach(function (child, i) {
                    child.style.opacity = '0';
                    child.style.transform = 'translateY(18px)';
                    child.style.transition = 'opacity 0.6s ease ' + (i * 0.1) + 's, transform 0.6s ease ' + (i * 0.1) + 's';
                    setTimeout(function () {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, 50);
                });
                cardObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    cards.forEach(function (card) {
        cardObserver.observe(card);
    });
});
