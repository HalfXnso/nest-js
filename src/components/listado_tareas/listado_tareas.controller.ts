import { ListadoTareaService } from '../../services/listado_tareas.service';
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ListadoTarea } from './listado_tareas';

@Controller('listado-tareas')
export class ListadoTareasController {
  constructor(private readonly listadoTareasService: ListadoTareaService) {}

  @Post()
  create(@Body() createListadoTarea: ListadoTarea) {
    return this.listadoTareasService.create(createListadoTarea);
  }

  @Get()
  findAll() {
    this.listadoTareasService
    return this.listadoTareasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.listadoTareasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateListadoTarea: ListadoTarea) {
    return this.listadoTareasService.update(+id, updateListadoTarea);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.listadoTareasService.remove(+id);
  }
}
