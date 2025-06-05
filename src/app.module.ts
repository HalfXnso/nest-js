import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventoModule } from './components/evento/evento.module'; // Importa el módulo de eventos
import { Evento } from './components/evento/evento.entity'; // Asegúrate de que la entidad esté importada
import { UsuarioModule } from './components/usuario/usuario.module'; // Importa el módulo de usuarios
import { Usuario } from './components/usuario/usuario.entity'; // Asegúrate de que la entidad esté importada
import { TareasModule } from './components/tareas/tareas.module';
import { Tarea } from './components/tareas/tarea.entity';
import { PerfilUsuarioModule } from './components/perfil_usuario/perfil_usuario.module';
import { PerfilUsuario } from './components/perfil_usuario/perfil_usuario.entity';
import { ListadoTareaModule } from './components/listado_tareas/listado_tareas.module';
import { ListadoTarea } from './components/listado_tareas/listado_tareas';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'dpg-d10vg06mcj7s73c3ss0g-a.frankfurt-postgres.render.com', // Host de Render
      port: 5432, // Puerto estándar de PostgreSQL
      username: 'dbackend_user', // Usuario de Render
      password: 'ImS4LqJU4pRDBLsqQfvGpZIY5GdRJr2V', // Contraseña de Render
      database: 'dbackend', // Nombre de la base de datos en Render
      entities: [Evento, Usuario, Tarea, PerfilUsuario, ListadoTarea],
      synchronize: true, // ¡Cuidado! Solo en desarrollo
      ssl: true, // Necesario para conexiones con Render
      extra: {
        ssl: {
          rejectUnauthorized: false // Necesario para Render
        }
      }
    }),
    EventoModule,
    UsuarioModule,
    TareasModule,
    PerfilUsuarioModule,
    ListadoTareaModule,
  ],
})
export class AppModule { }
