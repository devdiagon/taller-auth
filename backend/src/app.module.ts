import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { Persona } from './persona/entities/persona.entity.js';
import { PersonaModule } from './persona/persona.module.js';
import { Rol } from './rol/entities/rol.entity.js';
import { RolModule } from './rol/rol.module.js';
import { Usuario } from './usuario/entities/usuario.entity.js';
import { UsuarioModule } from './usuario/usuario.module.js';
import { UsuarioRol } from './usuario-rol/entities/usuario-rol.entity.js';
import { UsuarioRolModule } from './usuario-rol/usuario-rol.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env', '../.env'] }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres' as const,
        host: config.get<string>('DB_HOST', 'localhost'),
        port: Number(config.get<string>('DB_PORT', '5434')),
        username: config.get<string>('DB_USER', 'biblioteca'),
        password: config.get<string>('DB_PASSWORD') ?? config.get<string>('POSTGRES_PASSWORD'),
        database: config.get<string>('DB_NAME', 'biblioteca_db'),
        entities: [Persona, Usuario, Rol, UsuarioRol],
        synchronize: false,
      }),
    }),
    PersonaModule,
    UsuarioModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
