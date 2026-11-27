import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Persona } from './persona/entities/persona.entity';
import { PersonaModule } from './persona/persona.module';
import { Rol } from './rol/entities/rol.entity';
import { RolModule } from './rol/rol.module';
import { Usuario } from './usuario/entities/usuario.entity';
import { UsuarioModule } from './usuario/usuario.module';
import { UsuarioRol } from './usuario-rol/entities/usuario-rol.entity';
import { UsuarioRolModule } from './usuario-rol/usuario-rol.module';

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
    RolModule,
    UsuarioRolModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
