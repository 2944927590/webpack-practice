export default class HelloComponent {
  constructor(content = '') {
    this.content = content;
    this.render();
  }
  render () {
    const element = document.createElement('div');
    element.innerHTML = this.content;
    document.body.appendChild(element);
  }
}
