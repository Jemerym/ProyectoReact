interface BotonEliminarProps {
  alClikear: () => void;
}

function BotonEliminar({ alClikear }: BotonEliminarProps) {
  return (
    <button type="button" className="btn btn-danger w-100" onClick={alClikear}>
      Eliminar
    </button>
  );
}

export default BotonEliminar;