import AppDataSource from "../../data-source";
import Categories from "../../entities/categories.entity";
import { createCategorySerializer } from "../../serializers";
import { ICategory, ICategoryRequest } from "./../../interfaces/categories/index";

const createCategoryService = async (category: ICategoryRequest): Promise<ICategory> => {

    const serialized = await createCategorySerializer.validate(category, {
        abortEarly: true,
        stripUnknown: false
    });

    const {name} = serialized;

    const categoryRepository = AppDataSource.getRepository(Categories);

    const newCategory = categoryRepository.create({name});

    await categoryRepository.save(newCategory);

    return newCategory;

};

export default createCategoryService;