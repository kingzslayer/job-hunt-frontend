'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '../ui/input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { useRef, useState } from 'react';
import { Upload, X } from 'lucide-react';
import { formatFileSize } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import techSkills from '@/lib/tech-skils.json';

interface TabItem {
  value: string;
  title?: string;
  disabled: boolean;
}

const tabItems: TabItem[] = [
  {
    value: 'personal',
    title: 'Personal',
    disabled: false,
  },
  {
    value: 'resume',
    title: 'Resume',
    disabled: false,
  },
  {
    value: 'skills',
    title: 'Skills',
    disabled: false,
  },
  {
    value: 'job_preferences',
    title: 'Job Preferences',
    disabled: false,
  },
];

const resumeTips = [
  'Keep your resume to 1-2 pages for best results',
  'Use clear section headings (Experience, Education, Skills)',
  'Include quantifiable achievements when possible',
  'Ensure your contact information is up-to-date',
  'Our AI will tailor your resume for each job application',
];

const preferenceSchema = z.object({
  fullname: z.string().min(6, { message: 'Fullname must be at least 6 characters long.' }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  phone: z.number({
    message: 'Please enter a valid phone number.',
  }),
  address: z.string(),
  degree: z.string(),
  course: z.string(),
  university: z.string(),
  graduated_year: z.number(),
});

export function PreferencesForm() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [resumeBlob, setResumeBlob] = useState<File>();
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<TabItem | undefined>(tabItems[0]);

  const form = useForm<z.infer<typeof preferenceSchema>>({
    resolver: zodResolver(preferenceSchema),
    defaultValues: {
      fullname: '',
      email: '',
      phone: 123456780,
      address: '',
      degree: '',
      course: '',
      university: '',
      graduated_year: 2024,
    },
    mode: 'onSubmit',
  });

  const readFile = () => {
    if (fileInputRef.current?.files && fileInputRef.current?.files?.length > 0) {
      const file = fileInputRef.current.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        setResumeBlob(file);
      };
      if (file) {
        reader.readAsArrayBuffer(file);
      }
    }
  };

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill],
    );
  };

  return (
    <Tabs defaultValue="personal" className="w-full" value={activeTab?.value}>
      <TabsList className="grid h-full w-full grid-cols-1 justify-between sm:grid-cols-4">
        {tabItems.map((tab, i) => (
          <TabsTrigger
            key={`tab-item-${i}`}
            value={tab.value}
            disabled={tab.disabled}
            onClick={() => setActiveTab(tab)}
          >
            {tab.title}
          </TabsTrigger>
        ))}
      </TabsList>
      <Form {...form}>
        <form className="flex flex-col">
          <TabsContent value="personal" className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <div className="text-md font-bold">Personal information</div>
              <div className="text-left text-sm">
                Update your personal details used for job applications.
              </div>
            </div>
            <div className="flex w-full flex-col items-center gap-2 md:gap-4">
              <div className="flex w-full flex-col justify-between gap-2 md:flex-row">
                <FormField
                  control={form.control}
                  name="fullname"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel htmlFor="fullname">Full Name</FormLabel>
                      <FormControl>
                        <Input id="fullname" placeholder="john doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
              </div>
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
            <div className="flex items-center justify-end">
              <Button
                onClick={() => setActiveTab({ value: 'resume', disabled: true })}
                type="button"
              >
                Next
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="resume" className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <div className="text-md font-bold">Resume</div>
              <div className="text-left text-sm">
                Upload or update your resume for job applications.
              </div>
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
                {resumeBlob && (
                  <span className="text-md font-bold">
                    {resumeBlob.name} ({formatFileSize(resumeBlob.size)})
                  </span>
                )}
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  type="button"
                  variant="secondary"
                >
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
            <div className="flex items-center justify-between">
              <Button
                onClick={() => setActiveTab({ value: 'personal', disabled: true })}
                type="button"
              >
                Previous
              </Button>
              <Button
                onClick={() => setActiveTab({ value: 'skills', disabled: true })}
                type="button"
              >
                Next
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="skills" className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <div className="text-md font-bold">Skills</div>
              <div className="text-left text-sm">
                List your technical, soft skills, and languages.
              </div>
            </div>
            <div className="flex flex-col gap-2 overflow-hidden">
              <div className="flex w-full flex-row flex-wrap gap-2 text-xs">
                {selectedSkills
                  .sort((a, b) => a.localeCompare(b))
                  .map((skill) => (
                    <div
                      key={skill}
                      title={skill}
                      className="bg-primary/15 flex cursor-pointer gap-2 rounded-full p-2 px-3 whitespace-nowrap"
                    >
                      {skill}
                      <X
                        className="hover:text-destructive size-4"
                        onClick={() =>
                          setSelectedSkills([...selectedSkills.filter((fn) => fn !== skill)])
                        }
                      />
                    </div>
                  ))}
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex">
                  <Input placeholder="Add skill..." />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="max-h-80 min-w-sm">
                  <p className="text-secondary-foreground/45 text-xs">
                    Note : You can also select multiple skills.
                  </p>
                  {Object.entries(techSkills.technologySkills).map(([category, skills]) => (
                    <DropdownMenuGroup key={`tech-skill-group-${category}`}>
                      <DropdownMenuLabel>{category}</DropdownMenuLabel>
                      {skills.map((skill) => (
                        <DropdownMenuCheckboxItem
                          onSelect={(e) => {
                            e.preventDefault(); // Prevent closing
                          }}
                          key={`tech-skill-${skill}`}
                          checked={selectedSkills.includes(skill)}
                          onCheckedChange={() => toggleSkill(skill)}
                        >
                          {skill}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </DropdownMenuGroup>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex items-center justify-between">
              <Button
                onClick={() => setActiveTab({ value: 'resume', disabled: true })}
                type="button"
              >
                Previous
              </Button>
              <Button
                onClick={() => setActiveTab({ value: 'job_preferences', disabled: true })}
                type="button"
              >
                Next
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="job_preferences" className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <div className="text-md font-bold">Job Preferences</div>
              <div className="text-left text-sm">Set your job preferences to improve matching.</div>
            </div>
          </TabsContent>
        </form>
      </Form>
    </Tabs>
  );
}
