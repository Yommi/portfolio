let theme = localStorage.getItem('theme')

if(theme == null){
	setTheme('light')
}else{
	setTheme(theme)
}

let themeDots = document.getElementsByClassName('theme-dot')

for(var i=0; themeDots.length > i; i++) {
    themeDots[i].addEventListener('click', function(){
        let mode = this.dataset.mode
        console.log('Option clicked:', mode)
		setTheme(mode)
    })
}

function setTheme(mode){
	if(mode == 'light'){
		document.getElementById('theme-style').href = 'default.css'
	}

	if(mode == 'blue'){
		document.getElementById('theme-style').href = 'blue.css'
	}

	if(mode == 'green'){
		document.getElementById('theme-style').href = 'green.css'
	}

	if(mode == 'purple'){
		document.getElementById('theme-style').href = 'purple.css'
	}

	localStorage.setItem('theme', mode)
}

// Fetch the JSON data
fetch('projects.json')
  .then(response => response.json())
  .then(data => {
    const postWrapper = document.querySelector('.post-wrapper');

    // Loop through each project in the JSON data
    data.projects.forEach(project => {
      const post = document.createElement('div');
      post.classList.add('post');

      // Create post image
      const img = document.createElement('img');
      img.classList.add('thumbnail');
      img.src = project.image || 'default-image.jpg';  // Fallback image if not available
      post.appendChild(img);

      // Create post preview
      const postPreview = document.createElement('div');
      postPreview.classList.add('post-preview');

      // Title
      const title = document.createElement('h6');
      title.classList.add('post-title');
      title.textContent = project.title;
      postPreview.appendChild(title);

      // Intro
      const intro = document.createElement('p');
      intro.classList.add('post-intro');
      intro.textContent = project.intro || 'Project description not available.';
      postPreview.appendChild(intro);

      // Create technologies
      const technologies = document.createElement('div');
      technologies.classList.add('technologies');
      project.technologies.forEach(tech => {
        const techSpan = document.createElement('span');
        techSpan.classList.add('tech-card', tech.spanClass);
        techSpan.textContent = tech.name;
        technologies.appendChild(techSpan);
      });

      postPreview.appendChild(technologies);

      // Link to project
      const link = document.createElement('a');
      link.target = '_blank';
      link.href = project.link || '#';  // Fallback link if not provided
      link.textContent = 'View project';
      postPreview.appendChild(link);

      post.appendChild(postPreview);

      postWrapper.appendChild(post);
    });
  })
  .catch(error => console.error('Error loading JSON:', error));
