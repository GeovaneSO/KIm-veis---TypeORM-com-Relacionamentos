import AppDataSource from "../../data-source";
import Addresses from "../../entities/addresses.entity";
import Categories from "../../entities/categories.entity";
import Properties from "../../entities/properties.entity";
import { createAddressSerializer, createPropertySerializer } from "../../serializers";
import { IProperty, IPropertyRequest } from "./../../interfaces/properties/index";

const createPropertyService = async (property: IPropertyRequest): Promise<IProperty> => {
    
    const propertyRepository = AppDataSource.getRepository(Properties);
    const addressRepository = AppDataSource.getRepository(Addresses);
    const categoryRepository = AppDataSource.getRepository(Categories);

    const serializedAddress = await createAddressSerializer.validate(property.address, {
        abortEarly: true,
        stripUnknown: false
    });    
    
    const newAddress = new Addresses();
    
    newAddress.city     = serializedAddress.city;
    newAddress.district = serializedAddress.district;
    newAddress.number   = serializedAddress.number!;
    newAddress.state    = serializedAddress.state;
    newAddress.zipCode  = serializedAddress.zipCode;
    
    addressRepository.create(newAddress);
    await addressRepository.save(newAddress);
    
    property.address = newAddress;

    const serializedProperty = await createPropertySerializer.validate(property, {
        abortEarly: true,
        stripUnknown: false
    });

    const category = await categoryRepository.findOneBy({id: serializedProperty.categoryId})

    const newProperty = propertyRepository.create(serializedProperty);

    newProperty.address = newAddress;

    if(category) {
    
        newProperty.category = category;
    
        await propertyRepository.save(newProperty);
        
    }
    return newProperty;
}

export default createPropertyService;