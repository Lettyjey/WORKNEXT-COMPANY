console.log(JSON.parse(localStorage.getItem('projects')));

document.getElementById("loginForm").onsubmit = function(e) {
    e.preventDefault(); // Impede o envio do formulário
    // Aqui você pode adicionar a lógica de autenticação se necessário
    document.getElementById("loginScreen").style.display = "none";
    document.getElementById("mainScreen").style.display = "block";
};

document.getElementById("createProjectBtn").onclick = function() {
    document.getElementById("mainScreen").style.display = "none";
    document.getElementById("createProject").style.display = "block";
};

document.getElementById("backToMain").onclick = function() {
    document.getElementById("createProject").style.display = "none";
    document.getElementById("mainScreen").style.display = "block";
};

document.getElementById("register").onclick = function() {
    document.getElementById("loginScreen").style.display = "none";
    document.getElementById("registerScreen").style.display = "block";
};

document.getElementById("backToLogin").onclick = function() {
    document.getElementById("registerScreen").style.display = "none";
    document.getElementById("loginScreen").style.display = "block";
};

function openCreateProjectModal() {
    // Lógica para exibir o formulário ou modal de criação de projeto
    document.getElementById('createProjectModal').style.display = 'block';
}

function updateProjectsList() {
    const projectsContainer = document.getElementById('projetos-andamento-list');
    projectsContainer.innerHTML = '<h3>Projetos em Andamento</h3>';
    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    const ongoingProjects = projects.filter(project => !project.completed);

    if (ongoingProjects.length === 0) {
        projectsContainer.innerHTML += '<p>Nenhum projeto em andamento.</p>';
    } else {
        ongoingProjects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.classList.add('project-card');
            projectCard.innerHTML = `
                <h4>${project.name}</h4>
                <p>Data: ${project.date}</p>
                <p>Documentos: ${project.documents}</p>
                <p>Equipes: ${project.teams.join(', ')}</p> <!-- Exibe as equipes selecionadas -->
                <div class="project-actions">
                    <button onclick="viewProject('${project.name}')">Visualizar</button>
                    <button onclick="editProject('${project.name}')">Editar</button>
                    <button onclick="deleteProject('${project.name}')">Excluir</button>
                    <button onclick="completeProject('${project.name}')">Concluir</button>
                </div>
            `;
            projectsContainer.appendChild(projectCard);
        });
    }
}

function logout() {
    // Limpa os dados da sessão do usuário
    localStorage.removeItem('currentUser ');
    alert('Você foi desconectado com sucesso.');
    // Redireciona para a tela de login
    document.querySelector('.main-container').classList.add('hidden');
    document.querySelector('.login-container').classList.remove('hidden');
}

// Função para criar um novo projeto
function createProject() {
    const projectName = document.getElementById('project-name').value;
    const projectDate = document.getElementById('project-date').value;
    const projectDocuments = document.getElementById('project-documents').value;
    const teamNames = Array.from(document.getElementById('team-select').selectedOptions).map(option => option.value);

    if (projectName && projectDate && projectDocuments && teamNames.length > 0) {
        const projects = JSON.parse(localStorage.getItem('projects')) || [];
        projects.push({
            name: projectName,
            date: projectDate,
            documents: projectDocuments,
            teams: teamNames,
            completed: false // Define como false para que apareça em "Projetos em Andamento"
        });
        localStorage.setItem('projects', JSON.stringify(projects));

        alert(`Projeto "${projectName}" criado com sucesso!`);
        updateProjectsList(); // Atualiza a lista de projetos em andamento

        // Limpa os campos
        document.getElementById('project-name').value = '';
        document.getElementById('project-date').value = '';
        document.getElementById('project-documents').value = '';
        document.getElementById('team-select').selectedIndex = -1; // Limpa a seleção
        goToMain(); // Volta para a tela principal
    } else {
        alert('Por favor, preencha todos os campos obrigatórios.');
    }
}
function updateProjectsList() {
    const projectsContainer = document.getElementById('projetos-andamento-list');
    projectsContainer.innerHTML = '<h3>Projetos em Andamento</h3>'; // Clear previous content
    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    const ongoingProjects = projects.filter(project => !project.completed); // Filter for ongoing projects

    if (ongoingProjects.length === 0) {
        projectsContainer.innerHTML += '<p>Nenhum projeto em andamento.</p>';
    } else {
        ongoingProjects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.classList.add('project-card');
            projectCard.innerHTML = `
                <h4>${project.name}</h4>
                <p>Data: ${project.date}</p>
                <p>Documentos: ${project.documents}</p>
                <p>Equipes: ${project.teams.join(', ')}</p>
                <div class="project-actions">
                    <button onclick="viewProject('${project.name}')">Visualizar</button>
                    <button onclick="editProject('${project.name}')">Editar</button>
                    <button onclick="deleteProject('${project.name}')">Excluir</button>
                    <button onclick="completeProject('${project.name}')">Concluir</button>
                </div>
            `;
            projectsContainer.appendChild(projectCard);
        });
    }
}