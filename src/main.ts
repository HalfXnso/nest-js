import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const server = app.getHttpAdapter().getInstance();
  const routes = server._router?.stack
    .filter((layer: any) => layer.route)
    .map((layer: any) => layer.route.path); // Obtiene las rutas registradas
  console.log('Rutas registradas:', routes);
  await app.listen(3000); // Asegúrate de que el puerto sea el correcto

}
bootstrap();
