import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { handleDbError } from '../common/db-errors';
import { hashPassword } from '../common/password';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(@InjectRepository(Usuario) private readonly repo: Repository<Usuario>) {}

  async create(dto: CreateUsuarioDto) {
    const { password, ...rest } = dto;
    let saved: Usuario;
    try {
      saved = await this.repo.save(
        this.repo.create({ ...rest, passwordHash: await hashPassword(password) }),
      );
    } catch (e) {
      handleDbError(e);
    }
    return this.findOne(saved.idUsuario);
  }

  async findAll() {
    return this.repo.find({ relations: { persona: true } });
  }

  async findOne(id: string) {
    const usuario = await this.repo.findOne({
      where: { idUsuario: id },
      relations: { persona: true },
    });
    if (!usuario) throw new NotFoundException(`Usuario ${id} no encontrado`);
    return usuario;
  }

  async update(id: string, dto: UpdateUsuarioDto) {
    const usuario = await this.findOne(id);
    const { password, ...rest } = dto;
    Object.assign(usuario, rest);
    if (password) usuario.passwordHash = await hashPassword(password);
    try {
      await this.repo.save(usuario);
    } catch (e) {
      handleDbError(e);
    }
    return this.findOne(id);
  }

  async remove(id: string) {
    const usuario = await this.findOne(id);
    try {
      await this.repo.remove(usuario);
    } catch (e) {
      handleDbError(e);
    }
    return { deleted: true, id };
  }
}
