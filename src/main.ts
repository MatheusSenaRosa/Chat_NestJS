import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { CustomIoAdapter } from "./adapters";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: { origin: "*" },
  });

  app.useWebSocketAdapter(new CustomIoAdapter(app));

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3333);
}
bootstrap();
