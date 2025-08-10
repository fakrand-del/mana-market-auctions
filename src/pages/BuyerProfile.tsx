import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Helmet } from "react-helmet-async";

export default function BuyerProfile() {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Perfil del Comprador | ManaMarket</title>
        <meta name="description" content="Pujas activas, subastas seguidas e historial de compras." />
        <link rel="canonical" href={window.location.origin + "/buyer"} />
      </Helmet>
      <Header />
      <main className="container mx-auto py-8 space-y-8">
        <section className="rounded-xl border border-border/60 p-6 bg-card/60 backdrop-blur">
          <h1 className="text-2xl font-semibold mb-2">Pujas activas</h1>
          <p className="text-sm text-muted-foreground">No tienes pujas activas (demo).</p>
        </section>
        <section className="rounded-xl border border-border/60 p-6 bg-card/60 backdrop-blur">
          <h2 className="text-xl font-semibold mb-2">Subastas seguidas</h2>
          <p className="text-sm text-muted-foreground">Aún no sigues subastas (demo).</p>
        </section>
        <section className="rounded-xl border border-border/60 p-6 bg-card/60 backdrop-blur">
          <h2 className="text-xl font-semibold mb-2">Historial de compras</h2>
          <p className="text-sm text-muted-foreground">Sin compras aún (demo).</p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
