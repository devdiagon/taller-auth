import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { CreateUsuarioRolDto } from './dto/create-usuario-rol.dto.js';
import { UpdateUsuarioRolDto } from './dto/update-usuario-rol.dto.js';
import { UsuarioRolService } from './usuario-rol.service.js';

@Controller('usuario-rol')
export class UsuarioRolController {
  constructor(private readonly service: UsuarioRolService) {}

  @Post()
  create(@Body() dto: CreateUsuarioRolDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateUsuarioRolDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.remove(id);
  }
}
