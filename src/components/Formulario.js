import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import useProvincia from '../hooks/useProvincia';
import useMunicipio from '../hooks/useMunicipio';
import Error from './Error'

const Boton = styled.input`
margin-top: 20px;
font-weight: bold;
font-size: 20px;
padding: 10px;
background-color: #F36D0A;
border: none;
width: 100%;
border-radius: 10px;
color: #FFF;
transition: background-color .3s ease;

&:hover {
    background-color: #F3940A;
    cursor: pointer;
}
`;

const Formulario = ({guardarProvincia, guardarMunicipio}) => {
    //state del listado de provincias y municipios
    const [listadoprov, guardarProvincias] = useState([]);
    const [listadomuni, guardarMunicipios] = useState([]);

    const [error, guardarError] = useState(false);

    //Utilizar useProvincia  
    const [provincia, SelectProv, actualizarState] = useProvincia('Elige tu Provincia', '', listadoprov);

    //Utilizar useMunicipio   
    const [municipio, SelectMuni] = useMunicipio('Elige tu Municipio', '', listadomuni);
    
//API Provincia
useEffect(() => {
    
    const consultarProvincia = async() => {
        const url = 'https://apis.datos.gob.ar/georef/api/provincias?';

        const resultado = await axios.get(url)
        guardarProvincias(resultado.data.provincias);
    }
    consultarProvincia()
},[])


    //API Municipios
    useEffect(()=>{
        const consultarMunicipios = async () => {
            if(provincia === '') return;
            const url= `https://apis.datos.gob.ar/georef/api/municipios?campos=estandar&max=1850&provincia=${provincia}`
            const resultado= await axios.get(url);
            guardarMunicipios(resultado.data.municipios);
            
        }
        consultarMunicipios();
    },[provincia])

    //cuando el user hace un submit
    const datosMuni = e => {
        e.preventDefault();

        //validar si ambos campos están llenos
        if(provincia === '' || municipio === ''){
            guardarError(true)
            return;
        }
        //Pasar los datos al componente principal
        guardarError(false);
        guardarProvincia(provincia);
        guardarMunicipio(municipio);
    }

    return ( 
        <form
            onSubmit={datosMuni}
        >
            {error ? <Error mensaje="Todos los campos son obligatorios"/> : null}
            <SelectProv/>
            
            <SelectMuni/>
            <Boton
                type="submit"
                value="Calcular"
            />
        
        </form>
     );
}
 
export default Formulario;