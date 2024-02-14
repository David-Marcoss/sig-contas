import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service'
import { UserDto } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';


const newUser = {
  nome: "DAVID MARCOS",
  telefone: "123-456-7890",
  salario: 50000.00
};

const updateUser = {
  nome: "DAVID MARCOS Santos Moura",
  telefone: "123-456-7890",
  salario: 50000.00
};

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


describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide:UserService,
          useValue: {
            create: {execute: jest.fn().mockResolvedValue(newUser)},
            update: {execute: jest.fn().mockResolvedValue(updateUser)},
            delete: {execute: jest.fn().mockResolvedValue(userList[1])},
            findOne: {execute: jest.fn().mockResolvedValue(userList[0])},
            findAll: {execute: jest.fn().mockResolvedValue(userList)},
          }
        }
      ],

    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);

  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a list of document submissions', async () => {
      
      const result = await controller.findAll();
      expect(result).toEqual(userList);
      expect(service.findAll.execute).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception when service fails', async () => {
      jest.spyOn(service.findAll, 'execute').mockRejectedValueOnce(new Error('Service failed'));
      await expect(controller.findAll()).rejects.toThrowError(Error);
    });
  });

  describe('create', () => {
    it('should create a new document submission', async () => {
      const body: UserDto = {
        'id': '1', // 'id' is not required, so it can be omitted
        nome: "DAVID MARCOS",
        telefone: "123-456-7890",
        salario: 50000.00
      };

      const result = await controller.create(body);
      expect(result).toEqual(newUser);
      expect(service.create.execute).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception when service fails', async () => {
      const body: UserDto = {
        'id': '1', // 'id' is not required, so it can be omitted
        nome: "DAVID MARCOS",
        telefone: "123-456-7890",
        salario: 50000.00
      };
      jest.spyOn(service.create, 'execute').mockRejectedValueOnce(new Error('Service failed'));
      await expect(controller.create(body)).rejects.toThrowError(Error);
    });
  });

  describe('findOne', () => {
    it('should get a document submission', async () => {

      const result = await controller.findOne('1');
      expect(result).toEqual(userList[0]);
      expect(service.findOne.execute).toHaveBeenCalledWith('1');

    });

    it('should throw an exception when service fails', async () => {
      jest.spyOn(service.findOne, 'execute').mockRejectedValueOnce(new Error('Service failed'));
      await expect(controller.findOne('1')).rejects.toThrowError(Error);
    });
  });

  describe('update', () => {
    it('should update a document submission', async () => {
      const body: UpdateUserDTO = {
        nome: "DAVID MARCOS Santos Moura",
        telefone: "123-456-7890",
        salario: 50000.00
      };

      const result = await controller.update('1', body);
      expect(result).toEqual(updateUser);
      expect(service.update.execute).toHaveBeenCalledWith('1', body);
    });

    it('should throw an exception when service fails', async () => {
      const body: UpdateUserDTO = {
        nome: "DAVID MARCOS Santos Moura",
        telefone: "123-456-7890",
        salario: 50000.00
      };

      jest.spyOn(service.update, 'execute').mockRejectedValueOnce(new Error('Service failed'));
      await expect(controller.update('1', body)).rejects.toThrowError(Error);
    });
  });

  describe('delete', () => {
    it('should delete a document submission', async () => {
      const result = await controller.remove('1');
      expect(result).toEqual(userList[1]);
      expect(service.delete.execute).toHaveBeenCalledWith('1');
    });

    it('should throw an exception when service fails', async () => {
      jest.spyOn(service.delete, 'execute').mockRejectedValueOnce(new Error('Service failed'));
      await expect(controller.remove('1')).rejects.toThrowError(Error);
    });
  });

});
