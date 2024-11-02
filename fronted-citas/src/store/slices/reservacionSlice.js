import { createSlice } from '@reduxjs/toolkit'

const initialState = {

    fechaSeleccionada: null,
    franjaElegida: {},
    esModalVisible: false

}

export const reservacionSlice = createSlice({

    name: 'reserva',
    initialState,
    reducers: {

        setFranjaElegida: (state, action) => {

            state.franjaElegida = action.payload

        },
        mostrarModal: (state) => {

            state.esModalVisible = true

        },
        ocultarModal: (state) => {

            state.esModalVisible = false

        },
        asignarFecha: (state, action) => {

            state.fechaSeleccionada = action.payload

        }


    }

})

export const {

    setFranjaElegida,
    mostrarModal,
    ocultarModal,
    asignarFecha

} = reservacionSlice.actions