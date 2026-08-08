import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);
const STORAGE_KEY = 'mercion_cart_v1';

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => loadCart());
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const selectPlan = (plan) => {
    setSelected(plan);
  };

  const clearSelection = () => setSelected(null);

  const addSelectedToCart = () => {
    if (!selected) return false;
    setItems([
      {
        id: `${selected.tab}-${selected.key}-${selected.billingCycle}`,
        tab: selected.tab,
        key: selected.key,
        name: selected.name,
        billingCycle: selected.billingCycle,
        unitPrice: selected.unitPrice,
        chargeRupees: selected.chargeRupees,
        amountPaise: selected.amountPaise,
      },
    ]);
    return true;
  };

  const removeFromCart = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setItems([]);

  const totalPaise = useMemo(
    () => items.reduce((sum, item) => sum + (item.amountPaise || 0), 0),
    [items]
  );

  const value = {
    items,
    selected,
    selectPlan,
    clearSelection,
    addSelectedToCart,
    removeFromCart,
    clearCart,
    totalPaise,
    cartCount: items.length,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
