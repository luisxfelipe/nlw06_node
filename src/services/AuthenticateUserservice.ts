import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IAuthenticateUserService {
    email: string
    password: string
}

export class AuthenticateUserService {
    async execute({email, password}) {
        const usersRepositories = getCustomRepository(UsersRepositories)

        const user = await usersRepositories.findOne({
            email
        })

        if (!user || !await compare(password, user.password)) {
            throw new Error("Email/Password incorrect")
        }

        const token = sign({
            email: user.email
        }, "ea315d30ece1e76b93ad80530fe1b323", {
            subject : user.id,
            expiresIn: "1d"
        })

        return token
    }
}