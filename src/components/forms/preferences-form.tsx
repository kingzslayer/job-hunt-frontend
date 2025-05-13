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
import { toast } from 'sonner';
import { MultiSelectDropdown } from '../common/dropdown';
import { useRouter } from 'next/navigation';
import { preferencesSchema, type PreferencesSchemaType } from '@/lib/validation';
import { employeeJobTypes, jobExperienceLevels, workLocationTypes } from '@/lib/work-pref';

const tabs = ['personal', 'resume', 'skills', 'job_preferences'];

const resumeTips = [
  'Keep your resume to 1-2 pages for best results',
  'Use clear section headings (Experience, Education, Skills)',
  'Include quantifiable achievements when possible',
  'Ensure your contact information is up-to-date',
  'Our AI will tailor your resume for each job application',
];

export function PreferencesForm() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [resumeFile, setResumeFile] = useState<File>();
  const [activeTab, setActiveTab] = useState(String(tabs[0]));
  const [fileUploadError, setFileUploadError] = useState<string>('');

  const form = useForm<PreferencesSchemaType>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: {
      personalInfo: {
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        address: '',
        degree: '',
        course: '',
        university: '',
        graduated_year: '',
      },
      skills: {
        tech_skills: [],
        soft_skills: [],
      },
      jobPreferences: {
        desired_role: '',
        desired_location: '',
        current_lpa: '',
        years_of_experience: '',
        travel_willingness: '',
        experience_level: [],
        job_type: [],
        work_location_type: [],
      },
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const readFile = () => {
    if (fileInputRef.current?.files && fileInputRef.current?.files?.length > 0) {
      const file = fileInputRef.current.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        if (file && file.size > 50 * 1024) {
          if (file.size > 5000 * 1024) {
            setFileUploadError('Maximum file size is below 5MB');
          } else {
            setResumeFile(file);
          }
        } else {
          if (file?.type === 'docx') {
            setFileUploadError('Minimum file size is upto 1KB');
          } else {
            setFileUploadError('Minimum file size is upto 50KB');
          }
        }
      };
      if (file) {
        reader.readAsArrayBuffer(file);
      }
    }
  };

  async function onSubmit(values: z.infer<typeof preferencesSchema>) {
    const data = {
      ...values.personalInfo,
      ...values.jobPreferences,
      ...values.skills,
    };

    console.log('Form Data:', data);
    document.cookie = 'onbording_completed=true; path=/';
    toast.success('Preferences saved successfully!');
    router.push('/home');
  }

  const onNextTab = async () => {
    const index = tabs.indexOf(activeTab);

    switch (activeTab) {
      case tabs[0]: {
        const isValid = await form.trigger('personalInfo');
        return isValid && setActiveTab(String(tabs[index + 1]));
      }
      case tabs[1]: {
        if (resumeFile === undefined) {
          setFileUploadError('Upload your resume');
        }
        return resumeFile !== undefined && setActiveTab(String(tabs[index + 1]));
      }
      case tabs[2]: {
        const isValid = await form.trigger('skills');
        return isValid && setActiveTab(String(tabs[index + 1]));
      }
    }
  };

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
                  name="personalInfo.first_name"
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
                  name="personalInfo.last_name"
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
                  name="personalInfo.email"
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
                  name="personalInfo.phone"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel htmlFor="phone">Phone</FormLabel>
                      <FormControl>
                        <Input id="phone" type="string" placeholder="+91 1234567890" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="personalInfo.address"
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
                name="personalInfo.degree"
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
                name="personalInfo.course"
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
                name="personalInfo.university"
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
                name="personalInfo.graduated_year"
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
                {resumeFile === undefined && fileUploadError && (
                  <p className="text-destructive text-sm">{fileUploadError}</p>
                )}
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
              <FormField
                control={form.control}
                name="skills.tech_skills"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <MultiSelectDropdown
                        label="Tech Skills"
                        placeholder="Add skills..."
                        error={form.formState.errors.skills?.tech_skills?.message}
                        selected={field.value}
                        setSelected={field.onChange}
                        items={Object.values(TechSkills.technologySkills).flat()}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-1 overflow-hidden">
              <FormField
                control={form.control}
                name="skills.soft_skills"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <MultiSelectDropdown
                        label="Soft Skills"
                        placeholder="Add skills..."
                        error={form.formState.errors.skills?.soft_skills?.message}
                        selected={field.value}
                        setSelected={field.onChange}
                        items={Object.values(SoftSkills.softSkills).flat()}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
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
                  name="jobPreferences.desired_role"
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
                  name="jobPreferences.desired_location"
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
                  name="jobPreferences.current_lpa"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel htmlFor="current_lpa">Current CTC</FormLabel>
                      <FormControl>
                        <Input id="current_lpa" placeholder="4" type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="jobPreferences.years_of_experience"
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
              <div className="grid w-full grid-rows-1 gap-2 md:grid-cols-2">
                <div className="flex flex-col justify-start overflow-hidden">
                  <FormField
                    control={form.control}
                    name="jobPreferences.experience_level"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <MultiSelectDropdown
                            label="Experience Level"
                            placeholder="Select experience level..."
                            error={form.formState.errors.jobPreferences?.experience_level?.message}
                            selected={field.value}
                            setSelected={field.onChange}
                            items={jobExperienceLevels}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col justify-start overflow-hidden">
                  <FormField
                    control={form.control}
                    name="jobPreferences.job_type"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <MultiSelectDropdown
                            label="Jobs type"
                            placeholder="Select job type..."
                            error={form.formState.errors.jobPreferences?.job_type?.message}
                            selected={field.value}
                            setSelected={field.onChange}
                            items={employeeJobTypes}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="grid w-full grid-rows-1 gap-2 md:grid-cols-2">
                <div className="flex flex-col overflow-hidden">
                  <FormField
                    control={form.control}
                    name="jobPreferences.work_location_type"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <MultiSelectDropdown
                            label="Work location type"
                            placeholder="Select work location..."
                            error={
                              form.formState.errors.jobPreferences?.work_location_type?.message
                            }
                            selected={field.value}
                            setSelected={field.onChange}
                            items={workLocationTypes}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="jobPreferences.travel_willingness"
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
              onClick={onNextTab}
            >
              Next
            </Button>
            <Button hidden={activeTab !== tabs[tabs.length - 1]}>Save</Button>
          </div>
        </form>
      </Form>
    </Tabs>
  );
}
