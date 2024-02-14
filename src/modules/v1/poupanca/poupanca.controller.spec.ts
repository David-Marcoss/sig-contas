import { Test, TestingModule } from '@nestjs/testing';
import { PoupancaController } from './poupanca.controller';
import { PoupancaService } from './poupanca.service';
import { PoupancaDto } from './dto/poupanca.dto';
import { UpdatePoupancaDTO } from './dto/update-poupanca.dto';

const novo = {
  "nome": "Minha Poupança 2",
  "descricao": "Poupança para comprar pão",
  "saldo": 1000.0,
  "objetivo": 5000.0,
  "userId": "ad2d7b15-0e70-40d1-a074-8762458fc17e"
}

const update = {
  "nome": "Minha Poupança 2",
  "descricao": "Poupança para comprar pão",
  "saldo": 1000.0,
  "objetivo": 5000.0,
  "userId": "ad2d7b15-0e70-40d1-a074-8762458fc17e"
}

const List = [
  {
    "nome": "Minha Poupança 1",
    "descricao": "Poupança para comprar pão",
    "saldo": 1000.0,
    "objetivo": 5000.0,
    "userId": "ad2d7b15-0e70-40d1-a074-8762458fc17e"
  },
  {
    "nome": "Minha Poupança 2",
    "descricao": "Poupança para comprar pão",
    "saldo": 1000.0,
    "objetivo": 5000.0,
    "userId": "ad2d7b15-0e70-40d1-a074-8762458fc17e"
  }
];

describe('PoupancaController', () => {
  let controller: PoupancaController;
  let service: PoupancaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PoupancaController],
      providers: [
        {
          provide:PoupancaService,
          useValue: {
            create: {execute: jest.fn().mockResolvedValue(novo)},
            update: {execute: jest.fn().mockResolvedValue(update)},
            delete: {execute: jest.fn().mockResolvedValue(List[1])},
            findOne: {execute: jest.fn().mockResolvedValue(List[0])},
            findAll: {execute: jest.fn().mockResolvedValue(List)},
          }
        }]
    }).compile();

    controller = module.get<PoupancaController>(PoupancaController);
    service = module.get<PoupancaService>(PoupancaService);

  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('findAll', () => {
    it('should return a list of document submissions', async () => {
      
      const result = await controller.findAll();
      expect(result).toEqual(List);
      expect(service.findAll.execute).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception when service fails', async () => {
      jest.spyOn(service.findAll, 'execute').mockRejectedValueOnce(new Error('Service failed'));
      await expect(controller.findAll()).rejects.toThrowError(Error);
    });
  });

  describe('create', () => {
    it('should create a new document submission', async () => {
      const body: PoupancaDto = {
        "nome": "Minha Poupança 2",
        "descricao": "Poupança para comprar pão",
        "saldo": 1000.0,
        "objetivo": 5000.0,
        "userId": "1"

      };

      const result = await controller.create(body);
      expect(result).toEqual(novo);
      expect(service.create.execute).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception when service fails', async () => {
      const body: PoupancaDto = {
        "nome": "Minha Poupança 2",
        "descricao": "Poupança para comprar pão",
        "saldo": 1000.0,
        "objetivo": 5000.0,
        "userId": "1"

      };
      jest.spyOn(service.create, 'execute').mockRejectedValueOnce(new Error('Service failed'));
      await expect(controller.create(body)).rejects.toThrowError(Error);
    });
  });

  describe('findOne', () => {
    it('should get a document submission', async () => {

      const result = await controller.findOne('1');
      expect(result).toEqual(List[0]);
      expect(service.findOne.execute).toHaveBeenCalledWith('1');

    });

    it('should throw an exception when service fails', async () => {
      jest.spyOn(service.findOne, 'execute').mockRejectedValueOnce(new Error('Service failed'));
      await expect(controller.findOne('1')).rejects.toThrowError(Error);
    });
  });

  describe('update', () => {
    it('should update a document submission', async () => {
      const body: UpdatePoupancaDTO = {
        "nome": "Minha Poupança 2",
        "descricao": "Poupança para comprar pão",
        "saldo": 1000.0,
        "objetivo": 5000.0,
        "userId": "1"

      };

      const result = await controller.update('1', body);
      expect(result).toEqual(List[1]);
      expect(service.update.execute).toHaveBeenCalledWith('1', body);
    });

    it('should throw an exception when service fails', async () => {
      const body: UpdatePoupancaDTO = {
        "nome": "Minha Poupança 2",
        "descricao": "Poupança para comprar pão",
        "saldo": 1000.0,
        "objetivo": 5000.0,
        "userId": "1"

      };
      jest.spyOn(service.update, 'execute').mockRejectedValueOnce(new Error('Service failed'));
      await expect(controller.update('1', body)).rejects.toThrowError(Error);
    });
  });

  describe('delete', () => {
    it('should delete a document submission', async () => {
      const result = await controller.remove('1');
      expect(result).toEqual(List[1]);
      expect(service.delete.execute).toHaveBeenCalledWith('1');
    });

    it('should throw an exception when service fails', async () => {
      jest.spyOn(service.delete, 'execute').mockRejectedValueOnce(new Error('Service failed'));
      await expect(controller.remove('1')).rejects.toThrowError(Error);
    });
  });

});
