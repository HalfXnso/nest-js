import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ListadoTarea } from '../components/listado_tareas/listado_tareas';

@Injectable()
export class ListadoTareaService {
  constructor(
    @InjectRepository(ListadoTarea)
    private listadoTareaRepository: Repository<ListadoTarea>,
  ) {}

  // Obtener todas las tareas
  async findAll(): Promise<ListadoTarea[]> {
    return this.listadoTareaRepository.find({
      relations: ['tareas'], // Ajusta las relaciones según tu entidad
    });
  }

  // Obtener una tarea por ID
  async findOne(id: number): Promise<ListadoTarea | null> {
    return this.listadoTareaRepository.findOneBy({ id });
  }

  // Crear una nueva tarea
  async create(listadoTareaData: Partial<ListadoTarea>): Promise<ListadoTarea> {
    const tarea = this.listadoTareaRepository.create(listadoTareaData);
    return this.listadoTareaRepository.save(tarea);
  }

  // Actualizar una tarea existente
  async update(id: number, updateData: Partial<ListadoTarea>): Promise<ListadoTarea | null> {
    await this.listadoTareaRepository.update(id, updateData);
    return this.findOne(id);
  }

  // Eliminar una tarea
  async remove(id: number): Promise<void> {
    await this.listadoTareaRepository.delete(id);
  }
}
