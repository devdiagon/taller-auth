import { IsBoolean, IsOptional, IsUUID } from 'class-validator';

export class CreateUsuarioRolDto {
  @IsUUID()
  idUsuario: string;

  @IsUUID()
  idRol: string;

  @IsOptional()
  @IsBoolean()
  estado?: boolean;
}
