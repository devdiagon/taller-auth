import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PersonaModule } from './persona/persona.module.js';

@Module({
  imports: [PersonaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
