import { IconTool } from "@tabler/icons-react";
import AdminPageHeader from "../components/AdminPageHeader";
import EmptyState from "../components/EmptyState";

// Página temporal para las secciones del panel que aún no se construyen.
// Mantiene la navegación funcional y comunica con claridad el estado.
// Reemplaza cada uso por la vista real conforme se vaya desarrollando.
export default function PlaceholderPage({ titulo, descripcion }) {
  return (
    <>
      <AdminPageHeader titulo={titulo} descripcion={descripcion} />
      <EmptyState
        icon={IconTool}
        titulo="Sección en construcción"
        mensaje="Esta parte del panel se conectará en una próxima entrega. La estructura y navegación ya están listas."
      />
    </>
  );
}
