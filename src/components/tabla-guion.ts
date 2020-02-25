/**
 @license
 Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 Code distributed by Google as part of the polymer project is also
 subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import {LitElement, html, css, property, customElement} from 'lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../store';
import { ButtonSharedStyles } from './button-shared-styles';
import { testCss } from './horario-style';
import { ListaCursos } from '../reducers/cursos';
import 'fontawesome-icon';


@customElement('tabla-guion')
export class TablaGuion extends connect(store)(LitElement) {
    @property({type: Object})
    public cursos: ListaCursos = {};
    public sigla = "IWI131";
    public nombre : any;
    public curso : any ;
    public paralelos : any ;
    public sala :any;

    public id = "2";
    public profesor : any;
    public correo: any;
    public horarios :any;
    public existe :any;



    protected filter() {
        Object.keys(this.cursos).map((key) => {
            const item = this.cursos[key];
            if (item.sigla == this.sigla){
                this.sigla = item.sigla;
                this.curso = item;
                this.nombre = item.asignatura;
                this.paralelos = this.curso.paralelos;
                console.log("Entró");
                console.log(this.curso);
            }
        })
    }

    protected filter_by_paralelo() {
        Object.keys(this.paralelos).map((key) => {
            const item = this.paralelos[key];
            if (item.id == this.id){
                this.id = item.id;
                this.profesor = item.profesor;
                this.horarios = item.horarios;
                this.correo = item.correo;
                console.log("Entró");
                console.log(this.curso);
            }
        })
    }

    protected getSala(dia :any,bloque :any){
        this.existe = false;
        this.sala = "";
        Object.keys(this.horarios).map((key) => {
            const item = this.horarios[key];
            if ((item.dia == dia) && (item.bloque == bloque)){
                console.log(item.sala);
                this.sala = item.sala;
                this.existe = true;
                //return item.sala;
            }
        })
    }


    static get styles() {
        return [testCss,
            ButtonSharedStyles,
            css`
        
        #box{
        box-sizing: border-box;
        max-width: 700px;
        border: 1px solid black;
        float: left;
        border-radius: 10px 10px 10px 10px;
        padding: 10px;

        }
        
        #no-margin{
        margin: 0px;
        white-space: nowrap;
        overflow: hidden;
        }
        
        #ladospunteados{
            border-right: thin dotted #005959;
            border-left: thin dotted #005959;
        }
        
        #ultimobloc{
            border-bottom: thin dotted #005959;
            border-left: thin dotted #005959;
        }
        
        #bloquesizq{
            border-left: thin dotted #005959;
        }
        

        
        :host {
            display: block;
        }
        
        .list {
        font-family:sans-serif;
        }
                       
        input {
        border:solid 1px #ccc;
        border-radius: 5px;
        padding:7px 14px;
        margin-bottom:10px
        }
        
        input:focus {
        outline:none;
        border-color:#aaa;
        }
        
        .sort {
        padding:8px 30px;
        border-radius: 6px;
        border:none;
        display:inline-block;
        color:#fff;
        text-decoration: none;
        background-color: #28a8e0;
        height:30px;
        }
        
        .sort:hover {
        text-decoration: none;
        background-color:#1b8aba;
        }
        
        .sort:focus {
        outline:none;
        }
        
        .sort:after {
        display:inline-block;
        width: 0;
        height: 0;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-bottom: 5px solid transparent;
        content:"";
        position: relative;
        top:-10px;
        right:-5px;
        }
        
        .sort.asc:after {
        width: 0;
        height: 0;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 5px solid #fff;
        content:"";
        position: relative;
        top:4px;
        right:-5px;
        }
        

        .sort.desc:after {
        width: 0;
        height: 0;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-bottom: 5px solid #fff;
        content:"";
        position: relative;
        top:-4px;
        right:-5px;
        }
        

        
                
        .center{
            text-align: center;
        }  
      `
        ];
    }


    handleClick(e : any) {
        var button = e.target;
        if(button.prefix == "far"){
            button.setAttribute("prefix","fas");
        }else{
            button.setAttribute("prefix","far");
        }
    }

    onClick(){
        console.log(this.correo);
        window.location.href = `mailto:${this.correo}`;
    }


    protected render() {
        return html`

    <div id="box" style="width: 100%;height: 140%">
    
        <h3 id="no-margin">Paralelo: ${this.id} &nbsp; &nbsp;&nbsp;Profesor: ${this.profesor}
        <button @click="${this.onClick}">
            <fontawesome-icon prefix="far" name="envelope" style="font-size: small" ></fontawesome-icon>
        </button>
        <span style="float: right">
        <button >
            <fontawesome-icon name="times" style="font-size: small"></fontawesome-icon>
        </button>
        </span>
        </h3> 
        <table>
        
           
    <body>
        <tr>
        <th style="border-top: none"></th>
        <th id="ladospunteados">Lunes</th>
        <th id="ladospunteados">Martes</th>
        <th id="ladospunteados">Miércoles</th>
        <th id="ladospunteados">Jueves</th>
        <th id="ladospunteados">Viernes</th>
        <th id="ladospunteados">Sábado</th>
        </tr>
        <tr>
            <th id="bloquesizq">1-2</th> 
            ${this.getSala("lunes",'1-2')} 
            ${this.existe ? html`
            <td class="stage-earth"> ${this.sala}</td>
            ` : html `
            <td class="stage-saturn"></td>
            `}
            ${this.getSala("martes",'1-2')} 
            ${this.existe ? html`
            <td class="stage-earth"> ${this.sala}</td>
            ` : html `
            <td class="stage-saturn"></td>
            `}
            ${this.getSala("miércoles",'1-2')} 
            ${this.existe ? html`
            <td class="stage-earth"> ${this.sala}</td>
            ` : html `
            <td class="stage-saturn"></td>
            `}
            ${this.getSala("jueves",'1-2')} 
            ${this.existe ? html`
            <td class="stage-earth"> ${this.sala}</td>
            ` : html `
            <td class="stage-saturn"></td>
            `}${this.getSala("viernes",'1-2')} 
            ${this.existe ? html`
            <td class="stage-earth"> ${this.sala}</td>
            ` : html `
            <td class="stage-saturn"></td>
            `}
            ${this.getSala("sábado",'1-2')} 
            ${this.existe ? html`
            <td class="stage-earth"> ${this.sala}</td>
            ` : html `
            <td class="stage-saturn"></td>
            `}

        </tr>
        <tr>
            <th  id="bloquesizq">3-4</th>
            ${this.getSala("lunes",'3-4')} 
            ${this.existe ? html`
            <td class="stage-earth"> ${this.sala}</td>
            ` : html `
            <td class="stage-saturn"></td>
            `}
            ${this.getSala("martes",'3-4')} 
            ${this.existe ? html`
            <td class="stage-earth"> ${this.sala}</td>
            ` : html `
            <td class="stage-saturn"></td>
            `}
            ${this.getSala("miércoles",'3-4')} 
            ${this.existe ? html`
            <td class="stage-earth"> ${this.sala}</td>
            ` : html `
            <td class="stage-saturn"></td>
            `}
            ${this.getSala("jueves",'3-4')} 
            ${this.existe ? html`
            <td class="stage-earth"> ${this.sala}</td>
            ` : html `
            <td class="stage-saturn"></td>
            `}${this.getSala("viernes",'3-4')} 
            ${this.existe ? html`
            <td class="stage-earth"> ${this.sala}</td>
            ` : html `
            <td class="stage-saturn"></td>
            `}
            ${this.getSala("sábado",'3-4')} 
            ${this.existe ? html`
            <td class="stage-earth"> ${this.sala}</td>
            ` : html `
            <td class="stage-saturn"></td>
            `}
        
        </tr>
        <tr>
            <th id="bloquesizq">5-6</th> 
            ${this.getSala("lunes",'5-6')} 
            ${this.existe ? html`
            <td class="stage-earth"> ${this.sala}</td>
            ` : html `
            <td class="stage-saturn"></td>
            `}
            ${this.getSala("martes",'5-6')} 
            ${this.existe ? html`
            <td class="stage-earth"> ${this.sala}</td>
            ` : html `
            <td class="stage-saturn"></td>
            `}
            ${this.getSala("miércoles",'5-6')} 
            ${this.existe ? html`
            <td class="stage-earth"> ${this.sala}</td>
            ` : html `
            <td class="stage-saturn"></td>
            `}
            ${this.getSala("jueves",'5-6')} 
            ${this.existe ? html`
            <td class="stage-earth"> ${this.sala}</td>
            ` : html `
            <td class="stage-saturn"></td>
            `}${this.getSala("viernes",'5-6')} 
            ${this.existe ? html`
            <td class="stage-earth"> ${this.sala}</td>
            ` : html `
            <td class="stage-saturn"></td>
            `}
            ${this.getSala("sábado",'5-6')} 
            ${this.existe ? html`
            <td class="stage-earth"> ${this.sala}</td>
            ` : html `
            <td class="stage-saturn"></td>
            `}
        </tr>
        <tr>
            <th id="bloquesizq">7-8</th>
            ${this.getSala("lunes",'7-8')} 
            ${this.existe ? html`
            <td class="stage-earth"> ${this.sala}</td>
            ` : html `
            <td class="stage-saturn"></td>
            `}
            ${this.getSala("martes",'7-8')} 
            ${this.existe ? html`
            <td class="stage-earth"> ${this.sala}</td>
            ` : html `
            <td class="stage-saturn"></td>
            `}
            ${this.getSala("miércoles",'7-8')} 
            ${this.existe ? html`
            <td class="stage-earth"> ${this.sala}</td>
            ` : html `
            <td class="stage-saturn"></td>
            `}
            ${this.getSala("jueves",'7-8')} 
            ${this.existe ? html`
            <td class="stage-earth"> ${this.sala}</td>
            ` : html `
            <td class="stage-saturn"></td>
            `}${this.getSala("viernes",'7-8')} 
            ${this.existe ? html`
            <td class="stage-earth"> ${this.sala}</td>
            ` : html `
            <td class="stage-saturn"></td>
            `}
            ${this.getSala("sábado",'7-8')} 
            ${this.existe ? html`
            <td class="stage-earth"> ${this.sala}</td>
            ` : html `
            <td class="stage-saturn"></td>
            `}
        </tr>
        <tr>
            <th id="bloquesizq">9-10</th> 
            ${this.getSala("lunes",'9-10')} 
            ${this.existe ? html`
            <td class="stage-earth"> ${this.sala}</td>
            ` : html `
            <td class="stage-saturn"></td>
            `}
            ${this.getSala("martes",'9-10')} 
            ${this.existe ? html`
            <td class="stage-earth"> ${this.sala}</td>
            ` : html `
            <td class="stage-saturn"></td>
            `}
            ${this.getSala("miércoles",'9-10')} 
            ${this.existe ? html`
            <td class="stage-earth"> ${this.sala}</td>
            ` : html `
            <td class="stage-saturn"></td>
            `}
            ${this.getSala("jueves",'9-10')} 
            ${this.existe ? html`
            <td class="stage-earth"> ${this.sala}</td>
            ` : html `
            <td class="stage-saturn"></td>
            `}${this.getSala("viernes",'9-10')} 
            ${this.existe ? html`
            <td class="stage-earth"> ${this.sala}</td>
            ` : html `
            <td class="stage-saturn"></td>
            `}
            ${this.getSala("sábado",'9-10')} 
            ${this.existe ? html`
            <td class="stage-earth"> ${this.sala}</td>
            ` : html `
            <td class="stage-saturn"></td>
            `}
        </tr>
        <tr>
            <th id="bloquesizq">11-12</th> 
            ${this.getSala("lunes",'11-12')} 
            ${this.existe ? html`
            <td class="stage-earth"> ${this.sala}</td>
            ` : html `
            <td class="stage-saturn"></td>
            `}
            ${this.getSala("martes",'11-12')} 
            ${this.existe ? html`
            <td class="stage-earth"> ${this.sala}</td>
            ` : html `
            <td class="stage-saturn"></td>
            `}
            ${this.getSala("miércoles",'11-12')} 
            ${this.existe ? html`
            <td class="stage-earth"> ${this.sala}</td>
            ` : html `
            <td class="stage-saturn"></td>
            `}
            ${this.getSala("jueves",'11-12')} 
            ${this.existe ? html`
            <td class="stage-earth"> ${this.sala}</td>
            ` : html `
            <td class="stage-saturn"></td>
            `}${this.getSala("viernes",'11-12')} 
            ${this.existe ? html`
            <td class="stage-earth"> ${this.sala}</td>
            ` : html `
            <td class="stage-saturn"></td>
            `}
            ${this.getSala("sábado",'11-12')} 
            ${this.existe ? html`
            <td class="stage-earth"> ${this.sala}</td>
            ` : html `
            <td class="stage-saturn"></td>
            `}
  
        </tr>
        <tr>
            <th id="ultimobloc">13-14</th> 
            ${this.getSala("lunes",'13-14')} 
            ${this.existe ? html`
            <td class="stage-earth"> ${this.sala}</td>
            ` : html `
            <td class="stage-saturn"></td>
            `}
            ${this.getSala("martes",'13-14')} 
            ${this.existe ? html`
            <td class="stage-earth"> ${this.sala}</td>
            ` : html `
            <td class="stage-saturn"></td>
            `}
            ${this.getSala("miércoles",'13-14')} 
            ${this.existe ? html`
            <td class="stage-earth"> ${this.sala}</td>
            ` : html `
            <td class="stage-saturn"></td>
            `}
            ${this.getSala("jueves",'13-14')} 
            ${this.existe ? html`
            <td class="stage-earth"> ${this.sala}</td>
            ` : html `
            <td class="stage-saturn"></td>
            `}${this.getSala("viernes",'13-14')} 
            ${this.existe ? html`
            <td class="stage-earth"> ${this.sala}</td>
            ` : html `
            <td class="stage-saturn"></td>
            `}
            ${this.getSala("sábado",'13-14')} 
            ${this.existe ? html`
            <td class="stage-earth"> ${this.sala}</td>
            ` : html `
            <td class="stage-saturn"></td>
            `}
        </tr>
        
       
    </body>
</table>
</div> 
    `;

    }
}
