import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appErrors";

const deleteUserService = async (id: string, isActive: boolean): Promise<string> => {
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOneBy({id});

    // if(!user ){throw new AppError(404,'Invalid id')};

    // if(!user.isActive ){throw new AppError(400,'Inactive user')};

    user!.isActive = false;

    await userRepository.save(user!);

    return '';
};

export default deleteUserService;