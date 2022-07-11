import { 
    EmptyFields,
    InvalidEmail,
    InvalidName,
    InvalidPassword,
    UserNotFound
} from './../error/CustomError';
import { 
    UserInput,
    LoginInputDTO,
    User 
} from "../model/User";
import { UserDatabase } from "../data/UserDatabase";
import { GeneratorID } from "../services/GeneratorID";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";


export class UserBusiness {

    async createUser(user: UserInput) {

        if(!user.name || !user.email || !user.password || !user.role) {
            throw new EmptyFields();
        }

        if(user.name.length < 3) {
            throw new InvalidName();
        }

        if(!user.email.includes("@")){
            throw new InvalidEmail();
        }

        if(user.password.length <= 6) {
            throw new InvalidPassword();
        }

        const idGenerator = new GeneratorID();
        const id = idGenerator.generate();

        const hashManager = new HashManager();
        const hashPassword = await hashManager.hash(user.password);

        const role =  User.stringToUserRole(user.role);

        const input = {
            id,
            name: user.name,
            email: user.email,
            password: hashPassword,
            role
        }
        
        const userDatabase = new UserDatabase();
        await userDatabase.createUser(input);

        const authenticator = new Authenticator();
        const accessToken = authenticator.generateToken({ id, role: user.role });

        return accessToken;
    }

    async getUserByEmail(user: LoginInputDTO) {

        if(!user.email || !user.password) {
            throw new EmptyFields();
        }

        if(!user.email.includes("@")){
            throw new InvalidEmail();
        }

        const userDatabase = new UserDatabase();
        const userFromDB = await userDatabase.getUserByEmail(user.email);

        const hashManager = new HashManager();
        const hashCompare = await hashManager.compare(user.password, userFromDB.getPassword());

        if(!hashCompare) {
            throw new InvalidPassword();
        }

        const authenticator = new Authenticator();
        const accessToken = authenticator.generateToken({ id: userFromDB.getId(), role: userFromDB.getRole() });

        return accessToken;
    }
}


