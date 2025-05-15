'use client';

import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Input } from '../ui/input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { useRef, useState, type FormEvent } from 'react';
import { Upload } from 'lucide-react';
import { cn, formatFileSize } from '@/lib/utils';

import { techSkills } from '@/lib/skills';
import { toast } from 'sonner';
import { MultiSelectDropdown } from '../common/dropdown';
import { useRouter } from 'next/navigation';
import { preferencesSchema, type PreferencesSchemaType } from '@/lib/validation';
import { employeeJobTypes, jobExperienceLevels, workLocationTypes } from '@/lib/work-pref';

const tabs = ['personal', 'resume', 'job_preferences'];

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
      jobPreferences: {
        role: '',
        locations: [],
        current_lpa: '',
        years_of_experience: '',
        experience_level: [],
        job_type: [],
        work_mode: [],
        skills: [],
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
        if (file) {
          if (file.size > 2000 * 1024) {
            setFileUploadError('Maximum file size is below 2MB');
          } else {
            setResumeFile(file);
          }
        }
      };
      if (file) {
        reader.readAsArrayBuffer(file);
      }
    }
  };

  const inputValidate = (event: FormEvent<HTMLInputElement>) => {
    const input = event.currentTarget;

    if (input.type === 'tel') {
      input.value = input.value
        .replace(/[^\d+\-\s]/g, '') // Allow digits, +, -, space
        .replace(/[\s\-]{2,}/g, '') // Collapse repeated - or space
        .replace(/^\s+/, ''); // Remove leading spaces
    } else {
      input.value = input.value
        .replace(/[^A-Za-z ]/g, '') // remove unwanted chars
        .replace(/\s{2,}/g, ' ') // normalize spaces
        .replace(/^\s+/, '');
    }
  };

  async function onSubmit(values: z.infer<typeof preferencesSchema>) {
    const data = {
      ...values.personalInfo,
      ...values.jobPreferences,
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
                      <FormLabel required htmlFor="first_name">
                        First Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="first_name"
                          placeholder="John"
                          onInput={inputValidate}
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="personalInfo.last_name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel required htmlFor="last_name">
                        Last Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="last_name"
                          placeholder="Doe"
                          onInput={inputValidate}
                          {...field}
                        />
                      </FormControl>
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
                      <FormLabel required htmlFor="email">
                        Email
                      </FormLabel>
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
                      <FormLabel required htmlFor="phone">
                        Phone
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+91 1234567890"
                          onInput={inputValidate}
                          {...field}
                        />
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
                    <FormLabel required htmlFor="address">
                      Address
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        id="address"
                        className="max-h-20"
                        placeholder="123 Main St, San Francisco, CA 94105"
                        {...field}
                      />
                    </FormControl>
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
                    <FormLabel required htmlFor="degree">
                      Degree
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="degree"
                        placeholder="Bachelor of science"
                        onInput={inputValidate}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="personalInfo.course"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel required htmlFor="course">
                      Course
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="course"
                        placeholder="Computer Science"
                        onInput={inputValidate}
                        {...field}
                      />
                    </FormControl>
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
                    <FormLabel required htmlFor="university">
                      University
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="university"
                        placeholder="Stanford University"
                        onInput={inputValidate}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="personalInfo.graduated_year"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel required htmlFor="gratuated_year">
                      Gratuation Year
                    </FormLabel>
                    <FormControl>
                      <Input id="gratuated_year" type="number" placeholder="2024" {...field} />
                    </FormControl>
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
          <TabsContent value={String(tabs[2])} className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <div className="text-md font-bold">Job Preferences</div>
            </div>
            <div className="flex w-full flex-col items-center gap-2 md:gap-3">
              <div className="flex w-full flex-col justify-between gap-2 md:flex-row">
                <FormField
                  control={form.control}
                  name="jobPreferences.role"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel required htmlFor="role">
                        Role
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="role"
                          placeholder="Human Resources"
                          onInput={inputValidate}
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="flex w-full">
                  <FormField
                    control={form.control}
                    name="jobPreferences.locations"
                    render={({ field }) => (
                      <FormItem className="w-full space-y-0 shadow-md">
                        <FormLabel required htmlFor="locations">
                          Location(s)
                        </FormLabel>
                        <FormControl>
                          <MultiSelectDropdown
                            required
                            placeholder="Specify location..."
                            selected={field.value}
                            mode="add"
                            setSelected={field.onChange}
                            items={[]}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="flex w-full flex-col justify-between gap-2 md:flex-row">
                <FormField
                  control={form.control}
                  name="jobPreferences.current_lpa"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel required htmlFor="current_lpa">
                        Current CTC
                      </FormLabel>
                      <FormControl>
                        <Input id="current_lpa" placeholder="4" type="number" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="jobPreferences.years_of_experience"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel required htmlFor="years_of_experience">
                        Years of Experience
                      </FormLabel>
                      <FormControl>
                        <Input id="years_of_experience" placeholder="2" type="number" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex w-full">
                <FormField
                  control={form.control}
                  name="jobPreferences.skills"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel required>Skills</FormLabel>
                      <FormControl>
                        <MultiSelectDropdown
                          required
                          placeholder="Select skills..."
                          selected={field.value}
                          setSelected={field.onChange}
                          items={techSkills}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex w-full">
                <FormField
                  control={form.control}
                  name="jobPreferences.experience_level"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel required>Experience Level</FormLabel>
                      <FormControl>
                        <MultiSelectDropdown
                          required
                          placeholder="Select experience level..."
                          selected={field.value}
                          setSelected={field.onChange}
                          items={jobExperienceLevels}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex w-full flex-col gap-2 md:flex-row">
                <div className="flex w-full">
                  <FormField
                    control={form.control}
                    name="jobPreferences.job_type"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel required>Job type</FormLabel>
                        <FormControl>
                          <MultiSelectDropdown
                            required
                            placeholder="Select job type..."
                            selected={field.value}
                            setSelected={field.onChange}
                            items={employeeJobTypes}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex w-full">
                  <FormField
                    control={form.control}
                    name="jobPreferences.work_mode"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel required>Work mode</FormLabel>
                        <FormControl>
                          <MultiSelectDropdown
                            required
                            placeholder="Select work mode..."
                            selected={field.value}
                            setSelected={field.onChange}
                            items={workLocationTypes}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
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
              disabled={activeTab === tabs[1] && resumeFile === undefined}
              hidden={activeTab === tabs[tabs.length - 1]}
              onClick={onNextTab}
            >
              Next
            </Button>
            {activeTab === tabs[tabs.length - 1] && <Button>Save</Button>}
          </div>
        </form>
      </Form>
    </Tabs>
  );
}
