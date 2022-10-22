import * as yup from 'yup';

const createCategorySerializer = yup.object().shape({
    name: yup.string().required()
});
// const listCategorySerializer = yup.o
export default createCategorySerializer;