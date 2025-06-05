import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TareasService } from 'src/services/tareas.service';
import { Tarea } from './tarea.entity';


@Controller('tareas')
export class TareasController {
  constructor(private readonly tareasService: TareasService) {}

  @Get()
  getAll(): Promise<Tarea[]> {
    return this.tareasService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number): Promise<Tarea> {
    return this.tareasService.findOne(id);
  }

  @Post()
  create(@Body() tarea: Tarea): Promise<Tarea> {
    return this.tareasService.create(tarea);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() tarea: Partial<Tarea>,
  ): Promise<void> {
    return this.tareasService.update(id, tarea);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.tareasService.remove(id);
  }
}
