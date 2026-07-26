import { useEffect, useMemo, useState } from "react";
import {
  getSiteContent,
  updateContentSection,
} from "../services/contentService";

const EMPTY_FORM = {
  sectionName: "",
  title: "",
  content: "",
  isActive: true,
};

export default function ContentPage() {
  const [sections, setSections] = useState([]);
  const [selectedKey, setSelectedKey] = useState("");
  const [form, setForm] = useState(EMPTY_FORM);
  const [originalForm, setOriginalForm] = useState(EMPTY_FORM);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [saveError, setSaveError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const isDirty = useMemo(
    () => JSON.stringify(form) !== JSON.stringify(originalForm),
    [form, originalForm]
  );

  async function loadContent() {
    setIsLoading(true);
    setLoadError("");

    try {
      const data = await getSiteContent();

      setSections(data);

      if (data.length > 0) {
        selectSection(data[0]);
      }
    } catch (error) {
      setLoadError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadContent();
  }, []);

  function selectSection(section) {
    const values = {
      sectionName: section.section_name || "",
      title: section.title || "",
      content: section.content || "",
      isActive: section.is_active !== false,
    };

    setSelectedKey(section.content_key);
    setForm(values);
    setOriginalForm(values);
    setSaveError("");
    setSuccessMessage("");
  }

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));

    setSaveError("");
    setSuccessMessage("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!form.sectionName.trim()) {
      setSaveError("Escribe el nombre de la sección.");
      return;
    }

    if (!form.title.trim()) {
      setSaveError("Escribe el título de la sección.");
      return;
    }

    if (!form.content.trim()) {
      setSaveError("Escribe el contenido de la sección.");
      return;
    }

    setIsSaving(true);
    setSaveError("");
    setSuccessMessage("");

    try {
      const result = await updateContentSection(selectedKey, form);
      const updated = result.content;

      const normalized = {
        sectionName: updated.section_name,
        title: updated.title,
        content: updated.content,
        isActive: updated.is_active,
      };

      setForm(normalized);
      setOriginalForm(normalized);

      setSections((current) =>
        current.map((section) =>
          section.content_key === selectedKey ? updated : section
        )
      );

      setSuccessMessage("Los cambios se guardaron correctamente.");
    } catch (error) {
      setSaveError(error.message);
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading) {
    return (
      <section aria-live="polite">
        <h1>Contenido del sitio</h1>
        <p>Cargando contenido...</p>
      </section>
    );
  }

  if (loadError) {
    return (
      <section role="alert">
        <h1>Contenido del sitio</h1>
        <p>{loadError}</p>

        <button type="button" onClick={loadContent}>
          Volver a intentar
        </button>
      </section>
    );
  }

  if (sections.length === 0) {
    return (
      <section>
        <h1>Contenido del sitio</h1>
        <p>No hay secciones registradas.</p>
      </section>
    );
  }

  return (
    <section>
      <header>
        <p>Administración del sitio público</p>
        <h1>Contenido del sitio</h1>
        <p>
          Modifica los textos institucionales que se muestran en la página
          pública.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <nav
          aria-label="Secciones de contenido"
          className="rounded-xl border border-slate-200 bg-white p-3"
        >
          <ul className="space-y-2">
            {sections.map((section) => {
              const isSelected = section.content_key === selectedKey;

              return (
                <li key={section.content_key}>
                  <button
                    type="button"
                    onClick={() => selectSection(section)}
                    aria-current={isSelected ? "page" : undefined}
                    className={[
                      "min-h-12 w-full rounded-lg px-4 py-3 text-left",
                      "focus:outline-none focus:ring-2 focus:ring-blue-600",
                      isSelected
                        ? "bg-blue-50 font-semibold text-blue-900"
                        : "text-slate-700 hover:bg-slate-50",
                    ].join(" ")}
                  >
                    <span className="block">{section.section_name}</span>

                    <span className="mt-1 block text-sm font-normal text-slate-500">
                      {section.is_active ? "Visible" : "Oculta"}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-slate-200 bg-white p-6"
        >
          <div className="space-y-6">
            <div>
              <label
                htmlFor="sectionName"
                className="mb-2 block font-medium text-slate-900"
              >
                Nombre de la sección
              </label>

              <input
                id="sectionName"
                name="sectionName"
                value={form.sectionName}
                onChange={handleChange}
                className="min-h-12 w-full rounded-lg border border-slate-300 px-4 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200"
                required
              />
            </div>

            <div>
              <label
                htmlFor="title"
                className="mb-2 block font-medium text-slate-900"
              >
                Título público
              </label>

              <input
                id="title"
                name="title"
                value={form.title}
                onChange={handleChange}
                className="min-h-12 w-full rounded-lg border border-slate-300 px-4 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200"
                required
              />
            </div>

            <div>
              <label
                htmlFor="content"
                className="mb-2 block font-medium text-slate-900"
              >
                Contenido
              </label>

              <textarea
                id="content"
                name="content"
                value={form.content}
                onChange={handleChange}
                rows={10}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200"
                required
              />
            </div>

            <label className="flex min-h-12 items-center gap-3">
              <input
                type="checkbox"
                name="isActive"
                checked={form.isActive}
                onChange={handleChange}
                className="h-5 w-5"
              />

              <span>
                Mostrar esta sección en la página pública
              </span>
            </label>

            {isDirty && !isSaving && (
              <p className="font-medium text-amber-700">
                Tienes cambios sin guardar.
              </p>
            )}

            {saveError && (
              <p role="alert" className="font-medium text-red-700">
                {saveError}
              </p>
            )}

            {successMessage && (
              <p
                role="status"
                className="font-medium text-green-700"
              >
                {successMessage}
              </p>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!isDirty || isSaving}
                className="min-h-12 rounded-lg bg-blue-700 px-6 font-semibold text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSaving ? "Guardando..." : "Guardar cambios"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}