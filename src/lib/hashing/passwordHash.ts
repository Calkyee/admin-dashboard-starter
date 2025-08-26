import { hash } from "bcrypt";


const passwordHash = async(password: string): Promise<string>=>{
  const hashedPassword = await hash(password, 10);
  return  hashedPassword
}

export default passwordHash; 