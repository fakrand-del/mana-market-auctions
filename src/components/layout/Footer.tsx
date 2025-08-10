const Footer = () => {
  return (
    <footer className="border-t border-border/60">
      <div className="container mx-auto py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} ManaMarket · Subastas de Cartas MTG
      </div>
    </footer>
  );
};

export default Footer;
