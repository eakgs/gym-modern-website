import { Injectable, signal, computed, effect } from '@angular/core';

export interface CartItem {
  id: string;
  title: string;
  price: number;     // in LKR
  image: string;
  qty: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly STORAGE_KEY = 'neonfit_cart_v1';
  items = signal<CartItem[]>([]);

  constructor() {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      if (raw) this.items.set(JSON.parse(raw));
    } catch {}
    effect(() => localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.items())));
  }

  total = computed(() => this.items().reduce((s, it) => s + it.price * it.qty, 0));
  count = computed(() => this.items().reduce((s, it) => s + it.qty, 0));

  add(item: Omit<CartItem, 'qty'>, qty = 1) {
    const list = this.items().slice();
    const i = list.findIndex(x => x.id === item.id);
    if (i >= 0) list[i] = { ...list[i], qty: list[i].qty + qty };
    else list.push({ ...item, qty });
    this.items.set(list);
  }
  setQty(id: string, qty: number) {
    if (qty <= 0) return this.remove(id);
    this.items.update(list => list.map(x => x.id === id ? { ...x, qty } : x));
  }
  remove(id: string) { this.items.update(list => list.filter(x => x.id !== id)); }
  clear() { this.items.set([]); }
}
