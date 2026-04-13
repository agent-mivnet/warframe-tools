import Sidebar from '../../components/Sidebar';
import Shell from '../../components/Shell';
import PageHeader from '../../components/PageHeader';
import WarframeCollectionsClient from './WarframeCollectionsClient';

export const metadata = { title: 'Warframe Collections — Warframe Tools' };

export default function WarframeCollectionsPage() {
  return (
    <Shell sidebar={<Sidebar />}>
      <section className="content">
        <PageHeader
          eyebrow="Warframe"
          title="Collections"
          description="Track your Warframe, Archwing, and Necramech collection. Progress saves locally."
        />
        <WarframeCollectionsClient />
      </section>
    </Shell>
  );
}
