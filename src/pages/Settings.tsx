import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Bell, Volume2, Shield } from 'lucide-react';
import { useSettings } from '@/contexts/SettingsContext';
import { toast } from 'sonner';

const SettingsSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="glass-panel p-6 space-y-4">
        <h3 className="text-lg font-semibold border-b border-border/50 pb-2 mb-4">{title}</h3>
        {children}
    </div>
);

const SettingsRow = ({ icon: Icon, label, description, checked, onCheckedChange }: {
    icon: any,
    label: string,
    description: string,
    checked: boolean,
    onCheckedChange: (checked: boolean) => void
}) => (
    <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Icon className="w-5 h-5" />
            </div>
            <div>
                <p className="font-medium">{label}</p>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>
        </div>
        <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
);

const Settings = () => {
    const {
        pushNotifications,
        soundAlerts,
        autoShutdown,
        temperatureThreshold,
        updateSettings,
        saveSettings,
        resetSettings
    } = useSettings();

    return (
        <Layout>
            <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight text-primary">Settings</h1>
                    <p className="text-muted-foreground">Manage your dashboard preferences and alerts</p>
                </div>

                <div className="grid gap-6">
                    <SettingsSection title="Notifications">
                        <SettingsRow
                            icon={Bell}
                            label="Push Notifications"
                            description="Receive alerts directly to your browser"
                            checked={pushNotifications}
                            onCheckedChange={(checked) => updateSettings({ pushNotifications: checked })}
                        />
                        <SettingsRow
                            icon={Volume2}
                            label="Sound Alerts"
                            description="Play audible alarm during critical fire risks"
                            checked={soundAlerts}
                            onCheckedChange={(checked) => updateSettings({ soundAlerts: checked })}
                        />
                    </SettingsSection>

                    <SettingsSection title="Sensor Configuration">
                        <div className="space-y-4">
                            <SettingsRow
                                icon={Shield}
                                label="Auto-Shutdown"
                                description="Automatically shut down sensors in extreme heat"
                                checked={autoShutdown}
                                onCheckedChange={(checked) => updateSettings({ autoShutdown: checked })}
                            />
                            <div className="pt-4">
                                <Label>Temperature Threshold (°C)</Label>
                                <div className="flex gap-4 mt-2">
                                    <input
                                        type="range"
                                        min="40"
                                        max="100"
                                        value={temperatureThreshold}
                                        onChange={(e) => updateSettings({ temperatureThreshold: parseInt(e.target.value) })}
                                        className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
                                    />
                                    <span className="font-mono bg-card px-2 py-1 rounded border border-border">{temperatureThreshold}°C</span>
                                </div>
                            </div>
                        </div>
                    </SettingsSection>

                    <div className="flex justify-end gap-4">
                        <Button variant="outline" onClick={resetSettings}>Reset to Defaults</Button>
                        <Button onClick={saveSettings}>Save Changes</Button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Settings;
