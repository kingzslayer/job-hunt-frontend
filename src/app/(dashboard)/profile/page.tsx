'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';

export default function ProfilePage() {
  // Dummy user data
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    initials: 'JD',
    title: 'Senior Frontend Developer',
    location: 'San Francisco, CA',
    bio: 'Experienced frontend developer with 5+ years of experience in React, TypeScript, and modern web technologies.',
    skills: ['React', 'TypeScript', 'Next.js', 'HTML/CSS', 'UI/UX', 'JavaScript', 'Redux'],
    education: {
      degree: 'B.S. Computer Science',
      school: 'University of California, Berkeley',
      year: '2018',
    },
    socials: {
      github: 'github.com/johndoe',
      linkedin: 'linkedin.com/in/johndoe',
      twitter: 'twitter.com/johndoe',
    },
    preferences: {
      emailNotifications: true,
      publicProfile: true,
      darkMode: true,
    },
  };

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">My Profile</h2>
        <Button>Save Changes</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-[250px_1fr]">
        <div className="flex flex-col gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center gap-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                    {user.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-center">
                  <h3 className="text-xl font-semibold">{user.name}</h3>
                  <p className="text-muted-foreground text-sm">{user.title}</p>
                  <p className="text-muted-foreground text-sm">{user.location}</p>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  Change Avatar
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-muted-foreground text-sm">Receive job alerts and updates</p>
                </div>
                <Switch checked={user.preferences.emailNotifications} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Public Profile</Label>
                  <p className="text-muted-foreground text-sm">
                    Make profile visible to recruiters
                  </p>
                </div>
                <Switch checked={user.preferences.publicProfile} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Dark Mode</Label>
                  <p className="text-muted-foreground text-sm">Toggle dark theme</p>
                </div>
                <Switch checked={user.preferences.darkMode} />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue={user.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" defaultValue={user.email} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Professional Title</Label>
                  <Input id="title" defaultValue={user.title} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" defaultValue={user.location} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <textarea
                  id="bio"
                  className="border-input min-h-[100px] w-full resize-none rounded-md border bg-transparent p-3"
                  defaultValue={user.bio}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Skills & Expertise</CardTitle>
              <CardDescription>Highlight your professional skills</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {user.skills.map((skill, index) => (
                  <div key={index} className="bg-secondary rounded-full px-3 py-1 text-sm">
                    {skill}
                  </div>
                ))}
                <Button variant="outline" size="sm" className="rounded-full">
                  + Add Skill
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Education</CardTitle>
              <CardDescription>Your educational background</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="degree">Degree</Label>
                  <Input id="degree" defaultValue={user.education.degree} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="school">School</Label>
                  <Input id="school" defaultValue={user.education.school} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year">Graduation Year</Label>
                  <Input id="year" defaultValue={user.education.year} />
                </div>
              </div>
              <Button variant="outline" size="sm">
                + Add Education
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Social Profiles</CardTitle>
              <CardDescription>Connect your social media accounts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input id="linkedin" defaultValue={user.socials.linkedin} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="github">GitHub</Label>
                <Input id="github" defaultValue={user.socials.github} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="twitter">Twitter</Label>
                <Input id="twitter" defaultValue={user.socials.twitter} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
