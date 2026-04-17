// --- 1. 스크롤 및 탭 클릭 이동 기능 ---
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// --- 2. 🚀 업그레이드된 스크롤 스파이 (가로 메뉴바 자동 이동) ---
const mainContent = document.querySelector('.main-content');
const sections = document.querySelectorAll('.menu-section');
const tabs = document.querySelectorAll('.menu-tab');
const sidebar = document.querySelector('.sidebar'); // 가로 메뉴바 전체 틀 가져오기

mainContent.addEventListener('scroll', () => {
    let currentId = 'top'; 

    sections.forEach(section => {
        if (section.style.display !== 'none') {
            const sectionTop = section.offsetTop;
            if (mainContent.scrollTop >= sectionTop - 150) {
                currentId = section.getAttribute('id');
            }
        }
    });

    if (mainContent.scrollTop < 50) {
        currentId = 'top'; 
    }

    tabs.forEach(tab => {
        tab.classList.remove('active');
        
        // 현재 보고 있는 메뉴의 탭을 찾았을 때!
        if (tab.getAttribute('onclick') === `scrollToSection('${currentId}')`) {
            tab.classList.add('active');
            
            // 🚀 탭이 화면 가운데로 오도록 가로 스크롤을 부드럽게 이동시킵니다!
            const tabLeft = tab.offsetLeft;
            const tabWidth = tab.offsetWidth;
            const sidebarWidth = sidebar.offsetWidth;
            
            sidebar.scrollTo({
                left: tabLeft - (sidebarWidth / 2) + (tabWidth / 2),
                behavior: 'smooth'
            });
        }
    });
});

// --- 3. 팝업(모달) 기능 ---
const menuItems = document.querySelectorAll('.menu-list-item');
const modalOverlay = document.getElementById('menu-modal');
const modalImg = document.getElementById('modal-img');
const modalName = document.getElementById('modal-name');
const modalDesc = document.getElementById('modal-desc');
const modalPrice = document.getElementById('modal-price');
const closeModalBtn = document.getElementById('close-modal-btn'); 

menuItems.forEach(item => {
    item.addEventListener('click', () => {
        const imgSrc = item.querySelector('.menu-image').src;
        const name = item.querySelector('.menu-name').innerText;
        const descElem = item.querySelector('.menu-desc');
        const desc = descElem ? descElem.innerText : ''; 
        const price = item.querySelector('.menu-price').innerText;

        modalImg.src = imgSrc;
        modalName.innerText = name;
        modalDesc.innerText = desc;
        modalPrice.innerText = price;

        modalOverlay.classList.remove('hidden');
    });
});

function closeModal() {
    modalOverlay.classList.add('hidden');
}

if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
}

modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        closeModal();
    }
});

// --- 4. 호주 멜버른 시간 기준: 런치 메뉴 자동 숨김 기능 ---
function checkLunchTime() {
    const options = { timeZone: 'Australia/Melbourne', hour: '2-digit', hour12: false };
    const formatter = new Intl.DateTimeFormat([], options);
    const currentHour = parseInt(formatter.format(new Date()), 10);

    const isLunchTime = currentHour >= 10 && currentHour < 15;
    const lunchMenuIds = ['mori-ben', 'mori-lunch-roll', 'mori-snack', 'mori-sushi-box'];

    lunchMenuIds.forEach(id => {
        const section = document.getElementById(id);
        const tab = document.querySelector(`.menu-tab[onclick*="${id}"]`);

        if (isLunchTime) {
            if (section) section.style.display = 'block';
            if (tab) tab.style.display = 'inline-block'; // 가로 탭이므로 inline-block으로 설정
        } else {
            if (section) section.style.display = 'none';
            if (tab) tab.style.display = 'none';
        }
    });
}

checkLunchTime();
setInterval(checkLunchTime, 60000);