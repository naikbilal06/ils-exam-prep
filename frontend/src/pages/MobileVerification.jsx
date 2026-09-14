import React, { useEffect, useRef, useState } from "react";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000";

/* =========================================================
   ILS RANKER LOGO
========================================================= */

function RankerLogo() {
  return (
    <svg
      width="74"
      height="74"
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M17 70V43C17 40.8 18.8 39 21 39H34V70H17Z"
        fill="#007050"
      />

      <path
        d="M42 70V29C42 26.8 43.8 25 46 25H59V70H42Z"
        fill="#007050"
      />

      <path
        d="M67 70V15C67 12.8 68.8 11 71 11H83C85.2 11 87 12.8 87 15V70H67Z"
        fill="#007050"
      />

      <path
        d="M17 57H34V70H17V57Z"
        fill="#062F3C"
      />

      <path
        d="M42 48H59V70H42V48Z"
        fill="#062F3C"
      />

      <path
        d="M67 36H87V70H67V36Z"
        fill="#062F3C"
      />

      <path
        d="M26 54L47 41L57 48L80 20"
        stroke="#007050"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M70 20H81V31"
        stroke="#007050"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* =========================================================
   GOOGLE ICON
========================================================= */

function GoogleIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M21.35 12.23c0-.78-.07-1.53-.23-2.23H12v4.22h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.7 2.91-4.2 2.91-7.38Z"
        fill="#4285F4"
      />

      <path
        d="M12 21.35c2.63 0 4.84-.87 6.45-2.36l-3.14-2.45c-.87.58-1.98.93-3.31.93-2.54 0-4.69-1.72-5.46-4.03H3.3v2.53A9.74 9.74 0 0 0 12 21.35Z"
        fill="#34A853"
      />

      <path
        d="M6.54 13.44A5.85 5.85 0 0 1 6.24 12c0-.5.1-.99.3-1.44V8.03H3.3A9.34 9.34 0 0 0 2.25 12c0 1.44.35 2.8 1.05 3.97l3.24-2.53Z"
        fill="#FBBC05"
      />

      <path
        d="M12 6.53c1.43 0 2.72.49 3.73 1.45l2.8-2.8C16.84 3.57 14.63 2.65 12 2.65a9.74 9.74 0 0 0-8.7 5.38l3.24 2.53C7.31 8.25 9.46 6.53 12 6.53Z"
        fill="#EA4335"
      />
    </svg>
  );
}

/* =========================================================
   APPLE ICON
========================================================= */

function AppleIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="#111111"
      aria-hidden="true"
    >
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.09.81 1.2-.24 2.35-.93 3.63-.84 1.54.12 2.7.73 3.46 1.84-3.18 1.9-2.43 6.08.49 7.25-.58 1.52-1.33 3.04-2.67 3.91ZM12.03 7.25C11.88 4.99 13.71 3.13 15.82 3c.29 2.61-2.36 4.55-3.79 4.25Z" />
    </svg>
  );
}

/* =========================================================
   SPINNER
========================================================= */

function Spinner() {
  return (
    <span
      style={{
        width: "12px",
        height: "12px",
        borderRadius: "50%",
        border: "1.6px solid #C4DED4",
        borderTopColor: "#007050",
        display: "inline-block",
        animation: "rankerSpin .7s linear infinite",
        flexShrink: 0,
      }}
    />
  );
}

/* =========================================================
   COMPONENT
========================================================= */

