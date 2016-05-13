/**
 * @file button.js
 */
import Component from './component';
import * as Dom from './utils/dom.js';
import * as Events from './utils/events.js';
import * as Fn from './utils/fn.js';
import document from 'global/document';
import assign from 'object.assign';
import Tooltip from './tooltip';

/**
 * Base class for all buttons
 *
 * @param {Object} player  Main Player
 * @param {Object=} options Object of option names and values
 * @extends Component
 * @class Button
 */
class Button extends Component {

  constructor(player, options) {
    super(player, options);

    this.appendTooltip();

    this.emitTapEvents();

    this.on('tap', this.handleClick);
    this.on('click', this.handleClick);
    this.on('focus', this.handleFocus);
    this.on('blur', this.handleBlur);
  }

  /**
   * Create the component's DOM element
   *
   * @param {String=} type Element's node type. e.g. 'div'
   * @param {Object=} props An object of element attributes that should be set on the element Tag name
   * @return {Element}
   * @method createEl
   */
  createEl(tag='button', props={}, attributes={}) {
    props = assign({
      className: this.buildCSSClass(),
      tabIndex: 0
    }, props);

    // Add standard Aria info
    attributes = assign({
      role: 'button',
      type: 'button', // Necessary since the default button type is "submit"
      'aria-live': 'polite' // let the screen reader user know that the text of the button may change
    }, attributes);

    let el = super.createEl(tag, props, attributes);

    this.controlTextEl_ = Dom.createEl('span', {
      className: 'vjs-control-text'
    });

    el.appendChild(this.controlTextEl_);

    this.controlText(this.controlText_);

    return el;
  }

  /**
   * Controls text - both request and localize
   *
   * @param {String} text Text for button
   * @return {String}
   * @method controlText
   */
  controlText(text) {
    if (!text) return this.controlText_ || 'Need Text';

    this.controlText_ = text;
    this.controlTextEl_.innerHTML = this.localize(this.controlText_);

    if (this.tooltip) {
      this.tooltip.text(this.controlText_);
    } else {
      this.appendTooltip();
    }

    return this;
  }

  /**
   * Allows sub components to stack CSS class names
   *
   * @return {String}
   * @method buildCSSClass
   */
  buildCSSClass() {
    return `vjs-control vjs-button ${super.buildCSSClass()}`;
  }

  /**
   * Handle Click - Override with specific functionality for button
   *
   * @method handleClick
   */
  handleClick() {}

  /**
   * Handle Focus - Add keyboard functionality to element
   *
   * @method handleFocus
   */
  handleFocus() {
    Events.on(document, 'keydown', Fn.bind(this, this.handleKeyPress));
  }

  /**
   * Handle KeyPress (document level) - Trigger click when keys are pressed
   *
   * @method handleKeyPress
   */
  handleKeyPress(event) {
    // Check for space bar (32) or enter (13) keys
    if (event.which === 32 || event.which === 13) {
      event.preventDefault();
      this.handleClick(event);
    }
  }

  /**
   * Handle Blur - Remove keyboard triggers
   *
   * @method handleBlur
   */
  handleBlur() {
    Events.off(document, 'keydown', Fn.bind(this, this.handleKeyPress));
  }

  /**
   * Append a tooltip to the component
   *
   * @method appendTooltip
   */
  appendTooltip() {
    if (this.tooltip || !this.controlText_ || !this.el()) {
      return;
    }

    let tooltipHandler = this.tooltipHandler();

    if (tooltipHandler) {
      this.tooltip = new Tooltip(this.player_);
      this.el().appendChild(this.tooltip.el());
      this.tooltip.text(this.controlText_);
      this.tooltip.handler(tooltipHandler);
    }
  }

  /**
   * Return handler for the tooltip
   *
   * @return {Object} Dom element to serve as a handler for the tooltip
   * @method tooltipHandler
   */
  tooltipHandler() {
    let handler = this.options_.tooltip;

    if (handler === false) {
      return;
    }

    if (handler === true || this.player_.options_.tooltips) {
      return this.el();
    }

    if (typeof handler === 'string') {
      return Dom.getEl(handler);
    }

    if (handler && typeof handler.el === 'function') {
      return handler.el();
    }

    return handler;
  }
}


Component.registerComponent('Button', Button);
export default Button;
