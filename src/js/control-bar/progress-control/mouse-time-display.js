/**
 * @file mouse-time-display.js
 */
import Component from '../../component.js';
import * as Dom from '../../utils/dom.js';
import * as Fn from '../../utils/fn.js';
import formatTime from '../../utils/format-time.js';
import throttle from 'lodash-compat/function/throttle';

/**
 * The Mouse Time Display component shows the time you will seek to
 * when hovering over the progress bar
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @extends Component
 * @class MouseTimeDisplay
 */
class MouseTimeDisplay extends Component {

  constructor(player, options) {
    super(player, options);

    this.update(0, 0);

    player.on('ready', () => {
      let progressEl = this.player_.controlBar.progressControl.el();
      progressEl.appendChild(this.tooltip);
      this.on(progressEl, 'mousemove', throttle(Fn.bind(this, this.handleMouseMove), 25));
    });
  }

  /**
   * Create the component's DOM element
   *
   * @return {Element}
   * @method createEl
   */
  createEl() {
    this.tooltip = Dom.createEl('div', {
      className: 'vjs-mouse-display-tooltip'
    });
    let el = super.createEl('div', {
      className: 'vjs-mouse-display'
    });
    return el;
  }

  dispose(){
    if (this.tooltip.parentNode) {
      this.tooltip.parentNode.removeChild(this.tooltip);
    }

    Dom.removeElData(this.tooltip);
    this.tooltip = null;

    super.dispose();
  }

  handleMouseMove(event) {
    let duration = this.player_.duration();
    let newTime = this.calculateDistance(event) * duration;

    let maxLeft = this.player().controlBar.progressControl.seekBar.width() - this.width();
    let position = event.pageX - Dom.findElPosition(this.el().parentNode).left;
    position = Math.min(Math.max(0, position), maxLeft);

    let tooltipWidth = this.tooltip.offsetWidth;
    let maxTooltipLeft = this.tooltip.parentNode.offsetWidth - tooltipWidth;
    let tooltipPosition = event.pageX - Dom.findElPosition(this.tooltip.parentNode).left - tooltipWidth/2;
    tooltipPosition = Math.min(Math.max(0, tooltipPosition), maxTooltipLeft);

    this.update(newTime, position, tooltipPosition);
  }

  update(newTime, position, tooltipPosition) {
    let time = formatTime(newTime, this.player_.duration());

    this.el().style.left = position + 'px';
    this.tooltip.innerHTML = time;
    this.tooltip.style.left = tooltipPosition + 'px';
  }

  calculateDistance(event) {
    return Dom.getPointerPosition(this.el().parentNode, event).x;
  }
}

Component.registerComponent('MouseTimeDisplay', MouseTimeDisplay);
export default MouseTimeDisplay;
