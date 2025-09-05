import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Car {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  year: number;
  mileage: number;
  fuel: string;
  transmission: string;
  image: string;
  rating: number;
  reviews: number;
  isNew: boolean;
  badge: string;
  make: string;
  model: string;
  color: string;
  bodyType: string;
  drivetrain: string;
  engine: string;
  doors: number;
  seats: number;
  features: string[];
  description: string;
  location: string;
  vin: string;
}

interface CartItem {
  car: Car;
  quantity: number;
  priceAtAdd: number;
}

interface CartStore {
  items: CartItem[];
  addToCart: (car: Car) => void;
  removeFromCart: (carId: number) => void;
  updateQuantity: (carId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addToCart: (car: Car) => {
        const items = get().items;
        const existingItem = items.find(item => item.car.id === car.id);
        
        if (existingItem) {
          set({
            items: items.map(item =>
              item.car.id === car.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          });
        } else {
          set({
            items: [...items, { car, quantity: 1, priceAtAdd: car.price }]
          });
        }
      },
      
      removeFromCart: (carId: number) => {
        set({
          items: get().items.filter(item => item.car.id !== carId)
        });
      },
      
      updateQuantity: (carId: number, quantity: number) => {
        if (quantity <= 0) {
          get().removeFromCart(carId);
          return;
        }
        
        set({
          items: get().items.map(item =>
            item.car.id === carId
              ? { ...item, quantity }
              : item
          )
        });
      },
      
      clearCart: () => {
        set({ items: [] });
      },
      
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      
      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + (item.priceAtAdd * item.quantity), 
          0
        );
      }
    }),
    {
      name: 'cart-storage'
    }
  )
);