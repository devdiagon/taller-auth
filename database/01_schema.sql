-- ==========================================================================
-- SQL: tablas en el orden de la guía (dentro de psql)
-- ==========================================================================
-- # Tabla persona
CREATE TABLE persona (
  id_persona UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombres VARCHAR(100) NOT NULL,
  apellidos VARCHAR(100) NOT NULL,
  identificacion VARCHAR(20) NOT NULL UNIQUE,
  correo VARCHAR(150) NOT NULL,
  telefono VARCHAR(20),
  estado BOOLEAN NOT NULL DEFAULT TRUE
);

-- # Tabla usuario
CREATE TABLE usuario (
  id_usuario UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id_persona UUID NOT NULL UNIQUE,
  username VARCHAR(50) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  estado BOOLEAN NOT NULL DEFAULT TRUE,
  fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_usuario_persona
    FOREIGN KEY (id_persona)
    REFERENCES persona(id_persona)
);


-- # Tabla rol
CREATE TABLE rol (
  id_rol UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre VARCHAR(50) NOT NULL UNIQUE,
  descripcion VARCHAR(255),
  estado BOOLEAN NOT NULL DEFAULT TRUE
);

-- # Tabla usuario_rol
CREATE TABLE usuario_rol (
  id_usuario_rol UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id_usuario UUID NOT NULL,
  id_rol UUID NOT NULL,
  fecha_asignacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  estado BOOLEAN NOT NULL DEFAULT TRUE,
  CONSTRAINT fk_usuario_rol_usuario FOREIGN KEY (id_usuario)
    REFERENCES usuario(id_usuario),
  CONSTRAINT fk_usuario_rol_rol FOREIGN KEY (id_rol)
    REFERENCES rol(id_rol),
  CONSTRAINT uq_usuario_rol
    UNIQUE (id_usuario, id_rol)
);
