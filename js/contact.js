// Contact form functionality
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const subjectSelect = document.getElementById('subject');
    const trilhaSuggestionGroup = document.getElementById('trilhaSuggestionGroup');
    const submitButton = document.getElementById('submitButton');
    const formSuccess = document.getElementById('formSuccess');
    const newMessageButton = document.getElementById('newMessageButton');
    
    // Mostrar/ocultar campo de sugestão de trilha
    if (subjectSelect && trilhaSuggestionGroup) {
        subjectSelect.addEventListener('change', function() {
            if (this.value === 'sugestao_trilha') {
                trilhaSuggestionGroup.style.display = 'block';
            } else {
                trilhaSuggestionGroup.style.display = 'none';
            }
        });
    }
    
    // Envio do formulário
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                submitForm();
            }
        });
    }
    
    // Botão para nova mensagem
    if (newMessageButton) {
        newMessageButton.addEventListener('click', function() {
            formSuccess.style.display = 'none';
            contactForm.style.display = 'block';
            contactForm.reset();
            trilhaSuggestionGroup.style.display = 'none';
        });
    }
    
    function validateForm() {
        let isValid = true;
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');
        const trilhaSuggestion = document.getElementById('trilhaSuggestion');
        
        // Reset errors
        document.querySelectorAll('.error-message').forEach(error => {
            error.textContent = '';
        });
        
        document.querySelectorAll('input, select, textarea').forEach(field => {
            field.style.borderColor = '';
        });
        
        // Name validation
        if (!name.value.trim()) {
            showError('nameError', 'Por favor, insira seu nome');
            name.style.borderColor = 'var(--error-color)';
            isValid = false;
        }
        
        // Email validation
        if (!email.value.trim()) {
            showError('emailError', 'Por favor, insira seu e-mail');
            email.style.borderColor = 'var(--error-color)';
            isValid = false;
        } else if (!isValidEmail(email.value)) {
            showError('emailError', 'Por favor, insira um e-mail válido');
            email.style.borderColor = 'var(--error-color)';
            isValid = false;
        }
        
        // Subject validation
        if (!subject.value) {
            showError('subjectError', 'Por favor, selecione um assunto');
            subject.style.borderColor = 'var(--error-color)';
            isValid = false;
        }
        
        // Trilha suggestion validation
        if (subject.value === 'sugestao_trilha' && !trilhaSuggestion.value.trim()) {
            showError('trilhaSuggestionError', 'Por favor, sugira uma área');
            trilhaSuggestion.style.borderColor = 'var(--error-color)';
            isValid = false;
        }
        
        // Message validation
        if (!message.value.trim()) {
            showError('messageError', 'Por favor, insira sua mensagem');
            message.style.borderColor = 'var(--error-color)';
            isValid = false;
        } else if (message.value.trim().length < 10) {
            showError('messageError', 'A mensagem deve ter pelo menos 10 caracteres');
            message.style.borderColor = 'var(--error-color)';
            isValid = false;
        }
        
        return isValid;
    }
    
    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.textContent = message;
        }
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function submitForm() {
        const buttonText = submitButton.querySelector('.button-text');
        const buttonLoading = submitButton.querySelector('.button-loading');
        
        // Show loading state
        buttonText.style.display = 'none';
        buttonLoading.style.display = 'flex';
        submitButton.disabled = true;
        
        // Simulate form submission (substitua por chamada real à API)
        setTimeout(() => {
            // Hide form and show success message
            contactForm.style.display = 'none';
            formSuccess.style.display = 'block';
            
            // Reset button state
            buttonText.style.display = 'inline';
            buttonLoading.style.display = 'none';
            submitButton.disabled = false;
            
            // Aqui você enviaria os dados para um servidor
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value,
                trilhaSuggestion: document.getElementById('trilhaSuggestion').value,
                newsletter: document.getElementById('newsletter').checked
            };
            
            console.log('Form data:', formData);
            // Exemplo: fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) })
            
        }, 2000);
    }
    
    // Validação em tempo real
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim()) {
                this.style.borderColor = 'var(--success-color)';
            }
        });
    });
});