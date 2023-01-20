import { IUserLogin } from "../../interfaces/users";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import jwt from "jsonwebtoken";
import { instanceToInstance } from "class-transformer";

const userLoginService = async (user: IUserLogin): Promise <object> => {

    const userRepository = AppDataSource.getRepository(User);

    const findUser = await userRepository.findOneBy({email: user.email});

    const token = jwt.sign(
        {
            email: user.email,
            isAdm: findUser!.isAdm,
            isActive: findUser!.isActive
        },
        '' + process.env.SECRET_KEY,
        {
            expiresIn: '24h',
            subject: findUser!.id
        }   
    );

    const userData = instanceToInstance(findUser);
    
    return {token: token};

};

export default userLoginService;