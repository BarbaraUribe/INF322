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
  public paralelos : any;

  protected filter(){
    this.paralelos = this.cursos.paralelos;
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
        border: 0px solid black;
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

    abrir(e : any){
        console.log(e.target.getAttribute('data-args'));
        console.log("ola");
        var seabre = "#dialog" + e.target.getAttribute('data-args');
        console.log("adios");
        //var dialogo = this.shadowRoot!.querySelector("#dialog")!;
        var dialogo = this.shadowRoot!.querySelector(seabre)!;
        console.log(dialogo);
        if(dialogo!= null){

            dialogo.show().then((result:any) => console.log(result))
        }
    }

    cerrar(e: any){
      console.log(e.target.getAttribute('data-args'));
      var secierra = "#dialog" + e.target.getAttribute('data-args');
      var dialogo = this.parentElement!.shadowRoot!.querySelector(secierra);
      console.log(dialogo);
      if(dialogo != null){
          console.log("se cerro");
          dialogo.hide().then((result:any)=>console.log(result))
      }
    }

  protected render() {
      return html`
        ${this.filter()}
        <div id="box" style="width: 95%">
            <h3 id="no-margin">Sigla: ${this.cursos.sigla} &nbsp; &nbsp; Asignatura: ${this.cursos.asignatura}
            <span style="float: right">
            <wl-button flat inverted id="dialog-submit-button" @click="${this.cerrar}" data-args="${this.cursos.sigla}">
                <fontawesome-icon id="dialog${this.cursos.sigla}" @click="${this.cerrar}" data-args="${this.cursos.sigla}" prefix="far" name="calendar-alt" fixed-width>
            </wl-button>   
            </h3>
            <h3 id="no-margin">Créditos: ${this.cursos.creditos}</h3>
      <table style="width: 100%">
        <tbody>
        <tr>
            <th class="Paralelo" style="text-align: left">
              <strong> Paralelo </strong>
            </th>
            <th class="Profesor" style="text-align: left">
              <strong> Profesor </strong>
            </th>
            <th class="Cupos" style="text-align: center">
              <strong> Cupos </strong>
            </th>
            <th style="text-align: center">
            <strong> Horario </strong>
            </th>
          </tr>
        
        ${Object.keys(this.paralelos).map((key) => {

          const item = this.paralelos[key];
          return html`
            <tr>
            <td style="width: 7%; text-align: center; background-color: #f5f3ed">
              ${item.id}
            </td>
            <td style="width: 75%; text-align: left; background-color: #f5f3ed">
              ${item.profesor}
            </td>
            <td style="width: 9%; text-align: center; background-color: #f5f3ed">
              ${item.cupos}
            </td>
            <td style="width: 9%; text-align: center; background-color: #f5f3ed">
            <wl-button flat inverted id="open-dialog" @click="${this.abrir}" data-args="${item.id}">
                <fontawesome-icon id="open-dialog" @click="${this.abrir}" data-args="${item.id}" prefix="far" name="calendar-alt" fixed-width>
            </wl-button>
            <wl-dialog size="large" id="dialog${item.id}" fixed backdrop blockscrolling>
                <tabla-guion class="component-margin" .horarios="${item.horarios}" .id="${item.id}" .profesor="${item.profesor}" .correo="${item.correo}">
            </wl-dialog>
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
