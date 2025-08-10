import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

interface Props {
  onSearch?: (q: string) => void;
}

const sets = ["All Sets", "Modern Horizons", "Khans of Tarkir", "Commander Masters"];
const colors = ["Any", "White", "Blue", "Black", "Red", "Green", "Colorless"];
const rarities = ["Any", "common", "uncommon", "rare", "mythic"];
const formats = ["Any", "Standard", "Modern", "Legacy", "Commander"]; 

export const SearchFilters = ({ onSearch }: Props) => {
  const [q, setQ] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (!boxRef.current) return;
      if (!boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", h);
    return () => document.removeEventListener("click", h);
  }, []);

  useEffect(() => {
    if (q.length < 2) { setSuggestions([]); return; }
    const id = setTimeout(async () => {
      try {
        const res = await fetch(`https://api.scryfall.com/cards/autocomplete?q=${encodeURIComponent(q)}`);
        const data = await res.json();
        setSuggestions(data.data?.slice(0, 8) ?? []);
        setOpen(true);
      } catch {}
    }, 250);
    return () => clearTimeout(id);
  }, [q]);

  const submit = () => onSearch?.(q);

  return (
    <section aria-label="Buscador y filtros" className="container mx-auto">
      <div className="rounded-xl border border-border/60 p-4 md:p-6 bg-card/60 backdrop-blur">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative" ref={boxRef}>
          <div className="md:col-span-2 relative">
            <div className="flex gap-2">
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar carta por nombre" aria-label="Buscar"
                onFocus={() => suggestions.length > 0 && setOpen(true)} />
              <Button variant="hero" onClick={submit} aria-label="Buscar">
                <Search className="h-4 w-4" />
                Buscar
              </Button>
            </div>
            {open && suggestions.length > 0 && (
              <div className="absolute z-50 mt-2 w-full rounded-md border bg-popover text-popover-foreground shadow-md">
                <ul className="max-h-64 overflow-auto py-1">
                  {suggestions.map((s) => (
                    <li key={s}>
                      <button className="w-full text-left px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                        onClick={() => { setQ(s); setOpen(false); submit(); }}>
                        {s}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <Select>
            <SelectTrigger><SelectValue placeholder="Set" /></SelectTrigger>
            <SelectContent>
              {sets.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger><SelectValue placeholder="Color" /></SelectTrigger>
            <SelectContent>
              {colors.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger><SelectValue placeholder="Rareza" /></SelectTrigger>
            <SelectContent>
              {rarities.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger><SelectValue placeholder="Formato" /></SelectTrigger>
            <SelectContent>
              {formats.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>
    </section>
  );
};
