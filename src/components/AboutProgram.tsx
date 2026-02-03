import { Users, Building2, Gift, Handshake } from "lucide-react";

const AboutProgram = () => {
  const benefits = [
    {
      icon: Users,
      title: "Indique Talentos",
      description: "Conhece profissionais excepcionais? Conecte-os com oportunidades incríveis na Artium."
    },
    {
      icon: Building2,
      title: "Indique Empresas",
      description: "Sabe de empresas que precisam de soluções tecnológicas? Apresente-as à Artium."
    },
    {
      icon: Gift,
      title: "Seja Recompensado",
      description: "Suas indicações de sucesso podem gerar benefícios exclusivos para você."
    },
    {
      icon: Handshake,
      title: "Faça Parte",
      description: "Contribua para o crescimento de um ecossistema de inovação e tecnologia."
    }
  ];

  return (
    <section className="py-20 md:py-28 gradient-artium-soft">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="section-title">
            Programa de Indicações
          </h2>
          <p className="section-subtitle mt-4">
            Seja parte do nosso crescimento indicando talentos e oportunidades de negócios. 
            Juntos, construímos o futuro da tecnologia.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="card-artium p-6 md:p-8 text-center group"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-artium-slate/10 text-artium-slate mb-5 transition-all duration-300 group-hover:bg-artium-slate group-hover:text-white">
                <benefit.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-artium-charcoal mb-3">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutProgram;
