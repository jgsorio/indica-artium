import artiumLogo from "@/assets/artium-logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-artium-charcoal py-12">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src={artiumLogo} 
              alt="Artium Soluções" 
              className="h-10 w-auto brightness-0 invert"
            />
          </div>

          {/* Links */}
          <div className="flex items-center gap-8">
            <a 
              href="https://artiumsolucoes.com.br/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors text-sm"
            >
              Site Principal
            </a>
            <a 
              href="https://artiumsolucoes.com.br/#contato" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors text-sm"
            >
              Contato
            </a>
          </div>

          {/* Copyright */}
          <div className="text-white/50 text-sm text-center md:text-right">
            © {currentYear} Artium Soluções. Todos os direitos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
