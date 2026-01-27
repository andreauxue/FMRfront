import { createSignal } from "solid-js";

export default function DonationWidget() {
  const [amount, setAmount] = createSignal(200);

  return (
    <div class="rounded-2xl border p-6 bg-white">
      <h2 class="text-lg font-semibold">Donación rápida</h2>
      <p class="mt-2 text-slate-700 text-sm">
        Selecciona un monto y continúa al pago.
      </p>

      <div class="mt-4 flex gap-2">
        {[100, 200, 500, 1000].map((v) => (
          <button
            type="button"
            class={`rounded-lg border px-3 py-2 text-sm ${
              amount() === v ? "bg-slate-900 text-white" : "bg-white"
            }`}
            onClick={() => setAmount(v)}
          >
            ${v}
          </button>
        ))}
      </div>

      <div class="mt-4">
        <label class="block text-sm text-slate-700">Otro monto</label>
        <input
          class="mt-2 w-full rounded-lg border px-3 py-2"
          type="number"
          min="1"
          value={amount()}
          onInput={(e) => setAmount(Number(e.currentTarget.value))}
        />
      </div>

      <a
        class="mt-5 inline-block rounded-lg bg-slate-900 px-4 py-2 text-white text-sm"
        href={`/donaciones?monto=${amount()}`}
      >
        Continuar
      </a>
    </div>
  );
}