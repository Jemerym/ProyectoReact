// @vitest-environment jsdom

import { cleanup, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, expect, test } from "vitest";
import Productos from "../paginas/Productos";
import "@testing-library/jest-dom/vitest"

beforeEach(() => localStorage.clear());
afterEach(() => cleanup());

test("Muestra una card por cada producto (14)",()=>{
    render(
        <MemoryRouter>
            <Productos/>
        </MemoryRouter>
    );

    expect(screen.getAllByText("Ver producto")).toHaveLength(14);
});

test("Cada categoría agrupa solo sus productos", () => {
  render(
    <MemoryRouter>
      <Productos />
    </MemoryRouter>
  );

  const cantidades: Record<string, number> = {
    "Cilindros de Gas": 4,
    "Reguladores": 3,
    "Manguera y Conexiones": 4,
    "Accesorios": 3,
  };

  Object.entries(cantidades).forEach(([categoria, cantidad]) => {
    const seccion = screen.getByRole("heading", { name: categoria }).parentElement as HTMLElement;
    expect(within(seccion).getAllByText("Ver producto")).toHaveLength(cantidad);
  });
});