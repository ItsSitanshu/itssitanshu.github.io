window.onload = function() {
    const imagesDir = 'static/images/gallery/';
    const galleryContainer = document.getElementById('galleryContainer');

    const imageNames = [
        '1.JPG', '2.PNG', '3.png', '4.PNG', '5.PNG', '6.PNG', '7.PNG', '8.png', '9.png', '10.png', '11.JPG', '12.JPG', '13.PNG', '14.JPG', '15.PNG', '16.JPG', '17.PNG', '18.JPG', '19.png', '20.png', '21.jpeg', '22.jpeg','23.jpeg','24.jpeg', '25.jpg', '26.jpeg', '27.jpeg', '28.jpeg','29.jpeg','30.jpeg', '31.jpeg', '32.jpeg','33.jpeg','34.jpeg', '35.jpeg'
    ];

    const shuffledImageNames = shuffleArray(imageNames);

    const imagePaths = shuffledImageNames.map(imageName => imagesDir + imageName);

    displayImages(imagePaths, galleryContainer);
};

function displayImages(imagePaths, container) {
    imagePaths.forEach(imagePath => {
        const imgElement = document.createElement('img');
        imgElement.src = imagePath;
        imgElement.classList.add('gallery-image');
        container.appendChild(imgElement);
    });
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
