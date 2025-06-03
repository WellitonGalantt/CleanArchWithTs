import { Router } from "express";
import { PrismaClient } from "../../../../../generated/prisma";
import { ProductRepositoryPrisma } from "../../../../repositories/product.repository.prisma";
import { CreatProductUsecase } from "../../../../../application/use_cases/create_product.usecase";
import { CreateProductController } from "../../../../../interfaces/controllers/product/Create_product.controller";
import { ListProductsController } from "../../../../../interfaces/controllers/product/List_product.controller";
import { ListProductUsecase } from "../../../../../application/use_cases/list_product.usecase";


const router = Router();
const prisma = new PrismaClient();

const repository = ProductRepositoryPrisma.create(prisma);

const creatProductUsecase = CreatProductUsecase.create(repository);
const createController = new CreateProductController(creatProductUsecase);
router.post('/product', (req, res) => createController.handle(req, res));

const listProductUseCase = ListProductUsecase.create(repository);
const listProductController = new ListProductsController(listProductUseCase);
router.get('/product', (req, res) => listProductController.handle(req, res));

export default router;

