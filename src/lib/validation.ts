import { z } from 'zod';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

export const preferencesSchema = z.object({
  personalInfo: z.object({
    first_name: z.string().min(3, { message: 'First name must be at least 3 characters long.' }),
    last_name: z.string().min(1, { message: 'Last name must be at least 1 characters long.' }),
    email: z.string().email({
      message: 'Please enter a valid email address.',
    }),
    phone: z.string().refine(
      (value) => {
        const phone = parsePhoneNumberFromString(value);
        return phone?.isValid();
      },
      {
        message: 'Invalid phone number. Use international format like +1234567890.',
      },
    ),
    address: z.string().nonempty({ message: 'Address field is required.' }),
    degree: z.string().nonempty({ message: 'Degree field is required.' }),
    course: z.string().nonempty({ message: 'Course field is required.' }),
    university: z.string().nonempty({ message: 'Specify your college/school name.' }),
    graduated_year: z
      .string()
      .min(4, { message: 'Year must be contain 4 characters.' })
      .max(4, { message: 'Year must be contain 4 characters.' })
      .nonempty({ message: 'Graduation year field is required.' }),
  }),
  skills: z.object({
    tech_skills: z.array(z.string()).nonempty({ message: 'Specify technology skills.' }),
    soft_skills: z.array(z.string()).nonempty({ message: 'Specify soft skills.' }),
  }),
  jobPreferences: z.object({
    desired_role: z.string().nonempty({ message: 'Desired role field is required.' }),
    desired_location: z.string().nonempty({ message: 'Specify your desired location.' }),
    current_lpa: z.string().nonempty({ message: 'Describe current salary in LPA.' }),
    years_of_experience: z.string().nonempty({ message: 'Enter your years of work experience.' }),
    experience_level: z.array(z.string()).nonempty({ message: 'Specify experience level.' }),
    job_type: z.array(z.string()).nonempty({ message: 'Specify job type.' }),
    work_location_type: z.array(z.string()).nonempty({ message: 'Specify work location type.' }),
    travel_willingness: z.string(),
  }),
});

export type PreferencesSchemaType = z.infer<typeof preferencesSchema>;
