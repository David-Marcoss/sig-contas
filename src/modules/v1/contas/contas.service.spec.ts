import { Test, TestingModule } from '@nestjs/testing';
import { ContasService } from './contas.service';
import { PrismaService } from '../../../database/PrismaService';
import { ContasDTO } from './dto/contas.dto';
import { UpdateContaDTO } from './dto/update-contas.dto';

const List = [
  {
    "nome": "Minha Conta 1",
    "categoria": "Conta para comprar pão",
    "saldo": 1000.0,
    "userId": "ad2d7b15-0e70-40d1-a074-8762458fc17e"
  },
  {
    "nome": "Minha Conta 2",
    "categoria": "Conta para comprar pão",
    "saldo": 1000.0,
    "userId": "ad2d7b15-0e70-40d1-a074-8762458fc17e"
  }
];


describe('ContasService', () => {
  let service: ContasService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContasService,
        {
          provide: PrismaService,
          useValue: {
            contas: {
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

    service = module.get<ContasService>(ContasService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('findAll', () => {
    it('should return a list of documentsSubmission', async () => {
      const result = await service.findAll.execute();

      expect(result).toEqual(List);
      expect(prismaService.contas.findMany).toHaveBeenCalledTimes(1);

    });

    it('should throw an exception when service fails', async () => {
      jest.spyOn(service.findAll, 'execute').mockRejectedValueOnce(new Error('Service failed'));
      await expect(service.findAll.execute()).rejects.toThrowError(Error);
    });

  });

  describe('findOne', () => {
    it('should find a contas', async () => {

      const id = '0';

      const result = await service.findOne.execute(id);
      
      expect(result).toEqual(List[0]);
      expect(prismaService.contas.findFirst).toHaveBeenCalledWith({
        where: { id: id }
      });
      expect(prismaService.contas.findUnique).toHaveBeenCalledTimes(1);
    
    });

    it('should throw an exception when service fails', async () => {
      const id = '0';

      jest.spyOn(service.findOne, 'execute').mockRejectedValueOnce(new Error('Service failed'));
      await expect(service.findOne.execute(id)).rejects.toThrowError(Error);
    });


  });

  describe('create', () => {
    it('should create a new contas', async () => {
      const body: ContasDTO = {
        "nome": "talao de luz",
        "categoria": "despesas",
        "valor": 100,
        "userId":"ad2d7b15-0e70-40d1-a074-8762458fc17e" 
    };
      
      const result = await service.create.execute(body);
      
      expect(result).toEqual(List[0]);
      expect(prismaService.contas.create).toHaveBeenCalledTimes(1);
      expect(prismaService.contas.create).toHaveBeenCalledWith({
        data: body,
      });
    
    });

    it('should throw an exception when service fails', async () => {
      const body: ContasDTO = {
        "nome": "talao de luz",
        "categoria": "despesas",
        "valor": 100,
        "userId":"ad2d7b15-0e70-40d1-a074-8762458fc17e" 
      };
      
      jest.spyOn(service.create, 'execute').mockRejectedValueOnce(new Error('Service failed'));
      await expect(service.create.execute(body)).rejects.toThrowError(Error);
    });
  });

  describe('update', () => {
    it('should update a document', async () => {
      const body: UpdateContaDTO = {
        "nome": "talao de luz",
        "categoria": "despesas",
        "valor": 100,
        "userId":"ad2d7b15-0e70-40d1-a074-8762458fc17e" 
    };
      const id = '0';

      const result = await service.update.execute(id,body);
      
      expect(result).toEqual(List[0]);
      expect(prismaService.contas.update).toHaveBeenCalledWith({
        where: { id: id },
        data: body,
      });
      expect(prismaService.contas.update).toHaveBeenCalledTimes(1);
    
    });

    it('should update a document', async () => {
      const body: UpdateContaDTO = {
        "nome": "talao de luz",
        "categoria": "despesas",
        "valor": 100,
        "userId":"ad2d7b15-0e70-40d1-a074-8762458fc17e" 
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
      expect(prismaService.contas.delete).toHaveBeenCalledTimes(1);
    
    });

    it('should throw an exception when service fails', async () => {
      const id = '0';

      jest.spyOn(service.delete, 'execute').mockRejectedValueOnce(new Error('Service failed'));
      await expect(service.delete.execute(id)).rejects.toThrowError(Error);
    });
  });

});