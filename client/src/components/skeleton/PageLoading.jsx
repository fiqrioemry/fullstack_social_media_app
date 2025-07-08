import React, { useState, useEffect } from "react";

const PageLoading = () => {
  const [darkMode, setDarkMode] = useState(
    () => JSON.parse(localStorage.getItem("darkMode")) || false
  );

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <>
      <style jsx>{`
        .loading-container {
          background: ${darkMode
            ? "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)"
            : "linear-gradient(135deg, #fafafa 0%, #ffffff 50%, #f8f9fa 100%)"};
          position: relative;
          overflow: hidden;
        }

        .loading-container::before {
          content: "";
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: ${darkMode
            ? "radial-gradient(circle at 30% 20%, rgba(29, 161, 242, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(88, 101, 242, 0.1) 0%, transparent 50%)"
            : "radial-gradient(circle at 30% 20%, rgba(29, 161, 242, 0.05) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(88, 101, 242, 0.05) 0%, transparent 50%)"};
          animation: float 15s ease-in-out infinite;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-30px) rotate(180deg);
          }
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }

        @keyframes wave {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .instagram-loader {
          position: relative;
          width: 80px;
          height: 80px;
        }

        .loader-ring {
          position: absolute;
          border: 3px solid transparent;
          border-radius: 50%;
          animation: spin 1.2s linear infinite;
        }

        .loader-ring-1 {
          width: 80px;
          height: 80px;
          border-top-color: #1da1f2;
          border-right-color: #1da1f2;
          animation-duration: 1.2s;
        }

        .loader-ring-2 {
          width: 60px;
          height: 60px;
          top: 10px;
          left: 10px;
          border-top-color: #5865f2;
          border-left-color: #5865f2;
          animation-duration: 1.5s;
          animation-direction: reverse;
        }

        .loader-ring-3 {
          width: 40px;
          height: 40px;
          top: 20px;
          left: 20px;
          border-bottom-color: #00d4aa;
          border-right-color: #00d4aa;
          animation-duration: 1.8s;
        }

        .loader-center {
          position: absolute;
          width: 20px;
          height: 20px;
          top: 30px;
          left: 30px;
          background: linear-gradient(45deg, #1da1f2, #5865f2, #00d4aa);
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
        }

        .loading-dots {
          display: flex;
          gap: 8px;
          margin-top: 30px;
        }

        .dot {
          width: 8px;
          height: 8px;
          background: linear-gradient(45deg, #1da1f2, #5865f2);
          border-radius: 50%;
          animation: wave 1.4s ease-in-out infinite;
        }

        .dot:nth-child(1) {
          animation-delay: 0s;
        }
        .dot:nth-child(2) {
          animation-delay: 0.2s;
        }
        .dot:nth-child(3) {
          animation-delay: 0.4s;
        }

        .loading-text {
          color: ${darkMode
            ? "rgba(255, 255, 255, 0.7)"
            : "rgba(0, 0, 0, 0.6)"};
          font-size: 16px;
          font-weight: 500;
          margin-top: 24px;
          letter-spacing: 0.5px;
          animation: pulse 2s ease-in-out infinite;
        }

        .brand-logo {
          position: relative;
          margin-bottom: 40px;
          animation: pulse 3s ease-in-out infinite;
        }

        .logo-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 120px;
          height: 120px;
          background: radial-gradient(
            circle,
            rgba(29, 161, 242, 0.2) 0%,
            transparent 70%
          );
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
        }

        .instagram-icon {
          position: relative;
          z-index: 1;
          width: 80px;
          height: 80px;
          background: linear-gradient(45deg, #1da1f2, #5865f2, #00d4aa);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 36px;
          font-weight: bold;
          box-shadow: 0 10px 30px rgba(29, 161, 242, 0.3);
        }

        .progress-bar {
          width: 200px;
          height: 2px;
          background: ${darkMode
            ? "rgba(255, 255, 255, 0.1)"
            : "rgba(0, 0, 0, 0.1)"};
          border-radius: 1px;
          margin-top: 30px;
          overflow: hidden;
          position: relative;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #1da1f2, #5865f2, #00d4aa);
          border-radius: 1px;
          animation: progress 3s ease-in-out infinite;
        }

        @keyframes progress {
          0% {
            width: 0%;
            transform: translateX(-100%);
          }
          50% {
            width: 100%;
            transform: translateX(0%);
          }
          100% {
            width: 100%;
            transform: translateX(100%);
          }
        }
      `}</style>

      <div
        className={`loading-container flex items-center justify-center min-h-screen transition-colors duration-300 ${
          darkMode ? "dark" : ""
        }`}
      >
        <div className="flex flex-col items-center relative z-10">
          {/* Brand Logo */}

          {/* Main Loader */}
          <div className="instagram-loader">
            <div className="loader-ring loader-ring-1"></div>
            <div className="loader-ring loader-ring-2"></div>
            <div className="loader-ring loader-ring-3"></div>
            <div className="loader-center"></div>
          </div>

          {/* Loading Dots */}
          <div className="loading-dots">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>

          {/* Progress Bar */}
          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>

          {/* Loading Text */}
          <div className="loading-text">Loading your moments...</div>
        </div>
      </div>
    </>
  );
};

export default PageLoading;
