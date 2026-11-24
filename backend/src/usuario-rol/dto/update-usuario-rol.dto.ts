import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioRolDto } from './create-usuario-rol.dto.js';

export class UpdateUsuarioRolDto extends PartialType(CreateUsuarioRolDto) {}
