export interface UserProfile {
  user_id: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  address?: string;
  degree?: string;
  course?: string;
  university?: string;
  graduated_year?: string;
  role?: string;
  locations?: string[];
  current_lpa?: string;
  years_of_experience?: string;
  experience_level?: string[];
  job_type?: string[];
  work_mode?: string[];
  skills?: string[];
  onboarding_completed?: boolean;
  resume?: {
    url: string;
    name: string;
    updated_at: string;
  };
}
