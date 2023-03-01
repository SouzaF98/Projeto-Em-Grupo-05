DROP DATABASE IF EXISTS programadoresCariocas;
CREATE DATABASE programadoresCariocas CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE programadoresCariocas;

CREATE TABLE candidatos (
    cand_id INT PRIMARY KEY AUTO_INCREMENT,
    cand_data DATETIME DEFAULT CURRENT_TIMESTAMP,
    cand_nome VARCHAR(255) NOT NULL,
    cand_email VARCHAR(64) NOT NULL,
    cand_senha VARCHAR(255) NOT NULL,
    cand_cpf VARCHAR(33) NOT NULL,
    cand_nascimento DATE NOT NULL,
    cand_telefone VARCHAR(32),
    cand_celular VARCHAR(32) NOT NULL,
    cand_genero ENUM('masculino', 'feminino', 'transgenero', 'nao-binario') NOT NULL,
    cand_raca ENUM('branco', 'preto', 'amarelo', 'pardo', 'indigena') NOT NULL,
    cand_cep VARCHAR(16) NOT NULL,
    cand_logradouro VARCHAR(66) NOT NULL,
    cand_numero INT NOT NULL,
    cand_complemento VARCHAR(33),
    cand_bairro VARCHAR(122) NOT NULL,
    cand_cidade VARCHAR(122) NOT NULL,
    cand_estado VARCHAR(122) NOT NULL,
    cand_status ENUM('on', 'off', 'del') DEFAULT 'on'
);

CREATE TABLE zonas (
    zon_id INT PRIMARY KEY AUTO_INCREMENT,
    zon_nome VARCHAR(16) NOT NULL,
    zon_tipo ENUM('1', '2', '3') NOT NULL,
    zon_status ENUM('on', 'off', 'del') DEFAULT 'on'
);

CREATE TABLE cand_resultados (
    resul_id INT PRIMARY KEY AUTO_INCREMENT,
    resul_colocacao INT NOT NULL,
    resul_cota ENUM('sim', 'nao') NOT NULL,
    resul_nota DECIMAL(2, 1) NOT NULL,
    resul_final ENUM('aprovado', 'reprovado') NOT NULL,
    resul_status ENUM('on', 'off', 'del') DEFAULT 'on',
    
    cand_id INT NOT NULL,
    FOREIGN KEY (cand_id) REFERENCES candidatos (cand_id),
    zon_id INT NOT NULL,
    FOREIGN KEY (zon_id) REFERENCES zonas (zon_id)
);

CREATE TABLE polos (
	polo_id INT PRIMARY KEY AUTO_INCREMENT,
    polo_nome VARCHAR(256) NOT NULL,
	polo_cnpj VARCHAR(32) NOT NULL,
	polo_telefone VARCHAR(32) NOT NULL,
	polo_email VARCHAR(64) NOT NULL,
	polo_hora_abertura TIME NOT NULL,
    polo_hora_encerramento TIME NOT NULL,
    polo_cep VARCHAR(16) NOT NULL,
    polo_logradouro VARCHAR(64) NOT NULL,
    polo_numero INT NOT NULL,
    polo_complemento VARCHAR(32),
    polo_bairro VARCHAR(133) NOT NULL,
    polo_cidade VARCHAR(133) NOT NULL,
    polo_estado VARCHAR(133) NOT NULL,
    polo_status ENUM('on', 'off', 'del') DEFAULT 'on',
    
    zon_id INT NOT NULL,
    FOREIGN KEY (zon_id) REFERENCES zonas (zon_id)
   );

