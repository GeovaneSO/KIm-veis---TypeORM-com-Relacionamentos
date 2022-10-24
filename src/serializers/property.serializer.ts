import * as yup from 'yup'
import createAddressSerializer from './address.serializer';

const createPropertySerializer = yup.object().shape({
    value: yup.number().required(),
    size: yup.number().required(),
    address: yup.object().shape({
        district: yup.string().required(),
        zipCode: yup.string().required(),
        number: yup.string().required(),
        city: yup.string().required(),
        state: yup.string().required()
        }),
    categoryId: yup.string().required()
});

export default createPropertySerializer;