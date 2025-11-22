// Team data and functionality
document.addEventListener('DOMContentLoaded', function() {
    const teamGrid = document.getElementById('teamGrid');
    const totalMembers = document.getElementById('totalMembers');
    const completedProjects = document.getElementById('completedProjects');
    const experienceYears = document.getElementById('experienceYears');
    const technologies = document.getElementById('technologies');
    
    // Sample team data - você deve atualizar com as informações reais
    const teamData = [
        {
            name: "Seu Nome",
            rm: "RM12345",
            turma: "1TDSPX",
            linkedin: "https://linkedin.com/in/seunome",
            github: "https://github.com/seunome",
            photo: "https://via.placeholder.com/150"
        },
        {
            name: "Membro 2",
            rm: "RM67890", 
            turma: "1TDSPX",
            linkedin: "https://linkedin.com/in/membro2",
            github: "https://github.com/membro2",
            photo: "https://via.placeholder.com/150"
        }
        // Adicione mais membros conforme necessário
    ];
    
    function loadTeamData() {
        // Remove loading indicator
        teamGrid.innerHTML = '';
        
        // Add team members
        teamData.forEach(member => {
            const memberElement = document.createElement('div');
            memberElement.className = 'team-member';
            memberElement.innerHTML = `
                <img src="${member.photo}" alt="${member.name}" class="member-photo">
                <div class="member-info">
                    <h3>${member.name}</h3>
                    <p class="member-rm">RM: ${member.rm}</p>
                    <p class="member-turma">Turma: ${member.turma}</p>
                    <div class="member-links">
                        <a href="${member.linkedin}" target="_blank" class="member-link">LinkedIn</a>
                        <a href="${member.github}" target="_blank" class="member-link">GitHub</a>
                    </div>
                </div>
            `;
            teamGrid.appendChild(memberElement);
        });
        
        // Update stats
        updateStats();
    }
    
    function updateStats() {
        // Animate counters
        animateCounter(totalMembers, teamData.length);
        animateCounter(completedProjects, 12); // Exemplo
        animateCounter(experienceYears, 3); // Exemplo
        animateCounter(technologies, 8); // Exemplo
    }
    
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 30);
    }
    
    // Load team data after a short delay to simulate loading
    setTimeout(loadTeamData, 1000);
});