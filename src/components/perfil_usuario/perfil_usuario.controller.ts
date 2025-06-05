import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PerfilUsuarioService } from 'src/services/perfil_usuario.service';
import { PerfilUsuario } from './perfil_usuario.entity';


@Controller('perfil-usuario')
export class PerfilUsuarioController {
  constructor(private readonly perfilUsuarioService: PerfilUsuarioService) {}

  @Post()
  create(@Body() createPerfilUsuario: PerfilUsuario) {
    return this.perfilUsuarioService.create(createPerfilUsuario);
  }

  @Get()
  findAll() {
    return this.perfilUsuarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.perfilUsuarioService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePerfilUsuario: PerfilUsuario) {
    return this.perfilUsuarioService.update(+id, updatePerfilUsuario);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.perfilUsuarioService.remove(+id);
  }
}
