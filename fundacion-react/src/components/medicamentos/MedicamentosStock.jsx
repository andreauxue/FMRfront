
import { useMemo, useState } from "react";

import {
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  IconAlertCircle,
  IconArrowRight,
  IconLoader2,
  IconPill,
  IconSearch,
  IconX,
} from "@tabler/icons-react";

import { useMedications } from "../../hooks/useMedications";
import { C } from "../donar/tokens";
import SectionLabel from "../donar/SectionLabel";

// ============================================================
// CONFIGURACIÓN
// ============================================================

const EASE = [0.22, 1, 0.36, 1];

const REQUEST_URL =
  "https://fmejoremosrealidades.org/donar#53446785-6773-4e8f-add1-9ddc3f613b82";

const CONTACT_URL =
  "https://fmejoremosrealidades.org/#fdeef950-e119-415e-a3a4-6a68bdb8f57b";

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const VIEWPORT = {
  once: true,
  amount: 0.12,
};

// ============================================================
// NORMALIZACIÓN PARA BÚSQUEDA
// ============================================================

function normalizeText(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

// ============================================================
// IMAGEN DEL MEDICAMENTO
// ============================================================

function MedicationImage({ med }) {
  const [imgError, setImgError] = useState(false);

  const hasImage = Boolean(med.imageUrl) && !imgError;

  return (
    <div
      className="
        relative flex
        h-[190px] w-full
        items-center justify-center
        overflow-hidden
        bg-[#F3F4F6]
        sm:h-[210px]
      "
    >
      {hasImage ? (
        <img
          src={med.imageUrl}
          alt={`Presentación de ${med.name}`}
          loading="lazy"
          decoding="async"
          onError={() => setImgError(true)}
          className="
            h-full w-full
            object-contain
            p-4
            transition-transform
            duration-500
            group-hover:scale-[1.025]
            motion-reduce:transform-none
            motion-reduce:transition-none
          "
        />
      ) : (
        <div
          className="
            flex h-full w-full
            flex-col
            items-center justify-center
            gap-3
          "
        >
          <IconPill
            size={36}
            stroke={1.2}
            style={{ color: C.brand }}
            aria-hidden="true"
          />

          <span
            className="
              text-[11px]
              font-medium
            "
            style={{ color: C.textMid }}
          >
            Imagen no disponible
          </span>
        </div>
      )}
    </div>
  );
}

// ============================================================
// ESTADO DE EXISTENCIAS
// ============================================================

function StockStatus({ quantity }) {
  const amount = Number(quantity);

  const hasKnownQuantity =
    quantity !== null &&
    quantity !== undefined &&
    quantity !== "" &&
    Number.isFinite(amount);

  let label = "Disponible";
  let color = "#166534";
  let background = "#ECFDF3";

  if (hasKnownQuantity && amount <= 0) {
    label = "Sin stock";
    color = "#991B1B";
    background = "#FEF2F2";
  } else if (
    hasKnownQuantity &&
    amount <= 5
  ) {
    label = `${amount} disponible${
      amount === 1 ? "" : "s"
    }`;
    color = "#92400E";
    background = "#FFFBEB";
  }

  return (
    <span
      className="
        inline-flex items-center
        gap-1.5
        rounded-sm
        px-2.5 py-1.5
        text-[11px]
        font-semibold
      "
      style={{
        color,
        backgroundColor: background,
      }}
    >
      <span
        className="
          h-1.5 w-1.5
          rounded-full
        "
        style={{ backgroundColor: color }}
        aria-hidden="true"
      />

      {label}
    </span>
  );
}

// ============================================================
// TARJETA DE MEDICAMENTO
// ============================================================

function MedCard({ med }) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.article
      variants={reducedMotion ? undefined : fadeUp}
      initial={reducedMotion ? false : "hidden"}
      whileInView="visible"
      viewport={VIEWPORT}
      transition={{
        duration: reducedMotion ? 0 : 0.55,
        ease: EASE,
      }}
      className="
        group flex h-full
        min-w-0 flex-col
        overflow-hidden
        rounded-md
        border
        bg-white
      "
      style={{
        borderColor: C.border,
      }}
    >
      {/* Fotografía */}
      <MedicationImage med={med} />

      {/* Contenido */}
      <div
        className="
          flex flex-1
          flex-col
          px-5 pb-5 pt-4
        "
      >
        {/* Código y disponibilidad */}
        <div
          className="
            mb-4 flex
            flex-wrap items-center
            justify-between
            gap-2
          "
        >
          {med.articleCode ? (
            <span
              className="
                break-all
                font-mono
                text-[11px]
                font-medium
              "
              style={{ color: C.textMid }}
            >
              {med.articleCode}
            </span>
          ) : (
            <span />
          )}

          <StockStatus quantity={med.quantity} />
        </div>

        {/* Nombre */}
        <h3
          className="
            mb-2
            text-[17px]
            font-bold
            leading-[1.35]
            tracking-[-0.025em]
          "
          style={{ color: C.text }}
        >
          {med.name}
        </h3>

        {/* Descripción */}
        {med.description && (
          <p
            className="
              mb-5
              line-clamp-3
              text-[13px]
              leading-[1.75]
            "
            style={{ color: C.textMid }}
          >
            {med.description}
          </p>
        )}

        {/* Solicitar */}
        <div
          className="
            mt-auto
            border-t pt-4
          "
          style={{ borderColor: C.border }}
        >
          <a
            href={REQUEST_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center
              gap-2
              text-[13px]
              font-bold
              transition-colors
              hover:text-[#A02C3E]
            "
            style={{ color: C.brand }}
            aria-label={`Solicitar información sobre ${med.name}`}
          >
            Solicitar

            <IconArrowRight
              size={16}
              stroke={1.8}
              aria-hidden="true"
              className="
                transition-transform
                duration-200
                group-hover:translate-x-1
                motion-reduce:transform-none
              "
            />
          </a>
        </div>
      </div>
    </motion.article>
  );
}

// ============================================================
// CARGANDO
// ============================================================

function LoadingGrid() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="
        flex min-h-[230px]
        flex-col
        items-center justify-center
        gap-4
      "
    >
      <IconLoader2
        size={30}
        stroke={1.6}
        className="animate-spin motion-reduce:animate-none"
        style={{ color: "#F08B9A" }}
        aria-hidden="true"
      />

      <p className="text-[14px] text-white/70">
        Cargando medicamentos…
      </p>
    </div>
  );
}

