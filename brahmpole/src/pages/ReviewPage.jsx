import React, { useState } from "react";
import "./ReviewPage.css";

const HIGH_REVIEWS = [
  "Waking up to the lake view from our room at 1931 Lakeview was unforgettable. The haveli's old-world charm mixed with warm, attentive service made our stay in Udaipur truly special.",
  "Bramhpole Haveli has so much character — beautiful architecture, a peaceful courtyard, and staff who genuinely cared about our comfort. Loved every moment here.",
  "Best decision of our Udaipur trip. The lake-facing room, the quiet mornings, the little touches from the team — everything felt personal, not just another hotel stay.",
  "A stunning heritage property with a view money can't usually buy. Rooms were spotless, breakfast was lovely, and the location near the lake made exploring the city so easy.",
  "Stayed three nights at 1931 Lakeview and didn't want to leave. The blend of history and hospitality here is rare — highly recommend for anyone visiting Udaipur.",
];

export default function ReviewPage({
  googleReviewUrl = "https://search.google.com/local/writereview?placeid=ChIJgxaP3PHlZzkRdM_lBBXULgw",
  whatsappNumber = "91XXXXXXXXXX",
}) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [chosenText, setChosenText] = useState("");
  const [copied, setCopied] = useState(false);
  const [privateText, setPrivateText] = useState("");

  const displayRating = hoverRating || rating;

  const handleSelectStar = (value) => {
    setRating(value);
    setChosenText("");
    setCopied(false);
  };

  const handleSelectReview = async (text) => {
    setChosenText(text);

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  const handleStartOver = () => {
    setRating(0);
    setHoverRating(0);
    setChosenText("");
    setCopied(false);
    setPrivateText("");
  };

  const whatsappHref = () => {
    const message =
      privateText.trim() ||
      "I'd like to share feedback about my stay at 1931 Lakeview.";

    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;
  };

  return (
    <main className="rp-wrap">
      <div className="rp-background-glow" />

      <section className="rp-card">
        <div className="rp-card-inner">

          {/* Decorative top */}
          <div className="rp-crest" aria-hidden="true">
            <svg
              viewBox="0 0 200 90"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20 40 C20 20, 45 20, 45 40" />
              <path d="M45 40 C45 15, 75 15, 75 40" />
              <path d="M75 40 C75 8, 100 8, 100 40" />
              <path d="M100 40 C100 15, 125 15, 125 40" />
              <path d="M125 40 C125 20, 155 20, 155 40" />

              <line x1="10" y1="40" x2="20" y2="40" />
              <line x1="155" y1="40" x2="170" y2="40" />

              <path d="M100 8 L100 0" />
              <circle cx="100" cy="-2" r="2" />

              <path d="M92 22 L100 32 L108 22 L100 26 Z" />
            </svg>
          </div>

          {/* Brand */}
          <div className="rp-brand">
            <h1 className="rp-h1">1931</h1>

            <div className="rp-subtitle">
              LAKEVIEW
            </div>

            <div className="rp-place">
              Bramhpole Haveli <span>·</span> Udaipur
            </div>
          </div>

          {/* Divider */}
          <div className="rp-rule">
            <span />
            <i>✦</i>
            <span />
          </div>

          {/* Rating */}
          <div className="rp-rating-section">
            <p className="rp-prompt">
              How was your stay with us?
            </p>

            <p className="rp-rating-hint">
              Your experience matters to us
            </p>

            <div
              className="rp-stars"
              onMouseLeave={() => setHoverRating(0)}
              role="radiogroup"
              aria-label="Rate your stay"
            >
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  className={`rp-star ${
                    value <= displayRating ? "lit" : ""
                  }`}
                  onMouseEnter={() => setHoverRating(value)}
                  onFocus={() => setHoverRating(value)}
                  onClick={() => handleSelectStar(value)}
                  aria-label={`${value} star${
                    value > 1 ? "s" : ""
                  }`}
                >
                  ★
                </button>
              ))}
            </div>

            {rating > 0 && (
              <div className="rp-selected-rating">
                <span>{rating}</span>
                <span>/</span>
                <span>5</span>
              </div>
            )}
          </div>

          {/* High rating */}
          {rating >= 4 && (
            <div className="rp-stage active">

              <div className="rp-stage-heading">
                <div className="rp-stage-icon">✦</div>

                <div>
                  <h2 className="rp-stage-title">
                    Thank you, that means a lot
                  </h2>

                  <p className="rp-stage-hint">
                    Pick a note that sounds like you
                  </p>
                </div>
              </div>

              <div className="rp-review-list">
                {HIGH_REVIEWS.map((text, index) => (
                  <button
                    type="button"
                    key={text}
                    className={`rp-review-card ${
                      chosenText === text ? "chosen" : ""
                    }`}
                    onClick={() => handleSelectReview(text)}
                  >
                    <span className="rp-review-number">
                      0{index + 1}
                    </span>

                    <p>{text}</p>

                    <span className="rp-review-arrow">
                      {chosenText === text ? "✓" : "→"}
                    </span>
                  </button>
                ))}
              </div>

              {chosenText && (
                <div className="rp-post-panel active">

                  {copied && (
                    <div className="rp-copied-note">
                      <span>✓</span>
                      Copied to your clipboard
                    </div>
                  )}

                  <a
                    className="rp-btn rp-google-btn"
                    href={googleReviewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Post your review on Google</span>
                    <span className="rp-btn-arrow">↗</span>
                  </a>

                  <button
                    type="button"
                    className="rp-reset"
                    onClick={() => {
                      setChosenText("");
                      setCopied(false);
                    }}
                  >
                    Choose a different note
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Low rating */}
          {rating >= 1 && rating <= 3 && (
            <div className="rp-stage active">

              <div className="rp-low-panel">

                <div className="rp-low-icon">
                  <span>♡</span>
                </div>

                <h2 className="rp-low-title">
                  We'd love to hear from you
                </h2>

                <p className="rp-low-description">
                  We're sorry your stay wasn't what it should
                  have been. Please tell us directly — we read
                  every word and want to make it right.
                </p>

                <textarea
                  value={privateText}
                  onChange={(event) =>
                    setPrivateText(event.target.value)
                  }
                  placeholder="Tell us what happened..."
                  aria-label="Your private feedback"
                />

                <a
                  className="rp-btn rp-whatsapp-btn"
                  href={whatsappHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Send feedback privately</span>
                  <span className="rp-btn-arrow">↗</span>
                </a>

                <p className="rp-private-note">
                  Your feedback goes directly to our team.
                </p>
              </div>
            </div>
          )}

          {/* Reset */}
          {rating > 0 && (
            <button
              type="button"
              className="rp-start-over"
              onClick={handleStartOver}
            >
              Start over
            </button>
          )}

          {/* Bottom branding */}
          <div className="rp-footer">
            <span />
            <p>1931 LAKEVIEW</p>
            <span />
          </div>

        </div>
      </section>
    </main>
  );
}