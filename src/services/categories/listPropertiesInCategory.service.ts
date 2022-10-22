import AppDataSource from "../../data-source";
import Properties from "../../entities/properties.entity";

const listPropertiesInCategoryService = async (id: string) => {
    const propertyRepository = AppDataSource.getRepository(Properties);

    const properties = await propertyRepository.find()
    // const propertiesInCategory = properties.find((property) => property. === id)
    return properties
}
export default listPropertiesInCategoryService;