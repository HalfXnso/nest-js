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
      type: 'postgres', // Tipo de base de datos
      host: '127.0.0.1', // Dirección del servidor (local)
      port: 5432, // Puerto de PostgreSQL (por defecto)
      username: 'postgres', // 👈 Reemplaza con tu usuario de PostgreSQL
      password: 'Sistemas123@', // 👈 Reemplaza con tu contraseña
      database: 'back', // 👈 Nombre de la base de datos
      entities: [Evento, Usuario, Tarea, PerfilUsuario, ListadoTarea], // Las entidades que usará TypeORM
      synchronize: true, // Crea automáticamente las tablas (solo en desarrollo)
    }),
    EventoModule,
    UsuarioModule,
    TareasModule,
    PerfilUsuarioModule,
    ListadoTareaModule,
  ],
})
export class AppModule { }
