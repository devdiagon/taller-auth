import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import type { Relation } from 'typeorm';
import { Rol } from '../../rol/entities/rol.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';

@Entity({ name: 'usuario_rol' })
@Unique('uq_usuario_rol', ['idUsuario', 'idRol'])
export class UsuarioRol {
  @PrimaryGeneratedColumn('uuid', { name: 'id_usuario_rol' })
  idUsuarioRol: string;

  @Column({ name: 'id_usuario', type: 'uuid' })
  idUsuario: string;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'id_usuario' })
  usuario?: Relation<Usuario>;

  @Column({ name: 'id_rol', type: 'uuid' })
  idRol: string;

  @ManyToOne(() => Rol)
  @JoinColumn({ name: 'id_rol' })
  rol?: Relation<Rol>;

  @CreateDateColumn({ name: 'fecha_asignacion', type: 'timestamp' })
  fechaAsignacion: Date;

  @Column({ type: 'boolean', default: true })
  estado: boolean;
}
