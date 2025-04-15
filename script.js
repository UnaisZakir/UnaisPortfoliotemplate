// Skill Animation Script
window.addEventListener('DOMContentLoaded', () => {
    const bars = document.querySelectorAll('.progress-bar');
    bars.forEach(bar => {
        const percent = bar.getAttribute('data-percent');
        bar.style.width = percent;
    });
});