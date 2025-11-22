// Estado do chatbot
const state = {
    currentTrilha: null,
    certificado: false,
    progresso: {
        programacao: 0,
        medicina: 0,
        engenharia: 0
    },
    simulationActive: false,
    userAnswer: '',
    librasActive: false,
    lastBotMessage: ''
};

// Perguntas para cada simulação
const simulationQuestions = {
    programacao: {
        title: "Simulação de Programação",
        subtitle: "Digite sua resposta usando o teclado abaixo",
        question: "Situação: você está criando um pequeno sistema que valida se uma palavra é um palíndromo. Pergunta: o que o código deve fazer primeiro?",
        options: [
            { letter: "A", text: "Verificar se a palavra está vazia" },
            { letter: "B", text: "Comparar as letras de trás pra frente" },
            { letter: "C", text: "Converter a palavra para maiúsculas" }
        ],
        correctAnswer: "B",
        keyboard: true
    },
    medicina: {
        title: "Simulação de Medicina",
        subtitle: "Selecione a opção correta",
        question: "Situação: um paciente chega com febre alta, dor de cabeça intensa, dores musculares e manchas vermelhas na pele. Pergunta: qual é o diagnóstico mais provável?",
        options: [
            { letter: "A", text: "Resfriado comum" },
            { letter: "B", text: "Dengue" },
            { letter: "C", text: "Alergia alimentar" }
        ],
        correctAnswer: "B",
        keyboard: false
    },
    engenharia: {
        title: "Simulação de Engenharia Elétrica",
        subtitle: "Selecione a opção correta",
        question: "Situação: você precisa dimensionar um disjuntor para um circuito de 220V com carga de 3500W. Pergunta: qual é a corrente elétrica aproximada que o disjuntor deve suportar?",
        options: [
            { letter: "A", text: "10A" },
            { letter: "B", text: "16A" },
            { letter: "C", text: "25A" }
        ],
        correctAnswer: "B",
        keyboard: false
    }
};

// Dicionário básico de sinais em Libras (simulado)
const librasDictionary = {
    "olá": "👋 Mover a mão na frente do corpo",
    "bom dia": "☀️ Mão plana da testa para frente",
    "boa tarde": "🌞 Mão plana do queixo para frente", 
    "boa noite": "🌙 Cruzar os braços no peito",
    "simulação": "🔄 Mãos circulares uma sobre a outra",
    "programação": "💻 Dedos batendo como em um teclado",
    "medicina": "🏥 Mão em forma de cruz no peito",
    "engenharia": "⚡ Mãos formando estruturas",
    "parabéns": "🎉 Palmas no ar",
    "certificado": "📜 Mão simulando assinatura",
    "trilha": "🛤️ Mão fazendo movimento de caminho",
    "aprender": "📚 Mão da testa para frente aberta",
    "progresso": "📈 Mão subindo verticalmente",
    "tecnologia": "🔧 Mãos formando engrenagens",
    "ajuda": "🤲 Mãos estendidas para frente",
    "resposta": "💭 Dedo na testa depois apontando",
    "correta": "✅ Polegar para cima",
    "errada": "❌ Braços cruzados em X"
};

// Elementos DOM
let chatMessages, userInput, sendButton, progressInfo, certificado;
let simulationScreen, simulationTitle, simulationSubtitle, simulationQuestion, simulationOptions;
let simulationKeyboard, answerInput, submitAnswer, congratulationsScreen, congratulationsMessage;
let continueButton, particlesContainer, lightningContainer, accessibilityButton, librasInterpreter;
let closeLibras, librasText, translateLibras, pauseLibras, simulationClose;

