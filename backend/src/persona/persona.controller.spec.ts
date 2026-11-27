import { Test, TestingModule } from '@nestjs/testing';
import { PersonaController } from './persona.controller';
import { PersonaService } from './persona.service';

describe('PersonaController', () => {
  let controller: PersonaController;
  const service = { create: jest.fn(), findAll: jest.fn(), findOne: jest.fn(), update: jest.fn(), remove: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PersonaController],
      providers: [{ provide: PersonaService, useValue: service }],
    }).compile();

    controller = module.get<PersonaController>(PersonaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('delega findOne al servicio', async () => {
    service.findOne.mockResolvedValue({ idPersona: 'x' });
    await expect(controller.findOne('x')).resolves.toEqual({ idPersona: 'x' });
    expect(service.findOne).toHaveBeenCalledWith('x');
  });
});