export default function MobileVerification({
  mobile,
  setMobile,
  verifying,
  onBack,
  onVerified,
}) {
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const otpRef = useRef(null);
  const requestedMobileRef = useRef("");
  const verifyingOtpRef = useRef(false);

  const cleanMobile = String(mobile || "")
    .replace(/\D/g, "")
    .slice(0, 10);

  const validMobile = cleanMobile.length === 10;

  /* =========================================================
     AUTO REQUEST OTP AFTER 10 DIGITS
  ========================================================= */

  useEffect(() => {
    if (!validMobile) {
      requestedMobileRef.current = "";
      return;
    }

    if (requestedMobileRef.current === cleanMobile) {
      return;
    }

    requestedMobileRef.current = cleanMobile;

    requestOtpAutomatically(cleanMobile);
  }, [cleanMobile, validMobile]);

  /* =========================================================
     REQUEST OTP
  ========================================================= */

  const requestOtpAutomatically = async (mobileNumber) => {
    if (
      loading ||
      !mobileNumber ||
      mobileNumber.length !== 10
    ) {
      return;
    }

    try {
      setLoading(true);
      setError("");
      setMessage("");

      const response = await fetch(
        `${API_URL}/api/auth/otp/request`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mobile: mobileNumber,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to send OTP."
        );
      }

      setOtpSent(true);

      setMessage(
        "Verification code sent successfully."
      );

      window.setTimeout(() => {
        otpRef.current?.focus();
      }, 150);
    } catch (err) {
      console.error("OTP request error:", err);

      setError(
        err.message || "Unable to send OTP."
      );

      requestedMobileRef.current = "";
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     AUTO VERIFY AFTER 6 DIGITS
  ========================================================= */

  const verifyOtpAutomatically = async (value) => {
    if (
      value.length !== 6 ||
      loading ||
      verifyingOtpRef.current
    ) {
      return;
    }

    try {
      verifyingOtpRef.current = true;

      setLoading(true);
      setError("");
      setMessage("Verifying your code...");

      const response = await fetch(
        `${API_URL}/api/auth/otp/verify`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mobile: cleanMobile,
            otp: value,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Invalid OTP."
        );
      }

      onVerified(data);
    } catch (err) {
      console.error(
        "OTP verification error:",
        err
      );

      setMessage("");
      setError(
        err.message || "Invalid OTP."
      );
      setOtp("");
    } finally {
      setLoading(false);
      verifyingOtpRef.current = false;
    }
  };

  /* =========================================================
     OTP CHANGE
  ========================================================= */

  const handleOtpChange = (event) => {
    const value = event.target.value
      .replace(/\D/g, "")
      .slice(0, 6);

    setOtp(value);

    if (error) {
      setError("");
    }

    if (value.length === 6) {
      verifyOtpAutomatically(value);
    }
  };

  /* =========================================================
     CHANGE NUMBER
  ========================================================= */

  const handleChangeNumber = () => {
    setOtp("");
    setOtpSent(false);
    setMessage("");
    setError("");
    setLoading(false);

    requestedMobileRef.current = "";
    verifyingOtpRef.current = false;

    setMobile("");
  };

  /* =========================================================
     MOBILE INPUT SCREEN
  ========================================================= */

  if (!otpSent) {
    return (
      <div style={styles.page}>
        <div style={styles.screen}>
          <div style={styles.topArea}>
            <RankerLogo />

            <div style={styles.welcome}>
              Welcome to
            </div>

            <div style={styles.brand}>
              ILS RANKER
            </div>

            <div style={styles.subtitle}>
              Your Exam Journey, Smarter with AI
            </div>
          </div>

          <div style={styles.mobileSection}>
            <div style={styles.mobileBox}>
              <span style={styles.country}>
                +91
              </span>

              <span style={styles.separator}>
                |
              </span>

              <input
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                autoFocus
                maxLength={10}
                value={cleanMobile}
                onChange={(e) =>
                  setMobile(
                    e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 10)
                  )
                }
                placeholder="Mobile Number"
                aria-label="Mobile Number"
                style={styles.mobileInput}
              />
            </div>

            <div style={styles.autoRequest}>
              {loading && validMobile && (
                <>
                  <Spinner />
                  <span>
                    Sending verification code...
                  </span>
                </>
              )}
            </div>

            <div style={styles.orRow}>
              <div style={styles.orLine} />

              <span style={styles.orText}>
                or
              </span>

              <div style={styles.orLine} />
            </div>

            <button
              type="button"
              style={styles.socialButton}
            >
              <GoogleIcon />
              <span>
                Continue with Google
              </span>
            </button>

            <button
              type="button"
              style={styles.socialButton}
            >
              <AppleIcon />
              <span>
                Continue with Apple
              </span>
            </button>
          </div>

          {error && (
            <div style={styles.errorMessage}>
              {error}
            </div>
          )}

          <div style={styles.terms}>
            By continuing, you agree to our
            <br />
            <span style={styles.termsGreen}>
              Terms of Service
            </span>
            {" & "}
            <span style={styles.termsGreen}>
              Privacy Policy
            </span>
            .
          </div>

          <div style={styles.bottomBrand}>
            ILS RANKER
          </div>
        </div>
      </div>
    );
  }

  /* =========================================================
     OTP SCREEN
  ========================================================= */

  return (
    <div style={styles.page}>
      <div style={styles.screen}>
        <div style={styles.topArea}>
          <RankerLogo />

          <div style={styles.welcome}>
            Welcome to
          </div>

          <div style={styles.brand}>
            ILS RANKER
          </div>

          <div style={styles.subtitle}>
            Your Exam Journey, Smarter with AI
          </div>
        </div>

        <div style={styles.otpSection}>
          <div style={styles.otpHeading}>
            Enter verification code
          </div>

          <div style={styles.otpDescription}>
            We sent a 6-digit verification code to
          </div>

          <div style={styles.phoneNumber}>
            +91 {cleanMobile}
          </div>

          <div style={styles.otpRow}>
            {[0, 1, 2, 3, 4, 5].map(
              (index) => (
                <div
                  key={index}
                  style={{
                    ...styles.otpBox,
                    ...(index < otp.length
                      ? styles.otpBoxFilled
                      : {}),
                    ...(loading &&
                    otp.length === 6
                      ? styles.otpBoxLoading
                      : {}),
                  }}
                >
                  {otp[index] || ""}
                </div>
              )
            )}

            <input
              ref={otpRef}
              type="tel"
              inputMode="numeric"
              autoComplete="one-time-code"
              autoFocus
              maxLength={6}
              value={otp}
              onChange={handleOtpChange}
              onClick={() =>
                otpRef.current?.focus()
              }
              aria-label="Enter OTP"
              style={styles.hiddenOtpInput}
            />
          </div>

          <div style={styles.statusArea}>
            {loading && otp.length === 6 && (
              <>
                <Spinner />
                <span>
                  Verifying your code...
                </span>
              </>
            )}

            {!loading && message && (
              <span
                style={styles.successInline}
              >
                {message}
              </span>
            )}

            {error && (
              <span
                style={styles.errorInline}
              >
                {error}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleChangeNumber}
            style={styles.changeNumber}
          >
            ← Change mobile number
          </button>

          <div style={styles.securityNote}>
            <span style={styles.securityDot} />
            Secure verification
          </div>
        </div>

        <div style={styles.termsOtp}>
          By continuing, you agree to our
          <br />
          <span style={styles.termsGreen}>
            Terms of Service
          </span>
          {" & "}
          <span style={styles.termsGreen}>
            Privacy Policy
          </span>
          .
        </div>

        <div style={styles.bottomBrand}>
          ILS RANKER
        </div>
      </div>

      <style>
        {`
          @keyframes rankerSpin {
            to {
              transform: rotate(360deg);
            }
          }

          input::placeholder {
            color: #9DAAA6;
            opacity: 1;
          }

          button:active {
            transform: scale(.99);
          }
        `}
      </style>
    </div>
  );
}

