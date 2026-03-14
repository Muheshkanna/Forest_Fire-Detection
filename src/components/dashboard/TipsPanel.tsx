import { ShieldAlert, ShieldCheck, Shield } from 'lucide-react';

interface TipsPanelProps {
    riskLevel: 'safe' | 'warning' | 'danger';
}

export const TipsPanel = ({ riskLevel }: TipsPanelProps) => {
    const tips = {
        safe: {
            icon: ShieldCheck,
            color: "text-green-500",
            bg: "bg-green-500/10",
            title: "Conditions are Safe",
            items: [
                "Regular sensor maintenance recommended.",
                "Update emergency contact lists.",
                "Review evacuation protocols with the team."
            ]
        },
        warning: {
            icon: Shield,
            color: "text-yellow-500",
            bg: "bg-yellow-500/10",
            title: "Elevated Risk - Be Alert",
            items: [
                "Monitor wind speed changes closely.",
                "Prepare firefighting equipment for deployment.",
                "Restrict public access to high-risk zones."
            ]
        },
        danger: {
            icon: ShieldAlert,
            color: "text-red-500",
            bg: "bg-red-500/10",
            title: "CRITICAL FIRE RISK",
            items: [
                "IMMEDIATE ACTION REQUIRED.",
                "Evacuate all personnel from sector 4.",
                "Activate automated suppression systems."
            ]
        }
    };

    const currentUtils = tips[riskLevel] || tips.safe;
    const Icon = currentUtils.icon;

    return (
        <div className={`glass-panel p-4 h-full border-l-4 ${riskLevel === 'danger' ? 'border-l-red-500' : riskLevel === 'warning' ? 'border-l-yellow-500' : 'border-l-green-500'}`}>
            <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg ${currentUtils.bg} ${currentUtils.color}`}>
                    <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold">{currentUtils.title}</h3>
            </div>

            <ul className="space-y-2">
                {currentUtils.items.map((item, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-foreground/50 shrink-0" />
                        <span>{item}</span>
                    </li>
                ))}
            </ul>

            <div className="mt-4 pt-4 border-t border-border/50">
                <button className="text-xs text-primary hover:underline transition-all">View Full Protocol &rarr;</button>
            </div>
        </div>
    );
};
