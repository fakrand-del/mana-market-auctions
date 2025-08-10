import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/sonner";

export default function SellerDashboard() {
  const [front, setFront] = useState<string | undefined>();
  const [back, setBack] = useState<string | undefined>();

  const handleImage = (file: File, setter: (s: string) => void) => {
    const reader = new FileReader();
    reader.onload = () => setter(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Panel del Vendedor | ManaMarket</title>
        <meta name="description" content="Crea subastas de cartas MTG, sube imágenes, define FOIL, precios y opciones de entrega." />
        <link rel="canonical" href={window.location.origin + "/sell"} />
      </Helmet>
      <Header />
      <main className="container mx-auto py-8 space-y-8">
        <section className="rounded-xl border border-border/60 p-6 bg-card/60 backdrop-blur">
          <h1 className="text-2xl font-semibold mb-4">Crear subasta</h1>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-sm">Carta (autocompletar con Scryfall)</label>
              <Input placeholder="Escribe el nombre exacto de la carta" />
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm">Imagen frontal</label>
                  <Input type="file" accept="image/*" onChange={(e) => e.target.files && handleImage(e.target.files[0], (s) => setFront(s))} />
                  {front && <img src={front} className="mt-2 max-h-40 rounded-lg border" alt="Previsualización frontal" />}
                </div>
                <div>
                  <label className="text-sm">Imagen posterior</label>
                  <Input type="file" accept="image/*" onChange={(e) => e.target.files && handleImage(e.target.files[0], (s) => setBack(s))} />
                  {back && <img src={back} className="mt-2 max-h-40 rounded-lg border" alt="Previsualización posterior" />}
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Checkbox id="foil" />
                <label htmlFor="foil" className="text-sm">FOIL</label>
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-sm">Precio inicial (S/)</label>
              <Input type="number" placeholder="0.00" />
              <label className="text-sm">Comprar ahora (S/)</label>
              <Input type="number" placeholder="0.00" />
              <label className="text-sm">Opciones de entrega</label>
              <Input placeholder="Zonas de entrega o envío" />
              <p className="text-xs text-muted-foreground">Comisión del 5% sobre el precio final.</p>
              <Button variant="hero" onClick={() => toast.success("Subasta creada (demo)")}>Crear subasta</Button>
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-border/60 p-6 bg-card/60 backdrop-blur">
          <h2 className="text-xl font-semibold mb-4">Mis subastas</h2>
          <p className="text-sm text-muted-foreground">Aún no tienes subastas creadas (demo).</p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
