import hero from "@/assets/hero-mtg-auction.jpg";
import { Button } from "@/components/ui/button";
import { FeaturedCarousel } from "@/components/home/FeaturedCarousel";
import { SearchFilters } from "@/components/home/SearchFilters";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>ManaMarket — Subastas de Cartas MTG</title>
        <meta name="description" content="Compra y venta en subastas de cartas de Magic: The Gathering. Encuentra cartas por nombre, set, color, rareza y formato." />
        <link rel="canonical" href={window.location.origin + "/"} />
        <meta property="og:title" content="ManaMarket — Subastas de Cartas MTG" />
        <meta property="og:description" content="Compra y venta en subastas de cartas de Magic: The Gathering." />
      </Helmet>
      <Header />
      <main>
        <section className="relative">
          <img src={hero} alt="Cartas de Magic en una mesa con iluminación dramática para subastas" className="h-[56vh] w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 container mx-auto pb-10">
            <h1 className="text-3xl md:text-5xl font-bold max-w-3xl leading-tight">El mercado de subastas para coleccionistas de Magic: The Gathering</h1>
            <p className="text-muted-foreground mt-2 max-w-2xl">Descubre subastas que están por finalizar, encuentra cartas específicas y puja con incrementos inteligentes.</p>
            <div className="mt-4">
              <Button variant="hero" size="lg">Explorar subastas</Button>
            </div>
          </div>
        </section>

        <div className="mt-10 space-y-10">
          <SearchFilters onSearch={(q) => navigate(`/auction/${encodeURIComponent(q)}`)} />
          <FeaturedCarousel />

          <section aria-label="Listas" className="container mx-auto grid gap-6 md:grid-cols-2">
            <article className="rounded-xl border border-border/60 p-6 bg-card/60 backdrop-blur">
              <h2 className="text-xl font-semibold mb-2">Subastas recientes</h2>
              <p className="text-sm text-muted-foreground">Recién publicadas por la comunidad.</p>
            </article>
            <article className="rounded-xl border border-border/60 p-6 bg-card/60 backdrop-blur">
              <h2 className="text-xl font-semibold mb-2">Próximas subastas</h2>
              <p className="text-sm text-muted-foreground">Programadas para iniciar pronto.</p>
            </article>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
