import AppDataSource from "../../data-source";
import Categories from "../../entities/categories.entity";
import Properties from "../../entities/properties.entity";

const listPropertiesInCategoryService = async (id: string) => {
    
    const propertyRepository = AppDataSource.getRepository(Properties);

    const categoryRepository = AppDataSource.getRepository(Categories);
    
    const properties = await propertyRepository.find()


    const propertiesFiltered = properties.filter((property) => {
        
        return property.category
    });
    
    return propertiesFiltered;

};

export default listPropertiesInCategoryService;