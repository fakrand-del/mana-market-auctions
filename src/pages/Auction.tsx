import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";
import { Countdown } from "@/components/auction/Countdown";

interface ScryfallCard {
  name: string;
  set_name: string;
  rarity: "common" | "uncommon" | "rare" | "mythic";
  image_uris?: { normal?: string; large?: string };
  card_faces?: Array<{ image_uris?: { normal?: string; large?: string } }>;
  foil?: boolean;
}

const rarityText: Record<ScryfallCard["rarity"], string> = {
  common: "Común",
  uncommon: "Infrecuente",
  rare: "Rara",
  mythic: "Mítica",
};

export default function AuctionPage() {
  const { slug } = useParams();
  const [card, setCard] = useState<ScryfallCard | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [bid, setBid] = useState("");

  // Simulación de valores de subasta
  const currentBid =  Math.round( (card ? 80 : 50) + Math.random() * 100 );
  const buyNow = currentBid + 120;
  const endsAt = useMemo(() => new Date(Date.now() + 1000 * 60 * 47).toISOString(), []);

  useEffect(() => {
    let cancelled = false;
    const fetchCard = async () => {
      try {
        if (!slug) return;
        const url = `https://api.scryfall.com/cards/named?fuzzy=${encodeURIComponent(decodeURIComponent(slug))}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("No encontrado");
        const json = (await res.json()) as ScryfallCard;
        if (!cancelled) setCard(json);
      } catch (e) {
        if (!cancelled) setError("No se encontró la carta en Scryfall");
      }
    };
    fetchCard();
    return () => { cancelled = true; };
  }, [slug]);

  const mainImg = card?.image_uris?.large || card?.card_faces?.[0]?.image_uris?.large || card?.image_uris?.normal || card?.card_faces?.[0]?.image_uris?.normal || "";
  const refImg = card?.image_uris?.normal || card?.card_faces?.[0]?.image_uris?.normal || mainImg;

  const inc = (n: number) => toast.success(`Puja aumentada en S/ ${n.toFixed(2)}`);
  const placeBid = () => toast.success(`Puja realizada: S/ ${(Number(bid) || 0).toFixed(2)}`);
  const buyNowAction = () => toast.success("Compra inmediata realizada (demo)");

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{`${card?.name ?? slug} — Subasta | ManaMarket`}</title>
        <meta name="description" content={`Subasta de ${card?.name ?? slug} (${card?.set_name ?? ''}).`} />
        <link rel="canonical" href={window.location.origin + window.location.pathname} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          name: card?.name ?? slug,
          brand: "Magic: The Gathering",
          offers: { "@type": "Offer", price: currentBid, priceCurrency: "PEN", availability: "https://schema.org/InStock" },
        })}</script>
      </Helmet>
      <Header />
      <main className="container mx-auto py-8 grid lg:grid-cols-12 gap-8">
        <section className="lg:col-span-7">
          <div className="relative rounded-xl overflow-hidden border border-border/60 bg-card min-h-[300px] grid place-items-center">
            {!card && !error && <p className="text-sm text-muted-foreground">Cargando carta…</p>}
            {error && <p className="text-sm text-destructive">{error}</p>}
            {mainImg && (
              <img src={mainImg} alt={`Carta ${card?.name ?? slug}`} className="w-full object-cover" />
            )}
            {card?.foil && <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(120deg,hsl(var(--primary)/.0),hsl(var(--accent)/.2),hsl(var(--primary)/.0))]" />}
            {refImg && (
              <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity bg-background/80 grid place-items-center p-4">
                <img src={refImg} alt={`Referencia Scryfall ${card?.name ?? slug}`} className="max-h-full object-contain" />
              </div>
            )}
          </div>
          <div className="mt-4 text-sm text-muted-foreground">Condición: <strong className="text-foreground">Near Mint</strong> {card?.foil && <Badge className="ml-2">FOIL</Badge>}</div>
        </section>

        <aside className="lg:col-span-5 space-y-6">
          <div className="rounded-xl border border-border/60 p-6 bg-card/60 backdrop-blur">
            <h1 className="text-2xl font-semibold">{card?.name ?? slug}</h1>
            <p className="text-sm text-muted-foreground">{card?.set_name ?? "Set"} · {card ? rarityText[card.rarity] : ""}</p>
            <div className="mt-4 space-y-3">
              <div className="text-lg">Puja actual: <strong>S/ {currentBid.toFixed(2)}</strong></div>
              <div className="text-sm flex items-center gap-2">Tiempo restante: <Countdown endsAt={endsAt} /></div>
              <div className="grid grid-cols-4 gap-2">
                <Button onClick={() => inc(1)}>+ S/ 1.00</Button>
                <Button onClick={() => inc(5)} variant="secondary">+ S/ 5.00</Button>
                <Button onClick={() => inc(10)} variant="secondary">+ S/ 10.00</Button>
                <div className="col-span-2 flex gap-2 mt-2">
                  <Input value={bid} onChange={(e) => setBid(e.target.value)} placeholder="Monto exacto" />
                  <Button onClick={placeBid}>Pujar</Button>
                </div>
              </div>
              <Button variant="hero" size="lg" onClick={buyNowAction} className="w-full">Comprar ahora por S/ {buyNow.toFixed(2)}</Button>
            </div>
          </div>

          <div className="rounded-xl border border-border/60 p-6 bg-card/60 backdrop-blur">
            <h2 className="font-semibold mb-2">Vendedor</h2>
            <div className="text-sm">@planeswalker · ⭐ 4.8</div>
            <div className="flex gap-2 mt-2 flex-wrap">
              <Badge>Vendedor Verificado</Badge>
              <Badge>Envío Rápido</Badge>
            </div>
            <div className="mt-3 text-sm text-muted-foreground">
              Entrega en persona: Lima Centro, Miraflores
              <br/>
              Envíos: Sí
            </div>
          </div>

          <div className="rounded-xl border border-border/60 p-6 bg-card/60 backdrop-blur">
            <h2 className="font-semibold mb-3">Historial de pujas</h2>
            <ul className="space-y-2 text-sm">
              {[{ user: "moxmaster", amount: currentBid-20 }, { user: "snap", amount: currentBid }].map((h, i) => (
                <li key={i} className="flex items-center justify-between">
                  <span>@{h.user}</span>
                  <span>S/ {h.amount.toFixed(2)}</span>
                  <time className="text-muted-foreground">{new Date(Date.now() - (i+1)*1000*60*10).toLocaleTimeString()}</time>
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
