// @vitest-environment jsdom
import { test, expect, vi} from "vitest";
import BotonEliminar from "../componentes/atomos/BotonEliminar";
import { fireEvent, render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/vitest'
test('debe ejecutar la funcion onClick al hacer click en el boton ', ()=>{

    const funcion = vi.fn()
    render (<BotonEliminar alClikear={funcion}/>);
    fireEvent.click(screen.getByText(/eliminar/i));
    expect(funcion).toHaveBeenCalledTimes(1);
})