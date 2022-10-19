import { instanceToInstance } from "class-transformer";
import bcrypt from "bcrypt";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUser, IUserRequest } from "../../interfaces/users/index";
import { createUserSerializer } from "../../serializers";
import { AppError } from "../../errors/appErrors";

const createUserService = async (userRequest: IUserRequest): Promise<IUser> => {

    const serialized = await createUserSerializer.validate(userRequest, {
        abortEarly: true,
        stripUnknown: false
    });

    const {email, name, isAdm, password} = serialized;

    const userRepository = AppDataSource.getRepository(User);

    if(!serialized.password){throw new AppError(400, 'Password is missing')};

    const hashedPassword = await bcrypt.hash(password, 10);

    const isActive: boolean = true;

    const user = userRepository.create({name, email, password: hashedPassword, isAdm, isActive});

    await userRepository.save(user);

    const newUser = instanceToInstance(user);

    return newUser;
};

export default createUserService;