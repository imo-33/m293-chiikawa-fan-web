// Forms JavaScript - forms.js

// Form validation functions
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    // At least 8 characters, one uppercase, one lowercase, one number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}

function validatePLZ(plz) {
    // German/Austrian/Swiss postal code format
    const plzRegex = /^[0-9]{4,5}$/;
    return plzRegex.test(plz);
}

// Show validation message
function showValidationMessage(element, message, isError = true) {
    // Remove existing messages
    const existingMessage = element.parentNode.querySelector('.validation-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    if (message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `validation-message ${isError ? 'error' : 'success'}`;
        messageDiv.textContent = message;
        messageDiv.style.cssText = `
            font-size: 12px;
            margin-top: 5px;
            padding: 5px 10px;
            border-radius: 6px;
            font-family: 'Inter';
            ${isError ?
                'color: #d32f2f; background: rgba(211, 47, 47, 0.1); border: 1px solid rgba(211, 47, 47, 0.2);' :
                'color: #2e7d32; background: rgba(46, 125, 50, 0.1); border: 1px solid rgba(46, 125, 50, 0.2);'
            }
        `;
        element.parentNode.appendChild(messageDiv);
    }
}

// Add input styling for validation states
function setInputValidationState(input, isValid) {
    if (isValid) {
        input.style.borderColor = 'var(--color-soft-pink)';
        input.style.boxShadow = '0 0 0 3px rgba(46, 125, 50, 0.1)';
    } else {
        input.style.borderColor = '#d32f2f';
        input.style.boxShadow = '0 0 0 3px rgba(211, 47, 47, 0.1)';
    }
}

// Form storage (simulating backend)
let registeredUsers = [];

