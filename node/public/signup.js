import { appUI, signupUI } from './selectors.js';

export async function fetchSignUP() {
    try {
        const response = await fetch('/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                u_id: signupUI.signupInputID.value,
                u_pw_hash: signupUI.signupInputPW.value,
                u_name: signupUI.signupInputName.value,
                u_p_number: signupUI.signupInputPhone.value,
                u_email: signupUI.signupInputEmail.value
            })
        });

        const result = await response.json();

        result.exists

    } catch (error) {
        console.error('회원가입 부분에서 오류가 발생했습니다:', error);
    }
}
