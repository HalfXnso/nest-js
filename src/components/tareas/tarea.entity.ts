import { Usuario } from "src/components/usuario/usuario.entity";
import { ListadoTarea } from "src/components/listado_tareas/listado_tareas";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Tarea {
    
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column()
    titulo: string;

    @Column()
    descripcion: string;

    @Column()
    estado: string;

    @Column()
    tipo: string;

    @Column({ type: 'timestamp' })
    fechaInicio: Date;
    @Column({ type: 'timestamp' })
    fechaFin: Date;    

    @ManyToMany(() => Usuario, (usuario) => usuario.tareas, { cascade: true })
    @JoinTable()
    usuarios: Usuario[];

    @ManyToOne(() => ListadoTarea, lista => lista.tareas, { nullable: true, onDelete: 'SET NULL' })
     lista: ListadoTarea | null;

}
