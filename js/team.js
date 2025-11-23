document.addEventListener('DOMContentLoaded', function() {
    const teamGrid = document.getElementById('teamGrid');
    const totalMembers = document.getElementById('totalMembers');
    const completedProjects = document.getElementById('completedProjects');
    const experienceYears = document.getElementById('experienceYears');
    const technologies = document.getElementById('technologies');
 
    const teamData = [
        {
            name: "Matheus Maciel",
            rm: "567753",
            turma: "1TDSPB",
            linkedin: "https://www.linkedin.com/in/matheus-carneiro-maciel/",
            github: "https://github.com/kakarneiro",
            photo: "../img/matheus.jpeg"
        },
        {
            name: "Guilherme Leopoldino",
            rm: "567242",
            turma: "1TDSPB",
            linkedin: "https://linkedin.com/in/membro2",
            github: "https://github.com/GuiDSLeopoldino",
            photo: "../img/guilherme.jpeg"
        },
        {
            name: "Lucas Cunha Maia",
            rm: "5667242",
            turma: "1TDSPB",
            linkedin: "https://linkedin.com/in/membro2",
            github: "https://github.com/membro2",
            photo: "../img/lucas.jpg"
        }
 
    ];
   
    function loadTeamData() {
     
        teamGrid.innerHTML = '';
       
     
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
       
     
        updateStats();
    }
   
    function updateStats() {
     
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
   
 
    setTimeout(loadTeamData, 1000);
});