import { useEffect, useMemo, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { AuctionCard, type AuctionItem } from "@/components/auction/AuctionCard";

export const FeaturedCarousel = () => {
  const [items, setItems] = useState<AuctionItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const fetchFeatured = async () => {
      try {
        // Cartas legales en Modern, ordenadas por precio en USD para simular "destacadas"
        const url = `https://api.scryfall.com/cards/search?order=usd&q=${encodeURIComponent('legal:modern')}&unique=cards`;
        const res = await fetch(url);
        const json = await res.json();
        const data = (json.data || []).slice(0, 9) as any[];

        const auctions: AuctionItem[] = data.map((card) => {
          const getImage = () => {
            if (card.image_uris?.large) return card.image_uris.large as string;
            if (card.card_faces?.[0]?.image_uris?.large) return card.card_faces[0].image_uris.large as string;
            return card.image_uris?.normal || card.card_faces?.[0]?.image_uris?.normal || "";
          };
          const usd = parseFloat(card.prices?.usd) || Math.max(10, Math.random() * 80);
          const currentBid = Math.max(5, Math.round(usd * 0.6));
          const buyNow = Math.round(usd * 1.05);
          const endsAt = new Date(Date.now() + (30 + Math.floor(Math.random() * 300)) * 60 * 1000).toISOString();
          return {
            id: encodeURIComponent(card.name as string),
            name: card.name,
            set: card.set_name,
            rarity: (card.rarity || "rare") as AuctionItem["rarity"],
            image: getImage(),
            currentBid,
            buyNow,
            endsAt,
            foil: card.foil || false,
          };
        });

        if (!cancelled) setItems(auctions);
      } catch (e) {
        if (!cancelled) setError("No se pudieron cargar las subastas destacadas");
      }
    };

    fetchFeatured();
    return () => { cancelled = true; };
  }, []);

  const content = useMemo(() => {
    if (error) return <p className="text-sm text-destructive">{error}</p>;
    if (!items) return <p className="text-sm text-muted-foreground">Cargando destacadas…</p>;
    return (
      <Carousel opts={{ align: "start" }} className="w-full">
        <CarouselContent>
          {items.map((item) => (
            <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3">
              <AuctionCard item={item} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="bg-card/80 backdrop-blur" />
        <CarouselNext className="bg-card/80 backdrop-blur" />
      </Carousel>
    );
  }, [items, error]);

  return (
    <section aria-label="Subastas destacadas" className="container mx-auto relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Subastas destacadas</h2>
      </div>
      {content}
    </section>
  );
};
