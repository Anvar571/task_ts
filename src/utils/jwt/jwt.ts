import jwt, { Secret } from "jsonwebtoken";

class Jwt {
    private secret: string = process.env.JWT_SECRET || "";
    private secret_key: Secret = this.secret;

    public async generateToken(payload: string): Promise<string> {
        try {
            const token = jwt.sign({_id: payload} , this.secret_key, { expiresIn: 60*60*60 });

            return token
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    public verifyToken(token: string) {
        try {
            if (!token) throw new Error("Invalid Authentication");
            console.log(token);
            
            const decod = jwt.verify(token, this.secret_key);
            console.log(decod);
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    public async refreshToken(payload: string): Promise<string> {
        const secret: string = process.env.REFRESH_TOKEN || "";
        const secret_key: Secret = secret;
        try {
            const token = jwt.sign({ _id: payload }, secret_key, { expiresIn: 60*60*60 });

            return token
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}

export default Jwt