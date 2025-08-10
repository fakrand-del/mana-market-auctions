import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Countdown } from "./Countdown";

export interface AuctionItem {
  id: string;
  name: string;
  set: string;
  rarity: "common" | "uncommon" | "rare" | "mythic";
  image: string;
  currentBid: number;
  buyNow?: number;
  endsAt: string;
  foil?: boolean;
}

const rarityMap: Record<AuctionItem["rarity"], "outline" | "secondary" | "default" | "destructive"> = {
  common: "outline",
  uncommon: "secondary",
  rare: "default",
  mythic: "destructive",
};

export const AuctionCard = ({ item }: { item: AuctionItem }) => {
  return (
    <Link to={`/auction/${encodeURIComponent(item.id)}`} aria-label={`Ver subasta ${item.name}`}>
      <Card className="group overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]">
        <CardHeader className="p-0">
          <div className="relative aspect-[3/4] overflow-hidden">
            <img
              src={item.image}
              alt={`Carta ${item.name} ${item.foil ? 'Foil' : ''}`}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
            {item.foil && (
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(120deg,hsl(var(--primary)/.0),hsl(var(--accent)/.2),hsl(var(--primary)/.0))] animate-[pulse_3s_ease-in-out_infinite]" />
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">{item.name}</CardTitle>
            <Badge variant={rarityMap[item.rarity]} className="capitalize">{item.rarity}</Badge>
          </div>
          <p className="text-xs text-muted-foreground">{item.set}</p>
          <div className="flex items-center justify-between">
            <span className="text-sm">Puja actual: <strong>S/ {item.currentBid.toFixed(2)}</strong></span>
            <Countdown endsAt={item.endsAt} />
          </div>
        </CardContent>
        {item.buyNow && (
          <CardFooter className="pt-0">
            <span className="text-xs text-muted-foreground">Comprar ahora: S/ {item.buyNow.toFixed(2)}</span>
          </CardFooter>
        )}
      </Card>
    </Link>
  );
};
