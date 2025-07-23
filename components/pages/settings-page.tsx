"use client"

import { TopNavigation } from "../layout/top-navigation"
import { SecondaryToolbar } from "../layout/secondary-toolbar"
import { Sidebar } from "../layout/sidebar"
import type { ViewType } from "../../app/page"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Shield, Bell, Palette } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface SettingsPageProps {
  onNavigate: (view: ViewType) => void
}

export default function SettingsPage({ onNavigate }: SettingsPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
     
      

      <div className="flex">
        <Sidebar activeItem="Settings" onNavigate={onNavigate} />

        <div className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
              <p className="text-gray-600 mt-1">Manage your account and application preferences</p>
            </div>

            <div className="space-y-6">
              {/* Account Settings */}
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <User className="w-5 h-5" />
                    <CardTitle>Account Settings</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>First Name</Label>
                      <Input defaultValue="John" />
                    </div>
                    <div className="space-y-2">
                      <Label>Last Name</Label>
                      <Input defaultValue="Doe" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input defaultValue="john.doe@company.com" />
                  </div>
                  <Button>Save Changes</Button>
                </CardContent>
              </Card>

              {/* Security Settings */}
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <CardTitle>Security</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Two-Factor Authentication</Label>
                      <p className="text-sm text-gray-500">Add an extra layer of security</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Login Notifications</Label>
                      <p className="text-sm text-gray-500">Get notified of new logins</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Button variant="outline">Change Password</Button>
                </CardContent>
              </Card>

              {/* Notification Settings */}
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Bell className="w-5 h-5" />
                    <CardTitle>Notifications</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-gray-500">Receive updates via email</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Agent Alerts</Label>
                      <p className="text-sm text-gray-500">Get notified when agents need attention</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Performance Reports</Label>
                      <p className="text-sm text-gray-500">Weekly performance summaries</p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>

              {/* Appearance Settings */}
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Palette className="w-5 h-5" />
                    <CardTitle>Appearance</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Dark Mode</Label>
                      <p className="text-sm text-gray-500">Switch to dark theme</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Compact View</Label>
                      <p className="text-sm text-gray-500">Show more content in less space</p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
