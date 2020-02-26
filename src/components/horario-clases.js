/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css, property, customElement } from 'lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../store';
import { ButtonSharedStyles } from './button-shared-styles';
import 'fontawesome-icon';
import "weightless/dialog";
import "weightless/button";
import "weightless/icon";
import './ramo-paralelo';
let HorarioClases = class HorarioClases extends connect(store)(LitElement) {
    constructor() {
        super(...arguments);
        this.cursos = {};
    }
    static get styles() {
        return [ButtonSharedStyles,
            css `
        :host {
            display: block;
        }
        
        .Sigla {
            width: 10% 
        }
        
        .Asignatura{
            width: 25%
        }
        
        .departamento{
            width: 13%
        }
        
        .paralelo{
            width: 22%
        }
        
        .profesor{
            width: 15%
        }
        
        .cupos{
            width: 5%
        }
        
        .horario{
            width: 10%
        }
        
        .left{
            text-align: left;
        }
      `
        ];
    }
    handleClick(e) {
        var button = e.target;
        if (button.prefix == "far") {
            button.setAttribute("prefix", "fas");
        }
        else {
            button.setAttribute("prefix", "far");
        }
    }
    render() {
        return html `
<!--<script type="module" src="../../node_modules/list.js">
</script>
<script>
new List('asignaturas',
        {
          valueNames:['asignatura', 'sigla'],
          page: 15,
          pagination: true
        });
</script>-->

<div class="asignaturas">
<strong>Buscar:</strong> <input type="text" class="search" />
<h2>Listado de Cursos</h2>
    <table style="box-sizing: content-box">
      <tbody>
      <div class="list">
      <tr>
          <th class="Sigla" style="text-align: left">
            <strong> Sigla </strong>
          </th>
          <th class="Asignatura" style="text-align: left">
            <strong> Asignatura </strong>
          </th>
          <th class="Info" style="text-align: center">
          <strong> Más información </strong>
          </th>
        </tr>
           
      ${Object.keys(this.cursos).map((key) => {
            const item = this.cursos[key];
            return html `
        ${Object.keys(item.paralelos).map((idies) => {
                if (idies == '0') {
                    var mostrar = true;
                    console.log(mostrar);
                    return html `
          <tr>
          <td class="sigla" style="width: 9%; text-align: center; background-color: #f5f3ed">
            ${item.sigla}
          </td>
          <td class="asignatura" style="width: 9%;  background-color: #f5f3ed">
            ${item.asignatura}
          </td>
          <td style="width: 9%; text-align: center; background-color: #f5f3ed">
          <!--
          <wl-button fab flat inverted id="open-dialog" @click="${this.abrir}" data-args="${item.sigla}">
       
     
                    <fontawesome-icon id="open-dialog" @click="${this.abrir}" data-args="${item.sigla}" prefix="far" name="plus-square" fixed-width style="position: relative;z-index: -1"> 


          </wl-button>
          
          <wl-dialog size="large" id="dialog${item.sigla}" fixed backdrop blockscrolling >
            
          </wl-dialog>
            -->
            <ramo-paralelo class="component-margin" .cursos="${item}"></ramo-paralelo>
      
      
          </td> 
          </tr>
          <tr><td colspan="3"></td></tr>
          `;
                }
                else {
                    return html `
          `;
                }
            })}
        
        `;
        })}
      </tbody>
      </table> 
      </div>
          <ul class="pagination"></ul>
</div>
    `;
    }
};
__decorate([
    property({ type: Object })
], HorarioClases.prototype, "cursos", void 0);
HorarioClases = __decorate([
    customElement('horario-clases')
], HorarioClases);
export { HorarioClases };
