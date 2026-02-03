import { useState } from "react";
import { Users, Building2 } from "lucide-react";
import TalentForm from "./TalentForm";
import CompanyForm from "./CompanyForm";

type FormType = "talent" | "company";

const FormsSection = () => {
  const [activeForm, setActiveForm] = useState<FormType>("talent");

  return (
    <section id="formularios" className="py-20 md:py-28 bg-background">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="section-title">
            Faça sua Indicação
          </h2>
          <p className="section-subtitle mt-4">
            Escolha o tipo de indicação que deseja fazer e preencha o formulário abaixo.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Tab buttons */}
          <div className="flex rounded-lg bg-muted p-1 mb-8">
            <button
              onClick={() => setActiveForm("talent")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-md font-medium transition-all duration-200
                ${activeForm === "talent" 
                  ? "bg-white text-artium-charcoal shadow-sm" 
                  : "text-muted-foreground hover:text-artium-charcoal"
                }`}
            >
              <Users className="w-5 h-5" />
              <span>Indicar Talento</span>
            </button>
            <button
              onClick={() => setActiveForm("company")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-md font-medium transition-all duration-200
                ${activeForm === "company" 
                  ? "bg-white text-artium-charcoal shadow-sm" 
                  : "text-muted-foreground hover:text-artium-charcoal"
                }`}
            >
              <Building2 className="w-5 h-5" />
              <span>Indicar Empresa</span>
            </button>
          </div>

          {/* Form cards */}
          <div className="card-artium p-6 md:p-8">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-artium-charcoal">
                {activeForm === "talent" 
                  ? "Indicação de Talento" 
                  : "Indicação de Empresa"
                }
              </h3>
              <p className="text-muted-foreground text-sm mt-1">
                {activeForm === "talent"
                  ? "Indique profissionais qualificados para fazer parte da equipe Artium."
                  : "Indique empresas que podem se beneficiar das soluções da Artium."
                }
              </p>
            </div>

            {activeForm === "talent" ? <TalentForm /> : <CompanyForm />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormsSection;
