document.addEventListener('DOMContentLoaded', function() {
    const blogPosts = document.getElementById('blog-posts');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentIndex = 0;
    let posts = [];

    fetch('blogs/posts.json')
        .then(response => response.json())
        .then(data => {
            posts = data;
            renderPost();
        })
        .catch(error => {
            console.error('Error fetching posts data:', error);
        });

    function renderPost() {
        const post = posts[currentIndex];
        if (!post) return;

        const fileName = post.markdownFile;
        const description = post.description;
        const imageURL = post.imageURL;
        const tag = post.tag;

        blogPosts.innerHTML = '';

        const link = document.createElement('a');
        link.href = 'post?post=' + encodeURIComponent(fileName);

        const card = document.createElement('div');
        card.classList.add('card');

        const cardHeader = document.createElement('div');
        cardHeader.classList.add('card-header');
        const image = document.createElement('img');
        image.src = imageURL;
        image.alt = 'Image for ' + fileName;
        cardHeader.appendChild(image);

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        const title = document.createElement('h2');
        title.textContent = fileName.replace('.md', '');
        const descriptionParagraph = document.createElement('p');
        descriptionParagraph.textContent = description;
        const tagElement = document.createElement('span');
        tagElement.classList.add('tag');
        tagElement.textContent = tag;

        cardBody.appendChild(title);
        cardBody.appendChild(descriptionParagraph);
        cardBody.appendChild(tagElement);

        card.appendChild(cardHeader);
        card.appendChild(cardBody);

        link.appendChild(card);

        blogPosts.appendChild(link);
    }

    prevBtn.addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex--;
            renderPost();
        }
    });

    nextBtn.addEventListener('click', function() {
        if (currentIndex < posts.length - 1) {
            currentIndex++;
            renderPost();
        }
    });
});
