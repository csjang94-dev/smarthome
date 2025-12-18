async function fetchLogIN() {
    try { 
        
        // 메인 페이지 section 부분을 숨기기 위한 id 접근
        const loginTag = document.getElementById('login');
        const mainTop = document.getElementById('main_top');
        const mainBottom = document.getElementById('main_bottom');

        // 로그인 페이지 나타내기 위한 id 접근
        const loginTop = document.getElementById('login_top');
        const loginBottom = document.getElementById('login_bottom');

        const signupTop = document.getElementById('signup_top');
        const signupBottom = document.getElementById('signup_bottom');

        const inputID = document.getElementById('input_id');
        const inputPW = document.getElementById('input_pw');
        // const headerTitle = document.getElementById('header_title');

        const loginBtn = document.getElementById('login_btn');
        const signupBtn = document.getElementById('signup_btn');


        loginTag.addEventListener('click', () => {

            event.preventDefault();

            mainTop.classList.remove('main_hidden');
            mainBottom.classList.remove('main_hidden');

            loginTop.classList.remove('login_hidden');
            loginBottom.classList.remove('login_hidden');

            signupTop.classList.add('signup_hidden');
            signupBottom.classList.add('signup_hidden');
        });

        loginBtn.addEventListener('click', () => {
            if(inputID.value == '' || inputPW.value == ''){
                alert("아이디나 패스워드를 입력하지 않았습니다.");
            }
        });
        signupBtn.addEventListener('click', () => {
            loginTop.classList.add('login_hidden');
            loginBottom.classList.add('login_hidden');
            signupTop.classList.remove('signup_hidden');
            signupBottom.classList.remove('signup_hidden');
        });


                              

    } catch (error) {
        console.error('문제를 불러오는 중 오류 발생:', error);
        questions.textContent = '데이터를 불러오는데 실패했습니다.';    
    }
}

fetchLogIN();