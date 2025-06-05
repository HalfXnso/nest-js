import { Module } from '@nestjs/common';
import { PerfilUsuarioService } from 'src/services/perfil_usuario.service';
import { PerfilUsuarioController } from './perfil_usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PerfilUsuario } from './perfil_usuario.entity';
import { Usuario } from 'src/components/usuario/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PerfilUsuario,Usuario])],
  controllers: [PerfilUsuarioController],
  providers: [PerfilUsuarioService],
})
export class PerfilUsuarioModule {}
