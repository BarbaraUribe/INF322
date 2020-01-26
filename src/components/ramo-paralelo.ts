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
import { ListaCursos } from '../reducers/cursos';
import 'fontawesome-icon';

@customElement('ramo-paralelo')
export class RamoParalelo extends connect(store)(LitElement) {
  @property({type: Object})
  public cursos: ListaCursos = {};
  public sigla = "IWI131";
  public nombre : any;
  public curso : any;
  public paralelos : any;

  protected filter() {
    Object.keys(this.cursos).map((key) => {
            const item = this.cursos[key];
            if (item.sigla == this.sigla){
                this.sigla = item.sigla;
                this.curso = item;
                this.nombre = item.asignatura;
                this.paralelos = this.curso.paralelos;
                console.log(this.curso);
            }
    })
  }


  static get styles() {
      return [
        ButtonSharedStyles,
        css`
          :host {
              display: block;
          }
          
          #box{
        box-sizing: content-box;
        width: 60%;
        height: 50%;
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

          .paralelo {
              width: 20%
          }

          .profesor{
              width: 45%
          }

          .cupos{
              width: 20%
          }

          .horario{
              width: 15%
          }

          .left{
              text-align: left;
          }
        `
      ];
  }

  handleClick(e : any) {
      var button = e.target;
      if(button.prefix == "far"){
        button.setAttribute("prefix","fas");
        console.log(e.target.id);
      }else{
        button.setAttribute("prefix","far");
      }
  }

  protected render() {
      return html`
        ${this.filter()}
        <div id="box" >
            <h3 id="no-margin">Sigla: ${this.sigla} &nbsp; &nbsp; Asignatura: ${this.nombre}
            <span style="float: right">
            <button>
                <fontawesome-icon name="times" style="font-size: small"></fontawesome-icon>
            </button>     
            </h3>
            <h3 id="no-margin">Créditos: ${this.curso.creditos}</h3>
      <table style="box-sizing: content-box">
        <tbody>
        <tr>
            <th class="Paralelo" style="text-align: left">
              <strong> Paralelo </strong>
            </th>
            <th class="Profesor" style="text-align: left">
              <strong> Profesor </strong>
            </th>
            <th class="Cupos" style="text-align: left">
              <strong> Cupos </strong>
            </th>
            <th style="text-align: left">
            <strong> Horario </strong>
            </th>
          </tr>
        
        ${Object.keys(this.paralelos).map((key) => {

          const item = this.paralelos[key];
          return html`
            <tr>
            <td style="width: 7%; text-align: center">
              ${item.id}
            </td>
            <td style="width: 75%; text-align: left;">
              ${item.profesor}
            </td>
            <td style="width: 9%; text-align: center">  
              ${item.cupos}
            </td>
            <td style="width: 9%; text-align: center">
            <button @click="${this.handleClick}"><fontawesome-icon id="${item.id}" prefix="far" name="calendar-alt" fixed-width></fontawesome-icon></button>
            </td>
          </tr>
            `;
      })}
        </tbody>
        </table>
      
        </div>
      `;

    }


}
