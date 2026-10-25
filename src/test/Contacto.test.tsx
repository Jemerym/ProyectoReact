// @vitest-environment jsdom
import { expect, test } from "vitest";

import Contacto from "../paginas/Contacto";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest"

test('Prueba de diseño responsivo',() =>{
    render (<Contacto/>);

    const contenedor = screen.getByTestId("contenedor-test")

    expect(contenedor).toHaveClass("col-12 col-md-8 col-lg-6")
});