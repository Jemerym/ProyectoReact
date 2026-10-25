// @vitest-environment jsdom
import { test, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import BotonModificar from "../componentes/atomos/BotonModificar";

test('Ejecuta la funcion de modificar al hacer click', () =>{
    const funcion = vi.fn();
    render(<BotonModificar alClickear={funcion}/>);

    fireEvent.click(screen.getByText(/modificar/i));

    expect(funcion).toHaveBeenCalledTimes(1);
})