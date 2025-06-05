import { Module } from '@nestjs/common';
import { TareasService } from 'src/services/tareas.service';
import { TareasController } from './tareas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tarea } from './tarea.entity';
import { Usuario } from 'src/components/usuario/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tarea, Usuario])],
  controllers: [TareasController],
  providers: [TareasService],
})
export class TareasModule {}
