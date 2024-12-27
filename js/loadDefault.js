// DOM이 로드되면 실행되는 함수
document.addEventListener('DOMContentLoaded', function() {
    // 푸터 로드
    fetch('views/includes/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));

    // 헤더 로드
    fetch('views/includes/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header').innerHTML = data;
        })
        .catch(error => console.error('Error loading header:', error));

    // 네비게이션 로드
    fetch('views/includes/nav.html')
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('afterbegin', data);
        })
        .catch(error => console.error('Error loading nav:', error));

    // 초기 로드 시 main.html 로드 후 about.html 로드
    fetch('views/main/main.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('main').innerHTML = data;
            loadPage('views/main/about.html'); // about.html 로드
        })
        .catch(error => console.error('Error loading main content:', error));
});

// 스크롤 이벤트 핸들러
window.addEventListener('scroll', function() {
    // 스크롤 위치에 따라 네비게이션 숨김 처리
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        document.body.classList.add('scrolled');
    } else {
        document.body.classList.remove('scrolled');
    }
});