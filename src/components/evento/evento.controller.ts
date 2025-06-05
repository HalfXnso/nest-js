import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Patch,
  Query,
} from '@nestjs/common';
import { EventoService } from '../../services/evento.service';
import { Evento } from './evento.entity';

@Controller('eventos')
export class EventoController {
  constructor(private readonly eventoService: EventoService) { }

  @Get()
  getAll(): Promise<Evento[]> {
    return this.eventoService.findAll().then(eventos =>
      eventos.sort((a, b) => new Date(a.fechaInicio).getTime() - new Date(b.fechaInicio).getTime())
    );

  }

  @Get(':id')
  getOne(@Param('id') id: number): Promise<Evento> {
    return this.eventoService.findOne(id);
  }

  @Post()
  create(@Body() evento: Evento): Promise<Evento> {
    return this.eventoService.create(evento);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() evento: Partial<Evento>,
  ): Promise<void> {
    return this.eventoService.update(id, evento);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.eventoService.remove(id);
  }

  @Get('rango-fechas')
  getByRangoFechas(
    @Query('fechaInicio') fechaInicio: string,
    @Query('fechaFin') fechaFin: string,
  ): Promise<Evento[]> {
    const startDate = new Date(fechaInicio.replace(' ', 'T'));
    const endDate = new Date(fechaFin.replace(' ', 'T'));
    return this.eventoService.findByRangoFechas(startDate, endDate);
  }

   // Nuevo endpoint para interpretar comandos de voz
  @Post('asistente/comando')
  async interpretarComando(@Body() body: { texto: string }): Promise<{ respuesta: string }> {
    const texto = body.texto.toLowerCase();

    // Ejemplo básico para listar eventos hoy
    if (texto.includes('eventos') && texto.includes('hoy')) {
      const hoyInicio = new Date();
      hoyInicio.setHours(0, 0, 0, 0);
      const hoyFin = new Date();
      hoyFin.setHours(23, 59, 59, 999);

      const eventosHoy = await this.eventoService.findByRangoFechas(hoyInicio, hoyFin);

      if (eventosHoy.length === 0) {
        return { respuesta: 'No tienes eventos para hoy.' };
      } else {
        const listaEventos = eventosHoy.map(e => e.nombreEvento).join(', ');
        return { respuesta: `Tienes ${eventosHoy.length} eventos hoy: ${listaEventos}` };
      }
    }


    return { respuesta: 'No entendí el comando, intenta de nuevo.' };
  }


  @Post('asistente/dialogflow')
async dialogflowWebhook(@Body() body: any): Promise<any> {
  const query = body.queryResult.queryText?.toLowerCase();
  if (query.includes('eventos') && query.includes('hoy')) {
    const hoyInicio = new Date();
    hoyInicio.setHours(0, 0, 0, 0);
    const hoyFin = new Date();
    hoyFin.setHours(23, 59, 59, 999);

    const eventosHoy = await this.eventoService.findByRangoFechas(hoyInicio, hoyFin);

    if (eventosHoy.length === 0) {
      return {
        fulfillmentText: 'No tienes eventos para hoy.'
      };
    } else {
      const lista = eventosHoy.map(e => e.nombreEvento).join(', ');
      return {
        fulfillmentText: `Tienes ${eventosHoy.length} eventos hoy: ${lista}`
      };
    }
  }

  return {
    fulfillmentText: 'Lo siento, no entendí tu solicitud.'
  };
}

}
