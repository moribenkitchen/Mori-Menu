// --- 1. 스크롤 및 탭 클릭 이동 기능 ---
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// --- 2. 스크롤 스파이 (화면 내릴 때 탭 자동 변경) ---
const mainContent = document.querySelector('.main-content');
const sections = document.querySelectorAll('.menu-section');
const tabs = document.querySelectorAll('.menu-tab');

mainContent.addEventListener('scroll', () => {
    let currentId = 'top'; 

    sections.forEach(section => {
        // 숨겨진 런치 메뉴는 센서가 무시하도록 설정
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
        if (tab.getAttribute('onclick') === `scrollToSection('${currentId}')`) {
            tab.classList.add('active');
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

// --- 4. 🚀 호주 멜버른 시간 기준: 런치 메뉴 자동 숨김 기능 ---
function checkLunchTime() {
    // 무조건 호주 멜버른 시간대로 현재 '시(Hour)'만 쏙 빼옵니다.
    const options = { timeZone: 'Australia/Melbourne', hour: '2-digit', hour12: false };
    const formatter = new Intl.DateTimeFormat([], options);
    const currentHour = parseInt(formatter.format(new Date()), 10);

    // 런치 시간: 오전 10시(10)부터 오후 3시(14:59)까지
    const isLunchTime = currentHour >= 10 && currentHour < 15;

    // 숨기거나 나타낼 런치 카테고리 4개
    const lunchMenuIds = ['mori-ben', 'mori-lunch-roll', 'mori-snack', 'mori-sushi-box'];

    lunchMenuIds.forEach(id => {
        // 오른쪽 메인 화면의 메뉴 구역
        const section = document.getElementById(id);
        // 왼쪽 사이드바의 탭 구역
        const tab = document.querySelector(`.menu-tab[onclick*="${id}"]`);

        if (isLunchTime) {
            // 런치 시간이면 짠! 하고 보여줍니다.
            if (section) section.style.display = 'block';
            if (tab) tab.style.display = 'block';
        } else {
            // 런치 시간이 아니면 싹 숨깁니다.
            if (section) section.style.display = 'none';
            if (tab) tab.style.display = 'none';
        }
    });
}

// 1. 메뉴판이 켜지자마자 시간을 한 번 체크합니다.
checkLunchTime();

// 2. 혹시 메뉴판을 계속 켜두더라도, 1분(60,000밀리초)마다 시계를 몰래 확인해서 3시 정각에 칼같이 메뉴를 숨깁니다.
setInterval(checkLunchTime, 60000);