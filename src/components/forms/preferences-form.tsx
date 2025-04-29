'use client';

import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Input } from '../ui/input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { useEffect, useRef, useState } from 'react';
import { Upload, X } from 'lucide-react';
import { cn, formatFileSize } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { SoftSkills, TechSkills } from '@/lib/skills';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { WorkPreferences } from '@/lib/work-pref';
import { Label } from '../ui/label';
import { toast } from 'sonner';
interface TabItem {
  value: string;
  title?: string;
}

interface ActiveDropdown {
  techSkills: boolean;
  softSkills: boolean;
}

const tabItems: TabItem[] = [
  {
    value: 'personal',
    title: 'Personal',
  },
  {
    value: 'resume',
    title: 'Resume',
  },
  {
    value: 'skills',
    title: 'Skills',
  },
  {
    value: 'job_preferences',
    title: 'Job Preferences',
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
  fullname: z.string().min(6, { message: 'Full name must be at least 6 characters long.' }),
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
  desired_role: z.string(),
  desired_location: z.string(),
  minimum_salary: z.number(),
  years_of_experience: z.number(),
  work_preference: z.string(),
  travel_willingness: z.string(),
});

export function PreferencesForm() {
  const [width, setWidth] = useState<number>(200);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const techInputRef = useRef<HTMLInputElement>(null);
  const softInputRef = useRef<HTMLInputElement>(null);
  const [resumeFile, setResumeFile] = useState<File>();
  const [selectedTechSkills, setSelectedTechSkills] = useState<string[]>([]);
  const [selectedSoftSkills, setSelectedSoftSkills] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<TabItem | undefined>(tabItems[0]);
  const [isActiveDD, setActiveDD] = useState<ActiveDropdown>({
    techSkills: false,
    softSkills: false,
  });

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
      desired_role: '',
      desired_location: '',
      minimum_salary: 300000,
      years_of_experience: 2,
      work_preference: WorkPreferences[1]?.value,
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
            toast('Maximum file size below 5MB');
          } else {
            setResumeFile(file);
          }
        } else {
          toast('Minimum file size upto 100KB');
        }
      };
      if (file) {
        reader.readAsArrayBuffer(file);
      }
    }
  };

  const toggleSkill = (skill: string, toggleFor: 'tech_skill' | 'soft_skill') => {
    if (toggleFor === 'tech_skill')
      setSelectedTechSkills((prev) =>
        prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill],
      );
    else {
      setSelectedSoftSkills((prev) =>
        prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill],
      );
    }
  };

  useEffect(() => {
    if (isActiveDD.techSkills && techInputRef.current) {
      techInputRef.current.focus();
      setWidth(techInputRef.current.offsetWidth);
    }
  }, [isActiveDD]);

  return (
    <Tabs defaultValue="personal" className="w-full" value={activeTab?.value}>
      <div className="flex flex-row justify-center gap-2 py-2">
        {activeTab &&
          tabItems.map((tab, i) => (
            <div
              key={`tab-item-${i}`}
              className={cn(
                tab.value === activeTab?.value ? 'bg-primary' : 'bg-muted',
                'h-1 w-20 rounded-full transition-all ease-in-out',
              )}
            />
          ))}
      </div>
      <Form {...form}>
        <form className="flex flex-col">
          <TabsContent value="personal" className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <div className="text-md font-bold">Personal information</div>
            </div>
            <div className="flex w-full flex-col items-center gap-2 md:gap-3">
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
                variant="secondary"
                type="button"
                onClick={() => setActiveTab({ value: 'resume' })}
              >
                Next
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="resume" className="flex flex-col gap-3">
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
                variant="secondary"
                type="button"
                onClick={() => setActiveTab({ value: 'personal' })}
              >
                Previous
              </Button>
              <Button
                variant="secondary"
                type="button"
                onClick={() => setActiveTab({ value: 'skills' })}
              >
                Next
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="skills" className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <div className="text-md font-bold">Skills</div>
            </div>
            <div className="flex flex-col gap-1 overflow-hidden">
              <Label>Technology Skills</Label>
              <div className="flex w-full flex-row flex-wrap gap-2 text-xs">
                {selectedTechSkills
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
                          setSelectedTechSkills([
                            ...selectedTechSkills.filter((fn) => fn !== skill),
                          ])
                        }
                      />
                    </div>
                  ))}
              </div>
              <DropdownMenu
                open={isActiveDD.techSkills}
                onOpenChange={(open) => setActiveDD({ techSkills: open, softSkills: false })}
              >
                <DropdownMenuTrigger className="flex">
                  <Input
                    ref={techInputRef}
                    id="skills-input"
                    placeholder="Add Tech skills..."
                    onFocus={() => setActiveDD({ techSkills: true, softSkills: false })}
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent style={{ width: width }} className="max-h-80 min-w-sm">
                  {Object.entries(TechSkills.technologySkills).map(([category, skills]) => (
                    <DropdownMenuGroup key={`tech-skill-group-${category}`}>
                      {skills.map((skill) => (
                        <DropdownMenuCheckboxItem
                          onSelect={(e) => {
                            e.preventDefault(); // Prevent closing
                          }}
                          key={`tech-skill-${skill}`}
                          checked={selectedTechSkills.includes(skill)}
                          onCheckedChange={() => toggleSkill(skill, 'tech_skill')}
                        >
                          {skill}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </DropdownMenuGroup>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex flex-col gap-1 overflow-hidden">
              <Label>Soft Skills</Label>
              <div className="flex w-full flex-row flex-wrap gap-2 text-xs">
                {selectedSoftSkills
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
                          setSelectedSoftSkills([
                            ...selectedSoftSkills.filter((fn) => fn !== skill),
                          ])
                        }
                      />
                    </div>
                  ))}
              </div>
              <DropdownMenu
                open={isActiveDD.softSkills}
                onOpenChange={(open) => setActiveDD({ techSkills: false, softSkills: open })}
              >
                <DropdownMenuTrigger className="flex w-full">
                  <Input
                    ref={softInputRef}
                    id="skills-input"
                    placeholder="Add Soft skills..."
                    onFocus={() => setActiveDD({ techSkills: false, softSkills: true })}
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent style={{ width: width }} className="max-h-80 w-full">
                  {Object.entries(SoftSkills.softSkills).map(([category, skills]) => (
                    <DropdownMenuGroup key={`soft-skill-group-${category}`}>
                      {skills.map((skill) => (
                        <DropdownMenuCheckboxItem
                          onSelect={(e) => {
                            e.preventDefault(); // Prevent closing
                          }}
                          key={`soft-skill-${skill}`}
                          checked={selectedSoftSkills.includes(skill)}
                          onCheckedChange={() => toggleSkill(skill, 'soft_skill')}
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
                variant="secondary"
                type="button"
                onClick={() => setActiveTab({ value: 'resume' })}
              >
                Previous
              </Button>
              <Button
                variant="secondary"
                type="button"
                onClick={() => setActiveTab({ value: 'job_preferences' })}
              >
                Next
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="job_preferences" className="flex flex-col gap-2">
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
            <div className="flex items-center justify-between">
              <Button
                variant="secondary"
                type="button"
                onClick={() => setActiveTab({ value: 'skills' })}
              >
                Previous
              </Button>
              <Button type="button">Submit</Button>
            </div>
          </TabsContent>
        </form>
      </Form>
    </Tabs>
  );
}
