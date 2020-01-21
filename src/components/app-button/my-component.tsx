import {Component, Prop, h, State, Listen, Event, EventEmitter, Watch} from '@stencil/core';

@Component({
  tag: 'app-button',
  styleUrl: 'app-button.css',
  shadow: true
})
export class MyComponent {
  @Prop()
  public color: string;

  @State()
  public count: number = 0;

  @Event({ eventName: 'custom-click', bubbles: true, composed: true })
  public customClick: EventEmitter;

  @Listen('click')
  public onClick(_: MouseEvent) {
    this.count += 1;
    this.customClick.emit({ count: this.count });
  }

  @Watch('color')
  watchHandler(newValue: boolean, oldValue: boolean) {
    console.log('The new value of color is: ', newValue, oldValue);
  }

  public render() {
    return <a class={this.color || ''}><slot /> <span>{ this.count }</span></a>;
  }
}