/* =========================================================
   STYLES
========================================================= */

const styles = {
  page: {
    width: "100%",
    minHeight: "100dvh",
    height: "100dvh",
    background: "#F4FBF7",
    display: "flex",
    justifyContent: "center",
    overflow: "hidden",
    fontFamily:
      "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    boxSizing: "border-box",
  },

  screen: {
    width: "100%",
    maxWidth: "430px",
    height: "100dvh",
    minHeight: 0,
    background:
      "linear-gradient(180deg, #F4FBF7 0%, #F8FCFA 48%, #FFFFFF 100%)",
    position: "relative",
    overflow: "hidden",
    boxSizing: "border-box",
    padding: "46px 28px 30px",
  },

  /* ================= TOP ================= */

  topArea: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    textAlign: "center",
  },

  welcome: {
    marginTop: "6px",
    color: "#082F3C",
    fontSize: "23px",
    lineHeight: 1.15,
    fontWeight: 800,
    letterSpacing: "-0.45px",
  },

  brand: {
    marginTop: "2px",
    color: "#007050",
    fontSize: "28px",
    lineHeight: 1.12,
    fontWeight: 850,
    letterSpacing: "-0.7px",
  },

  subtitle: {
    marginTop: "8px",
    color: "#647477",
    fontSize: "9px",
    lineHeight: 1.4,
    fontWeight: 500,
  },

  /* ================= MOBILE ================= */

  mobileSection: {
    width: "100%",
    marginTop: "56px",
  },

  mobileBox: {
    width: "100%",
    height: "53px",
    border: "1px solid #DCE9E3",
    borderRadius: "12px",
    background: "rgba(255,255,255,.82)",
    display: "flex",
    alignItems: "center",
    boxSizing: "border-box",
    boxShadow:
      "0 4px 16px rgba(8,47,60,.035)",
    backdropFilter: "blur(4px)",
  },

  country: {
    paddingLeft: "16px",
    color: "#123A46",
    fontSize: "11px",
    fontWeight: 800,
  },

  separator: {
    margin: "0 10px",
    color: "#B4BFBD",
    fontSize: "14px",
  },

  mobileInput: {
    flex: 1,
    minWidth: 0,
    height: "100%",
    border: "none",
    outline: "none",
    padding: "0 12px 0 3px",
    background: "transparent",
    color: "#213D44",
    fontSize: "11px",
    fontWeight: 500,
  },

  autoRequest: {
    height: "28px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "6px",
    color: "#007050",
    fontSize: "7px",
    fontWeight: 600,
  },

  orRow: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: "11px",
    margin: "5px 0 12px",
  },

  orLine: {
    flex: 1,
    height: "1px",
    background: "#DDE9E5",
  },

  orText: {
    color: "#A2AAA8",
    fontSize: "8px",
    fontWeight: 600,
  },

  socialButton: {
    width: "100%",
    height: "47px",
    marginTop: "8px",
    border: "1px solid #DFEAE5",
    borderRadius: "11px",
    background: "rgba(255,255,255,.78)",
    color: "#2B4147",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    fontSize: "9px",
    fontWeight: 650,
    cursor: "pointer",
    transition: "transform .12s ease",
  },

  /* ================= OTP ================= */

  otpSection: {
    width: "100%",
    marginTop: "59px",
    textAlign: "center",
  },

  otpHeading: {
    color: "#082F3C",
    fontSize: "16px",
    lineHeight: 1.2,
    fontWeight: 800,
  },

  otpDescription: {
    marginTop: "8px",
    color: "#8A9798",
    fontSize: "8px",
    lineHeight: 1.4,
  },

  phoneNumber: {
    marginTop: "3px",
    color: "#007050",
    fontSize: "9px",
    fontWeight: 700,
    letterSpacing: ".15px",
  },

  otpRow: {
    position: "relative",
    width: "100%",
    display: "grid",
    gridTemplateColumns:
      "repeat(6, minmax(0, 1fr))",
    gap: "7px",
    marginTop: "21px",
  },

  otpBox: {
    height: "54px",
    border: "1px solid #DDE8E4",
    borderRadius: "11px",
    background: "rgba(255,255,255,.9)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#173B45",
    fontSize: "18px",
    fontWeight: 800,
    transition: "all .15s ease",
    boxShadow:
      "0 2px 8px rgba(8,47,60,.025)",
    minWidth: 0,
  },

  otpBoxFilled: {
    border: "1.5px solid #007050",
    background: "#F2FAF6",
    color: "#082F3C",
    boxShadow:
      "0 4px 12px rgba(0,112,80,.08)",
  },

  otpBoxLoading: {
    border: "1.5px solid #007050",
  },

  hiddenOtpInput: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    opacity: 0,
    cursor: "text",
    zIndex: 2,
    border: "none",
    outline: "none",
  },

  statusArea: {
    minHeight: "30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    marginTop: "12px",
    fontSize: "7px",
    fontWeight: 600,
  },

  successInline: {
    color: "#007050",
  },

  errorInline: {
    color: "#D85B65",
  },

  changeNumber: {
    marginTop: "5px",
    border: "none",
    background: "transparent",
    color: "#007050",
    fontSize: "8px",
    fontWeight: 700,
    cursor: "pointer",
    padding: "5px",
  },

  securityNote: {
    marginTop: "18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "5px",
    color: "#98A3A1",
    fontSize: "7px",
  },

  securityDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "#007050",
    opacity: 0.8,
  },

  /* ================= TERMS ================= */

  terms: {
    position: "absolute",
    left: "28px",
    right: "28px",
    bottom: "72px",
    textAlign: "center",
    color: "#9AA5A3",
    fontSize: "7px",
    lineHeight: 1.7,
  },

  termsOtp: {
    position: "absolute",
    left: "28px",
    right: "28px",
    bottom: "72px",
    textAlign: "center",
    color: "#9AA5A3",
    fontSize: "7px",
    lineHeight: 1.7,
  },

  termsGreen: {
    color: "#007050",
    fontWeight: 700,
  },

  /* ================= ERROR ================= */

  errorMessage: {
    position: "absolute",
    left: "24px",
    right: "24px",
    bottom: "48px",
    textAlign: "center",
    color: "#D85B65",
    fontSize: "7px",
    fontWeight: 600,
  },

  /* ================= BRAND FOOTER ================= */

  bottomBrand: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: "18px",
    textAlign: "center",
    color: "#C8D7D2",
    fontSize: "6px",
    fontWeight: 700,
    letterSpacing: "1.4px",
  },
};