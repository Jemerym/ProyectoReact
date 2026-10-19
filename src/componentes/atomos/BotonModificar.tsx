interface BotonModificarProps {
  alClickear: () => void;
}

function BotonModificar({ alClickear }: BotonModificarProps) {
  return (
    <button type="button" className="btn btn-warning w-100" onClick={alClickear}>
      Modificar
    </button>
  );
}

export default BotonModificar;