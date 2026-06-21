"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, Tag, ChevronRight, Trash2, ShoppingBag } from "lucide-react";
import styles from "./cart.module.css";

export default function CartPage() {
  const [items, setItems] = useState([
    {
      id: "1",
      name: "Blue Denim Jacket",
      meta: "Size: M • Blue",
      price: 1499,
      qty: 1,
      image: "/images/img5.jpg"
    },
    {
      id: "2",
      name: "White Sneakers",
      meta: "Size: 9 • White",
      price: 999,
      qty: 1,
      image: "/images/img1.jpg"
    }
  ]);

  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2000);
  };

  const updateQty = (id: string, delta: number) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.qty + delta);
        return { ...item, qty: newQty };
      }
      return item;
    }));
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
    showToast("Item removed");
  };

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const deliveryFee = items.length > 0 ? 49 : 0;
  const platformFee = items.length > 0 ? 25 : 0;
  const discount = items.length > 0 ? 150 : 0;
  const total = subtotal + deliveryFee + platformFee - discount;

  return (
    <div className={styles.container}>
      {/* Toast Notification */}
      {toastMessage && (
        <div style={{
          position: 'fixed', top: '24px', left: '50%', transform: 'translateX(-50%)',
          background: 'var(--text-dark)', color: 'white', padding: '12px 24px',
          borderRadius: '32px', zIndex: 1000, fontWeight: 600, boxShadow: 'var(--shadow-md)'
        }}>
          {toastMessage}
        </div>
      )}

      <header className={`${styles.header} glass`}>
        <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
          <Link href="/product/blue-denim-jacket" className="icon-btn">
            <ArrowLeft size={24} />
          </Link>
          <h1 className={styles.title}>My Cart</h1>
        </div>
        
        <nav className="desktopNav">
          <Link href="/">Home</Link>
          <button onClick={() => showToast("Categories: Coming Soon")}>Categories</button>
          <Link href="/track/WN123456789">Orders</Link>
          <button onClick={() => showToast("Account: Coming Soon")}>Account</button>
        </nav>
      </header>

      {items.length === 0 ? (
        <div className={styles.emptyCart}>
          <ShoppingBag size={64} color="var(--text-muted)" />
          <div className={styles.emptyCartTitle}>Your cart is empty</div>
          <p>Looks like you haven't added anything to your cart yet.</p>
          <Link href="/" className="btnPrimary" style={{ padding: '12px 24px', marginTop: '16px', borderRadius: '16px', background: 'var(--primary)', color: 'white', fontWeight: 700 }}>
            Start Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className={styles.successBanner}>
            <Check size={20} strokeWidth={3} />
            Yay! You saved ₹{discount} on this order
          </div>

          <div className={styles.desktopGrid}>
            <div>
              <div className={styles.cartList}>
                {items.map(item => (
                  <div key={item.id} className={`premium-card ${styles.cartItem}`}>
                    <img src={item.image} alt={item.name} className={styles.itemImg} />
                    <div className={styles.itemDetails}>
                      <div>
                        <div className={styles.itemName}>{item.name}</div>
                        <div className={styles.itemMeta}>{item.meta}</div>
                        <div className={styles.itemPrice}>₹{item.price.toLocaleString()}</div>
                      </div>
                      <div className={styles.itemActions}>
                        <div className={styles.qtyCtrl}>
                          <button className={styles.qtyBtn} onClick={() => updateQty(item.id, -1)}>-</button>
                          <span className={styles.qtyNum}>{item.qty}</span>
                          <button className={styles.qtyBtn} onClick={() => updateQty(item.id, 1)}>+</button>
                        </div>
                        <button className={styles.deleteBtn} onClick={() => removeItem(item.id)}>
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.couponRow} onClick={() => showToast("Available coupons opened")}>
                <span><Tag size={20} color="var(--primary)" /> Apply Coupon</span>
                <ChevronRight size={24} color="var(--text-muted)" />
              </div>
            </div>

            <div>
              <div className={styles.billDetails}>
                <div className={styles.billHeader}>Bill Summary</div>
                <div className={styles.billRow}>
                  <span>Item Total</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className={styles.billRow}>
                  <span>Delivery Fee</span>
                  <span>₹{deliveryFee}</span>
                </div>
                <div className={styles.billRow}>
                  <span>Platform Fee</span>
                  <span>₹{platformFee}</span>
                </div>
                <div className={`${styles.billRow} ${styles.discount}`}>
                  <span>Discount</span>
                  <span>- ₹{discount}</span>
                </div>
                <div className={styles.billTotal}>
                  <span>Grand Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>

              <div className={`${styles.bottomBar} glass-floating`}>
                <Link href="/track/WN123456789" className={styles.placeOrderBtn}>
                  Place Order • ₹{total.toLocaleString()}
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
