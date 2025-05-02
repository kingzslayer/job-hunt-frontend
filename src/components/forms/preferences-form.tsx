'use client';

import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Input } from '../ui/input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { useRef, useState } from 'react';
import { Upload } from 'lucide-react';
import { cn, formatFileSize } from '@/lib/utils';

import { SoftSkills, TechSkills } from '@/lib/skills';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { WorkPreferences } from '@/lib/work-pref';
import { Label } from '../ui/label';
import { toast } from 'sonner';
import { MultiSelectDropdown } from '../common/dropdown';
import { useRouter } from 'next/navigation';

const tabs = ['personal', 'resume', 'skills', 'job_preferences'];

const fieldTapsMap: Record<string, string> = {
  first_name: 'personal',
  last_name: 'personal',
  email: 'personal',
  phone: 'personal',
  address: 'personal',
  degree: 'personal',
  course: 'personal',
  university: 'personal',
  graduated_year: 'personal',
  resume: 'resume',
  tech_skills: 'skills',
  soft_skills: 'skills',
  desired_role: 'job_preferences',
  desired_location: 'job_preferences',
  minimum_salary: 'job_preferences',
  years_of_experience: 'job_preferences',
  work_preference: 'job_preferences',
  travel_willingness: 'job_preferences',
};

const resumeTips = [
  'Keep your resume to 1-2 pages for best results',
  'Use clear section headings (Experience, Education, Skills)',
  'Include quantifiable achievements when possible',
  'Ensure your contact information is up-to-date',
  'Our AI will tailor your resume for each job application',
];

