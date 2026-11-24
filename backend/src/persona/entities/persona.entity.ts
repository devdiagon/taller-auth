import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'persona' })
export class Persona {
  @PrimaryGeneratedColumn('uuid', { name: 'id_persona' })
  idPersona: string;

  @Column({ type: 'varchar', length: 100 })
  nombres: string;

  @Column({ type: 'varchar', length: 100 })
  apellidos: string;

  @Column({ type: 'varchar', length: 20, unique: true })
  identificacion: string;

  @Column({ type: 'varchar', length: 150 })
  correo: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  telefono: string | null;

  @Column({ type: 'boolean', default: true })
  estado: boolean;
}
