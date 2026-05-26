export interface User {
  first_name: string,
  last_name: string,
  email: string,
  password: string,
  role: string,
  resume?: string,
  experience?: string,
  logo?: string,
  address?: string,
  company_size?: string,
  users_id?: number
}

export interface SignupUser {
  email: string,
  password: string
}

export interface TokenGeneratorType {
  user_id: number,
  role: string
}
