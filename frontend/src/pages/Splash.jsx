import React, { useEffect } from "react";

export default function Splash({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div style={styles.page}>
      <div style={styles.screen}>
        {/* ================================================
            BACKGROUND SKY
        ================================================= */}

        <div style={styles.sky} />

        <div style={styles.skyGlowLeft} />
        <div style={styles.skyGlowRight} />

        {/* ================================================
            LOGO
        ================================================= */}

        <div style={styles.logoWrap}>
          <svg
            width="92"
            height="92"
            viewBox="0 0 100 100"
            fill="none"
          >
            <defs>
              <linearGradient
                id="rankGreen"
                x1="0"
                y1="0"
                x2="1"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#069C71"
                />
                <stop
                  offset="100%"
                  stopColor="#007050"
                />
              </linearGradient>

              <linearGradient
                id="rankDark"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#123F4B"
                />
                <stop
                  offset="100%"
                  stopColor="#072F3B"
                />
              </linearGradient>
            </defs>

            {/* BAR 1 */}
            <path
              d="M15 73V45C15 42.2 17.2 40 20 40H34V73H15Z"
              fill="url(#rankGreen)"
            />

            {/* BAR 2 */}
            <path
              d="M40 73V30C40 27.2 42.2 25 45 25H59V73H40Z"
              fill="url(#rankGreen)"
            />

            {/* BAR 3 */}
            <path
              d="M65 73V15C65 12.2 67.2 10 70 10H83C85.8 10 88 12.2 88 15V73H65Z"
              fill="url(#rankGreen)"
            />

            {/* DARK LOWER AREAS */}
            <path
              d="M15 57H34V73H15V57Z"
              fill="url(#rankDark)"
            />

            <path
              d="M40 48H59V73H40V48Z"
              fill="url(#rankDark)"
            />

            <path
              d="M65 36H88V73H65V36Z"
              fill="url(#rankDark)"
            />

            {/* GRAPH ARROW */}
            <path
              d="M24 55L46 41L57 48L80 20"
              stroke="#079B70"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* ARROW HEAD */}
            <path
              d="M69 20H81V32"
              stroke="#079B70"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* ================================================
            BRAND
        ================================================= */}

        <div style={styles.brand}>
          <span style={styles.brandGreen}>
            ILS
          </span>{" "}
          <span style={styles.brandDark}>
            RANKER
          </span>
        </div>

        {/* ================================================
            SMALL BRAND TAG
        ================================================= */}

        <div style={styles.brandTag}>
          KNOW YOUR POTENTIAL
        </div>

        <div style={styles.smallLine} />

        {/* ================================================
            MAIN TAGLINE
        ================================================= */}

        <div style={styles.tagline}>
          <div>Know your Rank.</div>
          <div>Explore your Options.</div>
          <div>Make your Decision.</div>
        </div>

        {/* ================================================
            RIGHT SIDE DECORATIVE TEXT
        ================================================= */}

        <div style={styles.rightMessage}>
          <span>A</span>
          <span>BRIGHTER</span>
          <span>YOU</span>

          <div style={styles.rightLine} />
        </div>

        {/* ================================================
            MOUNTAIN + LANDSCAPE
        ================================================= */}

        <div style={styles.scene}>
          <svg
            viewBox="0 0 430 420"
            preserveAspectRatio="none"
            style={styles.sceneSvg}
          >
            <defs>
              {/* SKY */}
              <linearGradient
                id="sceneSky"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#DDF1F8"
                />

                <stop
                  offset="45%"
                  stopColor="#D9EBEC"
                />

                <stop
                  offset="100%"
                  stopColor="#F5EFE2"
                />
              </linearGradient>

              {/* DISTANT MOUNTAINS */}
              <linearGradient
                id="distantMountains"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#E0E9EB"
                />

                <stop
                  offset="100%"
                  stopColor="#AFC3C8"
                />
              </linearGradient>

              {/* MAIN MOUNTAINS */}
              <linearGradient
                id="mainMountains"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#8CAEB4"
                />

                <stop
                  offset="100%"
                  stopColor="#5D8387"
                />
              </linearGradient>

              {/* FOREST */}
              <linearGradient
                id="forestGreen"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#5B8F79"
                />

                <stop
                  offset="100%"
                  stopColor="#315F4D"
                />
              </linearGradient>

              {/* GROUND */}
              <linearGradient
                id="groundGreen"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#7EAB91"
                />

                <stop
                  offset="100%"
                  stopColor="#456F5A"
                />
              </linearGradient>

              {/* ROAD */}
              <linearGradient
                id="road"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#E7ECE9"
                />

                <stop
                  offset="100%"
                  stopColor="#AEBFB8"
                />
              </linearGradient>
            </defs>

            {/* SKY */}
            <rect
              width="430"
              height="420"
              fill="url(#sceneSky)"
            />

            {/* SUN */}
            <circle
              cx="370"
              cy="113"
              r="50"
              fill="#FFF7DF"
              opacity=".52"
            />

            <circle
              cx="370"
              cy="113"
              r="28"
              fill="#FFF8E5"
              opacity=".65"
            />

            {/* CLOUDS */}
            <g
              fill="#FFFFFF"
              opacity=".55"
            >
              <ellipse
                cx="70"
                cy="82"
                rx="48"
                ry="15"
              />
              <ellipse
                cx="98"
                cy="78"
                rx="28"
                ry="18"
              />
              <ellipse
                cx="330"
                cy="145"
                rx="55"
                ry="15"
              />
              <ellipse
                cx="363"
                cy="140"
                rx="30"
                ry="17"
              />
            </g>

            {/* DISTANT MOUNTAINS */}
            <path
              d="
                M0 268
                L43 223
                L79 246
                L123 176
                L160 224
                L206 125
                L255 191
                L302 146
                L346 202
                L386 165
                L430 215
                L430 420
                L0 420Z
              "
              fill="url(#distantMountains)"
            />

            {/* SNOW */}
            <path
              d="
                M123 176
                L147 208
                L137 203
                L127 217
                L117 208
                L106 218
                Z
              "
              fill="#FFFFFF"
              opacity=".94"
            />

            <path
              d="
                M206 125
                L242 173
                L229 166
                L217 182
                L205 170
                L190 181
                Z
              "
              fill="#FFFFFF"
            />

            <path
              d="
                M302 146
                L329 181
                L317 175
                L309 187
                L299 179
                L287 188
                Z
              "
              fill="#FFFFFF"
              opacity=".9"
            />

            {/* MOUNTAIN SHADOW */}
            <path
              d="
                M206 125
                L206 286
                L255 191
                L307 247
                L265 217
                Z
              "
              fill="#829FA6"
              opacity=".38"
            />

            {/* MAIN MOUNTAINS */}
            <path
              d="
                M0 302
                L57 247
                L107 282
                L151 218
                L197 283
                L239 166
                L291 261
                L337 207
                L377 272
                L430 221
                L430 420
                L0 420Z
              "
              fill="url(#mainMountains)"
            />

            {/* MOUNTAIN HIGHLIGHTS */}
            <path
              d="
                M239 166
                L291 261
                L251 232
                L225 279
                Z
              "
              fill="#A9C1C0"
              opacity=".42"
            />

            <path
              d="
                M151 218
                L197 283
                L164 261
                L137 294
                Z
              "
              fill="#A2BCB9"
              opacity=".3"
            />

            {/* FOREST */}
            <path
              d="
                M0 303
                C55 275 111 297 165 291
                C235 281 329 272 430 301
                L430 420
                L0 420Z
              "
              fill="url(#forestGreen)"
            />

            {/* DISTANT TREES */}
            <g opacity=".75">
              <path
                d="M20 309L36 264L52 309H20Z"
                fill="#477865"
              />

              <path
                d="M51 312L65 274L79 312H51Z"
                fill="#538773"
              />

              <path
                d="M353 311L369 267L385 311H353Z"
                fill="#4B7B67"
              />

              <path
                d="M384 315L399 274L414 315H384Z"
                fill="#406F5E"
              />
            </g>

            {/* ROAD */}
            <path
              d="
                M171 420
                C199 379 216 331 222 284
                C224 267 232 267 235 284
                C242 331 259 379 289 420
                Z
              "
              fill="url(#road)"
            />

            {/* ROAD LIGHT */}
            <path
              d="
                M181 420
                C204 382 216 340 223 289
                C219 341 206 389 198 420Z
              "
              fill="#F5F8F6"
              opacity=".65"
            />

            {/* FOREGROUND LAND */}
            <path
              d="
                M0 347
                C65 329 120 347 175 339
                C244 328 337 329 430 344
                L430 420
                L0 420Z
              "
              fill="url(#groundGreen)"
            />
          </svg>

          {/* ==============================================
              LEFT SIGN BOARD
          ============================================ */}

          <div style={styles.sign}>
            <div style={styles.signPole} />

            <div
              style={{
                ...styles.signBoard,
                top: "30px",
              }}
            >
              HIGHER
              <br />
              EDUCATION
            </div>

            <div
              style={{
                ...styles.signBoard,
                top: "76px",
              }}
            >
              BETTER
              <br />
              OPPORTUNITIES
            </div>

            <div
              style={{
                ...styles.signBoard,
                top: "122px",
              }}
            >
              BRIGHTER
              <br />
              TOMORROW
            </div>
          </div>

          {/* ==============================================
              STUDENT
          ============================================ */}

          <div style={styles.student}>
            <div style={styles.studentHead} />
            <div style={styles.studentHair} />

            <div style={styles.studentNeck} />

            <div style={styles.studentBody}>
              <div
                style={styles.jacketLine}
              />
            </div>

            <div style={styles.backpack}>
              <div style={styles.backpackHandle} />
              <div style={styles.backpackTop} />
              <div style={styles.backpackMiddle} />
              <div style={styles.backpackPocket} />
              <div style={styles.backpackZip} />
            </div>

            <div style={styles.leftStrap} />
            <div style={styles.rightStrap} />

            <div style={styles.studentArmLeft} />
            <div style={styles.studentArmRight} />

            <div style={styles.handLeft} />
            <div style={styles.handRight} />

            <div style={styles.pantsLeft} />
            <div style={styles.pantsRight} />

            <div style={styles.shoeLeft} />
            <div style={styles.shoeRight} />
          </div>

          {/* ==============================================
              BOTTOM TEXT
          ============================================ */}

          <div style={styles.bottomMessage}>
            FOR A BRIGHTER TOMORROW
          </div>

          <div style={styles.bottomLine} />
        </div>
      </div>

      <style>
        {`
          @keyframes splashFade {
            from {
              opacity: 0;
              transform: translateY(6px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
}

/* ============================================================
   STYLES
============================================================ */

const styles = {
  page: {
    width: "100%",
    minHeight: "100vh",
    background: "#E8F2EF",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    fontFamily:
      "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },

  screen: {
    width: "100%",
    maxWidth: "430px",
    height: "100vh",
    minHeight: "720px",
    position: "relative",
    overflow: "hidden",
    background:
      "linear-gradient(180deg, #F8FDFB 0%, #EFF9F6 56%, #D9ECE5 100%)",
  },

  sky: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(180deg, #F8FDFB 0%, #F1FAF7 46%, #DDEEE8 100%)",
  },

  skyGlowLeft: {
    position: "absolute",
    top: "-100px",
    left: "-120px",
    width: "360px",
    height: "360px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(255,255,255,.95), rgba(255,255,255,0) 72%)",
    zIndex: 1,
  },

  skyGlowRight: {
    position: "absolute",
    top: "70px",
    right: "-100px",
    width: "300px",
    height: "300px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(255,255,255,.65), rgba(255,255,255,0) 72%)",
    zIndex: 1,
  },

  logoWrap: {
    position: "absolute",
    top: "7%",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 20,
  },

  brand: {
    position: "absolute",
    top: "20%",
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: "30px",
    lineHeight: 1,
    fontWeight: 850,
    letterSpacing: "-1px",
    zIndex: 20,
  },

  brandGreen: {
    color: "#007050",
  },

  brandDark: {
    color: "#082F3C",
  },

  brandTag: {
    position: "absolute",
    top: "24.8%",
    left: 0,
    right: 0,
    textAlign: "center",
    color: "#586A70",
    fontSize: "8px",
    fontWeight: 600,
    letterSpacing: "4px",
    zIndex: 20,
  },

  smallLine: {
    position: "absolute",
    top: "29.1%",
    left: "50%",
    transform: "translateX(-50%)",
    width: "40px",
    height: "2px",
    borderRadius: "10px",
    background: "#007050",
    zIndex: 20,
  },

  tagline: {
    position: "absolute",
    top: "32.2%",
    left: "20px",
    right: "20px",
    textAlign: "center",
    color: "#0E3744",
    fontSize: "16px",
    lineHeight: 1.65,
    fontWeight: 500,
    zIndex: 20,
  },

  rightMessage: {
    position: "absolute",
    right: "27px",
    top: "61%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "4px",
    color: "#425E62",
    fontSize: "8px",
    letterSpacing: "4px",
    fontWeight: 600,
    zIndex: 15,
  },

  rightLine: {
    width: "28px",
    height: "2px",
    marginTop: "6px",
    borderRadius: "10px",
    background: "#007050",
  },

  scene: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "50%",
    overflow: "hidden",
    zIndex: 5,
  },

  sceneSvg: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
  },

  sign: {
    position: "absolute",
    left: "23px",
    bottom: "13%",
    width: "115px",
    height: "170px",
    zIndex: 12,
  },

  signPole: {
    position: "absolute",
    left: "21px",
    bottom: 0,
    width: "10px",
    height: "155px",
    borderRadius: "4px",
    background:
      "linear-gradient(90deg, #624832 0%, #8B6848 48%, #4F3827 100%)",
    boxShadow:
      "2px 4px 5px rgba(42,39,27,.18)",
  },

  signBoard: {
    position: "absolute",
    left: "0",
    width: "110px",
    minHeight: "38px",
    padding:
      "6px 13px",
    boxSizing: "border-box",
    background:
      "linear-gradient(180deg, #795634 0%, #62452B 100%)",
    clipPath:
      "polygon(0 0, 89% 0, 100% 50%, 89% 100%, 0 100%)",
    color: "#F5F0DF",
    fontSize: "7px",
    lineHeight: 1.25,
    letterSpacing: ".8px",
    fontWeight: 600,
    textAlign: "left",
    boxShadow:
      "0 4px 8px rgba(42,39,27,.15)",
  },

  student: {
    position: "absolute",
    left: "50%",
    bottom: "-2%",
    transform: "translateX(-50%)",
    width: "142px",
    height: "250px",
    zIndex: 14,
  },

  studentHead: {
    position: "absolute",
    top: 0,
    left: "52px",
    width: "39px",
    height: "44px",
    borderRadius:
      "48% 48% 44% 44%",
    background:
      "linear-gradient(180deg, #C78D6C, #A86D53)",
    zIndex: 5,
  },

  studentHair: {
    position: "absolute",
    top: "-4px",
    left: "48px",
    width: "47px",
    height: "28px",
    borderRadius:
      "55% 55% 40% 40%",
    background:
      "linear-gradient(180deg, #26383D, #14272D)",
    zIndex: 6,
  },

  studentNeck: {
    position: "absolute",
    top: "34px",
    left: "64px",
    width: "15px",
    height: "19px",
    background: "#A86D53",
    zIndex: 3,
  },

  studentBody: {
    position: "absolute",
    top: "47px",
    left: "27px",
    width: "88px",
    height: "110px",
    borderRadius: "20px",
    background:
      "linear-gradient(180deg, #415B63 0%, #2F4950 100%)",
    zIndex: 2,
  },

  jacketLine: {
    position: "absolute",
    left: "11px",
    top: "12px",
    width: "3px",
    height: "75px",
    borderRadius: "5px",
    background:
      "rgba(255,255,255,.10)",
  },

  backpack: {
    position: "absolute",
    top: "51px",
    left: "31px",
    width: "79px",
    height: "125px",
    borderRadius: "18px",
    background:
      "linear-gradient(180deg, #287964 0%, #18594B 62%, #123F38 100%)",
    boxShadow:
      "0 14px 24px rgba(18,55,46,.25)",
    zIndex: 6,
  },

  backpackHandle: {
    position: "absolute",
    top: "-8px",
    left: "28px",
    width: "22px",
    height: "13px",
    border:
      "5px solid #23443E",
    borderBottom: "none",
    borderRadius:
      "11px 11px 0 0",
  },

  backpackTop: {
    position: "absolute",
    top: "10px",
    left: "10px",
    width: "59px",
    height: "15px",
    borderRadius: "12px",
    background: "#368B76",
  },

  backpackMiddle: {
    position: "absolute",
    top: "26px",
    left: "7px",
    width: "65px",
    height: "70px",
    borderRadius: "15px",
    background:
      "linear-gradient(180deg, #2B7C67, #1B6252)",
  },

  backpackPocket: {
    position: "absolute",
    bottom: "10px",
    left: "15px",
    width: "49px",
    height: "34px",
    borderRadius: "9px",
    background: "#205D50",
    border:
      "1px solid rgba(255,255,255,.10)",
  },

  backpackZip: {
    position: "absolute",
    left: "14px",
    right: "14px",
    top: "57px",
    height: "2px",
    background:
      "rgba(255,255,255,.12)",
  },

  leftStrap: {
    position: "absolute",
    top: "49px",
    left: "31px",
    width: "9px",
    height: "92px",
    borderRadius: "10px",
    background: "#1B383D",
    zIndex: 8,
  },

  rightStrap: {
    position: "absolute",
    top: "49px",
    right: "31px",
    width: "9px",
    height: "92px",
    borderRadius: "10px",
    background: "#1B383D",
    zIndex: 8,
  },

  studentArmLeft: {
    position: "absolute",
    top: "57px",
    left: "14px",
    width: "19px",
    height: "87px",
    borderRadius: "14px",
    background:
      "linear-gradient(180deg, #3B5960, #2F4B52)",
    transform: "rotate(2deg)",
    zIndex: 3,
  },

  studentArmRight: {
    position: "absolute",
    top: "57px",
    right: "14px",
    width: "19px",
    height: "87px",
    borderRadius: "14px",
    background:
      "linear-gradient(180deg, #3B5960, #2F4B52)",
    transform: "rotate(-2deg)",
    zIndex: 3,
  },

  handLeft: {
    position: "absolute",
    top: "136px",
    left: "13px",
    width: "15px",
    height: "27px",
    borderRadius: "50%",
    background:
      "linear-gradient(180deg, #B7795B, #A2684F)",
    zIndex: 5,
  },

  handRight: {
    position: "absolute",
    top: "136px",
    right: "13px",
    width: "15px",
    height: "27px",
    borderRadius: "50%",
    background:
      "linear-gradient(180deg, #B7795B, #A2684F)",
    zIndex: 5,
  },

  pantsLeft: {
    position: "absolute",
    top: "159px",
    left: "46px",
    width: "26px",
    height: "89px",
    borderRadius:
      "0 0 10px 10px",
    background:
      "linear-gradient(180deg, #31594E, #24453D)",
    zIndex: 2,
  },

  pantsRight: {
    position: "absolute",
    top: "159px",
    right: "46px",
    width: "26px",
    height: "89px",
    borderRadius:
      "0 0 10px 10px",
    background:
      "linear-gradient(180deg, #31594E, #24453D)",
    zIndex: 2,
  },

  shoeLeft: {
    position: "absolute",
    bottom: "0",
    left: "32px",
    width: "40px",
    height: "14px",
    borderRadius:
      "14px 8px 5px 5px",
    background: "#26383D",
    zIndex: 4,
  },

  shoeRight: {
    position: "absolute",
    bottom: "0",
    right: "32px",
    width: "40px",
    height: "14px",
    borderRadius:
      "8px 14px 5px 5px",
    background: "#26383D",
    zIndex: 4,
  },

  bottomMessage: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: "3.8%",
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: "13px",
    fontWeight: 700,
    letterSpacing: "3px",
    textShadow:
      "0 2px 7px rgba(0,0,0,.42)",
    zIndex: 25,
  },

  bottomLine: {
    position: "absolute",
    left: "50%",
    bottom: "2.1%",
    transform: "translateX(-50%)",
    width: "43px",
    height: "2px",
    borderRadius: "10px",
    background: "#FFFFFF",
    opacity: 0.9,
    zIndex: 25,
  },
};