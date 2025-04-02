import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Evento {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column()
  nombre_evento: string;

  @Column()
  descripcion: string;

  @Column()
  estado: string;

  @Column({ type: 'timestamp' })
  fechaInicio: Date;

  @Column({ type: 'timestamp' })
  fechaFin: Date;

  @Column({ default: false })
  seguido: boolean;
}
