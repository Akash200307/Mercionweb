import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { startRazorpayCheckout } from '../lib/razorpay';
import './CartDock.css';

export default function CartDock() {
  const {
    selected,
    items,
    addSelectedToCart,
    removeFromCart,
    clearCart,
    clearSelection,
    totalPaise,
  } = useCart();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState(null);

  const inCart = items[0] || null;
  const selectedAlreadyInCart =
    selected && inCart && selected.key === inCart.key && selected.tab === inCart.tab
      && selected.billingCycle === inCart.billingCycle;

  if (!selected && !inCart) return null;

  const format = (rupees) => `₹${Number(rupees).toLocaleString('en-IN')}`;

  const handleAdd = () => {
    const ok = addSelectedToCart();
    if (ok) setMessage({ type: 'success', text: 'Plan added to cart.' });
  };

  const handleCheckout = async () => {
    if (!inCart) {
      setMessage({ type: 'error', text: 'Add a plan to cart before checkout.' });
      return;
    }
    setBusy(true);
    setMessage(null);
    try {
      const result = await startRazorpayCheckout({
        amountPaise: inCart.amountPaise || totalPaise,
        planName: inCart.name,
        billingCycle: inCart.billingCycle,
      });
      setMessage({
        type: 'success',
        text: `Payment verified. ID: ${result.payment_id || result.razorpay_payment_id}`,
      });
      clearCart();
      clearSelection();
    } catch (err) {
      const text = err?.message || 'Payment failed';
      if (String(text).toLowerCase().includes('cancelled')) {
        setMessage({ type: 'info', text: 'Checkout closed — no charge was made.' });
      } else {
        setMessage({ type: 'error', text });
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="cart-dock" role="region" aria-label="Cart">
      <div className="cart-dock-inner">
        <div className="cart-dock-steps">
          <span className={selected ? 'done' : ''}>1. Select</span>
          <span className={inCart ? 'done' : ''}>2. Cart</span>
          <span>3. Checkout</span>
        </div>

        <div className="cart-dock-body">
          {selected && (
            <div className="cart-dock-block">
              <div className="cart-dock-label">Selected</div>
              <div className="cart-dock-plan">
                {selected.name}
                <span>
                  {format(selected.chargeRupees)} · {selected.billingCycle}
                </span>
              </div>
              <button
                type="button"
                className="cart-dock-btn secondary"
                disabled={selectedAlreadyInCart}
                onClick={handleAdd}
              >
                {selectedAlreadyInCart ? 'In cart' : 'Add to Cart'}
              </button>
            </div>
          )}

          {inCart && (
            <div className="cart-dock-block">
              <div className="cart-dock-label">Cart</div>
              <div className="cart-dock-plan">
                {inCart.name}
                <span>
                  {format(inCart.chargeRupees)} · {inCart.billingCycle}
                </span>
              </div>
              <div className="cart-dock-actions">
                <button
                  type="button"
                  className="cart-dock-btn ghost"
                  onClick={() => removeFromCart(inCart.id)}
                  disabled={busy}
                >
                  Remove
                </button>
                <button
                  type="button"
                  className="cart-dock-btn primary"
                  onClick={handleCheckout}
                  disabled={busy}
                >
                  {busy ? 'Opening…' : 'Checkout'}
                </button>
              </div>
            </div>
          )}
        </div>

        {message && (
          <div className={`cart-dock-msg cart-dock-msg--${message.type}`}>
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
}
