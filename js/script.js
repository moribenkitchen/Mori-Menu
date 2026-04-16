function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

const mainContent = document.querySelector('.main-content');
const sections = document.querySelectorAll('.menu-section');
const tabs = document.querySelectorAll('.menu-tab');

mainContent.addEventListener('scroll', () => {
    let currentId = 'top'; 

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (mainContent.scrollTop >= sectionTop - 150) {
            currentId = section.getAttribute('id');
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
    // 🚀 여기서부터 복사해서 script.js 맨 아래에 붙여넣으세요!

// --- 3. 팝업(모달) 기능 ---
const menuItems = document.querySelectorAll('.menu-list-item');
const modalOverlay = document.getElementById('menu-modal');
const modalImg = document.getElementById('modal-img');
const modalName = document.getElementById('modal-name');
const modalDesc = document.getElementById('modal-desc');
const modalPrice = document.getElementById('modal-price');

// 🚀 추가됨: HTML에 달아둔 이름표로 '닫기 버튼'을 찾아옵니다!
const closeModalBtn = document.getElementById('close-modal-btn'); 

// 각 메뉴 클릭 시 팝업 열기
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

// 팝업 닫기 마법 주문 (함수)
function closeModal() {
    modalOverlay.classList.add('hidden');
}

// 🚀 추가됨: 닫기 버튼을 클릭하면 닫기 마법이 실행되도록 단단히 연결!
if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
}

// 바깥 까만 배경 터치해도 닫기
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        closeModal();
    }
});
});