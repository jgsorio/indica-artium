import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const companySchema = z.object({
  companyName: z.string().min(1, "Nome da empresa é obrigatório").max(200, "Nome muito longo"),
  email: z.string().email("Email inválido").max(255, "Email muito longo"),
  phone: z.string().min(10, "Telefone inválido").max(20, "Telefone muito longo"),
  website: z.string().url("URL inválida").optional().or(z.literal("")),
  interest: z.string().max(500, "Texto muito longo").optional(),
  observation: z.string().max(1000, "Texto muito longo").optional(),
});

type CompanyFormData = z.infer<typeof companySchema>;

const CompanyForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CompanyFormData>({
    resolver: zodResolver(companySchema),
  });

  const onSubmit = async (data: CompanyFormData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const formData = {
      type: "empresa",
      ...data,
    };
    
    console.log("Company form submitted:", formData);
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    toast({
      title: "Indicação enviada com sucesso!",
      description: "Obrigado por indicar uma empresa. Entraremos em contato em breve.",
    });

    // Reset after showing success
    setTimeout(() => {
      setIsSubmitted(false);
      reset();
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 animate-scale-in">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h3 className="text-2xl font-semibold text-artium-charcoal mb-2">
          Indicação Enviada!
        </h3>
        <p className="text-muted-foreground text-center max-w-md">
          Obrigado por indicar uma empresa para a Artium Soluções. 
          Nossa equipe entrará em contato em breve.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <input type="hidden" name="type" value="empresa" />
      
      <div>
        <label htmlFor="company-name" className="label-artium">
          Nome da Empresa <span className="text-destructive">*</span>
        </label>
        <input
          id="company-name"
          type="text"
          placeholder="Nome da empresa indicada"
          className={`input-artium ${errors.companyName ? 'ring-2 ring-destructive' : ''}`}
          {...register("companyName")}
        />
        {errors.companyName && (
          <p className="text-destructive text-sm mt-1">{errors.companyName.message}</p>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="company-email" className="label-artium">
            Email de Contato <span className="text-destructive">*</span>
          </label>
          <input
            id="company-email"
            type="email"
            placeholder="contato@empresa.com"
            className={`input-artium ${errors.email ? 'ring-2 ring-destructive' : ''}`}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-destructive text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="company-phone" className="label-artium">
            Telefone <span className="text-destructive">*</span>
          </label>
          <input
            id="company-phone"
            type="tel"
            placeholder="(11) 99999-9999"
            className={`input-artium ${errors.phone ? 'ring-2 ring-destructive' : ''}`}
            {...register("phone")}
          />
          {errors.phone && (
            <p className="text-destructive text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="company-website" className="label-artium">
          Website <span className="text-muted-foreground text-xs">(opcional)</span>
        </label>
        <input
          id="company-website"
          type="url"
          placeholder="https://www.empresa.com.br"
          className={`input-artium ${errors.website ? 'ring-2 ring-destructive' : ''}`}
          {...register("website")}
        />
        {errors.website && (
          <p className="text-destructive text-sm mt-1">{errors.website.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="company-interest" className="label-artium">
          Área de Interesse <span className="text-muted-foreground text-xs">(opcional)</span>
        </label>
        <input
          id="company-interest"
          type="text"
          placeholder="Ex: Desenvolvimento de Software, Consultoria, BI..."
          className="input-artium"
          {...register("interest")}
        />
      </div>

      <div>
        <label htmlFor="company-observation" className="label-artium">
          Observação <span className="text-muted-foreground text-xs">(opcional)</span>
        </label>
        <textarea
          id="company-observation"
          rows={3}
          placeholder="Informações adicionais sobre a empresa ou oportunidade..."
          className="input-artium resize-none"
          {...register("observation")}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-artium w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Enviando...
          </>
        ) : (
          "Enviar Indicação de Empresa"
        )}
      </button>
    </form>
  );
};

export default CompanyForm;
