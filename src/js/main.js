import css from '../css/styles.css';
import API_KEY from './config.js';
import Handler from './modules/handler.js';
import UI from './modules/ui.js';
import inlineWidgetTemplate from '../html/widget.html';

let metric = true;

export class WeatherInlineWidget extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.initialized = false;
    }

    connectedCallback() {
        // Setup the style
        var style = document.createElement('style');
        style.innerHTML = css;
        this.shadowRoot.prepend(style);
    }

    initialize() {
        if (this.initialized == false) {

            //render the screens of the component
            this._addHTMLTemplate();
            this._render();
            this.initialized = true;
        } else {
            throw new Error('The widget was already initialized!');
        }
    }

    
    start() {
        if (this.initialized == true) {
            this.shadowRoot.getElementById('weather-widget-inline').classList.remove('hidden');
        } else {
            throw new Error('The widget was not initialized!');
        }
    }

    
    stop() {
        if  (this._activeScreenId) {
            this.shadowRoot.getElementById('weather-widget-inline').classList.add('hidden');
        }
    }


    destroy() {
        // first, remove the content that is currently rendered
        var currentElement = this.shadowRoot.getElementById('weather-widget-inline');
        this.shadowRoot.removeChild(currentElement);
    
        // reset state variables
        this.initialized = false;
    }


    _addHTMLTemplate() {
        var parser = new DOMParser();
        var template = parser.parseFromString(inlineWidgetTemplate, 'text/html'); 
        this.shadowRoot.appendChild(template.body.firstChild);
    }


    _render() {
      console.log("render");
      UI.updateWeather(metric);
      console.log("after updateWeather");

      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.success.bind(this), this.error.bind(this), {maximumAge:60000, timeout:10000});
        console.log("got geolocation");
      } else {
        this.error();
        console.log("didn't got geolocation");
      }
    
      document.querySelector("weather-widget-inline").shadowRoot.querySelector("#fahrenheit-now, #celsius-now").addEventListener("click", function(){
        var element = document.querySelector("weather-widget-inline").shadowRoot.querySelector("#fahrenheit-now, #celsius-now");
        if(element.classList.contains("degree-inactive")){
          element.classList.remove("degree-inactive");
          document.querySelector("weather-widget-inline").shadowRoot.querySelector(".degree-active").classList.remove("degree-active");
          document.querySelector("weather-widget-inline").shadowRoot.querySelector(".degree-active").classList.add("degree-inactive");
          element.classList.add("degree-active");
    
          if(element.id === "fahrenheit-now") {
            metric = false;
          } else {
            metric = true;
          }
    
          UI.updateWeather(metric);
        }
      });
    }


    handleRequest(latitude, longitude){
      Handler.fetchCurrentWeather(latitude, longitude, metric);
      Handler.fetchForecast(latitude, longitude, metric);
    }
    
    success(position) {
      console.log("success");
      this.handleRequest(position.coords.latitude, position.coords.longitude);
    }

    error(e){
      console.log("error", e);
    }
}

export function initInlineWeatherWidgets() {
    customElements.define('weather-widget-inline', WeatherInlineWidget);
}

export default metric;