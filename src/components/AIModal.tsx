"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { X, UploadCloud, Sparkles } from "lucide-react";
import styles from "./AIModal.module.css";

export default function AIModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<"upload" | "loading" | "results">("upload");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Prevent scrolling when modal is open
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setStep("loading");
      setTimeout(() => {
        setStep("results");
      }, 3000);
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.title}><Sparkles color="var(--primary)" /> AI Stylist</div>
          <button className={styles.closeBtn} onClick={onClose}><X size={24} /></button>
        </div>

        <div className={styles.content}>
          {step === "upload" && (
            <>
              <h3 style={{ marginBottom: '8px', fontWeight: 800 }}>Upload a Selfie</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '24px', fontSize: '0.9rem' }}>
                Let our AI scan your vibe and recommend the perfect outfit.
              </p>
              <input 
                type="file" 
                accept="image/*" 
                ref={fileInputRef} 
                style={{ display: 'none' }} 
                onChange={handleFileChange}
              />
              <div className={styles.uploadArea} onClick={handleUploadClick}>
                <UploadCloud size={48} className={styles.uploadIcon} />
                <div style={{ fontWeight: 700 }}>Tap to upload photo</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>JPEG, PNG up to 5MB</div>
              </div>
            </>
          )}

          {step === "loading" && (
            <div className={styles.loadingContainer}>
              <div className={styles.radar}></div>
              <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>Analyzing your vibe...</div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Scanning thousands of styles to find your perfect match.</p>
            </div>
          )}

          {step === "results" && (
            <>
              <h3 style={{ marginBottom: '8px', fontWeight: 800 }}>Your Perfect Matches</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '16px', fontSize: '0.9rem' }}>
                Based on your photo, here is what looks best on you!
              </p>
              
              <div className={styles.resultsList}>
                <Link href="/product/blue-denim-jacket" className={styles.resultCard}>
                  <img src="/images/img5.jpg" alt="Match 1" className={styles.resultImg} />
                  <div className={styles.resultInfo}>
                    <div className={styles.matchBadge}>98% Match</div>
                    <div style={{ fontWeight: 800, marginBottom: '4px' }}>Blue Denim Jacket</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>₹1,499</div>
                  </div>
                </Link>

                <Link href="/product/black-tshirt" className={styles.resultCard}>
                  <img src="/images/img3.jpg" alt="Match 2" className={styles.resultImg} />
                  <div className={styles.resultInfo}>
                    <div className={styles.matchBadge} style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>95% Match</div>
                    <div style={{ fontWeight: 800, marginBottom: '4px' }}>Classic Black T-Shirt</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>₹499</div>
                  </div>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
