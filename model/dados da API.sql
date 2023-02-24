DROP DATABASE IF EXISTS dates;
CREATE DATABASE dates CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE dates;


CREATE TABLE candidados_enderecos (
    ender_id INT PRIMARY KEY AUTO_INCREMENT,
    ender_cep VARCHAR(15) NOT NULL,
    ender_logradouro VARCHAR(255) NOT NULL,
    ender_numero DECIMAL(11,11),
    ender_complemento VARCHAR(22) NOT NULL,
    ender_bairro VARCHAR(111) NOT NULL,
    ender_cidade VARCHAR(111) NOT NULL,
    ender_estado VARCHAR(111) NOT NULL
    ); 
    
    CREATE TABLE zonas (
	zon_id INT PRIMARY KEY AUTO_INCREMENT,
    zon_nome VARCHAR(22) NOT NULL,
    zon_tipo ENUM('1', '2', '3')
        
   );
    
    CREATE TABLE aprovados (
    aprov_id INT PRIMARY KEY AUTO_INCREMENT,
    aprov_colocacao INT,
    
    zon_id INT,
    FOREIGN KEY (zon_id) REFERENCES zonas (zon_id)
    );
    
CREATE TABLE candidatos (
    cands_id INT PRIMARY KEY AUTO_INCREMENT,
    cands_data DATETIME DEFAULT CURRENT_TIMESTAMP,
    cands_nome VARCHAR(255) NOT NULL,
    cands_senha VARCHAR(11) NOT NULL,
    cands_cpf VARCHAR(15) NOT NULL,
    cands_email VARCHAR(122) NOT NULL,
    cands_telefone VARCHAR(22) NOT NULL,
    cands_celular VARCHAR(22) NOT NULL,
    cands_genero ENUM('masculino', 'feminino', 'transgenero', 'genero neutro', 'nao-binario'),
    cands_raca ENUM('branca', 'preta', 'amarela', 'parda ', 'indigena'),
    cands_cota ENUM('sim', 'nao'),
    cands_nota DECIMAL(11,11),
    cands_status ENUM('aprovado', 'reprovado', 'deligado') DEFAULT 'aprovado',
    
    aprov_id INT,
    FOREIGN KEY (aprov_id) REFERENCES aprovados (aprov_id),
    ender_id INT,
    FOREIGN KEY (ender_id) REFERENCES candidados_enderecos (ender_id)
);
  
CREATE TABLE polos (
	polos_id INT PRIMARY KEY AUTO_INCREMENT,
    polos_nome VARCHAR(255) NOT NULL,
    polos_localizacao VARCHAR(255) NOT NULL,
	polos_cnpj VARCHAR(14) NOT NULL,
	polos_telefone VARCHAR(10) NOT NULL,
	polos_email VARCHAR(255) NOT NULL,
	polos_hora_de_funcionamento TIME,
    polos_zonas VARCHAR(111),
    
    zon_id INT,
    FOREIGN KEY (zon_id) REFERENCES zonas (zon_id),
    aprov_id INT,
    FOREIGN KEY (aprov_id) REFERENCES aprovados (aprov_id)
    );
    
    CREATE TABLE polos_endereço (
	endere_id INT PRIMARY KEY AUTO_INCREMENT,
    endere_cep VARCHAR(15) NOT NULL,
    endere_logradouro VARCHAR(255) NOT NULL,
    endere_numero DECIMAL(11,11),
    endere_complemento VARCHAR(22) NOT NULL,
    endere_bairro VARCHAR(111) NOT NULL,
    endere_cidade VARCHAR(111) NOT NULL,
    endere_estado VARCHAR(111) NOT NULL,
    
    polos_id INT,
    FOREIGN KEY (polos_id) REFERENCES polos (polos_id)
    );
    
    
