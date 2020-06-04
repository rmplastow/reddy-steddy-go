import { Animal } from "./AbstractAnimal";
import { Css2DContainer } from "../../../renderers/Css2D/Css2DContainer";
import { Css2DBoar } from "../../../renderers/Css2D/Css2DBoar";

export class Boar extends Animal {
  _color = "brown";
  kind = "Boar";
  renderer: Css2DBoar;
  tailDescription = "curly";

  get color() {
    return this._color;
  }
  set color(value: string) {
    this._color = value;
    this.renderer.color = value;
  }

  constructor(id: string, container: Css2DContainer) {
    super(id, container);
    this.renderer = this.container.createRenderer(this);
  }
}
