export default class Link {
  constructor(link) {
    this.link = link;
    this.render();
  }
  render() {
    const element = document.createElement('a');
    element.href = this.link;
    element.innerText = this.link;
    document.body.appendChild(element);
  }
}
