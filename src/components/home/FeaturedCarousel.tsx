import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { AuctionCard, type AuctionItem } from "@/components/auction/AuctionCard";

const mockAuctions: AuctionItem[] = [
  {
    id: "black-lotus-ce",
    name: "Black Lotus (CE)",
    set: "Collector's Edition",
    rarity: "mythic",
    image: "https://cards.scryfall.io/large/front/1/3/136c2dd8-984e-4bdf-a7c2-3a7a2a7e0f61.jpg?1561757510",
    currentBid: 15000,
    buyNow: 20000,
    endsAt: new Date(Date.now() + 1000 * 60 * 60 * 5).toISOString(),
    foil: false,
  },
  {
    id: "ragavan-nmh",
    name: "Ragavan, Nimble Pilferer",
    set: "Modern Horizons 2",
    rarity: "mythic",
    image: "https://cards.scryfall.io/large/front/4/3/43672d1f-8a17-43d1-8d7a-19b20d2bdca2.jpg?1626093546",
    currentBid: 420,
    buyNow: 650,
    endsAt: new Date(Date.now() + 1000 * 60 * 60 * 2).toISOString(),
    foil: true,
  },
  {
    id: "fetch-poluted",
    name: "Polluted Delta",
    set: "Khans of Tarkir",
    rarity: "rare",
    image: "https://cards.scryfall.io/large/front/1/7/17a0be4e-343f-4353-a4e4-3a4fd860bc84.jpg?1562786902",
    currentBid: 95,
    buyNow: 150,
    endsAt: new Date(Date.now() + 1000 * 60 * 30).toISOString(),
    foil: false,
  },
];

export const FeaturedCarousel = () => {
  return (
    <section aria-label="Subastas destacadas" className="container mx-auto relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Subastas destacadas</h2>
      </div>
      <Carousel opts={{ align: "start" }} className="w-full">
        <CarouselContent>
          {mockAuctions.map((item) => (
            <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3">
              <AuctionCard item={item} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="bg-card/80 backdrop-blur" />
        <CarouselNext className="bg-card/80 backdrop-blur" />
      </Carousel>
    </section>
  );
};
