document.addEventListener("DOMContentLoaded", function() {
  const projectsContainer = document.getElementById("projects-container");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const fillerHeading = document.getElementById("not-found");
  let startIndex = 0;
  let projectsData = [];

  fetch("static/js/projects.json")
    .then(response => response.json())
    .then(data => {
      projectsData = shuffleArray(data.projects); // Shuffle the projects array
      renderProjects(startIndex);
    })
    .catch(error => console.error('Error fetching projects:', error));

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function renderProjects(startIndex) {
    projectsContainer.innerHTML = '';
    for (let i = startIndex; i < Math.min(startIndex + 4, projectsData.length); i += 2) {
      const project1 = projectsData[i];
      const project2 = projectsData[i + 1];
      if (project1 && project2) {
        projectsContainer.innerHTML += `
          <div class="project-section">
            <div class="project-info">
              <h1><a href="${project1.link}">${project1.title}</a></h1>
              <p>${project1.description}</p>
            </div>
            <div class="project-info">
              <h1><a href="${project2.link}">${project2.title}</a></h1>
              <p>${project2.description}</p>
            </div>
          </div>
        `;
      }
    }
    // Show filler heading if there are no projects
    if (projectsData.length === 0 || startIndex >= projectsData.length) {
      fillerHeading.style.display = 'block';
    } else {
      fillerHeading.style.display = 'none';
    }
  }

  prevBtn.addEventListener("click", function() {
    if (startIndex > 0) {
      startIndex -= 4; // Move back four projects
      renderProjects(startIndex);
    }
  });

  nextBtn.addEventListener("click", function() {
    if (startIndex < projectsData.length - 4) {
      startIndex += 4; // Move forward four projects
      renderProjects(startIndex);
    }
  });
}); 