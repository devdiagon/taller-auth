import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PersonaService } from './persona.service.js';
import { Persona } from './entities/persona.entity.js';

describe('PersonaService', () => {
  let service: PersonaService;
  const repo = {
    create: vi.fn((x) => x),
    save: vi.fn(async (x) => x),
    find: vi.fn(),
    findOneBy: vi.fn(),
    remove: vi.fn(),
  };

  beforeEach(async () => {
    vi.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [PersonaService, { provide: getRepositoryToken(Persona), useValue: repo }],
    }).compile();

    service = module.get<PersonaService>(PersonaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create guarda la persona', async () => {
    const dto = { nombres: 'Ana', apellidos: 'Pérez', identificacion: '1', correo: 'a@b.com' };
    await expect(service.create(dto)).resolves.toEqual(dto);
    expect(repo.save).toHaveBeenCalled();
  });

  it('create traduce violación de unicidad a 409', async () => {
    repo.save.mockRejectedValueOnce({ driverError: { code: '23505', detail: 'dup' } });
    await expect(
      service.create({ nombres: 'A', apellidos: 'B', identificacion: '1', correo: 'a@b.com' }),
    ).rejects.toMatchObject({ status: 409 });
  });

  it('findOne lanza NotFound si no existe', async () => {
    repo.findOneBy.mockResolvedValue(null);
    await expect(service.findOne('x')).rejects.toBeInstanceOf(NotFoundException);
  });

  it('update aplica los cambios', async () => {
    repo.findOneBy.mockResolvedValue({ idPersona: 'x', nombres: 'Ana' });
    await expect(service.update('x', { nombres: 'Luz' })).resolves.toMatchObject({ nombres: 'Luz' });
  });

  it('remove elimina la persona', async () => {
    repo.findOneBy.mockResolvedValue({ idPersona: 'x' });
    await expect(service.remove('x')).resolves.toEqual({ deleted: true, id: 'x' });
    expect(repo.remove).toHaveBeenCalled();
  });
});
