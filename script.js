document.addEventListener('DOMContentLoaded', () => {

    
    document.querySelectorAll('.year').forEach(el => {
        el.textContent = new Date().getFullYear();
    });


    
    const menuButton = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');

    if (menuButton && nav) {
        menuButton.addEventListener('click', () => {
            const opened = nav.classList.toggle('open');

            menuButton.setAttribute(
                'aria-expanded',
                String(opened)
            );
        });
    }


    
    const search = document.getElementById('productSearch');

    const cards = [
        ...document.querySelectorAll('.catalog-card')
    ];

    const filterButtons = [
        ...document.querySelectorAll('.filter-btn')
    ];

    let category = 'all';

    function filterProducts() {
        if (!cards.length) {
            return;
        }

        const query = (search?.value || '')
            .trim()
            .toLowerCase();

        let visible = 0;

        cards.forEach(card => {
            const matchesCategory =
                category === 'all' ||
                card.dataset.category === category;

            const matchesText = card.textContent
                .toLowerCase()
                .includes(query);

            const show = matchesCategory && matchesText;

            card.classList.toggle('hidden', !show);

            if (show) {
                visible++;
            }
        });

        const noResults = document.querySelector('.no-results');

        if (noResults) {
            noResults.hidden = visible !== 0;
        }
    }

    search?.addEventListener('input', filterProducts);

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            category = button.dataset.filter;

            filterButtons.forEach(btn => {
                btn.classList.toggle('active', btn === button);
            });

            filterProducts();
        });
    });


    
    const lightbox = document.getElementById('lightbox');

    if (lightbox) {
        const bigImage = lightbox.querySelector('img');

        document.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('click', () => {
                bigImage.src = item.dataset.full;

                bigImage.alt = item.querySelector('img').alt;

                lightbox.classList.add('open');

                lightbox.setAttribute('aria-hidden', 'false');
            });
        });

        const close = () => {
            lightbox.classList.remove('open');

            lightbox.setAttribute('aria-hidden', 'true');

            bigImage.src = '';
        };

        const closeButton = lightbox.querySelector('.lightbox-close');

        if (closeButton) {
            closeButton.addEventListener('click', close);
        }

        lightbox.addEventListener('click', event => {
            if (event.target === lightbox) {
                close();
            }
        });

        document.addEventListener('keydown', event => {
            if (event.key === 'Escape') {
                close();
            }
        });
    }


    
    const params = new URLSearchParams(location.search);

    const product = params.get('product');

    const interest = document.getElementById('interest');

    if (product && interest) {

        const matchedOption = [
            ...interest.options
        ].find(option => {
            return option.text.toLowerCase() === product.toLowerCase();
        });

        if (matchedOption) {
            interest.value = matchedOption.value;
        }

        const messageField = document.querySelector('[name="message"]');

        if (messageField) {
            messageField.value =
                `Hello, I would like to ask about ${product}. ` +
                'Please share the current price and availability.';
        }
    }


   
    const form = document.getElementById('contactForm');

    form?.addEventListener('submit', event => {
        event.preventDefault();

        const data = new FormData(form);

        const body =
            `Hello Del's Home Essentials,\n\n` +
            `My name is ${data.get('name')}.\n` +
            `Email: ${data.get('email')}\n` +
            `Product: ${data.get('interest')}\n\n` +
            `Message:\n${data.get('message')}\n\n` +
            `Thank you.`;

        const message = document.getElementById('formMessage');

        if (!message) {
            return;
        }

        message.textContent =
            'Your inquiry has been prepared. This demo does not ' +
            'send it automatically. You can copy the message below ' +
            'and send it through the shop’s actual contact channel.';

        message.hidden = false;

        let preview = document.getElementById('messagePreview');

        if (!preview) {
            preview = document.createElement('textarea');

            preview.id = 'messagePreview';
            preview.readOnly = true;
            preview.rows = 7;
            preview.className = 'message-preview';

            message.insertAdjacentElement('afterend', preview);
        }

        preview.value = body;

        preview.focus();
        preview.select();
    });

});