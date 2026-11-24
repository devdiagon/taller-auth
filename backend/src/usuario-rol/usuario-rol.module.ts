import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioRol } from './entities/usuario-rol.entity.js';
import { UsuarioRolController } from './usuario-rol.controller.js';
import { UsuarioRolService } from './usuario-rol.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioRol])],
  controllers: [UsuarioRolController],
  providers: [UsuarioRolService],
  exports: [UsuarioRolService],
})
export class UsuarioRolModule {}
