import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';

export class CreateUsuarioDto {
  @IsUUID()
  idPersona: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(72)
  password: string;

  @IsOptional()
  @IsBoolean()
  estado?: boolean;
}
