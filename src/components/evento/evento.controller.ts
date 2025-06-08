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
        return {
          respuesta: `Tienes ${eventosHoy.length} ${eventosHoy.length === 1 ? 'evento' : 'eventos'} hoy: ${eventosHoy.length === 1
            ? eventosHoy[0].nombreEvento
            : eventosHoy.slice(0, -1).map(e => e.nombreEvento).join(', ') + ' y ' + eventosHoy[eventosHoy.length - 1].nombreEvento
            }`
        };
      }
    }
    if (texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes('que piensas')) {
      return { respuesta: 'Yo la verdad, te suspendería por pringao.' };
    }
    return { respuesta: 'No entendí el comando, intenta de nuevo.' };
  }


  @Post('asistente/dialogflow')
  async dialogflowWebhook(@Body() body: any): Promise<any> {
    try {
      const query = body.queryResult?.queryText?.toLowerCase() || '';

      if (query.includes('eventos') && query.includes('hoy')) {
        const hoyInicio = new Date();
        hoyInicio.setHours(0, 0, 0, 0);
        const hoyFin = new Date();
        hoyFin.setHours(23, 59, 59, 999);

        const eventosHoy = await this.eventoService.findByRangoFechas(hoyInicio, hoyFin);
        const respuesta = eventosHoy.length === 0
          ? 'No tienes eventos para hoy.'
          : `Tienes ${eventosHoy.length} ${eventosHoy.length === 1 ? 'evento' : 'eventos'} hoy: ${eventosHoy.length === 1
            ? eventosHoy[0].nombreEvento
            : eventosHoy.slice(0, -1).map(e => e.nombreEvento).join(', ') + ' y ' + eventosHoy[eventosHoy.length - 1].nombreEvento
          }`;

        return { respuesta };  // Asegúrate de devolver un objeto con la propiedad "respuesta"
      }

      if (query.normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes('que piensas')) {
        return { respuesta: 'Yo la verdad, te suspendería por pringao.' };
      }

      return { respuesta: 'Lo siento, no entendí tu solicitud.' };
    } catch (error) {
      console.error('Error en dialogflowWebhook:', error);
      return { respuesta: 'Hubo un error al procesar tu solicitud.' };
    }
  }

}
