import { Renderer } from "../AbstractRenderer";
import { Boar } from "../../renderables/Locatables/Animals/Boar";

export class Css2DBoar extends Renderer {
  set color(value: string) {
    this.$div.style.color = value;
  }

  constructor(renderable: Boar) {
    super(renderable);

    this.$div.innerText = renderable.id;
    this.color = renderable.color;
  }
}
