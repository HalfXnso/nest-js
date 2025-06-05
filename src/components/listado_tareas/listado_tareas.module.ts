import { Module } from '@nestjs/common';
import { ListadoTareaService } from '../../services/listado_tareas.service';
import { ListadoTareasController } from './listado_tareas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListadoTarea } from './listado_tareas';
import { Tarea } from '../tareas/tarea.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ListadoTarea, Tarea])],
  controllers: [ListadoTareasController],
  providers: [ListadoTareaService],
})
export class ListadoTareaModule {}
