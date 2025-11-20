// Contact Form Validation and Handling
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    
    // Form validation rules
    const validationRules = {
        fullName: {
            required: true,
            minLength: 2,
            pattern: /^[a-zA-ZÀ-ſ\s]+$/,
            message: 'Veuillez saisir un nom valide (lettres uniquement)'
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Veuillez saisir une adresse e-mail valide'
        },
        phone: {
            required: false,
            pattern: /^[\d\s\-\+\(\)]+$/,
            message: 'Veuillez saisir un numéro de téléphone valide'
        },
        subject: {
            required: true,
            message: 'Veuillez choisir un sujet'
        },
        message: {
            required: true,
            minLength: 10,
            message: 'Veuillez saisir un message d\'au moins 10 caractères'
        }
    };

    // Validate single field
    function validateField(fieldName, value) {
        const rules = validationRules[fieldName];
        if (!rules) return { isValid: true };

        // Check required
        if (rules.required && (!value || value.trim() === '')) {
            return { isValid: false, message: 'Ce champ est requis' };
        }

        // Skip other validations if field is empty and not required
        if (!rules.required && (!value || value.trim() === '')) {
            return { isValid: true };
        }

        // Check minimum length
        if (rules.minLength && value.length < rules.minLength) {
            return { isValid: false, message: rules.message };
        }

        // Check pattern
        if (rules.pattern && !rules.pattern.test(value)) {
            return { isValid: false, message: rules.message };
        }

        return { isValid: true };
    }

    // Show error message
    function showError(fieldName, message) {
        const field = document.getElementById(fieldName);
        const errorElement = document.getElementById(fieldName + 'Error');
        const formGroup = field.closest('.form-group');

        formGroup.classList.add('error');
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }

    // Clear error message
    function clearError(fieldName) {
        const field = document.getElementById(fieldName);
        const errorElement = document.getElementById(fieldName + 'Error');
        const formGroup = field.closest('.form-group');

        formGroup.classList.remove('error');
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }

    // Real-time validation
    Object.keys(validationRules).forEach(fieldName => {
        const field = document.getElementById(fieldName);
        if (field) {
            field.addEventListener('blur', function() {
                const validation = validateField(fieldName, this.value);
                if (!validation.isValid) {
                    showError(fieldName, validation.message);
                } else {
                    clearError(fieldName);
                }
            });

            field.addEventListener('input', function() {
                if (field.closest('.form-group').classList.contains('error')) {
                    const validation = validateField(fieldName, this.value);
                    if (validation.isValid) {
                        clearError(fieldName);
                    }
                }
            });
        }
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isFormValid = true;
        const formData = new FormData(form);
        
        // Validate all fields
        Object.keys(validationRules).forEach(fieldName => {
            const value = formData.get(fieldName);
            const validation = validateField(fieldName, value);
            
            if (!validation.isValid) {
                showError(fieldName, validation.message);
                isFormValid = false;
            } else {
                clearError(fieldName);
            }
        });

        if (isFormValid) {
            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
            submitBtn.disabled = true;

            // Simulate form submission (replace with actual submission logic)
            setTimeout(() => {
                // Reset form
                form.reset();
                
                // Show success message
                successMessage.classList.add('show');
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Auto-hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.classList.remove('show');
                }, 5000);
            }, 2000);
        } else {
            // Scroll to first error
            const firstError = document.querySelector('.form-group.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
});

// Close success message
function closeSuccessMessage() {
    document.getElementById('successMessage').classList.remove('show');
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Loading animation
window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1000);
    }
});