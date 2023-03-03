DROP DATABASE IF EXISTS programadoresCariocas;
CREATE DATABASE programadoresCariocas CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE programadoresCariocas;

CREATE TABLE candidatos (
    cand_id INT PRIMARY KEY AUTO_INCREMENT,
    cand_data DATETIME DEFAULT CURRENT_TIMESTAMP,
    cand_nome VARCHAR(222) NOT NULL,
    cand_email VARCHAR(66) NOT NULL,
    cand_senha VARCHAR(255) NOT NULL,
    cand_cpf VARCHAR(66) NOT NULL,
    cand_nascimento DATE NOT NULL,
    cand_telefone VARCHAR(33),
    cand_celular VARCHAR(33) NOT NULL,
    cand_genero ENUM('masculino', 'feminino', 'transgenero', 'nao-binario') NOT NULL,
    cand_raca ENUM('branco', 'preto', 'amarelo', 'pardo', 'indigena') NOT NULL,
    cand_cep VARCHAR(66) NOT NULL,
    cand_logradouro VARCHAR(255) NOT NULL,
    cand_numero INT NOT NULL,
    cand_complemento VARCHAR(255),
    cand_bairro VARCHAR(255) NOT NULL,
    cand_cidade VARCHAR(255) NOT NULL,
    cand_estado VARCHAR(255) NOT NULL,
    cand_status ENUM('on', 'off', 'del') DEFAULT 'on'
);

CREATE TABLE zonas (
    zon_id INT PRIMARY KEY AUTO_INCREMENT,
    zon_nome VARCHAR(222) NOT NULL,
    zon_tipo ENUM('1', '2', '3') NOT NULL,
    zon_status ENUM('on', 'off', 'del') DEFAULT 'on'
);

CREATE TABLE resultados (
    resul_id INT PRIMARY KEY AUTO_INCREMENT,
    resul_colocacao VARCHAR(222) NOT NULL,
    resul_cota ENUM('sim', 'nao') NOT NULL,
    resul_nota DECIMAL(2, 1) NOT NULL,
    resul_final ENUM('aprovado', 'reprovado') NOT NULL,
    resul_status ENUM('on', 'off', 'del') DEFAULT 'on',
    
    cand_id INT,
    FOREIGN KEY (cand_id) REFERENCES candidatos (cand_id),
    zon_id INT,
    FOREIGN KEY (zon_id) REFERENCES zonas (zon_id)
);

