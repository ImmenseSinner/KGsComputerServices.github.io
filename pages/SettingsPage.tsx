import { useState } from "react";
import { User, Bell, Lock, Palette } from "lucide-react";

export function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8">Account Settings</h1>

      <div className="space-y-8">
        {/* Profile */}
        <div className="bg-white rounded-3xl border p-8">
          <div className="flex items-center gap-3 mb-6">
            <User className="text-weld-600" />
            <div>
              <div className="font-bold text-xl">Profile Information</div>
              <div className="text-sm text-steel-500">Update your personal details</div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div><label className="text-xs">Full Name</label><input defaultValue="John Doe" className="w-full border px-4 py-3 rounded-2xl" /></div>
            <div><label className="text-xs">Email</label><input defaultValue="john@learnhub.com" className="w-full border px-4 py-3 rounded-2xl" /></div>
          </div>
          <button className="mt-6 px-6 py-3 bg-weld-600 text-white rounded-2xl text-sm">Save Changes</button>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-3xl border p-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Bell className="text-weld-600" />
              <div>
                <div className="font-bold">Notifications</div>
                <div className="text-sm">Receive email and push notifications</div>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={notifications} onChange={() => setNotifications(!notifications)} className="sr-only peer" />
              <div className="w-11 h-6 bg-steel-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-weld-600"></div>
            </label>
          </div>
        </div>

        {/* Security */}
        <div className="bg-white rounded-3xl border p-8">
          <div className="flex items-center gap-3 mb-6">
            <Lock className="text-weld-600" />
            <div className="font-bold text-xl">Security</div>
          </div>
          <button className="px-6 py-3 border border-steel-200 rounded-2xl text-sm">Change Password</button>
        </div>

        <div className="text-xs text-steel-500 text-center">LearnHub v2.4 • Built from the uploaded LMS files</div>
      </div>
    </div>
  );
}
