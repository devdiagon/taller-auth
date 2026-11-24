import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-usuario.dto.js';

// La persona asociada no se puede reasignar (relación 1:1).
export class UpdateUsuarioDto extends PartialType(OmitType(CreateUsuarioDto, ['idPersona'] as const)) {}
