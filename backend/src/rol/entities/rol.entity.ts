import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'rol' })
export class Rol {
  @PrimaryGeneratedColumn('uuid', { name: 'id_rol' })
  idRol: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  nombre: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  descripcion: string | null;

  @Column({ type: 'boolean', default: true })
  estado: boolean;
}
