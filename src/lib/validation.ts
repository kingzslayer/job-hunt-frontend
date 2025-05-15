import { z } from 'zod';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

export const preferencesSchema = z.object({
  personalInfo: z.object({
    first_name: z.string().min(3, { message: 'First name must be at least 3 characters long.' }),
    last_name: z.string().min(1, { message: 'Last name must be at least 1 characters long.' }),
    email: z.string().email({
      message: 'Enter a valid email address.',
    }),
    phone: z.string().refine(
      (value) => {
        const phone = parsePhoneNumberFromString(value);
        return phone?.isValid();
      },
      {
        message: 'Enter a valid phone number.',
      },
    ),
    address: z.string().nonempty({ message: 'Address is required.' }),
    degree: z.string().nonempty({ message: 'Degree is required.' }),
    course: z.string().nonempty({ message: 'Course is required.' }),
    university: z.string().nonempty({ message: 'Specify your college/school name.' }),
    graduated_year: z
      .string()
      .min(4, { message: 'Year must contain atleast 4 characters' })
      .max(4)
      .nonempty({ message: 'Graduation year is required.' }),
  }),
  jobPreferences: z.object({
    role: z.string().nonempty({ message: 'Role is required.' }),
    locations: z.array(z.string()).nonempty({ message: 'Specify your location.' }),
    current_lpa: z.string().nonempty({ message: 'Describe current salary in LPA.' }),
    years_of_experience: z.string().nonempty({ message: 'Enter your years of work experience.' }),
    experience_level: z.array(z.string()).nonempty({ message: 'Specify experience level.' }),
    job_type: z.array(z.string()).nonempty({ message: 'Specify job type.' }),
    work_mode: z.array(z.string()).nonempty({ message: 'Specify work location type.' }),
    skills: z.array(z.string()).nonempty({ message: 'Specify at least one skill.' }),
  }),
});

export type PreferencesSchemaType = z.infer<typeof preferencesSchema>;
