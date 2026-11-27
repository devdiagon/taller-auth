import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { handleDbError } from '../common/db-errors';
import { CreateUsuarioRolDto } from './dto/create-usuario-rol.dto';
import { UpdateUsuarioRolDto } from './dto/update-usuario-rol.dto';
import { UsuarioRol } from './entities/usuario-rol.entity';

@Injectable()
export class UsuarioRolService {
  constructor(@InjectRepository(UsuarioRol) private readonly repo: Repository<UsuarioRol>) {}

  async create(dto: CreateUsuarioRolDto) {
    let saved: UsuarioRol;
    try {
      saved = await this.repo.save(this.repo.create(dto));
    } catch (e) {
      handleDbError(e);
    }
    return this.findOne(saved.idUsuarioRol);
  }

  async findAll() {
    return this.repo.find({ relations: { usuario: true, rol: true } });
  }

  async findOne(id: string) {
    const item = await this.repo.findOne({
      where: { idUsuarioRol: id },
      relations: { usuario: true, rol: true },
    });
    if (!item) throw new NotFoundException(`Asignación usuario-rol ${id} no encontrada`);
    return item;
  }

  async update(id: string, dto: UpdateUsuarioRolDto) {
    const item = await this.findOne(id);
    // Se descartan las relaciones cargadas para que TypeORM use los ids actualizados.
    const { usuario: _usuario, rol: _rol, ...base } = item;
    try {
      await this.repo.save(Object.assign(base, dto));
    } catch (e) {
      handleDbError(e);
    }
    return this.findOne(id);
  }

  async remove(id: string) {
    const item = await this.findOne(id);
    try {
      await this.repo.remove(item);
    } catch (e) {
      handleDbError(e);
    }
    return { deleted: true, id };
  }
}