CREATE TABLE polos (
	polo_id INT PRIMARY KEY AUTO_INCREMENT,
    polo_nome VARCHAR(222) NOT NULL,
	polo_cnpj VARCHAR(77) NOT NULL,
	polo_telefone VARCHAR(77) NOT NULL,
	polo_email VARCHAR(111) NOT NULL,
	polo_hora_abertura VARCHAR(111) NOT NULL,
    polo_hora_encerramento VARCHAR(111) NOT NULL,
    polo_cep VARCHAR(33) NOT NULL,
    polo_logradouro VARCHAR(66) NOT NULL,
    polo_numero VARCHAR(11) NOT NULL,
    polo_complemento VARCHAR(255),
    polo_bairro VARCHAR(255) NOT NULL,
    polo_cidade VARCHAR(255) NOT NULL,
    polo_estado VARCHAR(255) NOT NULL,
    polo_status ENUM('on', 'off', 'del') DEFAULT 'on',
    
    zon_id INT,
    FOREIGN KEY (zon_id) REFERENCES zonas (zon_id),
    cand_id INT,
    FOREIGN KEY (cand_id) REFERENCES candidatos (cand_id)
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

INSERT INTO zonas (zon_id, zon_nome, zon_tipo, zon_status)
VALUES
('1', 'Zona Oeste', '1', 'on'),
('2', 'Zona Oeste', '2', 'on'),
('3', 'Zona Oeste', '3', 'on'),
('4', 'Zona Norte', '1', 'on'),
('5', 'Zona Norte', '2', 'on'),
('6', 'Zona Norte', '3', 'on'),
('7', 'Zona Sul', '1', 'on'),
('8', 'Zona Sul', '2', 'on'),
('9', 'Centro', '1', 'on'),
('10', 'Centro', '2', 'on'),
('11', 'Barra', '1', 'on');

INSERT INTO resultados (resul_id, resul_colocacao, resul_cota, resul_nota, resul_final, resul_status)
VALUES
('1', 'decimo primeiro lugar', 'nao', '6.5', 'reprovado', 'off'),
('2', 'primeiro lugar', 'sim', '9.7', 'aprovado', 'on'),
('3', 'quinto lugar', 'sim', '8.5', 'aprovado', 'on'),
('4', 'sexto lugar', 'sim', '8.0', 'aprovado', 'on'),
('5', 'quarto lugar', 'nao', '8.5', 'aprovado', 'on'),
('6', 'oitavo lugar', 'nao', '7.5', 'aprovado', 'on'),
('7', 'setimo lugar', 'sim', '7.9', 'aprovado', 'on'),
('8', 'nono lugar', 'nao', '7.5', 'aprovado', 'on'),
('9', 'terceiro lugar', 'nao', '9.0', 'aprovado', 'on'),
('10', 'decimo lugar', 'nao', '7.0', 'aprovado', 'on'),
('11', 'segundo lugar', 'nao', '9.5', 'aprovado', 'on');

INSERT INTO polos (polo_id, polo_nome, polo_cnpj, polo_telefone, polo_email, polo_hora_abertura, polo_hora_encerramento, polo_cep, polo_logradouro, polo_numero, polo_complemento, polo_bairro, polo_cidade, polo_estado, polo_status)
VALUES
('1', 'Senac Campo Grande', '03.672.347/0009-26', '(21)2018-5866', 'campogrande@rj.senac.br', '08:00h', '19:00h', '23080-020', 'Rua Barcelos Domingos', '58', 'Proximo as Lojas Leader', 'Campo Grande', 'Rio de Janeiro', 'RJ', 'on'),
('2', 'Senac Madureira', '03.672.347/0029-70', '(21)2018-5870', 'madureira@rj.senac.br', '09:00h', '19:00h', '21310-150', 'Rua Ewbank da Câmara', '91', 'Proximo a Elite Rede de Ensino ', 'Madureira', 'Rio de Janeiro', 'RJ', 'on'),
('3', 'Senac Irajá', '03.672.347/0024-65', '(21)2018-5869', 'iraja@rj.senac.br', '08:00h', '19:00h', '21230-145', 'Rua Emiliano Felipe', '173', 'Ao lado do Campo do Milionário', 'Irajá', 'Rio de Janeiro', 'RJ', 'on'),
('4', 'Senac Duque de Caxias', '03.672.347/0030-03', '(21)2018-9044', 'saojoaodemeriti@rj.senac.br', 'Fechado temporariamente', 'Fechado temporariamente', '25085-131', 'Av. Brigadeiro Lima e Silva', '764', 'Frente ao Hospital Caxias D´O', 'Duque de Caxias', 'Rio de Janeiro', 'RJ', 'off'),
('5', 'Senac São João de Meriti', '03.672.347/0034-37', '(21)2018-9044', 'saojoaodemeriti@rj.senac.br', '08:00h', '22:00h', '25555-681', 'Rua Pastor Joaquim Rosa', 's/nº', 'Frente ao Atelie Portas Abertas', 'São João de Meriti', 'Rio de Janeiro', 'RJ', 'on'),
('6', 'Senac Nova Iguaçu', '03.672.347/0100-50', '(21)2018-9041', 'novaiguacu@rj.senac.br', '08:00h', '20:00h', '26210-200', 'Rua Coronel Carlos Matos', '86', 'Frente a Cantina do Miranda', 'Nova Iguaçu', 'Rio de Janeiro', 'RJ', 'on'),
('7', 'Senac Copacabana', '03.672.347/0019-06', '(21)2018-9020', 'copacabana@rj.senac.br', '09:00h', '20:00h', '22061-000', 'Rua Pompeu Loureiro', '45', 'Frente ao Someji Estacionamento', 'Copacabana', 'Rio de Jneiro', 'RJ', 'on'),
('8', 'Senac Botafogo', '03.672.347/0006-83', '(21)2018-9026', 'botafogo@rj.senac.br', '08:00h', '20:00h', '22251-050', 'Rua Bambina', '107', 'Frente a Champanharia Ovelha Negra', 'Botafogo', 'Rio de Janeiro', 'RJ', 'on'),
('9', 'Faculdade Senac', '03.672.347/0095-59', '(21)2018-9029', 'faculdade@rj.senac.br', '08:00h', '20:00h', '20030-041', 'Rua Santa Luzia', '735', '2º andar', 'Lapa', 'Rio de Janeiro', 'RJ', 'on'),
('10', 'Senac Marechal Floriano', '03.672.347/0004-11', '(21)2018-9035', 'marechal.floriano@rj.senac.br', '08:00h', '20:00h', '20080-007', 'Av. Marechal Floriano', '06', 'Proximo ao Açougue Soutelo', 'Gamboa', 'Rio de Janeiro', 'RJ', 'on'),
('11', 'Senac Barra da Tijuca', '03.672.347/0104-84', '(21)2018-9038', 'barradatijuca@rj.senac.br', '08:00h', '20:00h', '22775-004', 'Avenida das Américas', '3959', 'Marapendi Shopping', 'Barra da Tijuca', 'Rio de Janeiro', 'RJ', 'on');