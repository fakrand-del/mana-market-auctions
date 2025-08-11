Ejemplo optimizado:

tsx
Copy
Edit
const Footer = () => {
  return (
    <footer
      className="border-t border-border/60 bg-background"
      aria-label="Pie de página"
    >
      <div className="container mx-auto py-8 px-4 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} ManaMarket · Subastas de Cartas MTG
      </div>
    </footer>
  );
};

export default Footer;
