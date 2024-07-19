$(document).ready(function () {
    let bookIndex = 0;
    const loadBooks = (count = 4) => {
        $.ajax({
            url: './books.json',
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                const books = data.slice(bookIndex, bookIndex + count);
                books.forEach(book => {
                    $('#books-list').append(`
                        <div class="book">
                            <img src="${book.image}" alt="${book.title} cover">
                            <h3>${book.title}</h3>
                            <p>${book.author}</p>
                            <p>${book.description}</p>
                        </div>
                    `);
                });
                bookIndex += count;
            }
        });
    };
    loadBooks();

    // Load more books on button click
    $('#load-more').click(function () {
        loadBooks();
    });

    // Search functionality
    $('#search').on('input', function () {
        const query = $(this).val().toLowerCase();
        $('.book').each(function () {
            const title = $(this).find('h3').text().toLowerCase();
            if (title.includes(query)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });
});
