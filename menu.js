// menu.js - Funcionalidade do menu responsivo
class MenuManager {
  constructor() {
    this.hamburger = document.getElementById('hamburger');
    this.navList = document.getElementById('nav-list');
    this.init();
  }

  init() {
    if (this.hamburger && this.navList) {
      this.hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleMenu();
      });

      // Fechar menu ao clicar em um link
      document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
          this.closeMenu();
        });
      });

      // Fechar menu ao clicar fora dele
      document.addEventListener('click', (e) => {
        if (!this.hamburger.contains(e.target) && !this.navList.contains(e.target)) {
          this.closeMenu();
        }
      });

      // Fechar menu ao redimensionar a janela (para evitar problemas de layout)
      window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
          this.closeMenu();
        }
      });
    }
  }

  toggleMenu() {
    this.hamburger.classList.toggle('active');
    this.navList.classList.toggle('active');
    
    // Acessibilidade: atualizar atributo aria-expanded
    const isExpanded = this.hamburger.classList.contains('active');
    this.hamburger.setAttribute('aria-expanded', isExpanded);
    
    // Prevenir scroll do body quando menu está aberto
    document.body.style.overflow = isExpanded ? 'hidden' : '';
  }

  closeMenu() {
    this.hamburger.classList.remove('active');
    this.navList.classList.remove('active');
    this.hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
}

// Inicializar menu quando DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new MenuManager();
  });
} else {
  new MenuManager();
}