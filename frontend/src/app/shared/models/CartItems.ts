import { Food } from "./Food";

export class CartItems{
  constructor(public food: Food) {}
  quantity: number = 1;
  price: any = this.food.price;
}
