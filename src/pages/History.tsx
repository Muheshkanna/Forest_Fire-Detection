import { useSensorData } from '@/hooks/useSensorData';
import { HistoryTable } from '@/components/dashboard/HistoryTable';
import { Layout } from '@/components/layout/Layout';

const History = () => {
    const { history } = useSensorData();

    return (
        <Layout>
            <div className="space-y-6 animate-in fade-in duration-500">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold tracking-tight text-primary">Sensor History</h1>
                    <p className="text-muted-foreground">Detailed logs of all sensor activity</p>
                </div>

                <div className="glass-panel p-6">
                    <HistoryTable history={history} />
                </div>
            </div>
        </Layout>
    );
};

export default History;
