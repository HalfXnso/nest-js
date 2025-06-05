import { Usuario } from '../usuario/usuario.entity';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ManyToMany, JoinTable } from 'typeorm';


@Entity()
export class Evento {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column()
  nombreEvento: string;

  @Column()
  descripcion: string;


  @Column({ type: 'timestamp' })
  fechaInicio: Date;

  @Column({ type: 'timestamp' })
  fechaFin: Date;

  @ManyToMany(() => Usuario, (usuario) => usuario.eventos, { cascade: true })
  @JoinTable()
  usuarios: Usuario[];
  
}
