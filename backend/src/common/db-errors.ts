import { ConflictException } from '@nestjs/common';

/** Traduce errores de PostgreSQL (unique / foreign key) a respuestas HTTP 409. */
export function handleDbError(error: unknown): never {
  const e = error as {
    code?: string;
    detail?: string;
    driverError?: { code?: string; detail?: string };
  };
  const code = e?.driverError?.code ?? e?.code;
  const detail = e?.driverError?.detail ?? e?.detail;
  if (code === '23505') {
    throw new ConflictException(`Registro duplicado: ${detail ?? 'violación de unicidad'}`);
  }
  if (code === '23503') {
    throw new ConflictException(`Violación de llave foránea: ${detail ?? 'registro relacionado'}`);
  }
  throw error;
}