// ============================================================
// ERROR
// ============================================================

function ErrorState({ error }) {
  return (
    <div
      role="alert"
      className="
        flex max-w-[600px]
        items-start
        gap-3
        border border-white/15
        p-5
      "
    >
      <IconAlertCircle
        size={20}
        stroke={1.7}
        className="shrink-0 text-[#F08B9A]"
        aria-hidden="true"
      />

      <p
        className="
          text-[14px]
          leading-[1.75]
          text-white/75
        "
      >
        {typeof error === "string"
          ? error
          : "No fue posible cargar los medicamentos. Intenta nuevamente más tarde."}
      </p>
    </div>
  );
}

// ============================================================
// ESTADO VACÍO
// ============================================================

function EmptyState({ query, onClear }) {
  const hasQuery = Boolean(query.trim());

  return (
    <div
      className="
        flex min-h-[230px]
        flex-col
        items-center justify-center
        border-y border-white/15
        px-5 py-12
        text-center
      "
    >
      <IconPill
        size={32}
        stroke={1.3}
        className="mb-4 text-[#F08B9A]"
        aria-hidden="true"
      />

      <h3
        className="
          mb-2 text-[18px]
          font-bold
          text-white
        "
      >
        {hasQuery
          ? "Sin resultados"
          : "Sin medicamentos disponibles"}
      </h3>

      <p
        className="
          max-w-[420px]
          text-[14px]
          leading-[1.75]
          text-white/65
        "
      >
        {hasQuery
          ? `No encontramos medicamentos que coincidan con "${query}".`
          : "Pronto publicaremos los medicamentos disponibles."}
      </p>

      {hasQuery && (
        <button
          type="button"
          onClick={onClear}
          className="
            mt-5 border-b
            border-[#F08B9A]
            pb-1
            text-[13px]
            font-semibold
            text-[#F08B9A]
          "
        >
          Limpiar búsqueda
        </button>
      )}
    </div>
  );
}

// ============================================================
// BUSCADOR
// ============================================================

function MedicationSearch({
  query,
  onChange,
  onClear,
}) {
  return (
    <div
      className="
        flex h-12
        w-full items-center
        gap-3
        rounded-md
        border border-white/25
        bg-white/10
        px-4
        transition-colors
        focus-within:border-white/70
        sm:w-[290px]
      "
    >
      <IconSearch
        size={18}
        stroke={1.8}
        className="shrink-0 text-white/60"
        aria-hidden="true"
      />

      <input
        type="search"
        value={query}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder="Buscar medicamento..."
        aria-label="Buscar medicamento por nombre, descripción o código"
        className="
          min-w-0 flex-1
          bg-transparent
          text-[13px]
          text-white
          outline-none
          placeholder:text-white/55
        "
      />

      {query && (
        <button
          type="button"
          onClick={onClear}
          aria-label="Limpiar búsqueda"
          className="
            flex h-7 w-7
            shrink-0
            items-center justify-center
            rounded-sm
            text-white/70
            hover:bg-white/10
            hover:text-white
          "
        >
          <IconX
            size={16}
            stroke={1.8}
          />
        </button>
      )}
    </div>
  );
}

// ============================================================
// CTA DE CONTACTO
// ============================================================

function ContactBanner() {
  return (
    <div
      className="
        mt-10 flex
        flex-col
        items-start
        justify-between
        gap-5
        border-t border-white/20
        pt-7
        md:flex-row
        md:items-center
      "
    >
      <div>
        <p
          className="
            mb-2
            text-[11px]
            font-bold uppercase
            tracking-[0.12em]
            text-[#F08B9A]
          "
        >
          ¿No encuentras el que necesitas?
        </p>

        <p
          className="
            max-w-[650px]
            text-[14px]
            leading-[1.8]
            text-white/80
          "
        >
          Escríbenos. Evaluamos cada caso
          de manera personalizada.
        </p>
      </div>

      <a
        href={CONTACT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="
          inline-flex min-h-12
          shrink-0
          items-center justify-center
          rounded-md bg-white
          px-7
          text-[14px]
          font-bold
          transition-colors
          hover:bg-[#F3F4F6]
        "
        style={{ color: C.text }}
      >
        Contactar
      </a>
    </div>
  );
}

// ============================================================
// SECCIÓN PRINCIPAL
// ============================================================

export default function MedicamentosStock() {
  const { medications, isLoading, error } =
    useMedications();

  const reducedMotion = useReducedMotion();

  const [query, setQuery] = useState("");

  const available = useMemo(() => {
    return (medications ?? []).filter(
      (med) => med.available
    );
  }, [medications]);

  const filtered = useMemo(() => {
    const normalizedQuery = normalizeText(query);

    if (!normalizedQuery) {
      return available;
    }

    return available.filter((med) => {
      const searchable = normalizeText(
        [
          med.name,
          med.description,
          med.articleCode,
        ].join(" ")
      );

      return searchable.includes(normalizedQuery);
    });
  }, [available, query]);

  return (
    <section
      id="medicamentos"
      aria-labelledby="medicamentos-title"
      className="
        scroll-mt-24
        px-5 py-12
        sm:px-8 sm:py-14
        lg:px-12 lg:py-16
        xl:px-16
        2xl:px-20
      "
      style={{
        backgroundColor: C.text,
      }}
    >
      <div
        className="
          mx-auto w-full
          max-w-[1360px]
        "
      >
        {/* Encabezado */}
        <motion.div
          variants={
            reducedMotion ? undefined : fadeUp
          }
          initial={
            reducedMotion ? false : "hidden"
          }
          whileInView="visible"
          viewport={VIEWPORT}
          transition={{
            duration: reducedMotion ? 0 : 0.65,
            ease: EASE,
          }}
          className="mb-9"
        >
          <SectionLabel light>
            Catálogo de medicamentos
          </SectionLabel>

          <div
            className="
              flex flex-col
              gap-6
              lg:flex-row
              lg:items-end
              lg:justify-between
              lg:gap-10
            "
          >
            <div className="max-w-[790px]">
              <h2
                id="medicamentos-title"
                className="
                  mb-4
                  text-[clamp(2rem,3.7vw,3.4rem)]
                  font-extrabold
                  leading-[1.12]
                  tracking-[-0.045em]
                  text-white
                "
              >
                Medicamentos{" "}
                <span className="text-[#F08B9A]">
                  disponibles
                </span>{" "}
                para entrega inmediata
              </h2>

              <p
                className="
                  max-w-[620px]
                  text-[14px]
                  leading-[1.85]
                  text-white/75
                  sm:text-[15px]
                "
              >
                Algunos se entregan de manera
                gratuita; otros tienen un precio
                especial para pacientes inscritos
                a la Fundación.
              </p>
            </div>

            {/* Buscador */}
            {!isLoading &&
              !error &&
              available.length > 0 && (
                <MedicationSearch
                  query={query}
                  onChange={setQuery}
                  onClear={() => setQuery("")}
                />
              )}
          </div>
        </motion.div>

        {/* Estados */}
        {isLoading ? (
          <LoadingGrid />
        ) : error ? (
          <ErrorState error={error} />
        ) : (
          <>
            {/* Resultados */}
            {filtered.length > 0 ? (
              <>
                <div
                  className="
                    mb-5 flex
                    items-center justify-between
                    border-t border-white/20
                    pt-4
                  "
                >
                  <span
                    className="
                      text-[11px]
                      font-bold uppercase
                      tracking-[0.12em]
                      text-white/65
                    "
                  >
                    Catálogo
                  </span>

                  <span
                    className="
                      text-[12px]
                      font-medium
                      text-white/70
                    "
                    aria-live="polite"
                  >
                    {filtered.length}{" "}
                    {filtered.length === 1
                      ? "medicamento"
                      : "medicamentos"}
                  </span>
                </div>

                <div
                  className="
                    grid grid-cols-1
                    gap-4
                    sm:grid-cols-2
                    lg:grid-cols-3
                    xl:grid-cols-4
                  "
                >
                  {filtered.map((med) => (
                    <MedCard
                      key={med.id}
                      med={med}
                    />
                  ))}
                </div>
              </>
            ) : (
              <EmptyState
                query={query}
                onClear={() => setQuery("")}
              />
            )}

            {/* Contacto */}
            {available.length > 0 && (
              <ContactBanner />
            )}
          </>
        )}
      </div>
    </section>
  );
}
