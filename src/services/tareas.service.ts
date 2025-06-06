import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tarea } from 'src/components/tareas/tarea.entity';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';

@Injectable()

export class TareasService {
  constructor(
    @InjectRepository(Tarea)
    private tareasRepository: Repository<Tarea>,
  ) { }

  // Obtener todas las tareas
  async findAll(): Promise<Tarea[]> {
    return this.tareasRepository.find({
      relations: ['usuarios'], // Cargar la relación con Usuario
    });
  }

  async findOne(id: number): Promise<Tarea> {
    const tarea = await this.tareasRepository.findOne({ where: { id }, relations: ['usuarios'] });
    if (!tarea) {
      throw new Error(`Tarea with ID ${id} not found`);
    }
    return tarea;
  }

  async create(tarea: Tarea): Promise<Tarea> {
    return this.tareasRepository.save(tarea);
  }

  async update(id: number, tarea: Partial<Tarea>): Promise<void> {
    await this.tareasRepository.update(id, tarea);
  }

  async remove(id: number): Promise<void> {
    await this.tareasRepository.delete(id);
  }

  async findByRangoFechas(startDate: Date, endDate: Date): Promise<Tarea[]> {
    return this.tareasRepository.find({
      where: [
        {
          fechaInicio: LessThanOrEqual(endDate),
          fechaFin: MoreThanOrEqual(startDate),
        },
      ],
      relations: ['usuarios'],
    });
  }
}
