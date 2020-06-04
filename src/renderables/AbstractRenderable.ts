import { Css2DContainer } from "../renderers/Css2D/Css2DContainer";
import { Renderer } from "../renderers/AbstractRenderer";

export abstract class Renderable {
  container: Css2DContainer; // @TODO renderContainer: RenderContainer
  id: string;
  kind = "Renderable";
  renderer: Renderer;

  constructor(id: string, container: Css2DContainer) {
    this.id = id;
    this.container = container;
  }

  // @TODO add a destructor
}
