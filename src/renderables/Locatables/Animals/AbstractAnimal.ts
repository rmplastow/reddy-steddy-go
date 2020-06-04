import { Locatable } from "../AbstractLocatable";

export abstract class Animal extends Locatable {
  kind = "Animal";
  numberOfLegs = 4;
}
