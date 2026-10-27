// @vitest-environment jsdom
import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import '@testing-library/jest-dom/vitest';
import BotonVolver from "../componentes/atomos/BotonVolver";

test("El boton muestra el texto Volver a los Productos", () => {
  render(
    <MemoryRouter>
      <BotonVolver />
    </MemoryRouter>
  );

  const boton = screen.getAllByText("Volver a los Productos")[0];
  expect(boton).toBeInTheDocument();
});

test("El boton apunta a la ruta de productos (/productos)", () => {
  render(
    <MemoryRouter>
      <BotonVolver />
    </MemoryRouter>
  );

  const enlace = screen.getAllByRole("link")[0];
  expect(enlace).toHaveAttribute("href", "/productos");
});