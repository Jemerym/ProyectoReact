// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import "@testing-library/jest-dom/vitest";
import { afterEach, expect, test } from "vitest";
import DetalleProducto from "../paginas/DetalleProducto";

afterEach(() => cleanup());

test("La ruta /producto/3 muestra los datos del producto 3", () => {
    render(
    <MemoryRouter initialEntries={["/producto/3"]}>
      <Routes>
        <Route path="/producto/:id" element={<DetalleProducto />} />
      </Routes>
    </MemoryRouter>
  );

  expect(screen.getByText("Cilindro GLP 15 kg")).toBeInTheDocument();
  expect(screen.getByText(/CL003/)).toBeInTheDocument()
});