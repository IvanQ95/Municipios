import React from 'react';
import styled from '@emotion/styled';

const ResultadoDiv =styled.div`
color: #000;
font-family: Arial, Helvetica, sans-serif;
`;

const Info = styled.p`
font-size: 18px;
font-weight: bold;
`;

const Municipio = styled.p`
font-size: 30px;  

span{
    font-weight: bold;
}
`;

const Extractor = ({resultado}) => {
    
    if(Object.keys(resultado).length === 0) return null;
    
    return ( 
        <ResultadoDiv>
            <Municipio>Municipio:<span>{resultado.nombre}</span></Municipio>
            {/* <Info>Latitud:<span>{parseFloat(resultado.centroide.lat) .toFixed(2)}</span>&#x2103;</Info>
            <Info>Longitud:<span>{parseFloat(resultado.centroide.lon) .toFixed(2)}</span>&#x2103;</Info> */}
            <Info>Identificador del Municipio:<span>{resultado.id}</span></Info>
             
        </ResultadoDiv>
     );
}
 
export default Extractor;