// Registration form handling
document.addEventListener('DOMContentLoaded', function () {
    const registrationForm = document.getElementById('registrationForm');
    const loginForm = document.getElementById('loginForm');

    // Registration form submission
    if (registrationForm) {
        registrationForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(this);
            const data = Object.fromEntries(formData);

            let isValid = true;

            // Validate first name
            if (!data.firstName || data.firstName.trim().length < 2) {
                showValidationMessage(document.getElementById('firstName'), 'Vorname muss mindestens 2 Zeichen haben');
                setInputValidationState(document.getElementById('firstName'), false);
                isValid = false;
            } else {
                showValidationMessage(document.getElementById('firstName'), '');
                setInputValidationState(document.getElementById('firstName'), true);
            }

            // Validate last name
            if (!data.lastName || data.lastName.trim().length < 2) {
                showValidationMessage(document.getElementById('lastName'), 'Nachname muss mindestens 2 Zeichen haben');
                setInputValidationState(document.getElementById('lastName'), false);
                isValid = false;
            } else {
                showValidationMessage(document.getElementById('lastName'), '');
                setInputValidationState(document.getElementById('lastName'), true);
            }

            // Validate email
            if (!validateEmail(data.email)) {
                showValidationMessage(document.getElementById('email'), 'Bitte geben Sie eine gültige E-Mail-Adresse ein');
                setInputValidationState(document.getElementById('email'), false);
                isValid = false;
            } else {
                // Check if email already exists
                const emailExists = registeredUsers.some(user => user.email === data.email);
                if (emailExists) {
                    showValidationMessage(document.getElementById('email'), 'Diese E-Mail-Adresse ist bereits registriert');
                    setInputValidationState(document.getElementById('email'), false);
                    isValid = false;
                } else {
                    showValidationMessage(document.getElementById('email'), '');
                    setInputValidationState(document.getElementById('email'), true);
                }
            }

            // Validate password
            if (!validatePassword(data.password)) {
                showValidationMessage(document.getElementById('password'), 'Passwort muss mindestens 8 Zeichen haben, einen Grossbuchstaben, einen Kleinbuchstaben und eine Zahl enthalten');
                setInputValidationState(document.getElementById('password'), false);
                isValid = false;
            } else {
                showValidationMessage(document.getElementById('password'), '');
                setInputValidationState(document.getElementById('password'), true);
            }

            // Validate password confirmation
            if (data.password !== data.confirmPassword) {
                showValidationMessage(document.getElementById('confirmPassword'), 'Passwörter stimmen nicht überein');
                setInputValidationState(document.getElementById('confirmPassword'), false);
                isValid = false;
            } else {
                showValidationMessage(document.getElementById('confirmPassword'), '');
                setInputValidationState(document.getElementById('confirmPassword'), true);
            }

            // Validate PLZ if provided
            if (data.plz && !validatePLZ(data.plz)) {
                showValidationMessage(document.getElementById('plz'), 'PLZ muss 4-5 Ziffern haben');
                setInputValidationState(document.getElementById('plz'), false);
                isValid = false;
            } else {
                showValidationMessage(document.getElementById('plz'), '');
                setInputValidationState(document.getElementById('plz'), true);
            }

            // If all validations pass, register the user
            if (isValid) {
                // Add user to registered users array
                registeredUsers.push({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    password: data.password, // In real app, this would be hashed
                    plz: data.plz || '',
                    registeredAt: new Date().toISOString()
                });

                // Show success message
                alert('Registrierung erfolgreich! Sie können sich jetzt anmelden.');

                // Reset form
                registrationForm.reset();

                // Reset all input styles
                const inputs = registrationForm.querySelectorAll('input');
                inputs.forEach(input => {
                    input.style.borderColor = '';
                    input.style.boxShadow = '';
                });
            }
        });
    }

    // Login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(this);
            const data = Object.fromEntries(formData);

            let isValid = true;

            // Validate email
            if (!validateEmail(data.email)) {
                showValidationMessage(document.getElementById('loginEmail'), 'Bitte geben Sie eine gültige E-Mail-Adresse ein');
                setInputValidationState(document.getElementById('loginEmail'), false);
                isValid = false;
            } else {
                showValidationMessage(document.getElementById('loginEmail'), '');
                setInputValidationState(document.getElementById('loginEmail'), true);
            }

            // Validate password
            if (!data.password || data.password.trim().length === 0) {
                showValidationMessage(document.getElementById('loginPassword'), 'Passwort ist erforderlich');
                setInputValidationState(document.getElementById('loginPassword'), false);
                isValid = false;
            } else {
                showValidationMessage(document.getElementById('loginPassword'), '');
                setInputValidationState(document.getElementById('loginPassword'), true);
            }

            // If basic validation passes, check credentials
            if (isValid) {
                const user = registeredUsers.find(u => u.email === data.email && u.password === data.password);

                if (user) {
                    alert(`Willkommen zurück, ${user.firstName}!`);
                    loginForm.reset();

                    // Reset all input styles
                    const inputs = loginForm.querySelectorAll('input');
                    inputs.forEach(input => {
                        input.style.borderColor = '';
                        input.style.boxShadow = '';
                    });
                } else {
                    showValidationMessage(document.getElementById('loginPassword'), 'Ungültige E-Mail oder Passwort');
                    setInputValidationState(document.getElementById('loginPassword'), false);
                }
            }
        });
    }

    // Real-time validation for registration form
    if (registrationForm) {
        // Email validation on blur
        const emailInput = document.getElementById('email');
        if (emailInput) {
            emailInput.addEventListener('blur', function () {
                if (this.value) {
                    if (!validateEmail(this.value)) {
                        showValidationMessage(this, 'Bitte geben Sie eine gültige E-Mail-Adresse ein');
                        setInputValidationState(this, false);
                    } else {
                        const emailExists = registeredUsers.some(user => user.email === this.value);
                        if (emailExists) {
                            showValidationMessage(this, 'Diese E-Mail-Adresse ist bereits registriert');
                            setInputValidationState(this, false);
                        } else {
                            showValidationMessage(this, '');
                            setInputValidationState(this, true);
                        }
                    }
                }
            });
        }

        // Password validation on blur
        const passwordInput = document.getElementById('password');
        if (passwordInput) {
            passwordInput.addEventListener('blur', function () {
                if (this.value) {
                    if (!validatePassword(this.value)) {
                        showValidationMessage(this, 'Passwort muss mindestens 8 Zeichen haben, einen Grossbuchstaben, einen Kleinbuchstaben und eine Zahl enthalten');
                        setInputValidationState(this, false);
                    } else {
                        showValidationMessage(this, '');
                        setInputValidationState(this, true);
                    }
                }
            });
        }

        // Password confirmation validation on blur
        const confirmPasswordInput = document.getElementById('confirmPassword');
        if (confirmPasswordInput) {
            confirmPasswordInput.addEventListener('blur', function () {
                const password = document.getElementById('password').value;
                if (this.value) {
                    if (this.value !== password) {
                        showValidationMessage(this, 'Passwörter stimmen nicht überein');
                        setInputValidationState(this, false);
                    } else {
                        showValidationMessage(this, '');
                        setInputValidationState(this, true);
                    }
                }
            });
        }

        // PLZ validation on blur
        const plzInput = document.getElementById('plz');
        if (plzInput) {
            plzInput.addEventListener('blur', function () {
                if (this.value && !validatePLZ(this.value)) {
                    showValidationMessage(this, 'PLZ muss 4-5 Ziffern haben');
                    setInputValidationState(this, false);
                } else {
                    showValidationMessage(this, '');
                    setInputValidationState(this, true);
                }
            });
        }
    }
});

// Simple form handling
document.getElementById('forgotPasswordForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const email = document.getElementById('email').value;
  const submitBtn = document.querySelector('.form-submit-btn');
  const successMsg = document.getElementById('successMessage');
  const errorMsg = document.getElementById('errorMessage');
  
  // Hide previous messages
  successMsg.style.display = 'none';
  errorMsg.style.display = 'none';
  
  // Add loading state
  submitBtn.classList.add('loading');
  submitBtn.textContent = 'Senden...';
  
  // Simulate API call
  setTimeout(() => {
    // Remove loading state
    submitBtn.classList.remove('loading');
    submitBtn.textContent = 'Link senden';
    
    // Simple email validation
    if (email && email.includes('@') && email.includes('.')) {
      successMsg.style.display = 'block';
      document.getElementById('email').value = '';
    } else {
      errorMsg.style.display = 'block';
    }
  }, 1500);
});