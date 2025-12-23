export const appUI = {
    // 메인 페이지 section 부분을 숨기기 위한 id 접근
    navLogin: document.getElementById('nav_login'),
    loginTag: document.getElementById('login'),
    mainTop: document.getElementById('main_top'),
    mainBottom: document.getElementById('main_bottom'),

    // 로그인 페이지 나타내기 위한 id 접근
    loginTop: document.getElementById('login_top'),
    loginBottom: document.getElementById('login_bottom'),

    signupTop: document.getElementById('signup_top'),
    signupBottom: document.getElementById('signup_bottom'),

    loginBtn: document.getElementById('login_btn'),
    signupBtn: document.getElementById('signup_btn'),
    signupRegister: document.getElementById('signup_register'),

    // 현재 온도, 습도, 조도
    currentTemp: document.getElementById('current_temp'),
    currentHumi: document.getElementById('current_humi'),
    currentLux: document.getElementById('current_lux'),

    // 커텍트 장치
    connectedAC: document.getElementById('connected_AC'),
    connectedHT: document.getElementById('connected_HT'),
    connectedDHF: document.getElementById('connected_DHF'),
    connectedHF: document.getElementById('connected_HF'),
    connectedLT: document.getElementById('connected_LT'),

    // 온도, 습도, 조도 세팅 버튼
    topFst: document.getElementById('top_fst'),
    bottomFst: document.getElementById('bottom_fst'),
    topSec: document.getElementById('top_sec'),
    bottomSec: document.getElementById('bottom_sec'),
    topThd: document.getElementById('top_trd'),
    bottomThd: document.getElementById('bottom_trd'),

    // 온도, 습도, 조도 세팅 값
    targetTemp: document.getElementById('target_temp'),
    targetHumi: document.getElementById('target_humi'),
    targetLux: document.getElementById('target_lux')
};


export const loginUI = {
    inputID: document.getElementById('input_id'),
    inputPW: document.getElementById('input_pw')
};

export const signupUI = {
    signupInputID: document.getElementById('signup_input_id'),
    signupInputPW: document.getElementById('signup_input_pw'),
    signupInputPWC: document.getElementById('signup_input_pwc'),
    signupInputName: document.getElementById('signup_input_name'),
    signupInputPhone: document.getElementById('signup_input_phone'),
    signupInputEmail: document.getElementById('signup_input_email')    
};

