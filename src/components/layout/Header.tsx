import { Link, NavLink } from "react-router-dom";
import { Gavel, ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "text-foreground font-medium border-b-2 border-primary"
      : "text-muted-foreground hover:text-foreground transition-colors";

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2" aria-label="Inicio">
          <div className="h-8 w-8 rounded-md bg-gradient-to-br from-primary to-accent grid place-items-center shadow-[var(--shadow-elev)]">
            <Gavel className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent font-semibold tracking-tight text-lg">
            ManaMarket
          </span>
        </Link>

        {/* Navegación */}
        <nav className="hidden md:flex items-center gap-6 text-sm" aria-label="Menú principal">
          <NavLink to="/" className={navLinkClasses}>Explorar</NavLink>
          <NavLink to="/sell" className={navLinkClasses}>Vender</NavLink>
          <NavLink to="/seller" className={navLinkClasses}>Perfil Vendedor</NavLink>
          <NavLink to="/buyer" className={navLinkClasses}>Perfil Comprador</NavLink>
        </nav>

        {/* Acciones */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" aria-label="Ver carrito">
            <ShoppingCart />
          </Button>
          <Button asChild variant="secondary">
            <Link to="/buyer" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Mi cuenta</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
