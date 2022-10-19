import * as yup from 'yup'

const createUserSerializer = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    isAdm: yup.boolean().required()
});

const updateUserSerializer = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().notRequired()
});

export { createUserSerializer, updateUserSerializer }