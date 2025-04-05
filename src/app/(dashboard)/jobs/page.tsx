'use client';

import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

// Define job form data type
interface JobFormData {
  title: string;
  company: string;
  location: string;
  salary: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Applied' | 'Saved' | 'Interview' | 'Assessment' | 'Rejected';
}

export default function JobsPage() {
  const [open, setOpen] = useState(false);

  // Define form
  const form = useForm<JobFormData>({
    defaultValues: {
      title: '',
      company: '',
      location: '',
      salary: '',
      priority: 'Medium',
      status: 'Saved',
    },
  });

  // Form submission handler
  const onSubmit = (data: JobFormData) => {
    console.log(data);
    setOpen(false);
    // Here you would typically add the new job to your jobs list
  };

  // Dummy job data
  const jobs = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      company: 'TechCorp',
      location: 'San Francisco, CA (Remote)',
      status: 'Applied',
      date: 'Apr 5, 2023',
      logo: 'T',
      salary: '$120,000 - $150,000',
      priority: 'High',
    },
    {
      id: 2,
      title: 'Full Stack Engineer',
      company: 'InnoSoft',
      location: 'New York, NY (Hybrid)',
      status: 'Interview',
      date: 'Apr 3, 2023',
      logo: 'I',
      salary: '$110,000 - $135,000',
      priority: 'Medium',
    },
    {
      id: 3,
      title: 'React Developer',
      company: 'DataFirm',
      location: 'Austin, TX (On-site)',
      status: 'Assessment',
      date: 'Apr 2, 2023',
      logo: 'D',
      salary: '$95,000 - $120,000',
      priority: 'Medium',
    },
    {
      id: 4,
      title: 'Frontend Engineer',
      company: 'CloudTech',
      location: 'Seattle, WA (Remote)',
      status: 'Rejected',
      date: 'Mar 30, 2023',
      logo: 'C',
      salary: '$105,000 - $130,000',
      priority: 'Low',
    },
    {
      id: 5,
      title: 'UI/UX Developer',
      company: 'DesignLab',
      location: 'Los Angeles, CA (Hybrid)',
      status: 'Saved',
      date: 'Mar 28, 2023',
      logo: 'D',
      salary: '$100,000 - $125,000',
      priority: 'Low',
    },
  ];

  // Function to get status badge color
  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'Applied':
        return 'bg-blue-100 text-blue-800';
      case 'Interview':
        return 'bg-green-100 text-green-800';
      case 'Assessment':
        return 'bg-purple-100 text-purple-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      case 'Saved':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">My Jobs</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>+ Add Job</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Job</DialogTitle>
              <DialogDescription>
                Enter the details for the new job application you want to track.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Frontend Developer" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company</FormLabel>
                      <FormControl>
                        <Input placeholder="Company Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="City, State (Remote/Hybrid/On-site)" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="salary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Salary Range</FormLabel>
                      <FormControl>
                        <Input placeholder="$100,000 - $130,000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Priority</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex space-x-4"
                        >
                          {['High', 'Medium', 'Low'].map((priority) => (
                            <div key={priority} className="flex items-center space-x-2">
                              <RadioGroupItem value={priority} id={`priority-${priority}`} />
                              <label
                                htmlFor={`priority-${priority}`}
                                className="text-sm font-medium"
                              >
                                {priority}
                              </label>
                            </div>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col">
                      <FormLabel>Status</FormLabel>
                      <div className="relative w-full">
                        <DropdownMenu>
                          <FormControl>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" className="w-full justify-between">
                                {field.value}
                                <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                              </Button>
                            </DropdownMenuTrigger>
                          </FormControl>
                          <DropdownMenuContent
                            className="min-w-[240px]"
                            sideOffset={4}
                            alignOffset={0}
                          >
                            {['Saved', 'Applied', 'Interview', 'Assessment', 'Rejected'].map(
                              (status) => (
                                <DropdownMenuItem
                                  key={status}
                                  onClick={() => field.onChange(status)}
                                  className="cursor-pointer"
                                >
                                  {status}
                                </DropdownMenuItem>
                              ),
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit">Add Job</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Job Applications</CardTitle>
          <CardDescription>Track and manage your job applications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {jobs.map((job) => (
              <div key={job.id} className="flex flex-col space-y-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-md font-semibold">
                      {job.logo}
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{job.title}</h3>
                      <div className="text-muted-foreground text-sm">
                        {job.company} • {job.location}
                      </div>
                      <div className="text-muted-foreground mt-1 text-sm">{job.salary}</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    <span
                      className={`rounded-full px-2 py-1 text-xs ${getStatusColor(job.status)}`}
                    >
                      {job.status}
                    </span>
                    <span className="text-muted-foreground text-xs">{job.date}</span>
                  </div>
                </div>
                <div className="flex items-center justify-end space-x-2">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button variant="ghost" size="sm">
                    Update Status
                  </Button>
                </div>
                {job.id < jobs.length && <Separator className="my-2" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
