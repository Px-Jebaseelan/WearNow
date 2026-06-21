"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Heart, Star, ShoppingBag, ChevronRight } from "lucide-react";
import styles from "./shop.module.css";

export default function ShopPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});
  const [cartCount, setCartCount] = useState(2); // Starting with 2 to show the banner
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2000);
  };

  const toggleAdd = (e: React.MouseEvent, id: string) => {
    e.preventDefault(); // prevent link navigation
    setAddedItems(prev => {
      const isAdded = !prev[id];
      setCartCount(c => isAdded ? c + 1 : c - 1);
      return { ...prev, [id]: isAdded };
    });
  };

  const filters = ["All", "Men", "Women", "Accessories"];

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
          <Link href="/" className="icon-btn">
            <ArrowLeft size={24} />
          </Link>
          <h1 className={styles.title}>Fashion Hub</h1>
        </div>
        
        {/* Desktop Nav hidden on mobile */}
        <nav className="desktopNav">
          <Link href="/">Home</Link>
          <button onClick={() => showToast("Categories: Coming Soon")}>Categories</button>
          <Link href="/track/WN123456789">Orders</Link>
          <button onClick={() => showToast("Account: Coming Soon")}>Account</button>
        </nav>

        <button className="icon-btn" onClick={() => showToast("Saved to Favorites!")}>
          <Heart size={22} color="var(--primary)" />
        </button>
      </header>

      <div className={styles.storeBanner}>
        <img src="/images/img2.jpg" alt="Fashion Hub Banner" className={styles.bannerImg} />
        <div className={styles.bannerOverlay}>
          <div className={styles.bannerInfo}>
            <div className={styles.bannerName}>Fashion Hub</div>
            <div className={styles.bannerMeta}>
              <span>1.2 km away</span>
              <div className={styles.bannerRating}>
                <Star size={14} fill="#ff9800" color="#ff9800" />
                4.8
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.catList}>
          {filters.map((filter) => (
            <button 
              key={filter} 
              className={`${styles.catPill} ${activeFilter === filter ? styles.active : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.productSection}>
        <h2 className={styles.sectionTitle}>Popular Products</h2>
        <div className={styles.productList}>
          <Link href="/product/blue-denim-jacket" className={`premium-card ${styles.productCard}`}>
            <img src="/images/img5.jpg" alt="Blue Denim Jacket" className={styles.productImg} />
            <div className={styles.productInfo}>
              <div className={styles.productName}>Blue Denim Jacket</div>
              <div className={styles.productPrice}>₹1,499</div>
              <button 
                className={`${styles.addBtn} ${addedItems['p1'] ? styles.added : ''}`}
                onClick={(e) => toggleAdd(e, 'p1')}
              >
                {addedItems['p1'] ? 'Added ✓' : 'Add +'}
              </button>
            </div>
          </Link>

          <Link href="/product/white-sneakers" className={`premium-card ${styles.productCard}`}>
            <img src="/images/img1.jpg" alt="White Sneakers" className={styles.productImg} />
            <div className={styles.productInfo}>
              <div className={styles.productName}>White Sneakers</div>
              <div className={styles.productPrice}>₹999</div>
              <button 
                className={`${styles.addBtn} ${addedItems['p2'] ? styles.added : ''}`}
                onClick={(e) => toggleAdd(e, 'p2')}
              >
                {addedItems['p2'] ? 'Added ✓' : 'Add +'}
              </button>
            </div>
          </Link>

          <Link href="/product/black-tshirt" className={`premium-card ${styles.productCard}`}>
            <img src="/images/img3.jpg" alt="Black T-Shirt" className={styles.productImg} />
            <div className={styles.productInfo}>
              <div className={styles.productName}>Classic Black T-Shirt</div>
              <div className={styles.productPrice}>₹499</div>
              <button 
                className={`${styles.addBtn} ${addedItems['p3'] ? styles.added : ''}`}
                onClick={(e) => toggleAdd(e, 'p3')}
              >
                {addedItems['p3'] ? 'Added ✓' : 'Add +'}
              </button>
            </div>
          </Link>
        </div>
      </div>

      {cartCount > 0 && (
        <div className={`${styles.cartBanner} glass-floating`}>
          <Link href="/cart" className={styles.cartBtn}>
            <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
              <ShoppingBag size={20} />
              <span>{cartCount} items | ₹2,498</span>
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
              View Cart <ChevronRight size={20} />
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}
