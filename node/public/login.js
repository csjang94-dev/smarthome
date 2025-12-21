import { appUI, loginUI } from './selectors.js';

// 로그인 로직, 데이터베이스 연동 로직
export async function fetchLogin(){
    try{       
        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                u_id: loginUI.inputID.value,
                u_pw_hash: loginUI.inputPW.value 
            })
        });

        const result = await response.json();

        if (result.success) {
            sessionStorage.setItem('user', JSON.stringify(result.user));
            alert(result.message);

            const element = document.createElement('p');
            element.textContent = result.user;
            appUI.navLogin.appendChild(element);
            appUI.loginTag.textContent = '로그아웃';

            appUI.mainTop.classList.add('main_hidden');
            appUI.mainBottom.classList.add('main_hidden');

            appUI.loginTop.classList.add('login_hidden');
            appUI.loginBottom.classList.add('login_hidden');

        } else {
            alert(result.message);
        }
    }
    catch (error) {
        console.error('로그인 부분에서 오류가 발생했습니다:', error);
    }
}

