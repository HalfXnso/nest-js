import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Evento } from './evento.entity';
import { EventoService } from '../../services/evento.service';
import { EventoController } from './evento.controller';
import { Usuario } from '../usuario/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Evento, Usuario])],
  providers: [EventoService],
  controllers: [EventoController],
})
export class EventoModule {}