// Função para inicializar elementos DOM
function initializeDOMElements() {
    chatMessages = document.getElementById('chatMessages');
    userInput = document.getElementById('userInput');
    sendButton = document.getElementById('sendButton');
    progressInfo = document.getElementById('progress-info');
    certificado = document.getElementById('certificado');
    simulationScreen = document.getElementById('simulationScreen');
    simulationTitle = document.getElementById('simulationTitle');
    simulationSubtitle = document.getElementById('simulationSubtitle');
    simulationQuestion = document.getElementById('simulationQuestion');
    simulationOptions = document.getElementById('simulationOptions');
    simulationKeyboard = document.getElementById('simulationKeyboard');
    answerInput = document.getElementById('answerInput');
    submitAnswer = document.getElementById('submitAnswer');
    congratulationsScreen = document.getElementById('congratulationsScreen');
    congratulationsMessage = document.getElementById('congratulationsMessage');
    continueButton = document.getElementById('continueButton');
    particlesContainer = document.getElementById('particles');
    lightningContainer = document.getElementById('lightning');
    accessibilityButton = document.getElementById('accessibilityButton');
    librasInterpreter = document.getElementById('librasInterpreter');
    closeLibras = document.getElementById('closeLibras');
    librasText = document.getElementById('librasText');
    translateLibras = document.getElementById('translateLibras');
    pauseLibras = document.getElementById('pauseLibras');
    simulationClose = document.getElementById('simulationClose');
}

// Função para adicionar mensagem ao chat
function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Salvar última mensagem do bot para tradução em Libras
    if (sender === 'bot') {
        state.lastBotMessage = text;
    }
}

// Função para traduzir texto para descrição de sinais em Libras
function translateToLibras(text) {
    const words = text.toLowerCase().split(/\s+/);
    let librasTranslation = [];
    
    words.forEach(word => {
        // Remove emojis e pontuação
        const cleanWord = word.replace(/[^\wà-ú]/g, '');
        if (cleanWord && librasDictionary[cleanWord]) {
            librasTranslation.push(librasDictionary[cleanWord]);
        }
    });
    
    if (librasTranslation.length === 0) {
        return "🤔 Não foi possível traduzir esta mensagem para Libras. Tente uma mensagem mais simples.";
    }
    
    return librasTranslation.join(' | ');
}

// Função para ativar/desativar intérprete de Libras
function toggleLibras() {
    state.librasActive = !state.librasActive;
    
    if (state.librasActive) {
        accessibilityButton.classList.add('active');
        librasInterpreter.classList.add('active');
    } else {
        accessibilityButton.classList.remove('active');
        librasInterpreter.classList.remove('active');
    }
}

// Função para traduzir última mensagem para Libras
function translateLastMessage() {
    if (state.lastBotMessage) {
        const translation = translateToLibras(state.lastBotMessage);
        librasText.textContent = translation;
        
        // Animar as mãos do intérprete
        const hands = document.querySelectorAll('.hand');
        hands.forEach(hand => {
            hand.style.animation = 'none';
            setTimeout(() => {
                hand.style.animation = 'librasAnimation 3s infinite ease-in-out';
            }, 10);
        });
    } else {
        librasText.textContent = "Nenhuma mensagem do bot disponível para tradução.";
    }
}

