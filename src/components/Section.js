export default class Section {
  constructor(items, renderer, containerSelector) {
    const { querySelector } = document;
    this._items = items;
    this._renderer = renderer;
    this._container = querySelector.call(document, containerSelector);
  };

  _clear() {
    this._container.innerHTML = '';
  };

  renderItems() {
    this._clear();
    this._items.forEach((item) => {
      const element = this._renderer(item);
      this._container.append(element);
    });
  };

  addItem(element) {
    this._container.prepend(element);
  };
};
