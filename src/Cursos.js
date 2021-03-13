import React from 'react'
import axios from 'axios'

const WEB_ROOT = "http://localhost:8080/api/cursos";
export default class Cursos extends React.Component {


    constructor(props){
        super(props);
        this.state={
            cursos:[],
            titulo:'',
            descripcion:'',
            publicado:false,
            formulario: false
        }
    }

     componentDidMount(){
         this.getCursos();           
    }


    getCursos =  () =>{

        fetch("http://localhost:8080/api/cursos")
        .then(response => response.json())
        .then(jsonData => this.setState({
                cursos: jsonData
            }))
        
       /*  axios.get(`http://localhost:8080/api/cursos`)
        .then(res => {
            console.log(res.data)
            this.setState({
                cursos:res.data
            })
        }) */
        
        
    }

    handleCreate =  () => {

        this.setState({
            formulario: true
        })

    }

    guardarCurso=()=>{
        const {titulo, descripcion, publicado} = this.state
        const params ={
            titulo,
            descripcion,
            publicado
        }
       axios.post(`http://localhost:8080/api/cursos`, params)
        .then(res => {
            console.log(res.data)
           
           this.getCursos();
        }) 
    }

    handleInput = (estado, valor) =>{
        this.setState({
            [estado]: valor
        })
    }

    render(){
        const {cursos, titulo, descripcion, publicado,formulario} = this.state;

        if(cursos.length == 0){
            return <div>cargando...</div>
        }
        return (
            <div>
                { formulario && <div style={{padding: '2rem'}}>
                        <input placeholder="titulo" value={titulo} onChange={(e)=> this.handleInput('titulo', e.target.value)}/>
                        <input placeholder="descripcion" value={descripcion} onChange={(e)=> this.handleInput('descripcion', e.target.value)}/>
                        <input placeholder="publicado" value={publicado} onChange={(e)=> this.handleInput('publicado', e.target.value)} />
                        <button onClick={()=> this.guardarCurso()}> guardar</button>
                    </div>
                }
                


                <div><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={()=>this.handleCreate()}>agregar</button></div>
                <table class="table-fixed">
                    <thead>
                        <tr>
                        <th class="w-1/2 ...">Titulo</th>
                        <th class="w-1/4 ...">Descripcion</th>
                        <th class="w-1/4 ...">Publicado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cursos.map((curso) =>  (<tr>
                                                    <td>{curso.titulo}</td>
                                                    <td>{curso.descripcion}</td>
                                                    <td>{curso.publicado? 'Si': 'No'}</td>
                                                </tr>
                                                )
                            )
                        }                   
                    </tbody>
                </table>
            </div>
        )
     }
}
