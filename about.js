function disableScrolling() {
    document.addEventListener('wheel', preventScroll, { passive: false });
    document.addEventListener('touchmove', preventScroll, { passive: false });
    document.addEventListener('keydown', preventKeyScroll, false);
}

function enableScrolling() {
    document.removeEventListener('wheel', preventScroll, { passive: false });
    document.removeEventListener('touchmove', preventScroll, { passive: false });
    document.removeEventListener('keydown', preventKeyScroll, false);
}			
            
let isOnAbout = false;
const pageContainer = document.getElementById('pageContainer');
const aboutBtn = document.getElementById('aboutBtn');
const upBtn = document.getElementById('upBtn');

function goToAbout() {
    if (isOnAbout) return;
    
    isOnAbout = true;
    document.body.classList.add('transitioning');
    
    pageContainer.classList.add('show-about');
    
    setTimeout(() => {
        aboutBtn.classList.add('invisible')
    }, 20);
                        
    setTimeout(() => {
        upBtn.classList.add('visible');
    }, 300);

    setTimeout(() => {
        document.body.classList.remove('transitioning');
        enableScrolling();
    }, 1200);
}

function goToMain() {
    if (!isOnAbout) return;
    
    isOnAbout = false;
    document.body.classList.add('transitioning');
    
    upBtn.classList.remove('visible');
    
    setTimeout(() => {
        aboutBtn.classList.remove('invisible');
        aboutBtn.textContent = 'o mnie';
    }, 700);
        
    setTimeout(() => {
        pageContainer.classList.remove('show-about');
        disableScrolling();
    }, 150);
    
    setTimeout(() => {
        document.body.classList.remove('transitioning');
        
    }, 1200);
}

function toggleSection() {
    const content = document.getElementById('experienceContent');
    const arrow = document.getElementById('arrow');
    
    if (content.classList.contains('expanded')) {
        content.classList.remove('expanded');
        arrow.classList.remove('rotated');
        content.style.maxHeight = '';
    } else {
        const contentInner = content.querySelector('.content-inner');
        const realHeight = contentInner.scrollHeight;
        
        content.style.maxHeight = (realHeight + 40) + 'px';
        content.classList.add('expanded');
        arrow.classList.add('rotated');
    }
}

let currentSection = 'experience';

function showSection(sectionId) {
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    document.getElementById(sectionId).classList.add('active');
    
    event.target.classList.add('active');
    
    document.getElementById(sectionId).scrollTop = 0;
    
    currentSection = sectionId;
}
document.addEventListener('keydown', function(e) {
    const sections = ['experience', 'projects', 'contact'];
    const currentIndex = sections.indexOf(currentSection);
    
    if (e.key === 'ArrowUp' && currentIndex > 0) {
        const prevSection = sections[currentIndex - 1];
        document.querySelector(`[onclick="showSection('${prevSection}')"]`).click();
    } else if (e.key === 'ArrowDown' && currentIndex < sections.length - 1) {
        const nextSection = sections[currentIndex + 1];
        document.querySelector(`[onclick="showSection('${nextSection}')"]`).click();
    }
});