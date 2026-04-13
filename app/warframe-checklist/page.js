import Sidebar from '../../components/Sidebar';
import Shell from '../../components/Shell';
import PageHeader from '../../components/PageHeader';
import WarframeChecklistClient from './WarframeChecklistClient';

export const metadata = { title: 'Warframe Checklist — Warframe Tools' };

export default function WarframeChecklistPage() {
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
