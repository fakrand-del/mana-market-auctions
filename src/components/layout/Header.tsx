import { Link, NavLink } from "react-router-dom";
import { Gavel, ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-gradient-to-br from-primary to-accent grid place-items-center shadow-[var(--shadow-elev)]">
            <Gavel className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent font-semibold tracking-tight text-lg">
            ManaMarket
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <NavLink to="/" className={({isActive}) => isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground transition"}>Explorar</NavLink>
          <NavLink to="/sell" className={({isActive}) => isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground transition"}>Vender</NavLink>
          <NavLink to="/seller" className={({isActive}) => isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground transition"}>Perfil Vendedor</NavLink>
          <NavLink to="/buyer" className={({isActive}) => isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground transition"}>Perfil Comprador</NavLink>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" aria-label="Carrito">
            <ShoppingCart />
          </Button>
          <Button asChild variant="secondary">
            <Link to="/buyer" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Mi cuenta
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
