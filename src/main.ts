import { AppModule } from './modules/app/app.module';
import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as config from 'config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  initializeSwagger(app);
  await app.listen(config.get('server.port'));
}

function initializeSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('Orders management APIs')
    .setDescription(
      'APIs specification for Orders Management service | [swagger.json](swagger.json)',
    )
    .setVersion('1.0')
    .addBearerAuth({ type: 'apiKey', name: 'access-token', in: 'header' })
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(config.get('service.docsBaseUrl'), app, document, {
    swaggerOptions: {
      displayOperationId: true,
    },
  });
}
bootstrap();
