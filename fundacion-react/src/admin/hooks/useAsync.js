import { useCallback, useEffect, useState } from "react";

// Ejecuta una función asíncrona y expone { data, loading, error, reload }.
// Estandariza el manejo de estados en todas las vistas del panel.
//
//   const { data, loading, error, reload } = useAsync(getDashboardSummary);
export function useAsync(asyncFn, deps = []) {
  const [state, setState] = useState({ data: null, loading: true, error: null });

  const run = useCallback(() => {
    let alive = true;
    setState((s) => ({ ...s, loading: true, error: null }));
    asyncFn()
      .then((data) => alive && setState({ data, loading: false, error: null }))
      .catch((error) => alive && setState({ data: null, loading: false, error }));
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(run, [run]);

  return { ...state, reload: run };
}
