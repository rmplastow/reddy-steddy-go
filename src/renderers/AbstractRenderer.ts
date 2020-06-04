import { Renderable } from "../renderables/AbstractRenderable";

export abstract class Renderer {
  $div: HTMLDivElement;

  constructor(renderable: Renderable) {
    // Create and store an HTML <div> element.
    this.$div = document.createElement("div");
    this.$div.id = renderable.id;
  }
}
