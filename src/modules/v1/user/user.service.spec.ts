import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../../../database/PrismaService';
import { UserDto } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';


const userList = [
  {
    id: 1,
    nome: "DAVID MARCOS",
    telefone: "123-456-7890",
    salario: 50000.00
  },
  {
    id: 2,
    nome: "Joao Pedro",
    telefone: "555-456-7890",
    salario: 30000.00
  }
];


describe('UserService', () => {
  let service: UserService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findMany: jest.fn().mockResolvedValue(userList),
              create: jest.fn().mockResolvedValue(userList[0]),
              findUnique: jest.fn().mockResolvedValue(userList[0]),
              findFirst: jest.fn().mockResolvedValue(userList[0]),
              update: jest.fn().mockResolvedValue(userList[0]),
              delete: jest.fn().mockResolvedValue(userList[1]),
            }
          },
        },
      
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a list of documentsSubmission', async () => {
      const result = await service.findAll.execute();

      expect(result).toEqual(userList);
      expect(prismaService.user.findMany).toHaveBeenCalledTimes(1);

    });

    it('should throw an exception when service fails', async () => {
      jest.spyOn(service.findAll, 'execute').mockRejectedValueOnce(new Error('Service failed'));
      await expect(service.findAll.execute()).rejects.toThrowError(Error);
    });

  });

  describe('findOne', () => {
    it('should find a user', async () => {

      const id = '0';

      const result = await service.findOne.execute(id);
      
      expect(result).toEqual(userList[0]);
      expect(prismaService.user.findFirst).toHaveBeenCalledWith({
        where: { id: id }
      });
      expect(prismaService.user.findUnique).toHaveBeenCalledTimes(1);
    
    });

    it('should throw an exception when service fails', async () => {
      const id = '0';

      jest.spyOn(service.findOne, 'execute').mockRejectedValueOnce(new Error('Service failed'));
      await expect(service.findOne.execute(id)).rejects.toThrowError(Error);
    });


  });

  describe('create', () => {
    it('should create a new user', async () => {
      const body: UserDto = {
        'id': '1', // 'id' is not required, so it can be omitted
        nome: "DAVID MARCOS",
        telefone: "123-456-7890",
        salario: 50000.00
      };
      
      const result = await service.create.execute(body);
      
      expect(result).toEqual(userList[0]);
      expect(prismaService.user.create).toHaveBeenCalledTimes(1);
      expect(prismaService.user.create).toHaveBeenCalledWith({
        data: body,
      });
    
    });

    it('should throw an exception when service fails', async () => {
      const body: UserDto = {
        'id': '1', // 'id' is not required, so it can be omitted
        nome: "DAVID MARCOS",
        telefone: "123-456-7890",
        salario: 50000.00
      };

      jest.spyOn(service.create, 'execute').mockRejectedValueOnce(new Error('Service failed'));
      await expect(service.create.execute(body)).rejects.toThrowError(Error);
    });
  });

  describe('update', () => {
    it('should update a document', async () => {
      const body: UpdateUserDTO = {
        nome: "DAVID MARCOS Santos Moura",
        telefone: "123-456-7890",
        salario: 50000.00
      };

      const id = '0';

      const result = await service.update.execute(id,body);
      
      expect(result).toEqual(userList[0]);
      expect(prismaService.user.update).toHaveBeenCalledWith({
        where: { id: id },
        data: body,
      });
      expect(prismaService.user.update).toHaveBeenCalledTimes(1);
    
    });

    it('should throw an exception when service fails', async () => {
      const body: UpdateUserDTO = {
        nome: "DAVID MARCOS Santos Moura",
        telefone: "123-456-7890",
        salario: 50000.00
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
      
      expect(result).toEqual(userList[1]);
      expect(prismaService.user.delete).toHaveBeenCalledTimes(1);
    
    });

    it('should throw an exception when service fails', async () => {
      const id = '0';

      jest.spyOn(service.delete, 'execute').mockRejectedValueOnce(new Error('Service failed'));
      await expect(service.delete.execute(id)).rejects.toThrowError(Error);
    });
  });

});

