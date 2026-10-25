// @vitest-environment jsdom
import { afterEach, expect, test, vi } from "vitest"
import FormularioContacto from "../componentes/organismos/FormularioContacto"
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/vitest'

afterEach(() => cleanup())

test("Avisa el campo de nombre esta vacio", () =>{
    const alerta = vi.spyOn(window, "alert").mockImplementation(()=> {});

    render(<FormularioContacto/>);

    fireEvent.click(screen.getByRole("button", { name: /enviar mensaje/i}));
    expect(alerta).toHaveBeenCalledWith("Debe ingresar su nombre");
})

test("Se envia formulario correctamente", () => {
    const alerta = vi.spyOn(window, "alert").mockImplementation(()=> {});

    render(<FormularioContacto/>);

    const [nombre,correo,telefono,direccion,mensaje] = screen.getAllByRole("textbox");

    fireEvent.change(nombre,{target: {value: "Jeremey"}});
    fireEvent.change(correo,{target: {value: "jeremy@gmail.com"}});
    fireEvent.change(telefono,{target: {value: "987654321"}});
    fireEvent.change(direccion,{target: {value: "Calle 1"}});
    fireEvent.change(mensaje,{target: {value: "Hola"}});

    fireEvent.click(screen.getByRole("button", { name: /enviar mensaje/i}));

    expect(alerta).toHaveBeenCalledWith("Formulario enviado correctamente")
})


