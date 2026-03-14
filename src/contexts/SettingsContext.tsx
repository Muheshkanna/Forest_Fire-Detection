import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

interface SettingsContextType {
    pushNotifications: boolean;
    soundAlerts: boolean;
    autoShutdown: boolean;
    temperatureThreshold: number;
    updateSettings: (updates: Partial<SettingsContextType>) => void;
    saveSettings: () => void;
    resetSettings: () => void;
}

const defaultSettings = {
    pushNotifications: true,
    soundAlerts: true,
    autoShutdown: true,
    temperatureThreshold: 60,
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
    const [settings, setSettings] = useState(() => {
        const saved = localStorage.getItem('forest-watcher-settings');
        return saved ? JSON.parse(saved) : defaultSettings;
    });

    const updateSettings = (updates: Partial<SettingsContextType>) => {
        setSettings((prev: any) => ({ ...prev, ...updates }));
    };

    const saveSettings = () => {
        localStorage.setItem('forest-watcher-settings', JSON.stringify(settings));
        toast.success("Settings saved successfully");
    };

    const resetSettings = () => {
        setSettings(defaultSettings);
        localStorage.removeItem('forest-watcher-settings');
        toast.info("Settings reset to defaults");
    };

    return (
        <SettingsContext.Provider value={{ ...settings, updateSettings, saveSettings, resetSettings }}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (context === undefined) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
};