const preferenceSchema = z.object({
  first_name: z.string().min(6, { message: 'Full name must be at least 6 characters long.' }),
  last_name: z.string().min(6, { message: 'Full name must be at least 6 characters long.' }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  phone: z.number({
    message: 'Please enter a valid phone number.',
  }),
  address: z.string().nonempty({ message: 'Address field is required.' }),
  degree: z.string().nonempty({ message: 'Degree field is required.' }),
  course: z.string().nonempty({ message: 'Course field is required.' }),
  university: z.string().nonempty({ message: 'Specify your college/school name' }),
  graduated_year: z.coerce.number(),
  desired_role: z.string().nonempty({ message: 'Desired role field is required.' }),
  desired_location: z.string().nonempty({ message: 'Specify your desired location.' }),
  minimum_salary: z.coerce.number(),
  years_of_experience: z.coerce.number({ message: 'Enter your years of work experience' }),
  work_preference: z.string().nonempty({ message: 'Work preference field is required.' }),
  travel_willingness: z.string(),
});

export function PreferencesForm() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [resumeFile, setResumeFile] = useState<File>();
  const [activeTab, setActiveTab] = useState(String(tabs[0]));
  const [selectedTechSkills, setSelectedTechSkills] = useState<string[]>([]);
  const [selectedSoftSkills, setSelectedSoftSkills] = useState<string[]>([]);

  const form = useForm<z.infer<typeof preferenceSchema>>({
    resolver: zodResolver(preferenceSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      phone: 123456780,
      address: '',
      degree: '',
      course: '',
      university: '',
      graduated_year: 2024,
      desired_role: '',
      desired_location: '',
      minimum_salary: 300000,
      years_of_experience: 2,
      work_preference: WorkPreferences[0]?.value,
      travel_willingness: '',
    },
    mode: 'onSubmit',
  });

  const readFile = () => {
    if (fileInputRef.current?.files && fileInputRef.current?.files?.length > 0) {
      const file = fileInputRef.current.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        if (file && file.size > 100 * 1024) {
          if (file.size > 5000 * 1024) {
            toast('Maximum file size is below 5MB');
          } else {
            setResumeFile(file);
          }
        } else {
          toast('Minimum file size is upto 100KB');
        }
      };
      if (file) {
        reader.readAsArrayBuffer(file);
      }
    }
  };

  async function onSubmit(values: z.infer<typeof preferenceSchema>) {
    const data = {
      ...values,
      tech_skills: selectedTechSkills,
      soft_skills: selectedSoftSkills,
    };

    console.log('Form Data:', data);
    document.cookie = 'onbording_completed=true; path=/';
    toast.success('Preferences saved successfully!');
    router.push('/home');
  }

  const fieldTab = Object.keys(form.formState.errors).map((key) => fieldTapsMap[key]);

  const onNextTab = async () => {
    const index = tabs.indexOf(activeTab);

    if (!form.formState.isSubmitted) {
      form.handleSubmit(onSubmit)();
    }

    switch (form.formState.isSubmitted) {
      case fieldTab.includes(tabs[0]): {
        return setActiveTab(String(tabs[0]));
      }
      case resumeFile === undefined: {
        return setActiveTab(String(tabs[1]));
      }
      case selectedSoftSkills.length === 0 || selectedTechSkills.length === 0: {
        return setActiveTab(String(tabs[2]));
      }
      case fieldTab.includes(tabs[3]): {
        return setActiveTab(String(tabs[3]));
      }
    }

    if (form.formState.isSubmitted) return setActiveTab(String(tabs[index + 1]));
  };

  function disableOnNextTab(): boolean {
    switch (activeTab) {
      case tabs[0]: {
        return fieldTab.includes(activeTab);
      }
      case tabs[1]: {
        return resumeFile === undefined;
      }
      case tabs[2]: {
        return selectedSoftSkills.length === 0 || selectedTechSkills.length === 0;
      }
      default:
        return false;
    }
  }

  const onPrevTab = async () => {
    const index = tabs.indexOf(activeTab);
    setActiveTab(String(tabs[index - 1]));
  };

  return (
    <Tabs defaultValue={tabs[0]} className="w-full" value={activeTab}>
      <div className="flex flex-row justify-center gap-2 py-2">
        {activeTab &&
          tabs.map((tab, i) => (
            <div
              key={`tab-item-${i}`}
              className={cn(
                tab === activeTab ? 'bg-primary' : 'bg-muted',
                'h-1 w-20 rounded-full transition-all ease-in-out',
              )}
            />
          ))}
      </div>
      <Form {...form}>
        <form className="flex flex-col" onSubmit={form.handleSubmit(onSubmit)}>
          <TabsContent value={String(tabs[0])} className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <div className="text-md font-bold">Personal information</div>
            </div>
            <div className="flex w-full flex-col items-center gap-2 md:gap-3">
              <div className="flex w-full flex-col justify-between gap-2 md:flex-row">
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel htmlFor="first_name">First Name</FormLabel>
                      <FormControl>
                        <Input id="first_name" placeholder="John " {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel htmlFor="last_name">Last Name</FormLabel>
                      <FormControl>
                        <Input id="last_name" placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex w-full flex-col justify-between gap-2 md:flex-row">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <FormControl>
                        <Input id="email" type="email" placeholder="name@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel htmlFor="phone">Phone</FormLabel>
                      <FormControl>
                        <Input id="phone" placeholder="+91 1234567890" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel htmlFor="address">Address</FormLabel>
                    <FormControl>
                      <Textarea
                        id="address"
                        className="max-h-20"
                        placeholder="123 Main St, San Francisco, CA 94105"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="text-md font-bold">Educational information</div>
            <div className="flex w-full flex-col justify-between gap-2 md:flex-row">
              <FormField
                control={form.control}
                name="degree"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel htmlFor="degree">Degree</FormLabel>
                    <FormControl>
                      <Input id="degree" placeholder="Bachelor of science" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="course"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel htmlFor="course">Course</FormLabel>
                    <FormControl>
                      <Input id="course" placeholder="Computer Science" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex w-full flex-col justify-between gap-2 md:flex-row">
              <FormField
                control={form.control}
                name="university"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel htmlFor="university">University</FormLabel>
                    <FormControl>
                      <Input id="university" placeholder="Stanford University" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="graduated_year"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel htmlFor="gratuated_year">Gratuation Year</FormLabel>
                    <FormControl>
                      <Input id="gratuated_year" type="number" placeholder="2024" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </TabsContent>
          <TabsContent value={String(tabs[1])} className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <div className="text-md font-bold">Resume</div>
            </div>
            <div className="flex flex-col items-center justify-center gap-3 rounded-md border border-dashed px-3 py-5">
              <div className="flex flex-col items-center justify-center gap-2">
                <div className="bg-accent flex size-10 items-center justify-center rounded-full">
                  <Upload />
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="text-md font-bold">Upload your resume</div>
                  <div className="text-left text-sm">
                    Drag and drop your resume, or click to browse supports files pdf,doc,docx.
                  </div>
                </div>
                <input
                  ref={fileInputRef}
                  className="hidden"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={readFile}
                />
                {resumeFile && (
                  <span className="text-md font-bold">
                    {resumeFile.name} ({formatFileSize(resumeFile.size)})
                  </span>
                )}
                <Button type="button" onClick={() => fileInputRef.current?.click()}>
                  Browse file
                </Button>
              </div>
              <div className="flex w-full border-t" />
              <div className="flex w-full flex-col items-start justify-start gap-2">
                <h1 className="text-md font-bold">Tips :-</h1>
                <ul className="ml-5 flex list-disc flex-col space-y-1 text-sm">
                  {resumeTips.map((tip, i) => (
                    <li key={`resume-tip-${i}`}>{tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          </TabsContent>
          <TabsContent value={String(tabs[2])} className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <div className="text-md font-bold">Skills</div>
            </div>
            <div className="flex flex-col gap-1 overflow-hidden">
              <Label>Technology Skills</Label>
              <MultiSelectDropdown
                placeholder="Add skills..."
                selected={selectedTechSkills}
                setSelected={setSelectedTechSkills}
                items={Object.values(TechSkills.technologySkills).flat()}
              />
              {selectedTechSkills.length === 0 && (
                <p className="text-destructive text-sm">Specify atlest one Skill.</p>
              )}
            </div>
            <div className="flex flex-col gap-1 overflow-hidden">
              <Label>Soft Skills</Label>
              <MultiSelectDropdown
                placeholder="Add skills..."
                selected={selectedSoftSkills}
                setSelected={setSelectedSoftSkills}
                items={Object.values(SoftSkills.softSkills).flat()}
              />
              {selectedSoftSkills.length === 0 && (
                <p className="text-destructive text-sm">Specify atlest one Skill.</p>
              )}
            </div>
          </TabsContent>
          <TabsContent value={String(tabs[3])} className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <div className="text-md font-bold">Job Preferences</div>
            </div>
            <div className="flex w-full flex-col items-center gap-2 md:gap-3">
              <div className="flex w-full flex-col justify-between gap-2 md:flex-row">
                <FormField
                  control={form.control}
                  name="desired_role"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel htmlFor="desired_role">Desired Role</FormLabel>
                      <FormControl>
                        <Input id="desired_role" placeholder="Human Resource" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="desired_location"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel htmlFor="desired_location">Desired Location</FormLabel>
                      <FormControl>
                        <Input id="desired_location" placeholder="San Francisco, CA" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex w-full flex-col justify-between gap-2 md:flex-row">
                <FormField
                  control={form.control}
                  name="minimum_salary"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel htmlFor="minimum_salary">Minimum Salary (Rupees) </FormLabel>
                      <FormControl>
                        <Input id="minimum_salary" placeholder="300000" type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="years_of_experience"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel htmlFor="years_of_experience">Years of Experience</FormLabel>
                      <FormControl>
                        <Input id="years_of_experience" placeholder="2" type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex w-full flex-col justify-between gap-2 md:flex-row">
                <FormField
                  control={form.control}
                  name="work_preference"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel htmlFor="work_preference">Work Preference</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl className="w-full">
                          <SelectTrigger className="shadow">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {WorkPreferences.map((pref, i) => (
                            <SelectItem key={`work-preference-${i}`} value={pref.value}>
                              {pref.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="travel_willingness"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel htmlFor="travel_willingness">Travel Willingness</FormLabel>
                      <FormControl>
                        <Input id="travel_willingness" placeholder="Up to 25%" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </TabsContent>
          <div
            className={cn(
              activeTab === tabs[0] ? 'justify-end' : 'justify-between',
              'flex items-center pt-3',
            )}
          >
            <Button
              hidden={tabs[0] === activeTab}
              variant="secondary"
              type="button"
              onClick={onPrevTab}
            >
              Previous
            </Button>
            <Button
              variant="secondary"
              type="button"
              hidden={activeTab === tabs[tabs.length - 1]}
              disabled={disableOnNextTab()}
              onClick={onNextTab}
            >
              Next
            </Button>
            <Button
              disabled={Object.keys(form.formState.errors).length !== 0}
              hidden={activeTab !== tabs[tabs.length - 1]}
            >
              Save
            </Button>
          </div>
        </form>
      </Form>
    </Tabs>
  );
}