// Criar partículas para efeito tecnológico
function createParticles() {
    particlesContainer.innerHTML = '';
    const particleCount = state.currentTrilha === 'programacao' ? 80 : 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.width = `${Math.random() * 6 + 2}px`;
        particle.style.height = particle.style.width;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 20}s`;
        particle.style.animationDuration = `${Math.random() * 15 + 10}s`;
        
        // Efeitos especiais por trilha
        if (state.currentTrilha === 'programacao') {
            // Partículas de código
            if (Math.random() > 0.7) {
                particle.textContent = ['{', '}', ';', '<', '>', '/', '='][Math.floor(Math.random() * 7)];
                particle.style.fontSize = '12px';
                particle.style.background = 'transparent';
                particle.style.color = 'var(--tech-blue)';
                particle.style.fontFamily = 'monospace';
                particle.style.display = 'flex';
                particle.style.alignItems = 'center';
                particle.style.justifyContent = 'center';
            }
        } else if (state.currentTrilha === 'medicina') {
            // Partículas médicas
            if (Math.random() > 0.8) {
                particle.textContent = ['❤️', '💊', '🩺', '🧬'][Math.floor(Math.random() * 4)];
                particle.style.background = 'transparent';
                particle.style.fontSize = '16px';
            }
        } else if (state.currentTrilha === 'engenharia') {
            // Partículas de engenharia
            if (Math.random() > 0.8) {
                particle.textContent = ['⚡', '🔧', '🔩', '💡'][Math.floor(Math.random() * 4)];
                particle.style.background = 'transparent';
                particle.style.fontSize = '16px';
            }
        }
        
        particlesContainer.appendChild(particle);
    }
}

// Criar efeito de raios personalizado por trilha
function createLightning() {
    lightningContainer.innerHTML = '';
    const boltCount = state.currentTrilha === 'engenharia' ? 8 : 5;
    
    for (let i = 0; i < boltCount; i++) {
        const bolt = document.createElement('div');
        bolt.className = 'lightning-bolt';
        
        // Posicionamento aleatório
        bolt.style.left = `${Math.random() * 100}%`;
        bolt.style.animationDelay = `${Math.random() * 3}s`;
        bolt.style.animationDuration = `${0.2 + Math.random() * 0.3}s`;
        
        // Estilo específico por trilha
        if (state.currentTrilha === 'programacao') {
            bolt.style.background = 'linear-gradient(90deg, transparent, var(--tech-blue), var(--tech-purple), transparent)';
            bolt.style.width = '3px';
            bolt.style.boxShadow = '0 0 20px var(--tech-blue)';
        } else if (state.currentTrilha === 'medicina') {
            bolt.style.background = 'linear-gradient(90deg, transparent, var(--med-green), var(--med-blue), transparent)';
            bolt.style.width = '4px';
            bolt.style.boxShadow = '0 0 20px var(--med-green)';
        } else if (state.currentTrilha === 'engenharia') {
            bolt.style.background = 'linear-gradient(90deg, transparent, var(--eng-orange), var(--eng-yellow), transparent)';
            bolt.style.width = '5px';
            bolt.style.boxShadow = '0 0 25px var(--eng-orange)';
        }
        
        lightningContainer.appendChild(bolt);
    }
}

// Iniciar modo simulação
function startSimulation(trilha) {
    state.simulationActive = true;
    state.currentTrilha = trilha;
    state.userAnswer = '';
    
    // Ocultar conteúdo principal e mostrar simulação em tela cheia
    document.body.classList.add('simulation-mode');
    
    // Configurar tema baseado na trilha
    simulationScreen.className = `simulation-screen ${trilha} active`;
    congratulationsScreen.className = `congratulations-screen ${trilha}`;
    
    // Carregar dados da simulação
    const simulationData = simulationQuestions[trilha];
    simulationTitle.textContent = simulationData.title;
    simulationSubtitle.textContent = simulationData.subtitle;
    simulationQuestion.textContent = simulationData.question;
    
    // Limpar opções anteriores
    simulationOptions.innerHTML = '';
    
    // Adicionar novas opções
    simulationData.options.forEach(option => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        optionDiv.setAttribute('data-option', option.letter);
        optionDiv.innerHTML = `
            <div class="option-letter">${option.letter}</div>
            <div class="option-text">${option.text}</div>
        `;
        simulationOptions.appendChild(optionDiv);
    });
    
    // Configurar teclado
    if (simulationData.keyboard) {
        simulationKeyboard.style.display = 'block';
        answerInput.placeholder = 'Digite A, B ou C usando o teclado...';
        createRealisticKeyboard();
    } else {
        simulationKeyboard.style.display = 'none';
        answerInput.placeholder = 'Selecione uma opção acima...';
    }
    
    // Limpar resposta anterior
    answerInput.value = '';
    
    // Mostrar tela de simulação
    createParticles();
    
    // Reconfigurar event listeners para as novas opções
    setupSimulationOptions();
}

// Criar teclado realista
function createRealisticKeyboard() {
    simulationKeyboard.innerHTML = '';
    
    const keyboardLayout = [
        ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
        ['H', 'I', 'J', 'K', 'L', 'M', 'N'],
        ['O', 'P', 'Q', 'R', 'S', 'T', 'U'],
        ['V', 'W', 'X', 'Y', 'Z', '⌫', '↵']
    ];
    
    keyboardLayout.forEach((row, rowIndex) => {
        const keyboardRow = document.createElement('div');
        keyboardRow.className = 'keyboard-row';
        
        row.forEach(key => {
            const keyElement = document.createElement('div');
            keyElement.className = 'key';
            keyElement.textContent = key;
            keyElement.setAttribute('data-key', key);
            
            // Estilização especial para teclas de função
            if (key === '⌫') {
                keyElement.classList.add('backspace');
                keyElement.style.background = 'rgba(244, 67, 54, 0.3)';
            } else if (key === '↵') {
                keyElement.classList.add('enter');
                keyElement.style.background = 'rgba(76, 175, 80, 0.3)';
            }
            
            // Efeito de pressionar tecla
            keyElement.addEventListener('mousedown', () => {
                keyElement.classList.add('pressed');
                playKeySound();
            });
            
            keyElement.addEventListener('mouseup', () => {
                keyElement.classList.remove('pressed');
            });
            
            keyElement.addEventListener('mouseleave', () => {
                keyElement.classList.remove('pressed');
            });
            
            keyboardRow.appendChild(keyElement);
        });
        
        simulationKeyboard.appendChild(keyboardRow);
    });
    
    setupSimulationKeyboard();
}

// Som de teclado (simulado)
function playKeySound() {
    // Em uma implementação real, você tocaria um arquivo de áudio
    console.log('key sound');
}

// Configurar opções de simulação
function setupSimulationOptions() {
    document.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', () => {
            // Remover seleção anterior
            document.querySelectorAll('.option').forEach(opt => {
                opt.classList.remove('selected');
            });
            
            // Selecionar nova opção
            option.classList.add('selected');
            state.userAnswer = option.getAttribute('data-option');
            answerInput.value = state.userAnswer;
        });
    });
}

// Finalizar simulação
function finishSimulation(success) {
    if (success) {
        // Atualizar progresso
        state.progresso[state.currentTrilha] = 100;
        state.certificado = true;
        updateProgressBars();
        updateProgressInfo();
        
        // Personalizar mensagem de parabéns
        const trilhaNames = {
            programacao: "Programação",
            medicina: "Medicina", 
            engenharia: "Engenharia Elétrica"
        };
        
        congratulationsMessage.textContent = `Você acertou a resposta e concluiu a simulação de ${trilhaNames[state.currentTrilha]} com sucesso!\nSua certificação foi registrada no sistema.`;
        
        // Mostrar tela de parabéns
        simulationScreen.classList.remove('active');
        congratulationsScreen.classList.add('active');
        createLightning();
        
        // Efeito de confetti
        createConfetti();
    } else {
        // Voltar ao chat com mensagem de erro
        closeSimulation();
        addMessage("❌ Não foi dessa vez! Sua resposta está incorreta.\n\nVamos tentar novamente, digite 'iniciar simulação'.", 'bot');
    }
}

// Efeito de confetti
function createConfetti() {
    const confettiContainer = document.createElement('div');
    confettiContainer.className = 'confetti-container';
    congratulationsScreen.appendChild(confettiContainer);
    
    for (let i = 0; i < 150; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        // Cores baseadas na trilha
        let colors;
        if (state.currentTrilha === 'programacao') {
            colors = ['#00f3ff', '#8a2be2', '#1a2a6c', '#b21f1f'];
        } else if (state.currentTrilha === 'medicina') {
            colors = ['#00ff88', '#4a90e2', '#0d1b2a', '#fdbb2d'];
        } else {
            colors = ['#ff6b35', '#ffd166', '#2d3047', '#1a1a2e'];
        }
        
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.animationDelay = `${Math.random() * 3}s`;
        confetti.style.animationDuration = `${2 + Math.random() * 2}s`;
        
        confettiContainer.appendChild(confetti);
    }
    
    // Remover confetti após animação
    setTimeout(() => {
        confettiContainer.remove();
    }, 5000);
}

// Configurar teclado de simulação
function setupSimulationKeyboard() {
    const keys = simulationKeyboard.querySelectorAll('.key');
    keys.forEach(key => {
        key.addEventListener('click', () => {
            // Animar a tecla
            key.classList.add('active');
            setTimeout(() => {
                key.classList.remove('active');
            }, 150);
            
            // Processar tecla
            const keyValue = key.getAttribute('data-key');
            if (keyValue === '⌫') {
                state.userAnswer = state.userAnswer.slice(0, -1);
            } else if (keyValue === '↵') {
                checkAnswer();
            } else {
                state.userAnswer = keyValue;
            }
            
            // Atualizar input
            answerInput.value = state.userAnswer;
        });
    });
}

// Verificar resposta
function checkAnswer() {
    const simulationData = simulationQuestions[state.currentTrilha];
    if (state.userAnswer.toUpperCase() === simulationData.correctAnswer) {
        finishSimulation(true);
    } else {
        finishSimulation(false);
    }
}

// Função para fechar a simulação
function closeSimulation() {
    simulationScreen.classList.remove('active');
    document.body.classList.remove('simulation-mode');
    state.simulationActive = false;
    
    addMessage("Simulação interrompida. O que gostaria de fazer agora?", 'bot');
}

// Função para processar a mensagem do usuário
function processUserMessage(message) {
    const lowerMessage = message.toLowerCase();
    
    // Saudação
    if (lowerMessage.includes('olá') || lowerMessage.includes('oi') || 
        lowerMessage.includes('bom dia') || lowerMessage.includes('boa tarde') || 
        lowerMessage.includes('boa noite')) {
        return "Olá! 👋 Eu sou o SkillBot, seu assistente da SkillVerse. Posso te ajudar com trilhas de aprendizado, progresso e até simulações de carreira. O que você gostaria de fazer hoje?";
    }
    
    // Ver trilhas
    if (lowerMessage.includes('trilha') || lowerMessage.includes('curso') || 
        lowerMessage.includes('aprender') || lowerMessage.includes('estudar')) {
        return "No momento temos disponível:\n\n💻 Programação\n\n🏥 Medicina\n\n⚡ Engenharia Elétrica\n\nQual delas te interessa?";
    }
    
    // Programação
    if (lowerMessage.includes('programação') || lowerMessage.includes('código') || 
        lowerMessage.includes('computação') || lowerMessage.includes('dev')) {
        state.currentTrilha = 'programacao';
        return "💻 Trilha de Programação:\n\nMódulo 1: Lógica de Programação\n\nMódulo 2: Java Básico\n\nMódulo 3: Banco de Dados e APIs\n\nAo concluir tudo, você recebe o certificado de Dev Iniciante!\n\nDigite \"iniciar simulação\" caso deseje começar.";
    }
    
    // Medicina
    if (lowerMessage.includes('medicina') || lowerMessage.includes('médica')) {
        state.currentTrilha = 'medicina';
        return "🏥 Trilha de Medicina:\n\nMódulo 1: Anatomia Básica\n\nMódulo 2: Diagnóstico por Sintomas\n\nMódulo 3: Procedimentos de Emergência\n\nAo concluir tudo, você recebe o certificado de Conhecimentos Médicos Básicos!\n\nDigite \"iniciar simulação\" caso deseje começar.";
    }
    
    // Engenharia Elétrica
    if (lowerMessage.includes('engenharia') || lowerMessage.includes('elétrica')) {
        state.currentTrilha = 'engenharia';
        return "⚡ Trilha de Engenharia Elétrica:\n\nMódulo 1: Circuitos Elétricos\n\nMódulo 2: Eletrônica Básica\n\nMódulo 3: Sistemas de Potência\n\nAo concluir tudo, você recebe o certificado de Conhecimentos em Engenharia Elétrica!\n\nDigite \"iniciar simulação\" caso deseje começar.";
    }
    
    // Iniciar simulação
    if (lowerMessage.includes('iniciar simulação') || lowerMessage.includes('começar simulação') || 
        lowerMessage.includes('simular') || lowerMessage.includes('desafia')) {
        if (!state.currentTrilha) {
            return "Primeiro escolha uma trilha! Digite 'programação', 'medicina' ou 'engenharia elétrica'.";
        }
        
        startSimulation(state.currentTrilha);
        return "";
    }
    
    // Progresso do usuário
    if (lowerMessage.includes('progresso') || lowerMessage.includes('certificado') || 
        lowerMessage.includes('status') || lowerMessage.includes('pontos')) {
        updateProgressInfo();
        return "Vamos verificar seu progresso nas trilhas...";
    }
    
    // Atualização tecnológica
    if (lowerMessage.includes('atualizado') || lowerMessage.includes('tecnologia') || 
        lowerMessage.includes('tendência') || lowerMessage.includes('em alta')) {
        return "O mundo da tecnologia muda o tempo todo! ⚙️\nAs principais tendências hoje são:\n\n• Inteligência Artificial e Machine Learning\n\n• Análise de Dados\n\n• Desenvolvimento de Apps com IA\n\n• Automação e Cloud Computing";
    }
    
    // Despedida
    if (lowerMessage.includes('tchau') || lowerMessage.includes('até logo') || 
        lowerMessage.includes('até mais') || lowerMessage.includes('flw')) {
        return "Até mais! 👋\nContinue praticando no SkillVerse — o aprendizado é constante! 🚀";
    }
    
    // Resposta padrão
    return "Eu não entendi. Você pode tentar reformular a frase ou usar um dos botões de ação rápida.";
}

// Função para enviar mensagem
function sendMessage() {
    const message = userInput.value.trim();
    if (message === '') return;
    
    // Adiciona mensagem do usuário
    addMessage(message, 'user');
    userInput.value = '';
    
    // Processa e adiciona resposta do bot
    setTimeout(() => {
        const response = processUserMessage(message);
        if (response !== "") {
            addMessage(response, 'bot');
        }
    }, 1000);
}

// Função para atualizar barras de progresso
function updateProgressBars() {
    for (const trilha in state.progresso) {
        const progressBar = document.getElementById(`progress-${trilha}`);
        if (progressBar) {
            progressBar.style.width = `${state.progresso[trilha]}%`;
        }
    }
    
    // Mostrar certificado se obtido
    if (state.certificado) {
        certificado.classList.add('show');
    }
}

// Função para atualizar informações de progresso
function updateProgressInfo() {
    if (state.certificado) {
        progressInfo.innerHTML = `
            <p>🎓 Você já possui um certificado em uma das trilhas!</p>
            <p>Excelente progresso! Continue praticando e explore novas trilhas da SkillVerse.</p>
        `;
    } else {
        progressInfo.innerHTML = `
            <p>🤔 Parece que você ainda não concluiu nenhuma simulação para obter um certificado.</p>
            <p>Quer iniciar uma simulação agora?</p>
        `;
    }
}

// Inicialização
function init() {
    initializeDOMElements();
    setupSimulationKeyboard();
    setupSimulationOptions();
    updateProgressBars();
    updateProgressInfo();
    
    // Event Listeners
    sendButton.addEventListener('click', sendMessage);
    
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Ações rápidas
    document.querySelectorAll('.quick-action').forEach(button => {
        button.addEventListener('click', () => {
            const message = button.getAttribute('data-message');
            userInput.value = message;
            sendMessage();
        });
    });

    // Seleção de trilhas no painel
    document.querySelectorAll('.trilha-item').forEach(item => {
        item.addEventListener('click', () => {
            const trilha = item.getAttribute('data-trilha');
            let message = '';
            
            if (trilha === 'programacao') {
                message = 'quero programação';
            } else if (trilha === 'medicina') {
                message = 'quero medicina';
            } else if (trilha === 'engenharia') {
                message = 'quero engenharia elétrica';
            }
            
            userInput.value = message;
            sendMessage();
        });
    });

    // Enviar resposta na simulação
    submitAnswer.addEventListener('click', checkAnswer);
    
    // Continuar após parabéns
    continueButton.addEventListener('click', () => {
        congratulationsScreen.classList.remove('active');
        document.body.classList.remove('simulation-mode');
        addMessage("🎉 Parabéns! Você concluiu a simulação com sucesso!\n\nO que gostaria de fazer agora?", 'bot');
    });

    // Acessibilidade em Libras
    accessibilityButton.addEventListener('click', toggleLibras);
    closeLibras.addEventListener('click', toggleLibras);
    translateLibras.addEventListener('click', translateLastMessage);
    pauseLibras.addEventListener('click', () => {
        const hands = document.querySelectorAll('.hand');
        hands.forEach(hand => {
            hand.style.animationPlayState = hand.style.animationPlayState === 'paused' ? 'running' : 'paused';
        });
        
        if (pauseLibras.textContent === 'Pausar') {
            pauseLibras.textContent = 'Continuar';
        } else {
            pauseLibras.textContent = 'Pausar';
        }
    });

    // Fechar simulação
    simulationClose.addEventListener('click', closeSimulation);
    
    // Fechar simulação com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && state.simulationActive) {
            closeSimulation();
        }
    });

    // Verificar parâmetros da URL
    const urlParams = new URLSearchParams(window.location.search);
    const trilhaParam = urlParams.get('trilha');
    if (trilhaParam && ['programacao', 'medicina', 'engenharia'].includes(trilhaParam)) {
        state.currentTrilha = trilhaParam;
        setTimeout(() => {
            addMessage(`Vejo que você veio direto para a trilha de ${trilhaParam}. Digite "iniciar simulação" para começar!`, 'bot');
        }, 500);
    }
}

// Inicializar a aplicação quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', init);