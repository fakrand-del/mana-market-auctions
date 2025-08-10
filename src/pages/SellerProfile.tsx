import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Helmet } from "react-helmet-async";
import { Badge } from "@/components/ui/badge";

export default function SellerProfile() {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Perfil del Vendedor | ManaMarket</title>
        <meta name="description" content="Reputación, insignias y subastas del vendedor." />
        <link rel="canonical" href={window.location.origin + "/seller"} />
      </Helmet>
      <Header />
      <main className="container mx-auto py-8 space-y-8">
        <section className="rounded-xl border border-border/60 p-6 bg-card/60 backdrop-blur">
          <h1 className="text-2xl font-semibold">@planeswalker</h1>
          <p className="text-sm text-muted-foreground">Puntuación: ⭐ 4.8</p>
          <div className="flex gap-2 mt-3 flex-wrap">
            <Badge>Vendedor Verificado</Badge>
            <Badge>Envío Rápido</Badge>
          </div>
        </section>
        <section className="rounded-xl border border-border/60 p-6 bg-card/60 backdrop-blur">
          <h2 className="text-xl font-semibold mb-2">Subastas activas</h2>
          <p className="text-sm text-muted-foreground">Sin subastas activas (demo).</p>
        </section>
        <section className="rounded-xl border border-border/60 p-6 bg-card/60 backdrop-blur">
          <h2 className="text-xl font-semibold mb-2">Comentarios</h2>
          <p className="text-sm text-muted-foreground">Aún no hay comentarios (demo).</p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
