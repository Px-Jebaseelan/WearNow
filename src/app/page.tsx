"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Search, Filter, Bell, Home, Grid, Heart, User, Star, Flame, Sparkles } from "lucide-react";
import styles from "./page.module.css";

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchFocused, setSearchFocused] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2000);
  };

  const categories = [
    { name: "All", icon: <Grid size={28} /> },
    { name: "Trending", icon: <Flame size={28} /> },
    { name: "Men", icon: <Sparkles size={28} /> },
    { name: "Women", icon: <Heart size={28} /> },
    { name: "Kids", icon: <Star size={28} /> },
  ];

  return (
    <div className={styles.homeContainer}>
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

      {/* Header */}
      <header className={`${styles.homeHeader} glass`}>
        <div className="flex-col gap-2">
          <div className={styles.logo}>Wear<span>Now</span></div>
          <div className={styles.locationWrap} onClick={() => showToast("Location picker opened")}>
            <MapPin size={18} color="var(--primary)" />
            <span className={styles.locationText}>Chennai, Tamil Nadu</span>
            <span style={{ fontSize: "10px", color: "var(--text-muted)", marginLeft: "4px" }}>▼</span>
          </div>
        </div>
        
        {/* Desktop Nav hidden on mobile */}
        <nav className="desktopNav">
          <Link href="/" className="active">Home</Link>
          <button onClick={() => showToast("Categories: Coming Soon")}>Categories</button>
          <Link href="/track/WN123456789">Orders</Link>
          <button onClick={() => showToast("Account: Coming Soon")}>Account</button>
        </nav>

        <button className="icon-btn" onClick={() => showToast("Notifications opened")}>
          <Bell size={22} />
        </button>
      </header>

      {/* Search Bar */}
      <div className={styles.searchContainer}>
        <div className={`${styles.searchBox} ${searchFocused ? styles.focused : ''}`}>
          <Search size={20} color={searchFocused ? "var(--primary)" : "var(--text-muted)"} />
          <input 
            type="text" 
            placeholder="Search clothes, stores..." 
            className={styles.searchInput}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
        </div>
        <button className={styles.filterBtn} onClick={() => showToast("Filters opened")}>
          <Filter size={20} />
        </button>
      </div>

      {/* Hero Banner */}
      <div className={styles.heroBanner}>
        <div className={styles.heroTitle}>Match Your Vibe</div>
        <div className={styles.heroSub}>AI-powered outfit suggestions tailored just for you</div>
      </div>

      {/* Categories */}
      <div className={styles.sectionContainer}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTitle}>Categories</div>
          <button className={styles.viewAll} onClick={() => showToast("View all categories")}>View All</button>
        </div>
        <div className={styles.categoriesList}>
          {categories.map((cat) => (
            <div 
              key={cat.name} 
              className={`${styles.categoryItem} ${activeCategory === cat.name ? styles.active : ''}`}
              onClick={() => setActiveCategory(cat.name)}
            >
              <div className={styles.catIcon}>
                {cat.icon}
              </div>
              <div className={styles.catName}>{cat.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Stores */}
      <div className={styles.sectionContainer}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTitle}>Top Stores Near You</div>
          <button className={styles.viewAll} onClick={() => showToast("View all stores")}>View All</button>
        </div>
        <div className={styles.storesList}>
          <Link href="/shop/fashion-hub" className={`premium-card ${styles.storeCard}`}>
            <div className={styles.storeImgWrapper}>
              <img src="/images/img2.jpg" alt="Fashion Hub" className={styles.storeImg} />
            </div>
            <div className={styles.storeInfo}>
              <div className={styles.storeName}>Fashion Hub</div>
              <div className={styles.storeMeta}>
                <span>1.2 km away</span>
                <div className={styles.storeRating}>
                  <Star size={14} fill="#ff9800" color="#ff9800" />
                  4.8
                </div>
              </div>
            </div>
          </Link>

          <Link href="/shop/trend-setters" className={`premium-card ${styles.storeCard}`}>
            <div className={styles.storeImgWrapper}>
              <img src="/images/img3.jpg" alt="Trend Setters" className={styles.storeImg} />
            </div>
            <div className={styles.storeInfo}>
              <div className={styles.storeName}>Trend Setters</div>
              <div className={styles.storeMeta}>
                <span>2.5 km away</span>
                <div className={styles.storeRating}>
                  <Star size={14} fill="#ff9800" color="#ff9800" />
                  4.6
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Sticky Bottom Nav (Mobile Only) */}
      <nav className={`${styles.bottomNav} glass-floating`}>
        <Link href="/" className={`${styles.navItem} ${styles.active}`}>
          <Home size={24} />
          <span>Home</span>
        </Link>
        <button className={styles.navItem} onClick={() => showToast("Categories: Coming Soon")}>
          <Grid size={24} />
          <span>Category</span>
        </button>
        <Link href="/track/WN123456789" className={styles.navItem}>
          <Heart size={24} />
          <span>Orders</span>
        </Link>
        <button className={styles.navItem} onClick={() => showToast("Account: Coming Soon")}>
          <User size={24} />
          <span>Account</span>
        </button>
      </nav>
    </div>
  );
}
