
interface IUser {
    username: string,
    password: string,
    email: string,
    firstname: string
}

interface IUserUpdate{
    username: string,
    email: string,
    firstname: string
}

export {IUser, IUserUpdate}