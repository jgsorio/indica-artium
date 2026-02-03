import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Upload, CheckCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const talentSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório").max(100, "Nome muito longo"),
  email: z.string().email("Email inválido").max(255, "Email muito longo"),
  phone: z.string().min(10, "Telefone inválido").max(20, "Telefone muito longo"),
  linkedin: z.string().url("URL inválida").optional().or(z.literal("")),
  interest: z.string().max(500, "Texto muito longo").optional(),
  observation: z.string().max(1000, "Texto muito longo").optional(),
});

type TalentFormData = z.infer<typeof talentSchema>;

const TalentForm = () => {
  const [resume, setResume] = useState<File | null>(null);
  const [resumeError, setResumeError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TalentFormData>({
    resolver: zodResolver(talentSchema),
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setResumeError(null);
    
    if (file) {
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!validTypes.includes(file.type)) {
        setResumeError("Formato inválido. Aceito: PDF ou DOC/DOCX");
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setResumeError("Arquivo muito grande. Máximo: 10MB");
        return;
      }
      setResume(file);
    }
  };

  const onSubmit = async (data: TalentFormData) => {
    if (!resume) {
      setResumeError("Currículo é obrigatório");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const formData = {
      type: "talento",
      ...data,
      resume: resume.name,
    };
    
    console.log("Talent form submitted:", formData);
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    toast({
      title: "Indicação enviada com sucesso!",
      description: "Obrigado por indicar um talento. Entraremos em contato em breve.",
    });

    // Reset after showing success
    setTimeout(() => {
      setIsSubmitted(false);
      reset();
      setResume(null);
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
          Obrigado por indicar um talento para a Artium Soluções. 
          Nossa equipe entrará em contato em breve.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <input type="hidden" name="type" value="talento" />
      
      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="talent-name" className="label-artium">
            Nome <span className="text-destructive">*</span>
          </label>
          <input
            id="talent-name"
            type="text"
            placeholder="Nome completo do indicado"
            className={`input-artium ${errors.name ? 'ring-2 ring-destructive' : ''}`}
            {...register("name")}
          />
          {errors.name && (
            <p className="text-destructive text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="talent-email" className="label-artium">
            Email <span className="text-destructive">*</span>
          </label>
          <input
            id="talent-email"
            type="email"
            placeholder="email@exemplo.com"
            className={`input-artium ${errors.email ? 'ring-2 ring-destructive' : ''}`}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-destructive text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="talent-phone" className="label-artium">
            Telefone <span className="text-destructive">*</span>
          </label>
          <input
            id="talent-phone"
            type="tel"
            placeholder="(11) 99999-9999"
            className={`input-artium ${errors.phone ? 'ring-2 ring-destructive' : ''}`}
            {...register("phone")}
          />
          {errors.phone && (
            <p className="text-destructive text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="talent-linkedin" className="label-artium">
            LinkedIn <span className="text-muted-foreground text-xs">(opcional)</span>
          </label>
          <input
            id="talent-linkedin"
            type="url"
            placeholder="https://linkedin.com/in/..."
            className={`input-artium ${errors.linkedin ? 'ring-2 ring-destructive' : ''}`}
            {...register("linkedin")}
          />
          {errors.linkedin && (
            <p className="text-destructive text-sm mt-1">{errors.linkedin.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="talent-interest" className="label-artium">
          Área de Interesse <span className="text-muted-foreground text-xs">(opcional)</span>
        </label>
        <input
          id="talent-interest"
          type="text"
          placeholder="Ex: Desenvolvimento, Design, Gestão de Projetos..."
          className="input-artium"
          {...register("interest")}
        />
      </div>

      <div>
        <label htmlFor="talent-observation" className="label-artium">
          Observação <span className="text-muted-foreground text-xs">(opcional)</span>
        </label>
        <textarea
          id="talent-observation"
          rows={3}
          placeholder="Informações adicionais sobre o candidato..."
          className="input-artium resize-none"
          {...register("observation")}
        />
      </div>

      <div>
        <label className="label-artium">
          Currículo <span className="text-destructive">*</span>
        </label>
        <div 
          className={`relative border-2 border-dashed rounded-lg p-6 transition-all duration-200 cursor-pointer
            ${resumeError ? 'border-destructive bg-destructive/5' : 'border-border hover:border-artium-slate hover:bg-muted/50'}
            ${resume ? 'border-green-500 bg-green-50' : ''}`}
        >
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="flex flex-col items-center text-center">
            <Upload className={`w-8 h-8 mb-2 ${resume ? 'text-green-600' : 'text-muted-foreground'}`} />
            {resume ? (
              <p className="text-green-700 font-medium">{resume.name}</p>
            ) : (
              <>
                <p className="text-muted-foreground">
                  Clique para fazer upload ou arraste o arquivo
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  PDF ou DOC/DOCX (máx. 10MB)
                </p>
              </>
            )}
          </div>
        </div>
        {resumeError && (
          <p className="text-destructive text-sm mt-1">{resumeError}</p>
        )}
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
          "Enviar Indicação de Talento"
        )}
      </button>
    </form>
  );
};

export default TalentForm;
