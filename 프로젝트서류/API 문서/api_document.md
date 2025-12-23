<h1 style="text-align: center">API 명세서</h2>

<br>

<a href="https://www.notion.so/gjjang/API-2d2919c5e1008075bec7d25b5c9b395b" >API 요약 [ 노션 사이트 ]</a>

<h2 style="background: red; text-align: center;"> 회원 </h2>

### 1. 이름 및 설명
* 이름 : 사용자 로그인 (User Login)
* 설명 : 클라이언트로부터 아이디 ( u_id ) 와 비밀번호 해시 ( u_pw_hash ) 를 받아 데이터베이스와 대조하여 인증을 수행합니다.
### 2. 기본 정보
* Host 주소 : http://localhost:3000
* Endpoint : /auth/login
* HTTP Method : POST
### 3. Request
* header : Content-Type: application/json
* parameter : 
* body : {
  "u_id": "user_id_example",
  "u_pw_hash": "user_password_hash_example"
}
### 4. Response
* header : Content-Type: application/json
* body : {
  "success": true,
  "message": "로그인 성공!",
  "user": "user_id_example"
}

<hr style="height: 1px; background: #ccc;">

### 1. 이름 및 설명
* 이름 : 사용자 회원가입 (User SignUP)
* 설명 : 클라이언트로부터 유저 정보 ( u_id, u_pw_hash, u_name, u_p_number, u_email ) 를 받아 데이트베이스와 대조하고 없으면 회원을 등록합니다.
### 2. 기본 정보
* Host 주소 : http://localhost:3000
* Endpoint : /auth/signup
* HTTP Method : POST
### 3. Request
* header : 
* parameter :
* body : { "u_id": "user_id_example", "u_pw_hash": "user_password_hash_example", "u_name": "user_name_example", "u_p_number": "user_phone_number_example", "u_email": "user_email_example" }
### 4. Response
* header : 500
* body : 


<h2 style="background: red; text-align: center;"> 메인 </h2>


### 1. 이름 및 설명
* 이름 : 메인 페이지 
* 설명 : 메인 페이지를 호스팅 합니다.
### 2. 기본 정보
* Host 주소 : http://localhost:3000
* Endpoint : /
* HTTP Method : GET
### 3. Request
* header : 
* parameter :
* body : 
### 4. Response
* header : 500
* sendFile : path.join(__dirname, 'public', 'index.html')



<h2 style="background: red; text-align: center;"> IoT </h2> 


#### 1. 이름 및 설명
* 이름 : 센서 데이터 
* 설명 : IoT 디바이스에서 센서 데이터를 받아옵니다.
#### 2. 기본 정보
* Host 주소 : http://localhost:3000
* Endpoint : /sensor/data
* HTTP Method : POST
#### 3. Request
* header : 
* parameter :
* body : 
#### 4. Response
* json : "temp_data": "temp_data_example", "humi_data": "humi_data_example", "lux_data": "lux_data_example"
* status : 500
* message : 센서값 불러오는데 오류가 발생했습니다.

<hr style="height: 1px; background: #ccc;">


#### 1. 이름 및 설명
* 이름 : 센서 커맨드 
* 설명 : IoT 디바이스로 명령을 보냅니다.
#### 2. 기본 정보
* Host 주소 : http://localhost:3000
* Endpoint : /sensor/command
* HTTP Method : POST
#### 3. Request
* header : 
* parameter : 
* body : "AC": "에어컨: AC_status_example", "HT": "히터: HT_status_example", "DF": "가습기: DF_status_example", "HDF": "제습기: HDF_status_example", "LT": "조명: LT_status_example", 
#### 4. Response
* header : 500
* sendFile : path.join(__dirname, 'public', 'index.html')

<hr style="height: 1px; background: #ccc;">