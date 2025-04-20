'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { useEffect, useState } from 'react';

// Icons for the settings menu
import { Bell, Lock, PaintBucket, UserCircle } from 'lucide-react';

export default function SettingsPage() {
  // State to track active section
  const [activeSection, setActiveSection] = useState('account');

  // Function to handle scroll and update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['account', 'appearance', 'notifications', 'privacy', 'data'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Dummy settings data
  const settings = {
    account: {
      email: 'john.doe@example.com',
      password: '••••••••••',
      twoFactorEnabled: false,
    },
    appearance: {
      theme: 'system',
      fontSize: 'medium',
      reducedMotion: false,
      sidebarCollapsed: false,
    },
    notifications: {
      email: {
        jobAlerts: true,
        applicationUpdates: true,
        weeklyDigest: false,
        marketingEmails: false,
      },
      push: {
        jobAlerts: true,
        applicationUpdates: true,
        messages: true,
      },
    },
    privacy: {
      profileVisibility: 'public',
      activityTracking: true,
      dataSharing: false,
    },
  };

  // Menu items definition with icons
  const menuItems = [
    { id: 'account', label: 'Account', icon: <UserCircle size={18} /> },
    { id: 'appearance', label: 'Appearance', icon: <PaintBucket size={18} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
    { id: 'privacy', label: 'Privacy', icon: <Lock size={18} /> },
    // { id: 'data', label: 'Data & Export', icon: <Database size={18} /> },
  ];

  // Function to scroll to section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Settings</h2>
        <Button>Save Changes</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-[220px_1fr]">
        <Card className="h-fit md:sticky md:top-20">
          <CardContent className="p-0">
            <nav className="flex flex-col">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center border-l-2 px-4 py-3 transition-colors ${
                    activeSection === item.id
                      ? 'border-primary text-primary border-l-4 font-semibold'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50 border-transparent'
                  } `}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                </button>
              ))}
            </nav>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card id="account">
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage your account information and security settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" defaultValue={settings.account.email} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="flex items-center space-x-2">
                  <Input id="password" type="password" defaultValue={settings.account.password} />
                  <Button variant="outline">Change</Button>
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-muted-foreground text-sm">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Switch checked={settings.account.twoFactorEnabled} />
              </div>
              <Separator />
              <Button variant="destructive">Delete Account</Button>
            </CardContent>
          </Card>

          <Card id="appearance">
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize the look and feel of the application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Theme</Label>
                <div className="grid grid-cols-3 gap-2">
                  <div
                    className={`cursor-pointer rounded-md border p-3 ${settings.appearance.theme === 'light' ? 'border-primary' : ''}`}
                  >
                    <div className="bg-background flex h-10 items-center justify-center rounded-md border">
                      Light
                    </div>
                  </div>
                  <div
                    className={`cursor-pointer rounded-md border p-3 ${settings.appearance.theme === 'dark' ? 'border-primary' : ''}`}
                  >
                    <div className="flex h-10 items-center justify-center rounded-md bg-zinc-950 text-white">
                      Dark
                    </div>
                  </div>
                  <div
                    className={`cursor-pointer rounded-md border p-3 ${settings.appearance.theme === 'system' ? 'border-primary' : ''}`}
                  >
                    <div className="from-background flex h-10 items-center justify-center rounded-md border bg-gradient-to-r to-zinc-950">
                      System
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Font Size</Label>
                <div className="grid grid-cols-3 gap-2">
                  <div
                    className={`cursor-pointer rounded-md border p-3 ${settings.appearance.fontSize === 'small' ? 'border-primary' : ''}`}
                  >
                    <div className="flex h-10 items-center justify-center text-sm">Small</div>
                  </div>
                  <div
                    className={`cursor-pointer rounded-md border p-3 ${settings.appearance.fontSize === 'medium' ? 'border-primary' : ''}`}
                  >
                    <div className="flex h-10 items-center justify-center">Medium</div>
                  </div>
                  <div
                    className={`cursor-pointer rounded-md border p-3 ${settings.appearance.fontSize === 'large' ? 'border-primary' : ''}`}
                  >
                    <div className="flex h-10 items-center justify-center text-lg">Large</div>
                  </div>
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Reduced Motion</Label>
                  <p className="text-muted-foreground text-sm">
                    Reduce the amount of animations in the interface
                  </p>
                </div>
                <Switch checked={settings.appearance.reducedMotion} />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Collapsed Sidebar</Label>
                  <p className="text-muted-foreground text-sm">
                    Show only icons in the sidebar by default
                  </p>
                </div>
                <Switch checked={settings.appearance.sidebarCollapsed} />
              </div>
            </CardContent>
          </Card>

          <Card id="notifications">
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage how and when you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="mb-4 font-medium">Email Notifications</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Job Alerts</Label>
                      <p className="text-muted-foreground text-sm">
                        Receive alerts for new job matches
                      </p>
                    </div>
                    <Switch checked={settings.notifications.email.jobAlerts} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Application Updates</Label>
                      <p className="text-muted-foreground text-sm">
                        Updates on your job applications
                      </p>
                    </div>
                    <Switch checked={settings.notifications.email.applicationUpdates} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Weekly Digest</Label>
                      <p className="text-muted-foreground text-sm">
                        Weekly summary of your job search
                      </p>
                    </div>
                    <Switch checked={settings.notifications.email.weeklyDigest} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Marketing Emails</Label>
                      <p className="text-muted-foreground text-sm">
                        New features and promotional content
                      </p>
                    </div>
                    <Switch checked={settings.notifications.email.marketingEmails} />
                  </div>
                </div>
              </div>
              <Separator />
              <div>
                <h3 className="mb-4 font-medium">Push Notifications</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Job Alerts</Label>
                      <p className="text-muted-foreground text-sm">
                        Receive alerts for new job matches
                      </p>
                    </div>
                    <Switch checked={settings.notifications.push.jobAlerts} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Application Updates</Label>
                      <p className="text-muted-foreground text-sm">
                        Updates on your job applications
                      </p>
                    </div>
                    <Switch checked={settings.notifications.push.applicationUpdates} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Messages</Label>
                      <p className="text-muted-foreground text-sm">
                        Notifications for new messages
                      </p>
                    </div>
                    <Switch checked={settings.notifications.push.messages} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card id="privacy">
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>Control how your information is used and shared</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Profile Visibility</Label>
                <div className="grid grid-cols-3 gap-2">
                  <div
                    className={`cursor-pointer rounded-md border p-3 ${settings.privacy.profileVisibility === 'public' ? 'border-primary' : ''}`}
                  >
                    <div className="flex h-10 items-center justify-center">Public</div>
                  </div>
                  <div
                    className={`cursor-pointer rounded-md border p-3 ${settings.privacy.profileVisibility === 'limited' ? 'border-primary' : ''}`}
                  >
                    <div className="flex h-10 items-center justify-center">Limited</div>
                  </div>
                  <div
                    className={`cursor-pointer rounded-md border p-3 ${settings.privacy.profileVisibility === 'private' ? 'border-primary' : ''}`}
                  >
                    <div className="flex h-10 items-center justify-center">Private</div>
                  </div>
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Activity Tracking</Label>
                  <p className="text-muted-foreground text-sm">
                    Allow us to track your activities to improve your experience
                  </p>
                </div>
                <Switch checked={settings.privacy.activityTracking} />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Data Sharing</Label>
                  <p className="text-muted-foreground text-sm">
                    Share your anonymized data with our partners
                  </p>
                </div>
                <Switch checked={settings.privacy.dataSharing} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
