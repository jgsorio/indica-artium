import { ArrowDown } from "lucide-react";
import artiumLogo from "@/assets/artium-logo.png";
import heroBg from "@/assets/hero-business.jpg";

const Hero = () => {
  const scrollToForms = () => {
    const formsSection = document.getElementById("formularios");
    if (formsSection) {
      formsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />

      <div className="container relative z-10 px-4 md:px-6 py-20">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Logo */}
          <div className="animate-fade-up mb-8">
            <img 
              src={artiumLogo} 
              alt="Artium Soluções" 
              className="h-16 md:h-20 w-auto brightness-0 invert"
            />
          </div>

          {/* Title */}
          <h1 className="animate-fade-up text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 text-balance">
            Indique talentos e oportunidades que{" "}
            <span className="text-white/90">transformam negócios</span>
          </h1>

          {/* Subtitle */}
          <p className="animate-fade-up-delay text-lg md:text-xl text-white/80 max-w-2xl mb-10 leading-relaxed">
            Conecte pessoas e empresas à Artium Soluções e ajude a construir o futuro da tecnologia.
          </p>

          {/* CTA Button */}
          <div className="animate-fade-up-delay flex flex-col sm:flex-row gap-4">
            <button 
              onClick={scrollToForms}
              className="btn-artium-outline group"
            >
              Fazer uma indicação
              <ArrowDown className="w-5 h-5 transition-transform group-hover:translate-y-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-6 h-6 text-white/50" />
      </div>
    </section>
  );
};

export default Hero;
