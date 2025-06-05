import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PerfilUsuario } from 'src/components/perfil_usuario/perfil_usuario.entity';

@Injectable()
export class PerfilUsuarioService {
  constructor(
    @InjectRepository(PerfilUsuario)
    private perfilUsuarioRepository: Repository<PerfilUsuario>,
  ) {}

  // Obtener todos los perfiles de usuario
  async findAll(): Promise<PerfilUsuario[]> {
    return this.perfilUsuarioRepository.find({
      relations: ['usuario'], // Ajusta las relaciones según tu entidad
    });
  }

  async findOne(id: number): Promise<PerfilUsuario> {
    const perfil = await this.perfilUsuarioRepository.findOne({ where: { id }, relations: ['usuario'] });
    if (!perfil) {
      throw new Error(`PerfilUsuario with ID ${id} not found`);
    }
    return perfil;
  }

  async create(perfil: PerfilUsuario): Promise<PerfilUsuario> {
    return this.perfilUsuarioRepository.save(perfil);
  }

  async update(id: number, perfil: Partial<PerfilUsuario>): Promise<void> {
    await this.perfilUsuarioRepository.update(id, perfil);
  }

  async remove(id: number): Promise<void> {
    await this.perfilUsuarioRepository.delete(id);
  }
}
