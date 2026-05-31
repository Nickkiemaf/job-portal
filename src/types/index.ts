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

export interface JobType {
  employer_id: number,
  company_id?: number,
  title?: string,
  description?: string,
  location?: string,
  salary_min: number,
  salary_max?: number,
  skills_required?: string,
  experience_level?: string,
  employment_type?: string,
  status?: string,
  view_count?: number,
  job_id?: number
}

export interface ApplicationType {
  job_id?: number,
  seeker_id?: number,
  cover_letter?: string,
  resume_url?: string,
  status?: string
}

export interface CompanyType {
  user_id?: number,
  logo?: string,
  address?: string,
  company_size?: number
}