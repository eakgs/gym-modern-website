import { Component, computed, signal } from '@angular/core';
import { NgFor, NgIf, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService, CartItem } from '../../core/cart.service';

type Category = 'All' | 'Apparel' | 'Accessories' | 'Equipment' | 'Supplements';

interface Product {
  id: string;
  title: string;
  price: number;         // LKR
  image: string;         // /assets/images/shop/...
  category: Exclude<Category, 'All'>;
  tag?: 'New' | 'Hot' | 'Limited';
  colors?: string[];
}

@Component({
  standalone: true,
  selector: 'nf-shop',
  imports: [NgFor, NgIf, FormsModule, CurrencyPipe],
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent {
  constructor(public cart: CartService) {}

  // catalog (swap with API later)
  readonly products: Product[] = [
    { id: 'tee-neo',      title: 'NEON Tee — Performance',      price: 5900,  image: '/assets/images/shop/tee.jpg',      category: 'Apparel',     tag: 'Hot',     colors: ['#10B981', '#06B6D4', '#F59E0B'] },
    { id: 'hoodie-neo',   title: 'NEON Hoodie — Oversize',      price: 12900, image: '/assets/images/shop/hoodie.jpg',   category: 'Apparel',     tag: 'Limited', colors: ['#0EA5E9', '#111827'] },
    { id: 'bottle-neo',   title: 'Hydra Bottle — 1L',           price: 3200,  image: '/assets/images/shop/bottle.jpg',   category: 'Accessories', tag: 'New',     colors: ['#67E8F9', '#22C55E'] },
    { id: 'socks-grip',   title: 'Grip Socks — Pair',           price: 1900,  image: '/assets/images/shop/socks.jpg',    category: 'Accessories' },
    { id: 'band-pack',    title: 'Resistance Bands — Pack',     price: 5400,  image: '/assets/images/shop/bands.jpg',    category: 'Equipment' },
    { id: 'mat-pro',      title: 'Flow Mat — Pro',              price: 8900,  image: '/assets/images/shop/mat.jpg',      category: 'Equipment' },
    { id: 'whey-1kg',     title: 'Whey Isolate — 1kg',          price: 17900, image: '/assets/images/shop/whey.jpg',     category: 'Supplements' },
    { id: 'creatine-300', title: 'Creatine Monohydrate — 300g', price: 7400,  image: '/assets/images/shop/creatine.jpg', category: 'Supplements' },
  ];

  // UI state
  heroStats = [
    { label: 'Avg rating', value: '4.8' },
    { label: 'Products',   value: `${8}` },
    { label: 'Members',    value: '12k+' },
  ];

  categories: Category[] = ['All', 'Apparel', 'Accessories', 'Equipment', 'Supplements'];
  cat = signal<Category>('All');
  q   = signal('');
  sort = signal<'popular' | 'price-asc' | 'price-desc'>('popular');
  max  = signal<number>(30000);

  cartOpen = signal(false);

  // handlers (kept simple for template)
  setCat(c: Category) { this.cat.set(c); }
  onSearch(e: Event)  { this.q.set((e.target as HTMLInputElement)?.value ?? ''); }
  onSort(e: Event)    { this.sort.set(((e.target as HTMLSelectElement)?.value as any)); }
  onMax(e: Event)     { this.max.set(Number((e.target as HTMLInputElement)?.value ?? this.max())); }

  addToCart(p: Product) {
    this.cart.add({ id: p.id, title: p.title, price: p.price, image: p.image });
    this.cartOpen.set(true);
  }
  onQtyInput(it: CartItem, e: Event) {
    const raw = (e.target as HTMLInputElement)?.value ?? `${it.qty}`;
    const n = Math.max(1, Number(raw) || it.qty);
    this.cart.setQty(it.id, n);
  }

  // derived list
  list = computed(() => {
    let L = this.products.slice();

    const needle = this.q().trim().toLowerCase();
    const cat = this.cat();
    const max = this.max();

    if (needle) {
      L = L.filter(p =>
        p.title.toLowerCase().includes(needle) ||
        p.category.toLowerCase().includes(needle)
      );
    }
    if (cat !== 'All') L = L.filter(p => p.category === cat);
    L = L.filter(p => p.price <= max);

    switch (this.sort()) {
      case 'price-asc':  L.sort((a,b) => a.price - b.price); break;
      case 'price-desc': L.sort((a,b) => b.price - a.price); break;
      default: break;
    }
    return L;
  });

  checkout() {
    alert(`Checkout • Items: ${this.cart.count()} • Total: LKR ${this.cart.total().toLocaleString()}\n\nWire this to your .NET checkout endpoint when ready.`);
  }
}
