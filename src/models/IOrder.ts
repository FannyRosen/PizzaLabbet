import { ICartItem } from "./ICart";

export interface IOrder {
  quantity: number;
  cart: ICartItem[];
  restaurantId: number;
}
