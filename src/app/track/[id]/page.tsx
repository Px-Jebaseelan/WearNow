"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, Package, Bike, MapPin, Star } from "lucide-react";
import styles from "./track.module.css";

export default function TrackPage() {
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2000);
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

      <header className={`${styles.header} glass`}>
        <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
          <Link href="/cart" className="icon-btn">
            <ArrowLeft size={24} />
          </Link>
          <h1 className={styles.title}>Order Tracking</h1>
        </div>
        
        <nav className="desktopNav">
          <Link href="/">Home</Link>
          <button onClick={() => showToast("Categories: Coming Soon")}>Categories</button>
          <Link href="/track/WN123456789" className="active">Orders</Link>
          <button onClick={() => showToast("Account: Coming Soon")}>Account</button>
        </nav>
        
        <div className={styles.helpText} onClick={() => showToast("Help center opened")}>Help</div>
      </header>

      <div className={styles.trackingCenter}>
        <div className={styles.statusBanner}>
          <div className={styles.statusInfo}>
            <div className={styles.statusLabel}>Estimated Delivery</div>
            <div className={styles.statusTime}>Today, 12:30 PM - 1:00 PM</div>
          </div>
          <div className={styles.statusImg}>
            <span style={{ fontSize: "36px" }}>🛵</span>
          </div>
        </div>

        <div className={styles.timelineCard}>
          <div className={styles.orderDetails}>
            <div className={styles.orderId}>Order ID: WN123456789</div>
            <div className={styles.orderDate}>Placed on 20 May, 11:30 AM</div>
          </div>

          <div className={styles.timeline}>
            {/* Step 1: Confirmed */}
            <div className={styles.timelineItem}>
              <div className={`${styles.iconWrapper} ${styles.active}`}>
                <Check size={18} strokeWidth={3} />
              </div>
              <div className={styles.stepDetails}>
                <div className={styles.stepTitle}>Order Confirmed</div>
                <div className={styles.stepSub}>Your order has been confirmed</div>
              </div>
              <div className={styles.stepTime}>11:30 AM</div>
            </div>

            {/* Step 2: Preparing (Current) */}
            <div className={styles.timelineItem}>
              <div className={`${styles.iconWrapper} ${styles.current}`}>
                <Package size={16} strokeWidth={3} />
              </div>
              <div className={styles.stepDetails}>
                <div className={styles.stepTitle}>Shop Preparing</div>
                <div className={styles.stepSub}>The store has accepted your order</div>
              </div>
              <div className={styles.stepTime}>11:35 AM</div>
            </div>

            {/* Step 3: Picked Up */}
            <div className={styles.timelineItem}>
              <div className={styles.iconWrapper}>
                <Bike size={16} />
              </div>
              <div className={styles.stepDetails}>
                <div className={`${styles.stepTitle} ${styles.inactive}`}>Picked Up</div>
                <div className={styles.stepSub}>Your order has been picked up</div>
              </div>
              <div className={styles.stepTime}>-</div>
            </div>

            {/* Step 4: Out For Delivery */}
            <div className={styles.timelineItem}>
              <div className={styles.iconWrapper}>
                <MapPin size={16} />
              </div>
              <div className={styles.stepDetails}>
                <div className={`${styles.stepTitle} ${styles.inactive}`}>Out For Delivery</div>
                <div className={styles.stepSub}>Rider is on the way</div>
              </div>
              <div className={styles.stepTime}>-</div>
            </div>

            {/* Step 5: Delivered */}
            <div className={styles.timelineItem}>
              <div className={styles.iconWrapper}>
                <Check size={16} />
              </div>
              <div className={styles.stepDetails}>
                <div className={`${styles.stepTitle} ${styles.inactive}`}>Delivered</div>
                <div className={styles.stepSub}>Enjoy your style!</div>
              </div>
              <div className={styles.stepTime}>-</div>
            </div>
          </div>
        </div>

        <div className={`${styles.bottomBar} glass-floating`}>
          <div className={styles.storeContact}>
            <img src="/images/img1.jpg" alt="Fashion Hub" className={styles.storeContactImg} />
            <div className={styles.storeContactInfo}>
              <div className={styles.storeContactName}>Fashion Hub</div>
              <div className={styles.storeContactRating}>
                <Star size={14} fill="#ff9800" color="#ff9800" />
                4.8
              </div>
            </div>
          </div>
          <div className={styles.actionButtons}>
            <button className={styles.btnOutline} onClick={() => showToast("Calling Fashion Hub...")}>Call Store</button>
            <button className={styles.btnOutline} onClick={() => showToast("Opening Messages...")}>Message</button>
          </div>
        </div>
      </div>
    </div>
  );
}
