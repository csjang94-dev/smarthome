async function fetchLogIN() {
    try { 
        
        // 메인 페이지 section 부분을 숨기기 위한 id 접근
        const loginBtn = document.getElementById('login');
        const mainTop = document.getElementById('main_top');
        const mainBottom = document.getElementById('main_bottom');

        // 로그인 페이지 나타내기 위한 id 접근
        const loginTop = document.getElementById('login_top');
        const loginBottom = document.getElementById('login_bottom');

        const inputID = document.getElementById('input_id');
        const inputPW = document.getElementById('input_pw');
        // const headerTitle = document.getElementById('header_title');


        loginBtn.addEventListener('click', () => {

            event.preventDefault();

            mainTop.classList.toggle('main_hidden');
            mainBottom.classList.toggle('main_hidden');

            loginTop.classList.toggle('login_hidden');
            loginBottom.classList.toggle('login_hidden');
        });

        

                              

    } catch (error) {
        console.error('문제를 불러오는 중 오류 발생:', error);
        questions.textContent = '데이터를 불러오는데 실패했습니다.';    
    }
}

fetchLogIN();