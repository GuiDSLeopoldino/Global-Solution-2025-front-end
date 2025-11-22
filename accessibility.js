// accessibility.js - Funcionalidades de acessibilidade em Libras
class AccessibilityManager {
  constructor() {
    this.librasActive = false;
    this.lastContent = '';
    this.init();
  }

  init() {
    this.setupAccessibilityButton();
    this.setupLibrasInterpreter();
    this.setupContentObservers();
  }

  setupAccessibilityButton() {
    const accessibilityButton = document.getElementById('accessibilityButton');
    if (!accessibilityButton) return;

    accessibilityButton.addEventListener('click', () => {
      this.toggleLibras();
    });
  }

  setupLibrasInterpreter() {
    const closeLibras = document.getElementById('closeLibras');
    const translateLibras = document.getElementById('translateLibras');
    const pauseLibras = document.getElementById('pauseLibras');

    if (closeLibras) {
      closeLibras.addEventListener('click', () => {
        this.toggleLibras();
      });
    }

    if (translateLibras) {
      translateLibras.addEventListener('click', () => {
        this.translateCurrentContent();
      });
    }

    if (pauseLibras) {
      pauseLibras.addEventListener('click', () => {
        this.toggleLibrasAnimation();
      });
    }
  }

  setupContentObservers() {
    // Observar mudanças no conteúdo principal para atualizar a tradução
    const mainContent = document.querySelector('main');
    if (mainContent) {
      const observer = new MutationObserver(() => {
        this.updateContentForTranslation();
      });

      observer.observe(mainContent, {
        childList: true,
        subtree: true,
        characterData: true
      });
    }
  }

  toggleLibras() {
    this.librasActive = !this.librasActive;
    const accessibilityButton = document.getElementById('accessibilityButton');
    const librasInterpreter = document.getElementById('librasInterpreter');

    if (accessibilityButton) {
      if (this.librasActive) {
        accessibilityButton.classList.add('active');
      } else {
        accessibilityButton.classList.remove('active');
      }
    }

    if (librasInterpreter) {
      if (this.librasActive) {
        librasInterpreter.classList.add('active');
        this.translateCurrentContent();
      } else {
        librasInterpreter.classList.remove('active');
      }
    }
  }

  updateContentForTranslation() {
    // Coletar conteúdo principal da página atual
    const mainContent = document.querySelector('main');
    if (!mainContent) return;

    const contentText = this.extractTextContent(mainContent);
    
    // Atualizar apenas se o conteúdo mudou significativamente
    if (contentText !== this.lastContent && contentText.length > 50) {
      this.lastContent = contentText;
      
      // Se o intérprete de Libras estiver ativo, atualizar a tradução
      if (this.librasActive) {
        setTimeout(() => {
          this.translateContent(contentText);
        }, 500);
      }
    }
  }

  extractTextContent(element) {
    let text = '';
    const children = element.childNodes;
    
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if (child.nodeType === Node.TEXT_NODE) {
        text += child.textContent + ' ';
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        // Ignorar elementos que não contêm texto relevante
        if (!['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(child.tagName)) {
          text += this.extractTextContent(child) + ' ';
        }
      }
    }
    
    return text.replace(/\s+/g, ' ').trim();
  }

  translateCurrentContent() {
    const mainContent = document.querySelector('main');
    if (!mainContent) return;

    const contentText = this.extractTextContent(mainContent);
    this.translateContent(contentText);
  }

  translateContent(text) {
    const librasText = document.getElementById('librasText');
    if (!librasText) return;

    const translation = this.translateToLibras(text);
    librasText.textContent = translation;

    // Reiniciar animação das mãos
    this.restartLibrasAnimation();
  }

