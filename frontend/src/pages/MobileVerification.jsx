import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Capacitor,
  CapacitorHttp,
} from "@capacitor/core";

import {
  GoogleSignIn,
} from "@capawesome/capacitor-google-sign-in";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:3000";

const GOOGLE_CLIENT_ID =
  "363554744342-stl3n7rcatuol3hutjpv2ck2f7ei69oq.apps.googleusercontent.com";

/* =========================================================
   ILS RANKER LOGO
========================================================= */

function RankerLogo() {
  return (
    <div
      style={{
        width: "68px",
        height: "68px",
        borderRadius: "22px",
        background:
          "linear-gradient(135deg, rgba(16, 231, 157, 0.18) 0%, rgba(0, 112, 80, 0.28) 100%)",
        border: "1px solid rgba(16, 231, 157, 0.4)",
        boxShadow:
          "0 12px 32px rgba(16, 231, 157, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.25)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "6px",
      }}
    >
      <svg
        width="42"
        height="42"
        viewBox="0 0 100 100"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M17 70V43C17 40.8 18.8 39 21 39H34V70H17Z"
          fill="#10E79D"
          opacity="0.85"
        />

        <path
          d="M42 70V29C42 26.8 43.8 25 46 25H59V70H42Z"
          fill="#10E79D"
        />

        <path
          d="M67 70V15C67 12.8 68.8 11 71 11H83C85.2 11 87 12.8 87 15V70H67Z"
          fill="#34D399"
        />

        <path
          d="M26 54L47 41L57 48L80 20"
          stroke="#FFFFFF"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <path
          d="M70 20H81V31"
          stroke="#FFFFFF"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
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
      fill="#FFFFFF"
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
        animation:
          "rankerSpin .7s linear infinite",
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
  const [otpSent, setOtpSent] =
    useState(false);

  const [otp, setOtp] =
    useState("");

  const [backendOtp, setBackendOtp] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [googleLoading, setGoogleLoading] =
    useState(false);

  const otpRef =
    useRef(null);

  const requestedMobileRef =
    useRef("");

  const verifyingOtpRef =
    useRef(false);

  const googleInitializedRef =
    useRef(false);

  const cleanMobile =
    String(mobile || "")
      .replace(/\D/g, "")
      .slice(0, 10);

  const validMobile =
    cleanMobile.length === 10;

  /* =========================================================
     GOOGLE INITIALIZATION
  ========================================================= */

  const initializeGoogle =
    async () => {
      if (
        googleInitializedRef.current
      ) {
        return;
      }

      const platform =
        Capacitor.getPlatform();

      if (platform === "web") {
        await GoogleSignIn.initialize({
          clientId:
            GOOGLE_CLIENT_ID,
          redirectUrl:
            window.location.origin,
        });
      } else {
        await GoogleSignIn.initialize({
          clientId:
            GOOGLE_CLIENT_ID,
        });
      }

      googleInitializedRef.current =
        true;
    };

  /* =========================================================
     COMPLETE GOOGLE LOGIN
  ========================================================= */

  const completeGoogleLogin =
    async (result) => {
      if (!result?.idToken) {
        throw new Error(
          "Google ID token was not received."
        );
      }

      const payload = {
        idToken:
          result.idToken,
      };

      let data;

      /* =====================================================
         WEB
      ===================================================== */

      if (
        Capacitor.getPlatform() ===
        "web"
      ) {
        const response =
          await fetch(
            `${API_URL}/api/auth/google`,
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body: JSON.stringify(
                payload
              ),
            }
          );

        data =
          await response.json();

        if (
          !response.ok ||
          !data?.success ||
          !data?.user
        ) {
          throw new Error(
            data?.message ||
              "Unable to complete Google login."
          );
        }
      }

      /* =====================================================
         ANDROID / NATIVE
      ===================================================== */

      else {
        const response =
          await CapacitorHttp.post({
            url:
              `${API_URL}/api/auth/google`,
            headers: {
              "Content-Type":
                "application/json",
            },
            data: payload,
          });

        console.log(
          "Native Google backend response:",
          response
        );

        if (
          response.status < 200 ||
          response.status >= 300
        ) {
          let backendMessage =
            `Google login failed (${response.status}).`;

          try {
            const responseData =
              typeof response.data ===
              "string"
                ? JSON.parse(
                    response.data
                  )
                : response.data;

            backendMessage =
              responseData?.message ||
              backendMessage;
          } catch {
            // Keep fallback message.
          }

          throw new Error(
            backendMessage
          );
        }

        data =
          typeof response.data ===
          "string"
            ? JSON.parse(
                response.data
              )
            : response.data;

        if (
          !data?.success ||
          !data?.user
        ) {
          throw new Error(
            data?.message ||
              "Unable to complete Google login."
          );
        }
      }

      console.log(
        "ILS Ranker Google user:",
        data.user
      );

      /*
       * Send authenticated user to App.jsx.
       *
       * Existing completed user:
       *     -> Dashboard
       *
       * New/incomplete user:
       *     -> Exam Selection
       */

      onVerified(data);
    };

  /* =========================================================
     GOOGLE REDIRECT - WEB ONLY
  ========================================================= */

  useEffect(() => {
    const handleGoogleRedirect =
      async () => {
        if (
          Capacitor.getPlatform() !==
          "web"
        ) {
          return;
        }

        const params =
          new URLSearchParams(
            window.location.search
          );

        const hasGoogleCallback =
          params.has("code") ||
          params.has("error");

        if (
          !hasGoogleCallback
        ) {
          return;
        }

        try {
          await initializeGoogle();

          const result =
            await GoogleSignIn.handleRedirectCallback();

          if (!result?.idToken) {
            throw new Error(
              "Google ID token was not received."
            );
          }

          await completeGoogleLogin(
            result
          );
        } catch (err) {
          console.error(
            "Google redirect error:",
            err
          );

          setError(
            err?.message ||
              "Google Sign-In failed."
          );
        }
      };

    handleGoogleRedirect();
  }, []);

  /* =========================================================
     INITIALIZE GOOGLE
  ========================================================= */

  useEffect(() => {
    initializeGoogle().catch(
      (err) => {
        console.error(
          "Google initialization error:",
          err
        );
      }
    );
  }, []);

  /* =========================================================
     GOOGLE SIGN IN
  ========================================================= */

  const handleGoogleSignIn =
    async () => {
      if (googleLoading) {
        return;
      }

      try {
        setGoogleLoading(true);
        setError("");
        setMessage("");

        await initializeGoogle();

        const result =
          await GoogleSignIn.signIn();

        console.log(
          "Google Sign-In result:",
          result
        );

        await completeGoogleLogin(
          result
        );
      } catch (err) {
        console.error(
          "Google Sign-In error:",
          err
        );

        const code =
          err?.code || "";

        if (
          code ===
          "SIGN_IN_CANCELED"
        ) {
          setError(
            "Google sign-in was cancelled."
          );
        } else if (
          code ===
          "NO_CREDENTIAL_AVAILABLE"
        ) {
          setError(
            "No Google account is available on this device."
          );
        } else if (
          code ===
          "PROVIDER_CONFIGURATION_ERROR"
        ) {
          setError(
            "Google Play Services is unavailable or needs an update."
          );
        } else {
          setError(
            err?.message ||
              "Google Sign-In failed."
          );
        }
      } finally {
        setGoogleLoading(false);
      }
    };

  /* =========================================================
     AUTO REQUEST OTP AFTER 10 DIGITS
  ========================================================= */

  useEffect(() => {
    if (!validMobile) {
      requestedMobileRef.current =
        "";
      return;
    }

    if (
      requestedMobileRef.current ===
      cleanMobile
    ) {
      return;
    }

    requestedMobileRef.current =
      cleanMobile;

    requestOtpAutomatically(
      cleanMobile
    );
  }, [
    cleanMobile,
    validMobile,
  ]);

  /* =========================================================
     REQUEST OTP
  ========================================================= */

  const requestOtpAutomatically =
    async (
      mobileNumber
    ) => {
      if (
        loading ||
        !mobileNumber ||
        mobileNumber.length !==
          10
      ) {
        return;
      }

      try {
        setLoading(true);
        setError("");
        setMessage("");

        const response =
          await fetch(
            `${API_URL}/api/auth/otp/request`,
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body: JSON.stringify({
                mobile:
                  mobileNumber,
              }),
            }
          );

        const data =
          await response.json();

        if (
          !response.ok ||
          !data.success
        ) {
          throw new Error(
            data.message ||
              "Unable to send OTP."
          );
        }

        setOtpSent(true);

        const receivedOtp = String(data?.devOtp || data?.otp || "");
        if (receivedOtp) {
          setBackendOtp(receivedOtp);
        }

        setMessage(
          data?.message || "Verification code ready."
        );

        window.setTimeout(
          () => {
            otpRef.current?.focus();
          },
          150
        );
      } catch (err) {
        console.error(
          "OTP request error:",
          err
        );

        setError(
          err?.message ||
            "Unable to send OTP."
        );

        requestedMobileRef.current =
          "";
      } finally {
        setLoading(false);
      }
    };

  /* =========================================================
     AUTO VERIFY AFTER 6 DIGITS
  ========================================================= */

  const verifyOtpAutomatically =
    async (
      value
    ) => {
      if (
        value.length !== 6 ||
        loading ||
        verifyingOtpRef.current
      ) {
        return;
      }

      try {
        verifyingOtpRef.current =
          true;

        setLoading(true);
        setError("");
        setMessage(
          "Verifying your code..."
        );

        const response =
          await fetch(
            `${API_URL}/api/auth/otp/verify`,
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body: JSON.stringify({
                mobile:
                  cleanMobile,
                otp: value,
              }),
            }
          );

        const data =
          await response.json();

        if (
          !response.ok ||
          !data.success
        ) {
          throw new Error(
            data.message ||
              "Invalid OTP."
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
          err?.message ||
            "Invalid OTP."
        );

        setOtp("");
      } finally {
        setLoading(false);
        verifyingOtpRef.current =
          false;
      }
    };

  /* =========================================================
     OTP CHANGE
  ========================================================= */

  const handleOtpChange =
    (event) => {
      const value =
        event.target.value
          .replace(/\D/g, "")
          .slice(0, 6);

      setOtp(value);

      if (error) {
        setError("");
      }

      if (value.length === 6) {
        verifyOtpAutomatically(
          value
        );
      }
    };

  /* =========================================================
     CHANGE NUMBER
  ========================================================= */

  const handleChangeNumber =
    () => {
      setOtp("");
      setOtpSent(false);
      setMessage("");
      setError("");
      setLoading(false);

      requestedMobileRef.current =
        "";

      verifyingOtpRef.current =
        false;

      setMobile("");
    };

  /* =========================================================
     MOBILE INPUT SCREEN
  ========================================================= */

  if (!otpSent) {
    return (
      <div style={styles.page}>
        <div style={styles.screen}>
          <div
            style={
              styles.topArea
            }
          >
            <RankerLogo />

            <div
              style={styles.welcome}
            >
              Welcome to
            </div>

            <div
              style={styles.brand}
            >
              ILS RANKER
            </div>

            <div
              style={styles.subtitle}
            >
              Your Exam Journey, Smarter with AI
            </div>
          </div>

          <div
            style={
              styles.mobileSection
            }
          >
            <div
              style={
                styles.mobileBox
              }
            >
              <span
                style={
                  styles.country
                }
              >
                +91
              </span>

              <span
                style={
                  styles.separator
                }
              >
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
                      .replace(
                        /\D/g,
                        ""
                      )
                      .slice(
                        0,
                        10
                      )
                  )
                }
                placeholder="Mobile Number"
                aria-label="Mobile Number"
                style={
                  styles.mobileInput
                }
              />
            </div>

            <div
              style={
                styles.autoRequest
              }
            >
              {loading &&
                validMobile && (
                  <>
                    <Spinner />

                    <span>
                      Sending verification code...
                    </span>
                  </>
                )}
            </div>

            <div
              style={styles.orRow}
            >
              <div
                style={
                  styles.orLine
                }
              />

              <span
                style={
                  styles.orText
                }
              >
                OR
              </span>

              <div
                style={
                  styles.orLine
                }
              />
            </div>

            <button
              type="button"
              onClick={
                handleGoogleSignIn
              }
              disabled={
                googleLoading
              }
              style={{
                ...styles.socialButton,
                opacity:
                  googleLoading
                    ? 0.7
                    : 1,
              }}
            >
              {googleLoading ? (
                <Spinner />
              ) : (
                <GoogleIcon />
              )}

              <span>
                {googleLoading
                  ? "Signing in..."
                  : "Continue with Google"}
              </span>
            </button>

            <button
              type="button"
              style={
                styles.socialButton
              }
            >
              <AppleIcon />

              <span>
                Continue with Apple
              </span>
            </button>
          </div>

          {error && (
            <div
              style={
                styles.errorMessage
              }
            >
              {error}
            </div>
          )}

          {message && (
            <div
              style={
                styles.successMessage
              }
            >
              {message}
            </div>
          )}

          <div
            style={styles.terms}
          >
            By continuing, you agree to our
            <br />

            <span
              style={
                styles.termsGreen
              }
            >
              Terms of Service
            </span>

            {" & "}

            <span
              style={
                styles.termsGreen
              }
            >
              Privacy Policy
            </span>
            .
          </div>

          <div
            style={
              styles.bottomBrand
            }
          >
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
     OTP SCREEN
  ========================================================= */

  return (
    <div style={styles.page}>
      <div style={styles.screen}>
        <div
          style={styles.topArea}
        >
          <RankerLogo />

          <div
            style={styles.welcome}
          >
            Welcome to
          </div>

          <div
            style={styles.brand}
          >
            ILS RANKER
          </div>

          <div
            style={styles.subtitle}
          >
            Your Exam Journey, Smarter with AI
          </div>
        </div>

        <div
          style={
            styles.otpSection
          }
        >
          <div
            style={
              styles.otpHeading
            }
          >
            Enter verification code
          </div>

          <div
            style={
              styles.otpDescription
            }
          >
            We sent a 6-digit verification code to
          </div>

          <div
            style={
              styles.phoneNumber
            }
          >
            +91 {cleanMobile}
          </div>

          {backendOtp && (
            <div
              style={{
                marginTop: "12px",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 12px",
                borderRadius: "14px",
                background: "rgba(16, 185, 129, 0.14)",
                border: "1px solid rgba(52, 211, 153, 0.35)",
              }}
            >
              <span style={{ fontSize: "11.5px", color: "rgba(226, 232, 240, 0.85)" }}>
                Backend OTP: <strong style={{ color: "#10E79D", letterSpacing: "1px" }}>{backendOtp}</strong>
              </span>
              <button
                type="button"
                onClick={() => handleOtpChange({ target: { value: backendOtp } })}
                style={{
                  border: 0,
                  borderRadius: "8px",
                  background: "#10E79D",
                  color: "#022019",
                  padding: "3px 10px",
                  fontSize: "10.5px",
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                Auto-Fill ⚡
              </button>
            </div>
          )}

          <div
            style={styles.otpRow}
          >
            {[0, 1, 2, 3, 4, 5].map(
              (index) => (
                <div
                  key={index}
                  style={{
                    ...styles.otpBox,
                    ...(index <
                    otp.length
                      ? styles.otpBoxFilled
                      : {}),
                    ...(loading &&
                    otp.length === 6
                      ? styles.otpBoxLoading
                      : {}),
                  }}
                >
                  {otp[index] ||
                    ""}
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
              onChange={
                handleOtpChange
              }
              onClick={() =>
                otpRef.current?.focus()
              }
              aria-label="Enter OTP"
              style={
                styles.hiddenOtpInput
              }
            />
          </div>

          <div
            style={
              styles.statusArea
            }
          >
            {loading &&
              otp.length === 6 && (
                <>
                  <Spinner />

                  <span>
                    Verifying your code...
                  </span>
                </>
              )}

            {!loading &&
              message && (
                <span
                  style={
                    styles.successInline
                  }
                >
                  {message}
                </span>
              )}

            {error && (
              <span
                style={
                  styles.errorInline
                }
              >
                {error}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => verifyOtpAutomatically(otp)}
            disabled={loading || otp.length !== 6}
            style={{
              ...styles.primaryButton,
              marginTop: "16px",
              opacity: otp.length === 6 ? 1 : 0.45,
              cursor: otp.length === 6 ? "pointer" : "not-allowed",
            }}
          >
            {loading ? (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                <Spinner />
                <span>Verifying code...</span>
              </div>
            ) : (
              <span>Verify & Continue →</span>
            )}
          </button>

          <button
            type="button"
            onClick={
              handleChangeNumber
            }
            style={
              styles.changeNumber
            }
          >
            ← Change mobile number
          </button>

          <div
            style={
              styles.securityNote
            }
          >
            <span
              style={
                styles.securityDot
              }
            />

            Secure verification
          </div>
        </div>

        <div
          style={styles.termsOtp}
        >
          By continuing, you agree to our
          <br />

          <span
            style={
              styles.termsGreen
            }
          >
            Terms of Service
          </span>

          {" & "}

          <span
            style={
              styles.termsGreen
            }
          >
            Privacy Policy
          </span>
          .
        </div>

        <div
          style={
            styles.bottomBrand
          }
        >
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
    minHeight: "100vh",
    minHeight: "100dvh",
    background:
      "radial-gradient(130% 110% at 50% 0%, #06312B 0%, #031D1B 45%, #010F0E 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "stretch",
    fontFamily:
      "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    boxSizing: "border-box",
    overflow: "hidden",
  },

  screen: {
    width: "100%",
    maxWidth: "430px",
    height: "100%",
    minHeight: "100dvh",
    maxHeight: "100dvh",
    margin: "0 auto",
    background: "transparent",
    boxSizing: "border-box",
    padding:
      "max(28px, env(safe-area-inset-top, 28px)) 24px max(24px, env(safe-area-inset-bottom, 24px))",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
    overflowY: "auto",
    overflowX: "hidden",
    WebkitOverflowScrolling: "touch",
  },

  topArea: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    textAlign: "center",
    flexShrink: 0,
    marginTop: "8px",
  },

  welcome: {
    marginTop: "12px",
    color: "#FFFFFF",
    fontSize: "clamp(20px, 5.5vw, 24px)",
    lineHeight: 1.2,
    fontWeight: 800,
    letterSpacing: "-0.4px",
  },

  brand: {
    marginTop: "2px",
    color: "#10E79D",
    fontSize: "clamp(26px, 7vw, 32px)",
    lineHeight: 1.15,
    fontWeight: 900,
    letterSpacing: "-0.6px",
  },

  subtitle: {
    marginTop: "8px",
    color: "rgba(226, 232, 240, 0.72)",
    fontSize: "12.5px",
    lineHeight: 1.45,
    fontWeight: 500,
    maxWidth: "320px",
  },

  mobileSection: {
    width: "100%",
    margin: "auto 0",
    flexShrink: 0,
  },

  mobileBox: {
    width: "100%",
    height: "54px",
    border: "1px solid rgba(255, 255, 255, 0.16)",
    borderRadius: "16px",
    background: "rgba(255, 255, 255, 0.05)",
    display: "flex",
    alignItems: "center",
    boxSizing: "border-box",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.35)",
    backdropFilter: "blur(14px)",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
  },

  country: {
    paddingLeft: "16px",
    color: "#10E79D",
    fontSize: "13.5px",
    fontWeight: 800,
    letterSpacing: "0.5px",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },

  separator: {
    margin: "0 10px",
    color: "rgba(255, 255, 255, 0.2)",
    fontSize: "16px",
  },

  mobileInput: {
    flex: 1,
    minWidth: 0,
    height: "100%",
    border: "none",
    outline: "none",
    padding: "0 14px 0 0",
    background: "transparent",
    color: "#FFFFFF",
    fontSize: "14.5px",
    fontWeight: 600,
    letterSpacing: "0.5px",
  },

  autoRequest: {
    height: "28px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "6px",
    color: "#34D399",
    fontSize: "12px",
    fontWeight: 600,
    marginTop: "6px",
  },

  primaryButton: {
    width: "100%",
    height: "50px",
    marginTop: "12px",
    border: "none",
    borderRadius: "15px",
    background: "linear-gradient(135deg, #10E79D 0%, #007050 100%)",
    color: "#010F0E",
    fontSize: "14.5px",
    fontWeight: 900,
    letterSpacing: "0.2px",
    cursor: "pointer",
    boxShadow: "0 8px 24px rgba(16, 231, 157, 0.35)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "transform 0.15s ease, box-shadow 0.15s ease, opacity 0.2s ease",
  },

  orRow: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    margin: "16px 0 14px",
  },

  orLine: {
    flex: 1,
    height: "1px",
    background: "rgba(255, 255, 255, 0.12)",
  },

  orText: {
    color: "rgba(226, 232, 240, 0.5)",
    fontSize: "11px",
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: "1px",
  },

  socialButton: {
    width: "100%",
    height: "48px",
    border: "1px solid rgba(255, 255, 255, 0.12)",
    borderRadius: "14px",
    background: "rgba(255, 255, 255, 0.05)",
    color: "#FFFFFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    fontSize: "14px",
    fontWeight: 700,
    cursor: "pointer",
    backdropFilter: "blur(10px)",
    transition: "all 0.2s ease",
    marginBottom: "10px",
  },

  errorMessage: {
    width: "100%",
    marginTop: "8px",
    textAlign: "center",
    color: "#F87171",
    fontSize: "11.5px",
    fontWeight: 600,
    lineHeight: 1.4,
    flexShrink: 0,
  },

  successMessage: {
    width: "100%",
    marginTop: "8px",
    textAlign: "center",
    color: "#34D399",
    fontSize: "11.5px",
    fontWeight: 600,
    lineHeight: 1.4,
    flexShrink: 0,
  },

  terms: {
    width: "100%",
    marginTop: "16px",
    textAlign: "center",
    color: "rgba(226, 232, 240, 0.5)",
    fontSize: "11px",
    lineHeight: 1.6,
    flexShrink: 0,
  },

  termsOtp: {
    width: "100%",
    marginTop: "18px",
    textAlign: "center",
    color: "rgba(226, 232, 240, 0.5)",
    fontSize: "11px",
    lineHeight: 1.6,
  },

  termsGreen: {
    color: "#10E79D",
    fontWeight: 600,
    textDecoration: "underline",
    cursor: "pointer",
  },

  bottomBrand: {
    width: "100%",
    marginTop: "12px",
    textAlign: "center",
    color: "rgba(226, 232, 240, 0.3)",
    fontSize: "10px",
    fontWeight: 700,
    letterSpacing: "1.4px",
    paddingBottom: "4px",
    flexShrink: 0,
  },

  otpSection: {
    width: "100%",
    margin: "auto 0",
    textAlign: "center",
    flexShrink: 0,
  },

  otpHeading: {
    color: "#FFFFFF",
    fontSize: "clamp(20px, 5.5vw, 24px)",
    lineHeight: 1.2,
    fontWeight: 900,
  },

  otpDescription: {
    marginTop: "8px",
    color: "rgba(226, 232, 240, 0.7)",
    fontSize: "12.5px",
    lineHeight: 1.45,
  },

  phoneNumber: {
    marginTop: "4px",
    color: "#10E79D",
    fontSize: "14px",
    fontWeight: 800,
    letterSpacing: "0.5px",
  },

  otpRow: {
    position: "relative",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
    gap: "8px",
    marginTop: "24px",
  },

  otpBox: {
    height: "54px",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    borderRadius: "14px",
    background: "rgba(255, 255, 255, 0.05)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#FFFFFF",
    fontSize: "20px",
    fontWeight: 800,
    transition: "all .18s ease",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.25)",
    backdropFilter: "blur(10px)",
    minWidth: 0,
  },

  otpBoxFilled: {
    border: "1.5px solid #10E79D",
    background: "rgba(16, 231, 157, 0.12)",
    color: "#FFFFFF",
    boxShadow: "0 0 16px rgba(16, 231, 157, 0.35)",
  },

  otpBoxLoading: {
    border: "1.5px solid #10E79D",
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
    minHeight: "34px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    marginTop: "14px",
    fontSize: "12px",
    fontWeight: 600,
  },

  successInline: {
    color: "#34D399",
  },

  errorInline: {
    color: "#F87171",
  },

  changeNumber: {
    marginTop: "10px",
    border: "none",
    background: "transparent",
    color: "#10E79D",
    fontSize: "12px",
    fontWeight: 700,
    cursor: "pointer",
    padding: "6px",
  },

  securityNote: {
    marginTop: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    color: "rgba(226, 232, 240, 0.6)",
    fontSize: "11px",
  },

  securityDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "#10E79D",
    boxShadow: "0 0 6px #10E79D",
  },
};