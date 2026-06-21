"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Heart, Star, ShoppingCart, Check } from "lucide-react";
import styles from "./product.module.css";

export default function ProductPage() {
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("#215E95");
  const [isAdded, setIsAdded] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2000);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsAdded(true);
    showToast("Added to Cart!");
    setTimeout(() => setIsAdded(false), 3000);
  };

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

      <header className={styles.header}>
        <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
          <Link href="/shop/fashion-hub" className={styles.headerBtn}>
            <ArrowLeft size={24} />
          </Link>
        </div>
        
        {/* Desktop Nav hidden on mobile */}
        <nav className="desktopNav">
          <Link href="/">Home</Link>
          <button onClick={() => showToast("Categories: Coming Soon")}>Categories</button>
          <Link href="/track/WN123456789">Orders</Link>
          <button onClick={() => showToast("Account: Coming Soon")}>Account</button>
        </nav>

        <button className={styles.headerBtn} onClick={() => showToast("Saved to Favorites!")}>
          <Heart size={24} color="var(--text-dark)" />
        </button>
      </header>

      <div className={styles.desktopGrid}>
        <div className={styles.imageCarousel}>
          <img src="/images/img5.jpg" alt="Blue Denim Jacket" />
          <div className={styles.carouselDots}>
            <div className={`${styles.dot} ${styles.active}`}></div>
            <div className={styles.dot} onClick={() => showToast("Swiped to image 2")}></div>
            <div className={styles.dot} onClick={() => showToast("Swiped to image 3")}></div>
          </div>
        </div>

        <div className={styles.details}>
          <h1 className={styles.title}>Blue Denim Jacket</h1>
          <div className={styles.price}>₹1,499</div>
          <div className={styles.rating}>
            <Star size={18} fill="#ff9800" color="#ff9800" />
            4.7 <span>(256 reviews)</span>
          </div>

          <div className={styles.sectionTitle}>Select Size</div>
          <div className={styles.sizeOptions}>
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <button 
                key={size} 
                className={`${styles.sizeBtn} ${selectedSize === size ? styles.active : ""}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>

          <div className={styles.sectionTitle}>Select Color</div>
          <div className={styles.colorOptions}>
            {["#215E95", "#2C2C2C", "#D1D5DB"].map((color) => (
              <button 
                key={color}
                className={`${styles.colorBtn} ${selectedColor === color ? styles.active : ""}`}
                onClick={() => setSelectedColor(color)}
              >
                <div className={styles.colorInner} style={{ background: color }}></div>
              </button>
            ))}
          </div>

          <div className={styles.deliveryBadge}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/><path d="M5 17H3v-6l2-5h9v11h-2M14 11h6l2 3v3h-2M14 17h-1"/></svg>
            Delivery in 20-30 min
          </div>
          
          <div className={`${styles.bottomBar} glass-floating`}>
            <button 
              className={`${styles.btnOutline} ${isAdded ? styles.added : ''}`}
              onClick={handleAddToCart}
            >
              {isAdded ? <Check size={20} /> : <ShoppingCart size={20} />}
              {isAdded ? "Added" : "Add to Cart"}
            </button>
            <Link href="/cart" className={styles.btnPrimary}>
              Buy Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
