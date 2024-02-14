import { Test, TestingModule } from '@nestjs/testing';
import { PoupancaService } from './poupanca.service';
import { PrismaService } from '../../../database/PrismaService';
import { PoupancaDto } from './dto/poupanca.dto';
import { UpdatePoupancaDTO } from './dto/update-poupanca.dto';

const List = [
  {
    nome: "Minha Poupança 1",
    descricao: "Poupança para comprar pão",
    saldo: 1000.0,
    objetivo: 5000.0,
    userId: "ad2d7b15-0e70-40d1-a074-8762458fc17e"
  },
  {
    nome: "Minha Poupança 2",
    descricao: "Poupança para comprar pão",
    saldo: 1000.0,
    objetivo: 5000.0,
    userId: "ad2d7b15-0e70-40d1-a074-8762458fc17e"
  }
];

describe('PoupancaService', () => {
  let service: PoupancaService;
  let prismaService: PrismaService;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PoupancaService,
        {
          provide: PrismaService,
          useValue: {
            poupanca: {
              findMany: jest.fn().mockResolvedValue(List),
              create: jest.fn().mockResolvedValue(List[0]),
              findUnique: jest.fn().mockResolvedValue(List[0]),
              findFirst: jest.fn().mockResolvedValue(List[0]),
              update: jest.fn().mockResolvedValue(List[0]),
              delete: jest.fn().mockResolvedValue(List[1]),
            },
            user:{
              findUnique: jest.fn().mockResolvedValue({
                id: "ad2d7b15-0e70-40d1-a074-8762458fc17e",
                nome: "David Marcos",
                telefone: "123-456-7890",
                salario: 50000.00
              }),
            }
            
          },
        },
      
      ],
    }).compile();

    service = module.get<PoupancaService>(PoupancaService);
    prismaService = module.get<PrismaService>(PrismaService);

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  
  describe('findAll', () => {
    it('should return a list of documentsSubmission', async () => {
      const result = await service.findAll.execute();

      expect(result).toEqual(List);
      expect(prismaService.poupanca.findMany).toHaveBeenCalledTimes(1);

    });

    it('should throw an exception when service fails', async () => {
      jest.spyOn(service.findAll, 'execute').mockRejectedValueOnce(new Error('Service failed'));
      await expect(service.findAll.execute()).rejects.toThrowError(Error);
    });

  });

  describe('findOne', () => {
    it('should find a poupanca', async () => {

      const id = '0';

      const result = await service.findOne.execute(id);
      
      expect(result).toEqual(List[0]);
      expect(prismaService.poupanca.findFirst).toHaveBeenCalledWith({
        where: { id: id }
      });
      expect(prismaService.poupanca.findUnique).toHaveBeenCalledTimes(1);
    
    });

    it('should throw an exception when service fails', async () => {
      const id = '0';

      jest.spyOn(service.findOne, 'execute').mockRejectedValueOnce(new Error('Service failed'));
      await expect(service.findOne.execute(id)).rejects.toThrowError(Error);
    });


  });

  describe('create', () => {
    it('should create a new poupanca', async () => {
      const body: PoupancaDto = {
        "nome": "Minha Poupança 2",
        "descricao": "Poupança para comprar pão",
        "saldo": 1000.0,
        "objetivo": 5000.0,
        "userId":"ad2d7b15-0e70-40d1-a074-8762458fc17e"

      };
      
      const result = await service.create.execute(body);
      
      expect(result).toEqual(List[0]);
      expect(prismaService.poupanca.create).toHaveBeenCalledTimes(1);
      expect(prismaService.poupanca.create).toHaveBeenCalledWith({
        data: body,
      });
    
    });

    it('should throw an exception when service fails', async () => {
      const body: PoupancaDto = {
        "nome": "Minha Poupança 2",
        "descricao": "Poupança para comprar pão",
        "saldo": 1000.0,
        "objetivo": 5000.0,
        "userId": "ad2d7b15-0e70-40d1-a074-8762458fc17e"

      };
      jest.spyOn(service.create, 'execute').mockRejectedValueOnce(new Error('Service failed'));
      await expect(service.create.execute(body)).rejects.toThrowError(Error);
    });
  });

  describe('update', () => {
    it('should update a document', async () => {
      const body: UpdatePoupancaDTO = {
        "nome": "Minha Poupança 2",
        "descricao": "Poupança para comprar pão",
        "saldo": 1000.0,
        "objetivo": 5000.0,
        "userId": "ad2d7b15-0e70-40d1-a074-8762458fc17e"

      };
      const id = '0';

      const result = await service.update.execute(id,body);
      
      expect(result).toEqual(List[0]);
      expect(prismaService.poupanca.update).toHaveBeenCalledWith({
        where: { id: id },
        data: body,
      });
      expect(prismaService.poupanca.update).toHaveBeenCalledTimes(1);
    
    });

    it('should throw an exception when service fails', async () => {
      const body: UpdatePoupancaDTO = {
        "nome": "Minha Poupança 2",
        "descricao": "Poupança para comprar pão",
        "saldo": 1000.0,
        "objetivo": 5000.0,
        "userId": "ad2d7b15-0e70-40d1-a074-8762458fc17e"

      };

      const id = '0';

      jest.spyOn(service.update, 'execute').mockRejectedValueOnce(new Error('Service failed'));
      await expect(service.update.execute(id,body)).rejects.toThrowError(Error);
    });

  });

  describe('delete', () => {
    it('should delete a document', async () => {

      const id = '0';

      const result = await service.delete.execute(id);
      
      expect(result).toEqual(List[1]);
      expect(prismaService.poupanca.delete).toHaveBeenCalledTimes(1);
    
    });

    it('should throw an exception when service fails', async () => {
      const id = '0';

      jest.spyOn(service.delete, 'execute').mockRejectedValueOnce(new Error('Service failed'));
      await expect(service.delete.execute(id)).rejects.toThrowError(Error);
    });
  });

});

