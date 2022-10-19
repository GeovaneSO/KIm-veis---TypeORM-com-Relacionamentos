import bcrypt from 'bcrypt'
import { IUserLogin } from "../../interfaces/users";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import jwt from "jsonwebtoken";
import { instanceToInstance } from "class-transformer";
import { createSessionSerializer } from "../../serializers";
import { AppError } from "../../errors/appErrors";

const userLoginService = async (user: IUserLogin): Promise <object> => {

    const serialized = await createSessionSerializer.validate(user, {
        abortEarly: true,
        stripUnknown: false
    });

    const userRepository = AppDataSource.getRepository(User);

    const findUser = await userRepository.findOneBy({email: serialized.email});

    if(!findUser) { throw new AppError(403, "Account not found")};

    const passwordMatch = await bcrypt.compare(serialized.password, findUser.password);

    if(!passwordMatch) {throw new AppError(403, 'Invalid email or password')};

    const token = jwt.sign(
        {
            email: serialized.email,
            isAdm: findUser.isAdm,
            isActive: findUser.isActive
        },
        '' + process.env.SECRET_KEY,
        {
            expiresIn: '24h',
            subject: findUser.id
        }   
    );

    const userData = instanceToInstance(findUser);
    
    return {token: token, user: userData};
}

export default userLoginService;