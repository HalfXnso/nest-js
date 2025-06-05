import { Module } from '@nestjs/common';
import { UsuarioService } from '../../services/usuario.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './usuario.entity';
import { Evento } from '../evento/evento.entity';
import { UsuarioController } from './usuario.controller';
import { Tarea } from '../tareas/tarea.entity';
import { PerfilUsuario } from '../perfil_usuario/perfil_usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Evento, Tarea, PerfilUsuario])],
  controllers: [UsuarioController],
  providers: [UsuarioService],
})
export class UsuarioModule {}
