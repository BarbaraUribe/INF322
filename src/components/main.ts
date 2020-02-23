/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

/* Esta es la página principal, usenla para probar sus componenetes, la idea es que aquí se hagan las modificaciones en
 * memoria y se envien datos a los componentes. El código actualmente está con un ejemplo del listado de cursos */

import { LitElement, html, css, property, PropertyValues, customElement } from 'lit-element';
import { setPassiveTouchGestures } from '@polymer/polymer/lib/utils/settings.js';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { installMediaQueryWatcher } from 'pwa-helpers/media-query.js';
import { installOfflineWatcher } from 'pwa-helpers/network.js';
import { installRouter } from 'pwa-helpers/router.js';
import { updateMetadata } from 'pwa-helpers/metadata.js';
import { store, RootState } from '../store';
import { customCss } from './style';


// Importen sus tipos de datos y funciones
import { getAllCursos } from '../actions/cursos';
import { ListaCursos } from '../reducers/cursos';

import "weightless/dialog";
import "weightless/button";

// These are the actions needed by this element.
import {
  navigate,
  updateOffline,
  updateDrawerState
} from '../actions/app.js';

import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-scroll-effects/effects/waterfall.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import './snack-bar.js';

// Aqui se importan los componentes.
import './horario-clases';
import './tabla-guion';
import './ramo-paralelo';

@customElement('main-page')
export class MainPage extends connect(store)(LitElement) {
  @property({type: Object})
  private _cursos: ListaCursos = {};

  @property({type: Boolean})
  private _loggedIn: boolean = false;

  @property({type: String})
  private _page: string = '';

  private appTitle : string = 'Siga';
  
  static get styles() {
    return [customCss,
      css`
        :host {
          display: block;
          height: 100vh;
        }

        #main {
          display: grid;
          height: 100%;
          grid-template-columns: 300px calc(100% - 300px);
          grid-template-rows: 80px calc(100% - 160px) 80px;
        }

        #header {
          background-color: #0d1e52;
          text-align: left;
          color: white;
          padding: 2%;
          grid-row: 1;
          grid-column: 1 / 3;
        }

        #nav-bar {
          grid-row: 2;
          grid-column: 1;
        }

        #content {
          grid-row: 2;
          grid-column: 2;
        }

        #logInButton {
          cursor: pointer;
          border: 1px solid gray;
          border-radius: 4px;
          padding: 5px;
          background: aliceblue;
        }

        #logInButton:hover {
          background: aqua;
        }
        
        #footer {
        grid-column: 1 / 3;
        background-color: #faba25;
        align-content: center;
        }

        .centered {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
        }
        
        .component-margin {
          margin: 10% 10%
        }
        
      `
    ];
  }

  _logIn () {
    this._loggedIn = (Math.random() > 0);
    if (!this._loggedIn) {
        alert('try again!');
    }
  }

  /* Render se ejecuta cada vez que se modifica una variable marcada como property, OJO: no se verifican las
   * subpropiedades de los objetos, pueden requerir una actualización usando this.requestUpdate();
   * Más info: https://polymer-library.polymer-project.org/3.0/docs/devguide/observers */
  protected render() {
    /* Acá está la página principal, cada componente debería tener un lugar donde puedan probarlo. */
    return html`
    ${this._loggedIn ? html`
    <div id="main">
        <div id="header" style="vertical-align: middle;">
            Sesión de ALUMNO NOMBRE APELLIDO
        </div>
           
        <div id="nav-bar"></div>
           
        <div id="content">
            <!-- ACA está la utilización del componente, para pasarle datos usen un punto '.' más
                 el nombre de la variable del componente (public) -->
            <tabla-guion class="component-margin" .cursos="${this._cursos}"></tabla-guion>

<!-- Aca el ejemplo de modal, lo que faltaba era el click. El codigo es simple,
     this.shadowRoot.querySelector se utiliza para obtener el modal 'wl-dialog',
     luego se usa la funcion show de ese componente y luego (asincronicamente)
     se imprime el resultado por consola. 
     
     No es necesario que la funcion sea inline (@click = "() => {}"), pueden 
     definir comportamientos mas complejos en una funcion como this._openModal 
     y luego @click="this._openModal" -->

<wl-button id="open-dialog" @click="${() => {this.shadowRoot!.querySelector("#dialog")!.show().then((result:any) => console.log(result))}}">Open</wl-button>
<wl-dialog id="dialog" fixed backdrop blockscrolling>
   <h3 slot="header">Hello my friend</h3>
   <div slot="content">
        <ramo-paralelo class="component-margin" .cursos="${this._cursos}"></ramo-paralelo>
   </div>
   <div slot="footer">
      <wl-button id="dialog-submit-button">Submit</wl-button>
   </div>
</wl-dialog>

        </div>
        
        <div id="footer">
        </div>
        
    </div>
    ` : html`
    <div class="centered">
        <span id="logInButton" @click="${this._logIn}">
            Click here to try to log in!
        </span>
    </div>`}
    `;
  }

  constructor() {
    super();
    // To force all event listeners for gestures to be passive.
    // See https://www.polymer-project.org/3.0/docs/devguide/settings#setting-passive-touch-gestures
    setPassiveTouchGestures(true);
  }

  /* Esta función se ejecuta solo una vez, util para cargar datos. */
  protected firstUpdated() {
    installRouter((location) => store.dispatch(navigate(decodeURIComponent(location.pathname))));
    installOfflineWatcher((offline) => store.dispatch(updateOffline(offline)));
    installMediaQueryWatcher(`(min-width: 460px)`,
        () => store.dispatch(updateDrawerState(false)));

    // Cargando datos
    store.dispatch(getAllCursos());
  }

  /* Esta función se ejecuta DESPUES de cada render. */
  protected updated(changedProps: PropertyValues) {
    if (changedProps.has('_page')) {
      const pageTitle = this.appTitle + ' - ' + this._page;
      updateMetadata({
        title: pageTitle,
        description: pageTitle
        // This object also takes an image property, that points to an img src.
      });
    }
    /* Si queremos modificar la página o leer el contenido que hay en algún input debemos trabajar 
     * directamente con el DOM element. PERO cada elemento tiene su propio shadowRoot, por lo que 
     * para tomar algo de la página, por ejemplo la barra de navegación podemos: 
        let navBar = this.shadowRoot.getElementById('nav-bar');
     * Así tenemos la navBar, si fuera un input podríamos leerlo con navBar.value */
  }

  /* Esta función se ejecuta cada vez que el state cambia, se usa para leer la memoria. */
  stateChanged(state: RootState) {
    this._page = state.app!.page;
    this._cursos = state.cursos!.cursos;
  }
}
