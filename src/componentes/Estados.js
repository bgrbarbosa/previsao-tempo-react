import { Button } from "bootstrap";
import React, {useState, useEffect} from "react";
import './Estados.css'

export default function Uf(){

    //Variáveis Utilizadas no APP
    const [uf, setUf] = useState([]);
    const [op, setOp] = useState([]);
    const [opCidade, setOpCidade] = useState([]);
    const [cidades, setCidades] = useState([]);
    const [weatherForecast, setWeatherForecast] = useState(null);
    

    // Trecho de Funções Utilizadas
    const selecionarOpcao = () =>{
      const elemento = document.getElementById('estados');
      const value = elemento.options[elemento.selectedIndex].value;
      setOp(value);
    }

    const selecionarCidade = () =>{
      const elemento = document.getElementById('cidades');
      const value = elemento.options[elemento.selectedIndex].value;
      setOpCidade(value);
    }

    const handleSearchEstados = () => {
        fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
          .then((res) => {
            if (res.status === 200) {
              return res.json();
            }
          })
          .then((data) => {
            setUf(data);
            selecionarOpcao();
          })
     };

    const handleSearchCidades = () => {
      fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${op}/municipios`)
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          }
        })
        .then((data) => {
          setCidades(data);
          selecionarCidade();
        })
    };

    const handleSearchPrevisao = () => {
      
      fetch(`http://api.weatherapi.com/v1/current.json?key=82cde7e060994480816175927222503&q=${opCidade}&lang=pt`)
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          }
        })
        .then((data) => {
          console.log(opCidade);
          setWeatherForecast(data);
        });
    };

    // Linhas a serem renderizadas em Objetos
    const rowsUf = uf.map(uf =>{
      return(
        <>
          <option>{uf.sigla}</option>
        </>    
      )
    })

    const rowsCidades = cidades.map(cidades =>{
      return(
        <>
          <option>{cidades.nome}</option>
        </>    
      )
    })
     
    
    // Retorno da Função
    return(
      <div className="jumbotron">
        <div>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
              <a className="navbar-brand" href="#search">
                Previsão do Tempo
              </a>
            </nav>
        </div>
        <div className="molde">                 
          <table>
              <tbody>
                <br/>
                <tr>
                  <td>
                      <select onClick={handleSearchEstados} id="estados">
                          <option value="Opcao">Selecione seu estado</option>
                          {rowsUf}
                      </select>
                  </td>
                  <td>
                      <select onClick={handleSearchCidades} id="cidades">
                        <option value="Opcao">Selecione sua cidade</option>
                        {rowsCidades}
                      </select>            
                  </td>
                </tr>
                <br/>
                <tr>              
                    <td colSpan={2}>
                      <button type="button" className="btn btn-primary" 
                              onClick={handleSearchPrevisao}>
                              Buscar Previsão
                      </button>
                    </td>
                </tr>
              </tbody>
          </table>
        <hr/>
        {weatherForecast ? (
            <div className="titulo">
              <table>
                <tbody>
                  <tr>
                    <td>     
                      <img
                      src={`${weatherForecast.current.condition.icon}`}
                      alt="Weather Icon"/>
                      Temp: {weatherForecast.current.temp_c}&#8451; 
                    </td>
                  </tr>

                  <tr>
                    <td>
                      Hoje o dia está: {weatherForecast.current.condition.text}
                    </td>
                  </tr>
                  <br/>
                  <tr>
                      <h6>Fonte de dados: api.weatherapi.com</h6> 
                  </tr>
                </tbody>
              </table>
            </div>
          ) : null} 
        </div>        
      </div>

    
    );
}