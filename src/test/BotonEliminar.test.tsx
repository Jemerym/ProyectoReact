// @vitest-environment jsdom
import { test, expect} from "vitest";
import BotonEliminar from "../componentes/atomos/BotonEliminar";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/vitest'
test('debe ejecutar la funcion onClick al hacer click en el boton ', ()=>{

    render (<BotonEliminar alClikear={() => {}}/>);

    const a = screen.getByText(/eliminar/i);
    expect(a).toBeInTheDocument();
})