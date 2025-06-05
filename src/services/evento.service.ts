import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { Evento } from '../components/evento/evento.entity';

@Injectable()
export class EventoService {
  constructor(
    @InjectRepository(Evento)
    private eventoRepository: Repository<Evento>,
  ) {}

  // Obtener todos los eventos
  async findAll(): Promise<Evento[]> {
    return this.eventoRepository.find({
      relations: ['usuarios'], // Cargar la relación con Usuario

    });
  }

  // Obtener un evento por ID
  async findOne(id: number): Promise<Evento> {
    const evento = await this.eventoRepository.findOne({ where: { id }, relations: ['usuarios'] });
    if (!evento) {
      throw new Error(`Evento with ID ${id} not found`);
    }
    return evento;
  }

  // Obtener eventos entre dos fechas (incluyendo eventos que se solapan con el rango)
  async findByRangoFechas(startDate: Date, endDate: Date): Promise<Evento[]> {

    return this.eventoRepository.find({
      where: [
        {
          fechaInicio: LessThanOrEqual(endDate),
          fechaFin: MoreThanOrEqual(startDate),
        },
      ],
      relations: ['usuarios'],
    });
  }

  // Crear un nuevo evento
  async create(evento: Evento): Promise<Evento> {
    return this.eventoRepository.save(evento);
  }

  // Actualizar un evento
  async update(id: number, evento: Partial<Evento>): Promise<void> {
    await this.eventoRepository.update(id, evento);
  }

  // Eliminar un evento
  async remove(id: number): Promise<void> {
    await this.eventoRepository.delete(id);
  }


}
