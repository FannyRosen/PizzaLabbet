import { ICartItem } from "./ICart";

export interface IReadOrder {
  orderId: number;
  totalPrice: number;
  orderedAt: string;
  estimatedDelivery: string;
  status: string;
  cart: ICartItem[];
  restaurantId: number;
}
