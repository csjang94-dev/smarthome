CREATE TABLE user_table (
    u_idx INT NOT NULL AUTO_INCREMENT, 
    u_id VARCHAR(50) NOT NULL UNIQUE, 
    u_pw_hash VARCHAR(255) NOT NULL, 
    u_name VARCHAR(50) NOT NULL,
    u_p_number VARCHAR(20) NOT NULL, 
    u_birth DATE, 
    u_address VARCHAR(255), 
    u_email VARCHAR(100) NOT NULL UNIQUE, 
    u_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    
    PRIMARY KEY (u_idx)
);

CREATE TABLE device_table (
    d_idx INT NOT NULL AUTO_INCREMENT,
    d_id VARCHAR(255) NOT NULL UNIQUE,
    d_registed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (d_idx)
);

CREATE TABLE mapping_table (
    m_idx INT NOT NULL AUTO_INCREMENT,
    u_idx INT NOT NULL,
    d_idx INT NOT NULL UNIQUE,

    -- CASCADE: 부모(유저/기기)가 삭제되면 이 연결 데이터도 같이 지워라!
    CONSTRAINT fk_mapping_user FOREIGN KEY (u_idx) 
        REFERENCES user_table(u_idx) ON DELETE CASCADE,
    CONSTRAINT fk_mapping_device FOREIGN KEY (d_idx) 
        REFERENCES device_table(d_idx) ON DELETE CASCADE,

    PRIMARY KEY (m_idx)
);

CREATE TABLE login_history_table (
    h_idx INT NOT NULL AUTO_INCREMENT,
    u_idx INT NOT NULL,
    h_login_time DATETIME NOT NULL,
    h_ip_address VARCHAR(50) NOT NULL,
    h_success TINYINT(1) NOT NULL,
    h_fail_reason VARCHAR(255) NOT NULL,

    PRIMARY KEY (h_idx)
);

CREATE TABLE device_setting_table (
    s_idx INT NOT NULL AUTO_INCREMENT,
    d_idx INT NOT NULL,
    s_key VARCHAR(50) NOT NULL,
    s_value VARCHAR(20) NOT NULL,
    s_updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (s_idx)
);
