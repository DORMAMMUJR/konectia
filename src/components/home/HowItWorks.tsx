import Image from "next/image";
import type { HowItWorksStep } from "@/types";
import { FadeInUp, ScaleIn } from "@/components/shared/MotionWrappers";

const clientSteps: HowItWorksStep[] = [
  {
    number: "01",
    title: "Busca & Filtra",
    description:
      "Encuentra al profesional ideal basándote en reputación, ubicación y certificaciones oficiales.",
  },
  {
    number: "02",
    title: "Pago en Custodia",
    description:
      "Tu dinero se retiene de forma segura hasta que confirmes la entrega satisfactoria del servicio.",
  },
  {
    number: "03",
    title: "Facturación Automática",
    description:
      "Recibe tu factura CFDI al momento de finalizar el servicio, 100% cumplimiento fiscal.",
  },
];

const proSteps: HowItWorksStep[] = [
  {
    number: "01",
    title: "Validación Curricular",
    description:
      "Verificamos tu identidad, antecedentes y cédulas ante la SEP y CONOCER.",
  },
  {
    number: "02",
    title: "Gestión de Cobranza",
    description:
      "Olvídate de perseguir pagos. El saldo queda garantizado antes de que inicies el trabajo.",
  },
  {
    number: "03",
    title: "Sello KonectIA",
    description:
      "Posiciónate como un experto de confianza con nuestro respaldo institucional.",
  },
];

function StepList({ steps }: { steps: HowItWorksStep[] }) {
  return (
    <div className="space-y-6 sm:space-y-8">
      {steps.map((step) => (
        <div key={step.number} className="flex gap-4">
          <div className="text-2xl sm:text-3xl font-bold text-surface-variant font-[var(--font-headline)]">
            {step.number}
          </div>
          <div>
            <h4 className="font-bold text-lg sm:text-xl mb-2 font-[var(--font-headline)]">
              {step.title}
            </h4>
            <p className="text-on-surface-variant text-sm sm:text-base">
              {step.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section className="py-16 lg:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <FadeInUp>
          <div className="text-center mb-14 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary tracking-tighter mb-4 font-[var(--font-headline)]">
              Institucionalizando el Marketplace
            </h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto text-base sm:text-lg">
              Un proceso riguroso diseñado para proteger a ambas partes en cada
              transacción.
            </p>
          </div>
        </FadeInUp>

        {/* Client Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-20 lg:mb-32">
          <ScaleIn className="order-2 lg:order-1">
            <Image
              src="/images/client-workflow.png"
              alt="Flujo de trabajo cliente"
              width={600}
              height={450}
              className="rounded-2xl shadow-2xl w-full"
            />
          </ScaleIn>
          <FadeInUp delay={0.2} className="order-1 lg:order-2">
            <span className="text-secondary font-bold uppercase tracking-widest text-sm mb-4 block">
              Para el Cliente
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-primary mb-6 sm:mb-8 font-[var(--font-headline)]">
              Contrata con Certeza Total
            </h3>
            <StepList steps={clientSteps} />
          </FadeInUp>
        </div>

        {/* Professional Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <FadeInUp>
            <span className="text-on-tertiary-container font-bold uppercase tracking-widest text-sm mb-4 block">
              Para el Profesional
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-primary mb-6 sm:mb-8 font-[var(--font-headline)]">
              Eleva tu Perfil Comercial
            </h3>
            <StepList steps={proSteps} />
          </FadeInUp>
          <ScaleIn delay={0.2} className="relative">
            <Image
              src="/images/pro-dashboard.png"
              alt="Dashboard Profesional"
              width={600}
              height={450}
              className="rounded-2xl shadow-2xl relative z-10 w-full"
            />
            <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-secondary-container/10 rounded-full blur-3xl" />
          </ScaleIn>
        </div>
      </div>
    </section>
  );
}
