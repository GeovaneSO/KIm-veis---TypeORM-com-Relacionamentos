import AppDataSource from "../../data-source";
import Categories from "../../entities/categories.entity";

const listPropertiesInCategoryService = async (id: string) => {

    const categoryRepository = AppDataSource.getRepository(Categories);
    
    const categories = await categoryRepository.findOne({
        relations: {
            properties: true
        },
        where:{
            id
        }
    });

    return categories;

};

export default listPropertiesInCategoryService;