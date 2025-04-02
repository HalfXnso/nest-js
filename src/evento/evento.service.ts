import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Evento } from './evento.entity';

@Injectable()
export class EventoService {
    constructor(
        @InjectRepository(Evento)
        private eventoRepository: Repository<Evento>,
    ) { }

    // Obtener todos los eventos
    async findAll(): Promise<Evento[]> {
        return this.eventoRepository.find();
    }

    // Obtener un evento por ID
    async findOne(id: number): Promise<Evento> {
        const evento = await this.eventoRepository.findOne({ where: { id } });
        if (!evento) {
            throw new Error(`Evento with ID ${id} not found`);
        }
        return evento;
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
