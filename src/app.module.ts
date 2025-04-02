import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventoModule } from './evento/evento.module'; // Importa el módulo de eventos
import { Evento } from './evento/evento.entity'; // Asegúrate de que la entidad esté importada

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // Tipo de base de datos
      host: '127.0.0.1', // Dirección del servidor (local)
      port: 5432, // Puerto de PostgreSQL (por defecto)
      username: 'postgres', // 👈 Reemplaza con tu usuario de PostgreSQL
      password: 'Sistemas123@', // 👈 Reemplaza con tu contraseña
      database: 'eventos_db', // 👈 Nombre de la base de datos
      entities: [Evento], // Las entidades que usará TypeORM
      synchronize: true, // Crea automáticamente las tablas (solo en desarrollo)
    }),
    EventoModule, // Asegúrate de importar el módulo de Evento
  ],
})
export class AppModule {}
