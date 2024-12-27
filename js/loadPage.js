document.addEventListener('DOMContentLoaded', function() {
    // 모든 nav 링크에 대해 클릭 이벤트 처리
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('href');
            loadPage(page);
        });
    });

    // 포스트 목록의 링크 클릭 이벤트 처리
    document.addEventListener('click', function(e) {
        const postLink = e.target.closest('.post-item a');
        if (postLink) {
            e.preventDefault();
            const postUrl = postLink.getAttribute('href');
            loadPost(postUrl);
        }
    });
});

// 페이지 로드 함수
function loadPage(page) {
    fetch(page)
        .then(response => response.text())
        .then(data => {
            document.getElementById('main-content').innerHTML = data;
        })
        .catch(error => console.error('Error loading page:', error));
}

// 포스트 로드 함수
async function loadPost(url) {
    try {
        // postDetail.html 템플릿 로드
        const templateResponse = await fetch('/views/posts/postDetail.html');
        let template = await templateResponse.text();
        
        // 마크다운 파일 로드
        const postResponse = await fetch(url);
        const postContent = await postResponse.text();
        
        // 마크다운 파일의 front matter와 내용 분리
        const [, frontMatter, content] = postContent.match(/---([\s\S]*?)---([\s\S]*)/);
        const postData = jsyaml.load(frontMatter);
        
        // 템플릿에 데이터 삽입
        template = template.replace('{{ page.title }}', postData.title)
                         .replace('{{ page.date | date: "%B %d, %Y" }}', new Date(postData.date).toLocaleDateString('en-US', { 
                             year: 'numeric', 
                             month: 'long', 
                             day: 'numeric' 
                         }))
                         .replace('{{ content }}', marked.parse(content));
        
        // 카테고리가 있는 경우 처리
        if (postData.categories && postData.categories.length > 0) {
            const categoriesHtml = postData.categories.map(cat => 
                `<span class="category">${cat}</span>`
            ).join('');
            template = template.replace('{% if page.categories %}{% endif %}', categoriesHtml);
        }
        
        document.getElementById('main-content').innerHTML = template;
    } catch (error) {
        console.error('Error loading post:', error);
    }
}
