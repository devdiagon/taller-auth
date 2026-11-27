import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { handleDbError } from '../common/db-errors';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { Persona } from './entities/persona.entity';

@Injectable()
export class PersonaService {
  constructor(@InjectRepository(Persona) private readonly repo: Repository<Persona>) {}

  async create(dto: CreatePersonaDto) {
    try {
      return await this.repo.save(this.repo.create(dto));
    } catch (e) {
      handleDbError(e);
    }
  }

  async findAll() {
    return this.repo.find();
  }

  async findOne(id: string) {
    const persona = await this.repo.findOneBy({ idPersona: id });
    if (!persona) throw new NotFoundException(`Persona ${id} no encontrada`);
    return persona;
  }

  async update(id: string, dto: UpdatePersonaDto) {
    const persona = await this.findOne(id);
    try {
      return await this.repo.save(Object.assign(persona, dto));
    } catch (e) {
      handleDbError(e);
    }
  }

  async remove(id: string) {
    const persona = await this.findOne(id);
    try {
      await this.repo.remove(persona);
    } catch (e) {
      handleDbError(e);
    }
    return { deleted: true, id };
  }
}
