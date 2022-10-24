import { hash } from "bcrypt";
import AppDataSource from "../../data-source";
import { IUser, IUserUpdate } from "../../interfaces/users";
import { instanceToInstance } from "class-transformer";
import { User } from "../../entities/user.entity";
import { updateUserSerializer } from "../../serializers";
import { AppError } from "../../errors/appErrors";

const updateUserService = async (user: IUserUpdate, isAdm: boolean, id: string, tokenId: string): Promise<IUser | string> => {

    const serialized = await updateUserSerializer.validate(user, {
        abortEarly: true,
        stripUnknown: false
    });
    
    const userRepository = AppDataSource.getRepository(User);
    
    const findUser = await userRepository.findOneBy({id});

    if(!findUser){return'User not found'};

    await userRepository.update(
        id,{
            name: serialized.name ? serialized.name : findUser!.name,
            email: serialized.email ? serialized.email : findUser!.email,
            password: serialized.password ? await hash(serialized.password, 10) : findUser!.password
        }
    );

    const updatedUser = instanceToInstance(await userRepository.findOneBy({id}));
    
    return updatedUser!;
}

export default updateUserService;