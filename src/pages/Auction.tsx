import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";

interface AuctionData {
  name: string;
  set: string;
  rarity: "common" | "uncommon" | "rare" | "mythic";
  currentBid: number;
  buyNow?: number;
  endsAt: string;
  condition: string;
  foil?: boolean;
  seller: { username: string; rating: number; badges: string[]; deliversInPerson: boolean; ships: boolean; locations: string[] };
  history: Array<{ user: string; amount: number; at: string }>;
  images: { front: string; back?: string };
}

const rarityText: Record<AuctionData["rarity"], string> = {
  common: "Común",
  uncommon: "Infrecuente",
  rare: "Rara",
  mythic: "Mítica",
};

export default function AuctionPage() {
  const { slug } = useParams();
  const [refImage, setRefImage] = useState<string | null>(null);
  const [bid, setBid] = useState("");
  const data: AuctionData = useMemo(() => ({
    name: decodeURIComponent(slug || "Mystic Card"),
    set: "Modern Horizons 2",
    rarity: "mythic",
    currentBid: 420,
    buyNow: 650,
    endsAt: new Date(Date.now() + 1000 * 60 * 47).toISOString(),
    condition: "Near Mint",
    foil: true,
    seller: { username: "planeswalker", rating: 4.8, badges: ["Vendedor Verificado", "Envío Rápido"], deliversInPerson: true, ships: true, locations: ["Lima Centro", "Miraflores"] },
    history: [
      { user: "moxmaster", amount: 400, at: new Date(Date.now() - 1000*60*30).toISOString() },
      { user: "snap", amount: 420, at: new Date(Date.now() - 1000*60*10).toISOString() },
    ],
    images: {
      front: "https://cards.scryfall.io/large/front/4/3/43672d1f-8a17-43d1-8d7a-19b20d2bdca2.jpg?1626093546",
      back: "https://c1.scryfall.com/file/scryfall-errors/original/magic-card-back.jpg",
    }
  }), [slug]);

  useEffect(() => {
    let done = false;
    const fetchRef = async () => {
      try {
        const res = await fetch(`https://api.scryfall.com/cards/named?exact=${encodeURIComponent(data.name)}`);
        const json = await res.json();
        if (!done) setRefImage(json.image_uris?.normal ?? null);
      } catch {}
    };
    fetchRef();
    return () => { done = true; };
  }, [data.name]);

  const inc = (n: number) => toast.success(`Puja aumentada en S/ ${n.toFixed(2)}`);
  const placeBid = () => toast.success(`Puja realizada: S/ ${(Number(bid) || 0).toFixed(2)}`);
  const buyNow = () => toast.success("Compra inmediata realizada (demo)");

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{`${data.name} — Subasta | ManaMarket`}</title>
        <meta name="description" content={`Subasta de ${data.name} (${data.set}) ${data.foil ? 'FOIL' : ''}. Puja actual S/ ${data.currentBid.toFixed(2)}.`} />
        <link rel="canonical" href={window.location.origin + window.location.pathname} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          name: data.name,
          brand: "Magic: The Gathering",
          offers: { "@type": "Offer", price: data.currentBid, priceCurrency: "PEN", availability: "https://schema.org/InStock" },
        })}</script>
      </Helmet>
      <Header />
      <main className="container mx-auto py-8 grid lg:grid-cols-12 gap-8">
        <section className="lg:col-span-7">
          <div className="relative rounded-xl overflow-hidden border border-border/60 bg-card">
            <img src={data.images.front} alt={`Frontal ${data.name}`} className="w-full object-cover" />
            {data.foil && <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(120deg,hsl(var(--primary)/.0),hsl(var(--accent)/.2),hsl(var(--primary)/.0))]" />}
            {refImage && (
              <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity bg-background/80 grid place-items-center p-4">
                <img src={refImage} alt={`Referencia Scryfall ${data.name}`} className="max-h-full object-contain" />
              </div>
            )}
          </div>
          {data.images.back && (
            <div className="mt-4">
              <img src={data.images.back} alt={`Posterior ${data.name}`} className="max-h-72 rounded-lg border border-border/60" />
            </div>
          )}
          <div className="mt-4 text-sm text-muted-foreground">Condición: <strong className="text-foreground">{data.condition}</strong> {data.foil && <Badge className="ml-2">FOIL</Badge>}</div>
        </section>

        <aside className="lg:col-span-5 space-y-6">
          <div className="rounded-xl border border-border/60 p-6 bg-card/60 backdrop-blur">
            <h1 className="text-2xl font-semibold">{data.name}</h1>
            <p className="text-sm text-muted-foreground">{data.set} · {rarityText[data.rarity]}</p>
            <div className="mt-4 space-y-3">
              <div className="text-lg">Puja actual: <strong>S/ {data.currentBid.toFixed(2)}</strong></div>
              <div className="text-sm">Tiempo restante: <span className="font-mono">47m</span></div>
              <div className="grid grid-cols-4 gap-2">
                <Button onClick={() => inc(1)}>+ S/ 1.00</Button>
                <Button onClick={() => inc(5)} variant="secondary">+ S/ 5.00</Button>
                <Button onClick={() => inc(10)} variant="secondary">+ S/ 10.00</Button>
                <div className="col-span-2 flex gap-2 mt-2">
                  <Input value={bid} onChange={(e) => setBid(e.target.value)} placeholder="Monto exacto" />
                  <Button onClick={placeBid}>Pujar</Button>
                </div>
              </div>
              {data.buyNow && (
                <Button variant="hero" size="lg" onClick={buyNow} className="w-full">Comprar ahora por S/ {data.buyNow.toFixed(2)}</Button>
              )}
            </div>
          </div>

          <div className="rounded-xl border border-border/60 p-6 bg-card/60 backdrop-blur">
            <h2 className="font-semibold mb-2">Vendedor</h2>
            <div className="text-sm">@{data.seller.username} · ⭐ {data.seller.rating.toFixed(1)}</div>
            <div className="flex gap-2 mt-2 flex-wrap">
              {data.seller.badges.map((b) => <Badge key={b}>{b}</Badge>)}
            </div>
            <div className="mt-3 text-sm text-muted-foreground">
              Entrega en persona: {data.seller.deliversInPerson ? data.seller.locations.join(", ") : "No"}
              <br/>
              Envíos: {data.seller.ships ? "Sí" : "No"}
            </div>
          </div>

          <div className="rounded-xl border border-border/60 p-6 bg-card/60 backdrop-blur">
            <h2 className="font-semibold mb-3">Historial de pujas</h2>
            <ul className="space-y-2 text-sm">
              {data.history.map((h, i) => (
                <li key={i} className="flex items-center justify-between">
                  <span>@{h.user}</span>
                  <span>S/ {h.amount.toFixed(2)}</span>
                  <time className="text-muted-foreground">{new Date(h.at).toLocaleTimeString()}</time>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </main>
      <Footer />
    </div>
  );
}