  translateToLibras(text) {
    // Dicionário básico de sinais em Libras
    const librasDictionary = {
      "olá": "👋 Mover a mão na frente do corpo",
      "bom dia": "☀️ Mão plana da testa para frente",
      "boa tarde": "🌞 Mão plana do queixo para frente", 
      "boa noite": "🌙 Cruzar os braços no peito",
      "contato": "📞 Mão em formato de telefone no ouvido",
      "sobre": "ℹ️ Mão fazendo círculo no ar",
      "equipe": "👥 Mãos indicando grupo",
      "tecnologia": "🔧 Mãos formando engrenagens",
      "projeto": "📋 Mãos simulando planos",
      "solução": "💡 Dedo na testa depois apontando para frente",
      "programação": "💻 Dedos batendo como em um teclado",
      "design": "🎨 Mãos simulando pintura",
      "desenvolvimento": "⚙️ Mãos girando como engrenagens",
      "web": "🕸️ Mãos formando rede",
      "site": "🌐 Mãos formando globo",
      "página": "📄 Mão simulando virar página",
      "navegação": "🧭 Mão simulando bússola",
      "acessibilidade": "♿ Mão fazendo sinal de acessibilidade",
      "libras": "👋 Mãos se movendo em sinais",
      "javascript": "📜 Mão simulando rolagem de código",
      "html": "🔲 Mãos formando estrutura",
      "css": "🎨 Mãos simulando estilo visual",
      "github": "🐙 Mãos formando tentáculos de polvo",
      "linkedin": "💼 Mão simulando crachá profissional",
      "email": "📧 Mão simulando envelope",
      "telefone": "📞 Mão em formato de telefone",
      "endereço": "📍 Mão apontando para local",
      "horário": "🕒 Mão apontando para pulso",
      "atendimento": "👥 Mãos estendidas para ajudar",
      "formulário": "📝 Mão simulando escrita",
      "enviar": "✉️ Mão simulando envio",
      "mensagem": "💬 Mãos formando balão de fala",
      "pergunta": "❓ Mão com dedo indicador na testa",
      "resposta": "💭 Dedo na testa depois apontando",
      "frequente": "🔄 Mãos circulares repetidamente",
      "integrantes": "👥 Mãos indicando grupo de pessoas",
      "time": "🤝 Mãos se cumprimentando",
      "missão": "🎯 Mão apontando para alvo",
      "visão": "👁️ Mão apontando para os olhos",
      "valores": "💎 Mãos segurando algo precioso",
      "tecnologias": "⚙️ Mãos segurando ferramentas",
      "metodologia": "📊 Mãos simulando organização",
      "planejamento": "📅 Mão simulando calendário",
      "design": "✏️ Mão simulando desenho",
      "testes": "🔍 Mão com lupa examinando",
      "implementação": "🛠️ Mãos trabalhando",
      "consistência": "📏 Mãos mostrando medida igual",
      "visual": "👀 Mãos apontando para os olhos",
      "interface": "🖥️ Mãos formando tela",
      "sistema": "🔄 Mãos formando ciclo",
      "cores": "🎨 Mãos misturando cores",
      "espaçamento": "↔️ Mãos mostrando distância",
      "tipografia": "🔤 Mãos formando letras",
      "performance": "⚡ Mão mostrando velocidade",
      "manutenção": "🔧 Mãos ajustando",
      "escalabilidade": "📈 Mão subindo verticalmente",
      "componentes": "🧩 Mãos encaixando peças",
      "interativos": "🔄 Mãos com movimento recíproco",
      "modal": "📋 Mão simulando janela",
      "slider": "↔️ Mão deslizando horizontalmente",
      "tabs": "📑 Mão simulando abas",
      "parabéns": "🎉 Palmas no ar",
      "sucesso": "✅ Polegar para cima",
      "obrigado": "🙏 Mãos em posição de agradecimento"
    };

    const words = text.toLowerCase().split(/\s+/);
    let librasTranslation = [];
    
    // Procurar por frases primeiro (para combinações como "bom dia")
    let phrase = '';
    for (let i = 0; i < words.length; i++) {
      phrase += words[i] + ' ';
      
      // Verificar se a frase atual existe no dicionário
      const cleanPhrase = phrase.trim();
      if (librasDictionary[cleanPhrase]) {
        librasTranslation.push(librasDictionary[cleanPhrase]);
        phrase = ''; // Resetar a frase
      }
      
      // Se a frase ficar muito longa, processar palavras individuais
      if (phrase.split(' ').length > 3 || i === words.length - 1) {
        const remainingWords = phrase.trim().split(' ');
        remainingWords.forEach(word => {
          const cleanWord = word.replace(/[^\wà-ú]/g, '');
          if (cleanWord && librasDictionary[cleanWord]) {
            librasTranslation.push(librasDictionary[cleanWord]);
          }
        });
        phrase = '';
      }
    }
    
    if (librasTranslation.length === 0) {
      return "🤔 Não foi possível traduzir este conteúdo para Libras. Tente uma página com texto mais específico.";
    }
    
    return librasTranslation.slice(0, 10).join(' | ') + (librasTranslation.length > 10 ? ' | ...' : '');
  }

  restartLibrasAnimation() {
    const hands = document.querySelectorAll('.hand');
    hands.forEach(hand => {
      hand.style.animation = 'none';
      setTimeout(() => {
        hand.style.animation = 'librasAnimation 3s infinite ease-in-out';
      }, 10);
    });
  }

  toggleLibrasAnimation() {
    const hands = document.querySelectorAll('.hand');
    const pauseLibras = document.getElementById('pauseLibras');
    
    hands.forEach(hand => {
      hand.style.animationPlayState = hand.style.animationPlayState === 'paused' ? 'running' : 'paused';
    });
    
    if (pauseLibras) {
      if (pauseLibras.textContent === 'Pausar') {
        pauseLibras.textContent = 'Continuar';
      } else {
        pauseLibras.textContent = 'Pausar';
      }
    }
  }
}

// Inicializar gerenciador de acessibilidade
document.addEventListener('DOMContentLoaded', () => {
  new AccessibilityManager();
});