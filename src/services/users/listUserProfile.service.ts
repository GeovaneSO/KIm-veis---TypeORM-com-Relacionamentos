import { AppError } from "./../../errors/appErrors";
import { IUser } from "../../interfaces/users/index";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";

const listUserProfileService = async (id: string): Promise<IUser> => {
    const userRepository = AppDataSource.getRepository(User);

    const findUser = await userRepository.findOneBy({id: id});

    if(findUser){return findUser};

    throw new AppError(400, 'User Not found');
};

export default listUserProfileService;