import * as yup from 'yup'

const createAddressSerializer = yup.object().shape({
    district: yup.string().required(),
    zipCode: yup.string().required(),
    number: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required()
});

export default createAddressSerializer;