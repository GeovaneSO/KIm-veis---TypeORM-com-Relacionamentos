import AppDataSource from "../../data-source";
import Properties from "../../entities/properties.entity";

const listPropertiesPagination = async (page: string): Promise<object> => {

    const numberPage: number = parseInt(page, 8);

    const take = 10;

    const propertiesRepository = AppDataSource.getRepository(Properties);
   
    const total = await propertiesRepository.count()

    const properties = await propertiesRepository.find(
        {
            take: take,
            skip: (numberPage - 1) * take
        }
    );

    return {
        total,
        page,
        last_page: Math.ceil(total/take),
        properties,
    };

};

export default listPropertiesPagination;