// @vitest-environment jsdom
import { afterEach, expect, test } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/vitest'
import CardProductos from "../componentes/moleculas/CardProductos";
import { productos } from "../paginas/Productos";
import { MemoryRouter } from "react-router-dom";

afterEach(() => cleanup())

const prod = productos[0];

test("muestra el nombre del producto", () =>{
    render(<MemoryRouter><CardProductos {...prod}/></MemoryRouter>);
    expect(screen.getByText(prod.nombre)).toBeInTheDocument();
});

test("muesta el stock del producto", () =>{
    render(<MemoryRouter><CardProductos {...prod}/></MemoryRouter>);
    expect(screen.getByText(`Stock: ${prod.stock}`)).toBeInTheDocument();
});

test("muestra el boton ver producto", () =>{
    render(<MemoryRouter><CardProductos {...prod}/></MemoryRouter>);
    expect(screen.getByText("Ver producto")).toBeInTheDocument();
});
