import {fetchLogin, fetchSignUP, current_data_render, set_data_render, sensorCommand} from './script.js';
import { appUI, loginUI, signupUI } from './selectors.js';

async function APP() {
       
    setInterval(current_data_render, 10000);
    setInterval(sensorCommand, 10000);
    set_data_render();
    
    

    try { 
        appUI.loginTag.addEventListener('click', (event) => {

            event.preventDefault();

            appUI.mainTop.classList.remove('main_hidden');
            appUI.mainBottom.classList.remove('main_hidden');

            appUI.loginTop.classList.remove('login_hidden');
            appUI.loginBottom.classList.remove('login_hidden');

            appUI.signupTop.classList.add('signup_hidden');
            appUI.signupBottom.classList.add('signup_hidden');
        });

        appUI.loginBtn.addEventListener('click', () => {
            if (loginUI.inputID.value == '' || loginUI.inputPW.value == ''){
                alert("아이디나 패스워드를 입력하지 않았습니다.");
            } else {
                fetchLogin();
            }
        });
        appUI.signupBtn.addEventListener('click', () => {
            appUI.loginTop.classList.add('login_hidden');
            appUI.loginBottom.classList.add('login_hidden');
            appUI.signupTop.classList.remove('signup_hidden');
            appUI.signupBottom.classList.remove('signup_hidden');
        });
        
        appUI.signupRegister.addEventListener('click', () => {
            if (signupUI.signupInputPW.value != signupUI.signupInputPWC.value) {
                alert("비밀번호가 일치하지 않습니다.");
            } else {
                fetchSignUP();
                alert("가입되었습니다.");

            }     
        });

        

      
    } catch (error) {
        console.error('App를 불러오는 중에 문제가 발생했습니다:', error);
    }
}

APP();