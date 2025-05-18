// src/components/HeroSection.jsx
import React from 'react';
import bannerBackground from '../assets/backgroundBrowseMovie.jpeg';

const BrowseMovieBanner = () => (
  <div
    style={{
      background: `url(${bannerBackground}) center/cover no-repeat`,
      height: '400px',
      position: 'relative',
    }}
  >
    {/* dark overlay */}
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        zIndex: 1,
      }}
    />

    {/* headline + subtitle */}
    <div
      className="d-flex flex-column justify-content-center align-items-center h-100 text-white position-relative px-3"
      style={{ zIndex: 2 }}
    >
      <h1 className="display-4 fw-bold text-center">
        Find your next discovery
      </h1>
      <p className="lead mb-0 text-center">
        Dive into thousands of handpicked movies
      </p>
    </div>
  </div>
);

export default BrowseMovieBanner;
