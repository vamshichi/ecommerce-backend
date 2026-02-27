import  jwt  from "jsonwebtoken";
import { AppError } from "../../common/errors/AppErrors";
import { UserRepository } from "./user.repository";
import bcrypt from "bcrypt";
import { config } from "../../config/env";

export class UserService {
    private userRepository = new UserRepository();

    async register(email: string, password: string) {
        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser) {
            throw new AppError("Email already in use", 400);
        }

        const hashedPassword = await bcrypt.hash(password, 10);
         
        const user = await this.userRepository.createUser({ email, password: hashedPassword });

        const token = jwt.sign({userId: user.id, role: user.role }, config.jwtSecret, { expiresIn: "1h" });

        return {
            id : user.id,
            email: user.email,
            role: user.role,
            token
        }
}

    async login(email: string, password: string) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new AppError("Invalid email or password", 401);
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new AppError("Invalid email or password", 401);
        }

        const token = jwt.sign({ userId: user.id, role: user.role }, config.jwtSecret, { expiresIn: "1h" });

        return {
            id : user.id,
            email: user.email,
            role: user.role,
            token
        }
    }

    async getAllUsers() {
        return await this.userRepository.getAllUsers();
  };
}

