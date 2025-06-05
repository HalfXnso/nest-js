import { Controller, Get, Param, Delete, Put, Body, Post } from '@nestjs/common';
import { UsuarioService } from '../../services/usuario.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './usuario.entity';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) { }


  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioService.findOne(+id);
  }

  @Post()
  create(@Body() usuario: Partial<Usuario>) {
    return this.usuarioService.create(usuario);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioService.remove(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() usuario: Partial<Usuario>) {
    return this.usuarioService.update(+id, usuario);
  }

}
