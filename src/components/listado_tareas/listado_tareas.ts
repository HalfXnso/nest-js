import { Tarea } from "../tareas/tarea.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ListadoTarea {
constructor(){}


 @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @OneToMany(() => Tarea, tarea => tarea.lista)
  tareas: Tarea[];
    
}
