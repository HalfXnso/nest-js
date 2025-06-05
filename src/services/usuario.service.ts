import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../components/usuario/usuario.entity';
import { PerfilUsuario } from 'src/components/perfil_usuario/perfil_usuario.entity';
@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,

        @InjectRepository(PerfilUsuario)
        private perfilUsuarioRepository: Repository<PerfilUsuario>
    ) { }
    // Obtener todos los usuarios
    async findAll(): Promise<Usuario[]> {
        return this.usuarioRepository.find({
            relations: ['eventos', 'tareas'],


        });
    }
    async findOne(id: number): Promise<Usuario | null> {
        return this.usuarioRepository.findOneBy({ id });
    }

    // Crear un nuevo usuario
    async create(usuarioData: Partial<Usuario>): Promise<Usuario> {
        const usuario = this.usuarioRepository.create(usuarioData);
        const nuevoUsuario = await this.usuarioRepository.save(usuario);

        const perfil = this.perfilUsuarioRepository.create({
            tareasCompletadas: 0,
            usuario: nuevoUsuario,
        });

        await this.perfilUsuarioRepository.save(perfil);

        return nuevoUsuario;
    }

    // Actualizar un usuario existente
    async update(id: number, updateData: Partial<Usuario>): Promise<Usuario | null> {
        await this.usuarioRepository.update(id, updateData);
        return this.findOne(id);
    }

    // Eliminar un usuario
    async remove(id: number): Promise<void> {
        const usuario = await this.usuarioRepository.findOne({
            where: { id },
            relations: ['tareas', 'eventos'], // 👈 importante
        });

        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }

        // Limpiar relaciones para evitar errores de integridad
        usuario.tareas = [];
        usuario.eventos = [];

        await this.usuarioRepository.save(usuario); // primero guarda los cambios
        await this.usuarioRepository.remove(usuario); // luego sí lo borras
    }



}
