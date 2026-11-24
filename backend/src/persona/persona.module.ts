import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Persona } from './entities/persona.entity.js';
import { PersonaController } from './persona.controller.js';
import { PersonaService } from './persona.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([Persona])],
  controllers: [PersonaController],
  providers: [PersonaService],
  exports: [PersonaService],
})
export class PersonaModule {}
