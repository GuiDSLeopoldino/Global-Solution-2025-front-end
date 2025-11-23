// FAQ functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
            const answer = item.querySelector('.faq-answer');
            answer.classList.toggle('active');
        });
    });
    
    // Search functionality for FAQ
    const faqSearch = document.createElement('div');
    faqSearch.innerHTML = `
        <div class="faq-search">
            <input type="text" id="faqSearch" placeholder="🔍 Buscar nas perguntas frequentes...">
        </div>
    `;
    
    const faqContainer = document.querySelector('.faq-container');
    if (faqContainer) {
        faqContainer.insertBefore(faqSearch, faqContainer.firstChild);
        
        const searchInput = document.getElementById('faqSearch');
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question h3').textContent.toLowerCase();
                const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
                
                if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                    item.style.display = 'block';
                    // Auto-open matching items
                    if (searchTerm.length > 2) {
                        item.classList.add('active');
                        item.querySelector('.faq-answer').classList.add('active');
                    }
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
});