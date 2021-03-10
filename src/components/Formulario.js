import React, { useState } from 'react'
import shortid from 'shortid'
import PropTypes from 'prop-types'

import Error from './Error'

const Formulario = ({ guardarGasto, guardarCrearGasto, gasto, restante }) => {
  const [nombre, guardarNombre] = useState('')
  const [cantidad, guardarCantidad] = useState(0)
  const [errorpresupuesto, guardarErrorPresupuesto] = useState(false)
  const [errorgasto, guardarErrorGasto] = useState(false)
  const [errorcantidad, guardarErrorCantidad] = useState(false)

  // Cuando el usuario agrega un gasto
  const agregarGasto = (e) => {
    e.preventDefault()

    // Construir el gasto
    const gasto = {
      nombre,
      cantidad,
      id: shortid.generate(),
    }

    // Validar
    if (cantidad < 1 || isNaN(cantidad)) {
      guardarErrorCantidad(true)
      return
    }
    guardarErrorGasto(false)

    if (nombre.trim() === '') {
      guardarErrorGasto(true)
      return
    }
    guardarErrorCantidad(false)

    // Validar que solo se gaste el dinero disponible
    if (gasto.cantidad > restante) {
      guardarErrorPresupuesto(true)
      return
    }
    guardarErrorPresupuesto(false)

    //||

    // Pasar el gasto al componente principal
    guardarGasto(gasto)
    guardarCrearGasto(true)

    // Resetear el form
    guardarNombre('')
    guardarCantidad(0)
  }

  return (
    <form onSubmit={agregarGasto}>
      <h2>Agrega tus gastos aqui</h2>
      {errorgasto && <Error mensaje="Introduzca un nombre de gasto" />}

      {errorcantidad && (
        <Error mensaje="Introduzca una cantidad de gasto valida" />
      )}

      {errorpresupuesto && (
        <Error mensaje="El gasto es mayor a su Presupuesto" />
      )}
      <div className="Campo">
        <label>Nombre Gasto</label>
        <input
          type="text"
          className="u-full-width"
          placeholder="Ej: Transporte"
          value={nombre}
          onChange={(e) => guardarNombre(e.target.value)}
        />
      </div>
      <div className="Campo">
        <label>Cantidad Gasto</label>
        <input
          type="number"
          className="u-full-width"
          placeholder="Ej: 300"
          value={cantidad}
          onChange={(e) => guardarCantidad(parseInt(e.target.value))}
        />
      </div>

      <input
        type="submit"
        className="button-primary u-full-width"
        value="Agregar Gasto"
      />
    </form>
  )
}
Formulario.propTypes = {
  guardarGasto: PropTypes.func.isRequired,
  guardarCrearGasto: PropTypes.func.isRequired,
  gasto: PropTypes.array.isRequired,
  restante: PropTypes.array.isRequired,
}
export default Formulario
