import { Css2DBoar } from "./Css2DBoar";

// @TODO type should be a union, so typeof Css2DBoar | typeof Css2DRabbit | ...
function kindToRendererClass(kind: string): typeof Css2DBoar {
  switch (kind) {
    case "Boar":
      return Css2DBoar;
    default:
      throw Error(`Unexpected kind '${kind}'`);
  }
}

export class Css2DContainer {
  $container: Element;

  constructor(selector: string) {
    // Store a reference to the element which this Renderer will draw in.
    const $container = document.querySelector(selector);
    if ($container == null) throw Error(`No such element '${selector}'`);
    this.$container = $container;
  }

  // @TODO type should be a union, so Css2DBoar | Css2DRabbit | ...
  createRenderer(renderable): Css2DBoar {
    const RendererClass = kindToRendererClass(renderable.kind);
    const renderer = new RendererClass(renderable);
    this.$container.appendChild(renderer.$div);
    return renderer;
  }
}
