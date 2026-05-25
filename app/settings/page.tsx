"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SettingsSection, SettingItem } from "@/components/profile/settings-section";
import { Button } from "@/components/ui/button";
import { Loader2, User, Bell, Lock, LogOut, Save, Eye, EyeOff } from "lucide-react";

export default function SettingsPage() {
  const router = useRouter();
  const { user, userData, signOut, loading, updateUserProfile } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    bio: "",
    publicProfile: true,
    emailNotifications: true,
    soundEnabled: true,
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (userData) {
      setFormData({
        displayName: userData.displayName || "",
        email: userData.email || "",
        bio: userData.bio || "",
        publicProfile: userData.publicProfile !== false,
        emailNotifications: userData.emailNotifications !== false,
        soundEnabled: userData.soundEnabled !== false,
      });
    }
  }, [userData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      await updateUserProfile({
        displayName: formData.displayName,
        bio: formData.bio,
        publicProfile: formData.publicProfile,
        emailNotifications: formData.emailNotifications,
        soundEnabled: formData.soundEnabled,
      });
      // Show success message
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSignOut = () => {
    signOut();
    router.push("/");
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </main>
    );
  }

  if (!user || !userData) {
    return null;
  }

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "preferences", label: "Preferences", icon: Bell },
    { id: "privacy", label: "Privacy", icon: Lock },
  ];

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-20 pb-12 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Settings</h1>
            <p className="text-muted-foreground">Manage your account and preferences</p>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2 mb-8 overflow-x-auto">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="space-y-6">
              <SettingsSection title="Profile Information" description="Update your public profile details">
                <SettingItem label="Display Name" description="How your name appears across the platform">
                  <input
                    type="text"
                    name="displayName"
                    value={formData.displayName}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground"
                  />
                </SettingItem>

                <SettingItem label="Email" description="Your account email address">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    disabled
                    className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-muted-foreground cursor-not-allowed"
                  />
                </SettingItem>

                <SettingItem label="Bio" description="Tell others about yourself">
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    placeholder="Add a bio..."
                    rows={3}
                    className="w-full px-3 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground"
                  />
                </SettingItem>

                <SettingItem label="Public Profile">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="publicProfile"
                      checked={formData.publicProfile}
                      onChange={handleInputChange}
                      className="w-5 h-5 rounded"
                    />
                    <span className="text-sm">Make my profile public</span>
                  </label>
                </SettingItem>
              </SettingsSection>

              <div className="flex justify-end">
                <Button
                  onClick={handleSaveProfile}
                  disabled={isSaving}
                  className="gap-2"
                >
                  <Save className="w-4 h-4" />
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === "preferences" && (
            <div className="space-y-6">
              <SettingsSection title="Notifications" description="Manage how you receive updates">
                <SettingItem label="Email Notifications" description="Receive updates about your progress">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="emailNotifications"
                      checked={formData.emailNotifications}
                      onChange={handleInputChange}
                      className="w-5 h-5 rounded"
                    />
                    <span className="text-sm">Enabled</span>
                  </label>
                </SettingItem>
              </SettingsSection>

              <SettingsSection title="Sound" description="Audio preferences">
                <SettingItem label="Sound Effects" description="Enable or disable sound in lessons">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="soundEnabled"
                      checked={formData.soundEnabled}
                      onChange={handleInputChange}
                      className="w-5 h-5 rounded"
                    />
                    <span className="text-sm">Enabled</span>
                  </label>
                </SettingItem>
              </SettingsSection>

              <div className="flex justify-end">
                <Button
                  onClick={handleSaveProfile}
                  disabled={isSaving}
                  className="gap-2"
                >
                  <Save className="w-4 h-4" />
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </div>
          )}

          {/* Privacy Tab */}
          {activeTab === "privacy" && (
            <div className="space-y-6">
              <SettingsSection title="Account Security" description="Manage your account security">
                <SettingItem label="Password" description="Change your account password">
                  <div className="flex gap-2">
                    <div className="flex-1 relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        disabled
                        className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-muted-foreground cursor-not-allowed"
                      />
                      <button
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    <Button variant="outline">Change</Button>
                  </div>
                </SettingItem>
              </SettingsSection>

              <SettingsSection title="Account" description="Manage your account options">
                <SettingItem label="Sign Out" description="Sign out from all devices">
                  <Button
                    variant="destructive"
                    onClick={handleSignOut}
                    className="gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </Button>
                </SettingItem>
              </SettingsSection>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