INSERT INTO candidatos (cand_id, cand_data, cand_nome, cand_email, cand_senha, cand_cpf, cand_nascimento, cand_telefone, cand_celular, cand_genero, cand_raca, cand_cep, cand_logradouro, cand_numero, cand_complemento, cand_bairro, cand_cidade, cand_estado, cand_status) 
VALUES 
( '1', '2022-08-14 12:13:45', 'Mathias Collera', 'mathias@gmail.com', SHA1('Senha_123'), '111.222.333-44', '2000-07-11', '(21)7766-8899', '(21)98765-4321', 'masculino', 'branco', '23040-010', 'Rua das Aves de Fogo', '333', 'Fundos 09', 'Santa Rapina', 'Rio de Ninhos', 'RN', 'on'),
( '2', '2022-11-21 19:18:37', 'Kiara Siriliano', 'kiara@gmail.com', SHA1('Senha_123'), '235.847.666-45', '1998-08-27', '(21)2568-7793', '(21)97566-1138', 'feminino', 'amarelo', '22041-000', 'Rua Pedra do Rei', '94', 'Nas Terras do Reino', 'Ciclo da vida', 'África', 'ZA', 'on'),
( '3', '2023-01-04 16:45:38', 'Sisu Datu', 'Sisusuzano@gmail.com', SHA1('Senha_123'), '199.877.766-23', '2021-03-05', '(21)1234-5678', '(21)98775-4321','feminino', 'indigena', '35647-122', 'Rua do Arco Iris', '42', 'Nas Terras de Coração', 'Lago da Confiança', 'Kumandra', 'KD', 'on'),
( '4', '2022-08-14 12:13:45', 'Hange Zoë', 'Hangezo@gmail.com', SHA1('Senha_123'), '246.339.487-99', '2009-09-09', '(21)7964-8122', '(21)98446-2856', 'nao-binario', 'branco', '27080-147', 'Rua da Descoberta', '777', 'Muralha Rose', 'vila de Ragako', 'Ilha Paradis', 'IP', 'on'),
( '5', '2022-11-21 19:18:37', 'Kovu Siriliano', 'Kovuliano@gmail.com', SHA1('Senha_123'), '498.763.459-45', '1998-08-27', '(21)2568-7793', '(21)97821-4438', 'masculino', 'pardo', '22041-000', 'Rua Pedra do Rei', '94', 'Nas Terras do Reino', 'Ciclo da vida', 'África', 'ZA', 'on'),
( '6', '2022-11-21 19:18:37', 'Felix Argyle', 'felixkitty@gmail.com', SHA1('Senha_123'), '169.189.739-59', '2014-06-27', '(21)7412-5596', '(21)95624-3873', 'masculino', 'branco', '46078-467', 'Rua Volcanica', '159', 'Bairro real', 'capital real', 'Reino de Lugnica', 'RL', 'on'),
( '7', '2022-11-21 19:18:37', 'Luka Urushibara', 'lukako@gmail.com', SHA1('Senha_123'), '456.123.789-55', '1993-08-30', '(21)1574-5696', '(21)98833-2248', 'transgenero', 'branco', '78904-789', 'Rua das Rosas futuras', '2036', 'Templo Yanagibayashi', 'Tokyo', 'Japão', 'JP', 'on'),
( '8', '2022-11-21 19:18:37', 'Double Trouble', 'doubletro@gmail.com', SHA1('Senha_123'), '356.412.746-36', '2018-11-13', '(21)3459-7424', '(21)86321-1447', 'nao-binario', 'preto', '74036-321', 'Rua dos mercenarios', '171', 'Fundos da duvida', 'Etheria', 'Crimson Waste', 'CW', 'on'),
( '9', '2022-11-21 19:18:37', 'Crusch Karsten', 'crushlord@gmail.com', SHA1('Senha_123'), '147.235.489-59', '2014-06-27', '(21)7412-5596', '(21)97863-2248', 'feminino', 'branco', '46078-467', 'Rua Volcanica', '159', 'Bairro real', 'capital real', 'Reino de Lugnica', 'RL', 'on'),
( '10', '2022-11-21 19:18:37', 'Nitori Shuichi', 'nitoriiishu@gmail.com', SHA1('Senha_123'), '652.189.456-22', '2002-12-01', '(21)3569-4265', '(21)98523-4436', 'transgenero', 'branco', '65102-463', 'Rua Wandering Sun', '973', 'Sweet Blue Flowers', 'Kanagawa', 'Japão', 'JP', 'on'),
( '11', '2022-11-21 19:18:37', 'Tohru Kobayashi', 'tooruko@gmail.com', SHA1('Senha_123'), '147.258.369-11', '2013-03-15', '(21)3359-4536', '(21)93660-7776', 'feminino', 'branco', ' 74035-879', 'Rua Chaos Faction', '666', 'Apartamento 11', 'Nagano', 'Japão', 'JP', 'on');
