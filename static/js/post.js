document.addEventListener('DOMContentLoaded', function() {
    const blogPost = document.getElementById('blog-post');

    function displayBlogPost() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const post = urlParams.get('post');

        if (!post) {
            console.error('No post specified.');
            return;
        }

        const filename = post.split('/').pop();
        document.title = "Blog: " + filename.replace('.md', '');

        fetch('blogs/' + post)
            .then(response => response.text())
            .then(markdown => {
                const converter = new showdown.Converter();
                const html = converter.makeHtml(markdown);

                blogPost.innerHTML = html;
            })
            .catch(error => {
                console.error('Error fetching blog post:', error);
            });
    }

    displayBlogPost();
});
