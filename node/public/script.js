import { appUI, signupUI, loginUI } from './selectors.js';

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

export async function set_data_render() {
    
    const set_temp = ['18', '19', '20', '21', '22', '23', '24',
             '25', '26', '27', '28', '29', '30'];
    const set_humi = ['40', '45', '50', '55','60'];
    const set_lux = ['300', '400', '500', '600', '700'];
    let temp_idx = 5;
    let humi_idx = 2;
    let lux_idx = 2;

    if (localStorage.temp_idx !== null) {
        temp_idx = localStorage.temp_idx;
    } 
    if (localStorage.humi_idx !== null) {
        humi_idx = localStorage.humi_idx;
    }
    if (localStorage.lux_idx !== null) {
        lux_idx = localStorage.lux_idx;
    }  

    appUI.targetTemp.textContent = set_temp[temp_idx];
    appUI.targetHumi.textContent = set_humi[humi_idx];
    appUI.targetLux.textContent = set_lux[lux_idx];
    try {
        

        // 희망온도 버튼 조작 구현
        appUI.topFst.addEventListener('click', () =>{
            temp_idx++;
            if (temp_idx >= 12) {
                temp_idx = 12;
            }
            localStorage.temp_idx = temp_idx;
            appUI.targetTemp.textContent = set_temp[temp_idx];            
        });
        appUI.bottomFst.addEventListener('click', () =>{
            temp_idx--;
            if (temp_idx <= 0) {
                temp_idx = 0;
            }
            localStorage.temp_idx = temp_idx;
            appUI.targetTemp.textContent = set_temp[temp_idx];  
        });
        appUI.topSec.addEventListener('click', () =>{
            humi_idx++;
            if (humi_idx >= 4) {
                humi_idx = 4;
            }
            localStorage.humi_idx = humi_idx;
            appUI.targetHumi.textContent = set_humi[humi_idx]; 
        });
        appUI.bottomSec.addEventListener('click', () =>{
            humi_idx--;
            if (humi_idx <= 0) {
                humi_idx = 0;
            }
            localStorage.humi_idx = humi_idx;
            appUI.targetHumi.textContent = set_humi[humi_idx]; 
        });
        appUI.topThd.addEventListener('click', () =>{
            lux_idx++;
            if (lux_idx >= 4) {
                lux_idx = 4;
            }
            localStorage.lux_idx = lux_idx;
            appUI.targetLux.textContent = set_lux[lux_idx]; 
        });
        appUI.bottomThd.addEventListener('click', () =>{            
            lux_idx--;
            if (lux_idx <= 0) {
                lux_idx = 0;
            }
            localStorage.lux_idx = lux_idx;
            appUI.targetLux.textContent = set_lux[lux_idx]; 
        });

    } catch (error) {
        console.error('세팅값을 불러오는데 실패했습니다: ', error);
    }

}

export async function current_data_render() {
    
    try {
        
        const response = await fetch('/sensor/data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({})
        });

        const result = await response.json();
        console.log(result);
        console.log("값이 들어왔는지 확인");

        appUI.currentTemp.textContent = result.temp_data;
        appUI.currentHumi.textContent = result.humi_data;
        appUI.currentLux.textContent = result.lux_data;

        if ( parseFloat(appUI.currentTemp.textContent) < parseFloat(appUI.targetTemp.textContent) ) {
            appUI.connectedAC.textContent = 'off';
            appUI.connectedHT.textContent = 'on';

        } else if ( parseFloat(appUI.currentTemp.textContent) > parseFloat(appUI.targetTemp.textContent) ) {
            appUI.connectedAC.textContent = 'on';
            appUI.connectedHT.textContent = 'off';
        }

        if ( parseFloat(appUI.currentHumi.textContent) < parseFloat(appUI.targetHumi.textContent) ) {
            appUI.connectedHF.textContent = 'on';
            appUI.connectedDHF.textContent = 'off';

        } else if ( parseFloat(appUI.currentHumi.textContent) > parseFloat(appUI.targetHumi.textContent) ) {
            appUI.connectedAC.textContent = 'off';
            appUI.connectedDHF.textContent = 'on';
        }
        
        if ( parseInt(appUI.currentLux.textContent) < parseInt(appUI.targetLux.textContent) ) {
            appUI.connectedLT.textContent = 'on';

        } else if ( parseInt(appUI.currentLux.textContent) > parseInt(appUI.targetLux.textContent) ) {
            appUI.connectedLT.textContent = 'off';
        }
    
        

    } catch (error) {
        console.error('실시간 데이터를 불러오는데 실패했습니다: ', error);
    }
}

export async function sensorCommand() {
    
    try {
        const command_ac = appUI.connectedAC.textContent;
        const command_ht = appUI.connectedHT.textContent;
        const command_hf = appUI.connectedHF.textContent;
        const command_dhf = appUI.connectedDHF.textContent;
        const command_lt = appUI.connectedLT.textContent;

        const response = await fetch('/sensor/command', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                AC: `에어컨: ${command_ac}`,
                HT: `히터: ${command_ht}`,
                HF: `가습기: ${command_hf}`,
                DHF: `제습기: ${command_dhf}`,
                LT: `조명: ${command_lt}`
            }) 
        });

        const result = await response.json();

        result.exists;
        
    } catch (error) {
        console.error('디바이스에 명령을 내리는데 실패했습니다:', error);
    }

}