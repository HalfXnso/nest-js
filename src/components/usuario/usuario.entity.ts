import { Evento } from 'src/components/evento/evento.entity';
import { PerfilUsuario } from '../perfil_usuario/perfil_usuario.entity';
import { Tarea } from '../tareas/tarea.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToOne } from 'typeorm';

@Entity()
export class Usuario {

    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column()
    nombreUsuario: string;

    @Column()
    password: string;

    @Column()
    nombre: string;

    @Column()
    apellido: string;

    @Column()
    correo: string;

    // Relación N:N con Evento usando tabla intermedia
    @ManyToMany(() => Evento, evento => evento.usuarios)
    eventos: Evento[];

    @ManyToMany(() => Tarea, tarea => tarea.usuarios)
    tareas: Tarea[];

    @OneToOne(() => PerfilUsuario, perfil => perfil.usuario, {
        cascade: true,
    })
    perfil: PerfilUsuario;

}
