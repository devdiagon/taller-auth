import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import type { Relation } from 'typeorm';
import { Persona } from '../../persona/entities/persona.entity.js';

@Entity({ name: 'usuario' })
export class Usuario {
  @PrimaryGeneratedColumn('uuid', { name: 'id_usuario' })
  idUsuario: string;

  @Column({ name: 'id_persona', type: 'uuid', unique: true })
  idPersona: string;

  @OneToOne(() => Persona)
  @JoinColumn({ name: 'id_persona' })
  persona?: Relation<Persona>;

  @Column({ type: 'varchar', length: 50, unique: true })
  username: string;

  // select: false evita que el hash se devuelva en las consultas / respuestas.
  @Column({ name: 'password_hash', type: 'varchar', length: 255, select: false })
  passwordHash: string;

  @Column({ type: 'boolean', default: true })
  estado: boolean;

  @CreateDateColumn({ name: 'fecha_creacion', type: 'timestamp' })
  fechaCreacion: Date;
}
