import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { handleDbError } from '../common/db-errors.js';
import { CreateRolDto } from './dto/create-rol.dto.js';
import { UpdateRolDto } from './dto/update-rol.dto.js';
import { Rol } from './entities/rol.entity.js';

@Injectable()
export class RolService {
  constructor(@InjectRepository(Rol) private readonly repo: Repository<Rol>) {}

  async create(dto: CreateRolDto) {
    try {
      return await this.repo.save(this.repo.create(dto));
    } catch (e) {
      handleDbError(e);
    }
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: string) {
    const rol = await this.repo.findOneBy({ idRol: id });
    if (!rol) throw new NotFoundException(`Rol ${id} no encontrado`);
    return rol;
  }

  async update(id: string, dto: UpdateRolDto) {
    const rol = await this.findOne(id);
    try {
      return await this.repo.save(Object.assign(rol, dto));
    } catch (e) {
      handleDbError(e);
    }
  }

  async remove(id: string) {
    const rol = await this.findOne(id);
    try {
      await this.repo.remove(rol);
    } catch (e) {
      handleDbError(e);
    }
    return { deleted: true, id };
  }
}
