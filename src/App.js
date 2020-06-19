import React, {useState, useEffect} from 'react';
import styled from '@emotion/styled';
import imagen from './municipios.png';
import Formulario from './components/Formulario';
import Spinner from './components/Spinner';
import Extractor from './components/Extractor';
import axios from 'axios';


const Parr = styled.p`
font-family: Arial, Helvetica, sans-serif;
border-style: solid;
background-color: #A09F9F;
`;

const Contenedor = styled.div`
max-width: 900px;
margin: 0 auto;
@media(min-width:992px){
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 2rem;
}
`;

const Imagen = styled.img`
max-width: 100%;
margin-top: 10rem;
width: 75%;

`;

const Heading = styled.h1`
font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial;
color: #000;
text-align: left;
font-weight: 700px;
font-size: 50px;
margin-bottom: 50px;
margin-top: 80px;

&::after{
  content: '';
  width: 215px;
  height: 6px;
  background-color: #F36D0A;
  display: block;
}
`;
const Footer = styled.footer`
width:99%;
float:left;
clear: both;

position: absolute;
bottom: 0;
box-shadow: 0px 2px 2px #000;
  -moz-box-shadow: 0px 2px 2px #000;
  -webkit-box-shadow: 0px 2px 2px #000;
border-radius:5px;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
background-color: #D3CECE; 

`;

const pfoot = styled.p`
color: #000;
font-size:30px;
`;

function App() {
  const [provincia, guardarProvincia] = useState('');
  const [municipio, guardarMunicipio] = useState('');
  const [resultado, guardarResultado] = useState({});
  const [cargando, guardarCargando] = useState(false);

  useEffect (()=>{
    const extraerMunicipio = async () =>{
      //Evitamos la ejecución la primera vez
      if(provincia === '') return;
      //Consultar la API para obtener info del Municipio
      const url = `https://apis.datos.gob.ar/georef/api/municipios?provincia=${provincia}&id=${municipio}`
      const resultado = await axios.get(url);
            
      //Mostrar el spinner
      guardarCargando(true);
      //Ocultar el spinner y mostrar el resultado
      setTimeout(()=>{
        guardarCargando(false)
        
      //Guardar la info
      guardarResultado(resultado.data.municipios[0]);
         
      },3000);     
}
extraerMunicipio();
}, [provincia,municipio]);

 //Mostrar el Spinner o resultado
 const componente = (cargando) ? <Spinner/> : <Extractor resultado={resultado}/> 
return (
  <div>
  <Contenedor>
    <div>
      <center>
      <Imagen
      src={imagen}
      alt= "imagen municipios"
      />
      <Parr>Las provincias Entre Rios, Santiago del Estero y Santa Cruz no tienen registrados sus municipios. Recuerde completar ambos campos para realizar la búsqueda.</Parr>
      </center>
    </div>
    
    <div>
      <Heading>Municipios de Argentina</Heading>
      <Formulario
      guardarProvincia={guardarProvincia}
      guardarMunicipio={guardarMunicipio}
      />
     {componente}
    </div>
     
  </Contenedor>
  
  <Footer>
       <center>
       <pfoot>©Copyright 2020 by IvanQ95. Todos los derechos reservados.</pfoot>
       </center>
  </Footer> 
  
  </div>
  );

}

export default App;
