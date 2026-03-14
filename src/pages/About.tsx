import { Layout } from '@/components/layout/Layout';
import { Shield, Server, Users, Code } from 'lucide-react';

const AboutSection = ({ icon: Icon, title, children }: { icon: any, title: string, children: React.ReactNode }) => (
    <div className="glass-panel p-6 space-y-3">
        <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Icon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">{title}</h3>
        </div>
        <div className="text-muted-foreground leading-relaxed">
            {children}
        </div>
    </div>
);

const About = () => {
    return (
        <Layout>
            <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-10">
                <div className="text-center space-y-4 py-8">
                    <h1 className="text-4xl font-extrabold tracking-tight text-primary">
                        Forest Watcher <span className="text-foreground">System</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Advanced environmental monitoring solution designed to protect our natural resources through real-time data analysis and early threat detection.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <AboutSection icon={Shield} title="Mission Critical">
                        <p>
                            Our primary mission is to reduce the response time to forest fires. By leveraging a distributed network of IoT sensors, we provide rangers with immediate, actionable intelligence, potentially saving thousands of hectares of forest annually.
                        </p>
                    </AboutSection>

                    <AboutSection icon={Server} title="System Capabilities">
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Real-time Temperature & Humidity tracking</li>
                            <li>High-precision Smoke Particle detection (PM2.5)</li>
                            <li>Predictive Fire Risk analysis algorithms</li>
                            <li>Instant geospatial alert triangulation</li>
                        </ul>
                    </AboutSection>
                </div>

                <div className="glass-panel p-8 mt-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                                <Code className="w-8 h-8 text-primary" />
                            </div>
                            <div>
                                <h4 className="text-lg font-bold">Technical Stack</h4>
                                <p className="text-sm text-muted-foreground">Built with modern web technologies</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                            {['React', 'TypeScript', 'Tailwind', 'Vite'].map((tech) => (
                                <span key={tech} className="px-3 py-1 bg-background rounded-full border border-border text-sm font-medium">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="text-center text-sm text-muted-foreground pt-8 border-t border-border/50">
                    <p>© 2026 Forest Watcher Initiative. All rights reserved.</p>
                    <p className="mt-1">Version 2.4.0-stable • Build 8923</p>
                </div>
            </div>
        </Layout>
    );
};

export default About;
