// Navigation functionality
function navigateToPage(page) {
    if (page === 'welcome') {
        window.location.href = 'welcomepage.html';
    } else if (page === 'characters') {
        window.location.href = 'characterspage.html';
    }
}

// Add event listeners when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.action-button, .more-button, .nav-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-1px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add click effects to character items
    const characterItems = document.querySelectorAll('.character-item');
    characterItems.forEach(item => {
        item.addEventListener('click', function() {
            // Add click effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
        
        // Add hover effect
        item.addEventListener('mouseenter', function() {
            this.style.cursor = 'pointer';
            this.style.transform = 'scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Add smooth transitions
    const style = document.createElement('style');
    style.textContent = `
        .character-item {
            transition: transform 0.2s ease;
        }
        
        .action-button, .more-button, .nav-btn {
            transition: all 0.2s ease;
        }
    `;
    document.head.appendChild(style);

    // Progress bar animation
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
        // Animate progress bar on page load
        progressFill.style.width = '0%';
        setTimeout(() => {
            progressFill.style.transition = 'width 1s ease';
            progressFill.style.width = '40%';
        }, 500);
    }
});

// Utility functions for future enhancements
function showMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #333;
        color: white;
        padding: 10px 20px;
        border-radius: 5px;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    document.body.appendChild(messageDiv);
    
    setTimeout(() => messageDiv.style.opacity = '1', 100);
    setTimeout(() => {
        messageDiv.style.opacity = '0';
        setTimeout(() => document.body.removeChild(messageDiv), 300);
    }, 3000);
}