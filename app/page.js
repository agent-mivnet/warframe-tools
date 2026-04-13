import Sidebar from '../components/Sidebar';
import Shell from '../components/Shell';
import PageHeader from '../components/PageHeader';
import WarframeChecklistClient from './warframe-checklist/WarframeChecklistClient';

export const metadata = { title: 'Warframe Task Checklist — Warframe Tools' };

export default function HomePage() {
  return (
    <Shell sidebar={<Sidebar />}>
      <section className="content">
        <PageHeader
          eyebrow="Warframe"
          title="Task Checklist"
          description="Track your daily, weekly, and other Warframe tasks. Progress saves locally."
        />
        <WarframeChecklistClient />
      </section>
    </Shell>
  );
}
