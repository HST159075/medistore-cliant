export interface OrderItem {
  medicineId: string;
  quantity: number;
  price: number;
}

export interface OrderPayload {
  items: OrderItem[];
  totalPrice: number;
  address: string;
  phone: string;
}
