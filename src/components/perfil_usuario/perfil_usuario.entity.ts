import { Usuario } from "src/components/usuario/usuario.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class PerfilUsuario {

    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;


    @Column({ type: 'int'})
    tareasCompletadas: number;

    @OneToOne(() => Usuario, usuario => usuario.perfil, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id_usuario' }) 
    usuario: Usuario;
}
