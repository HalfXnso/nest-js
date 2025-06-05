import { NestFactory } from '@nestjs/core'; // Ensure @nestjs/core is installed
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // Ensure AppModule is correctly defined and imported

  // Configura CORS antes de iniciar el servidor
  app.enableCors({
    origin: 'https://tfg-front-pi.vercel.app', // Cambia esto por la URL de tu frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(3000);
  console.log('Application is running on: http://localhost:3000');
}

void bootstrap();
