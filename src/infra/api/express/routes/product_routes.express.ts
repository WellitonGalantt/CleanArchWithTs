import { Router } from "express";
import { PrismaClient } from "../../../../generated/prisma";
import { ProductRepositoryPrisma } from "../../../repositories/product.repository.prisma";
import { CreatProductUsecase } from "../../../../application/use_cases/create_product.usecase";
import { CreateProductController } from "../../../../interfaces/controllers/product/Create_product.controller";


const router = Router();
const prisma = new PrismaClient();

const repository = ProductRepositoryPrisma.create(prisma);
const creatProductUsecase = CreatProductUsecase.create(repository);
const controller = new CreateProductController(creatProductUsecase);

router.post('/product', (req, res) => controller.handle(req, res));

export default router;

