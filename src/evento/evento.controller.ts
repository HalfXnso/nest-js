import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { EventoService } from './evento.service';
import { Evento } from './evento.entity';

@Controller('eventos')
export class EventoController {
  constructor(private readonly eventoService: EventoService) {}

  @Get()
  getAll(): Promise<Evento[]> {
    return this.eventoService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number): Promise<Evento> {
    return this.eventoService.findOne(id);
  }

  @Post()
  create(@Body() evento: Evento): Promise<Evento> {
    return this.eventoService.create(evento);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() evento: Partial<Evento>): Promise<void> {
    return this.eventoService.update(id, evento);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.eventoService.remove(id);
  }
}
