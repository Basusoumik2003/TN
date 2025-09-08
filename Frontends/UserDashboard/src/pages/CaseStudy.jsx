import React from 'react';
import '../styles/CaseStudy.css';

const CaseStudy = () => {
  return (
    <div className="case-study-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="badge">Case Study</div>
            <h1 className="hero-title">
              How Tech Corporation Reduced 2,400 Tons of CO₂ Using Our Platform
            </h1>
            <p className="hero-description">
              A leading technology company achieved carbon neutrality 18 months ahead of schedule 
              while saving $1.2M in operational costs through intelligent carbon tracking and optimization.
            </p>
            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-icon">📉</div>
                <span className="stat-text">2,400 tons CO₂ reduced</span>
              </div>
              <div className="stat-item">
                <div className="stat-icon">🎯</div>
                <span className="stat-text">18 months ahead of target</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container main-content">
        {/* Client Background */}
        <section className="section">
          <h2 className="section-title">Client Background</h2>
          <div className="client-grid">
            <div className="card">
              <div className="card-header">
                <div className="client-info">
                  <div className="client-logo">TC</div>
                  <div>
                    <h3 className="client-name">TechCorp Industries</h3>
                    <p className="client-subtitle">Global Technology Leader</p>
                  </div>
                </div>
              </div>
              <div className="card-content">
                <div className="info-item">
                  <span className="icon">📍</span>
                  <span>San Francisco, CA (Global Operations)</span>
                </div>
                <div className="info-item">
                  <span className="icon">👥</span>
                  <span>15,000+ employees worldwide</span>
                </div>
                <div className="info-item">
                  <span className="icon">🎯</span>
                  <span>Industry: Cloud Computing & Software</span>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Sustainability Goals</h3>
              </div>
              <div className="card-content">
                <div className="goal-item">
                  <div className="goal-header">
                    <span>Carbon Neutral by 2025</span>
                    <span className="badge badge-success">Achieved 2023</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: '100%' }}></div>
                  </div>
                </div>
                <div className="goal-item">
                  <div className="goal-header">
                    <span>50% Emission Reduction</span>
                    <span className="badge badge-success">Exceeded</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: '75%' }}></div>
                  </div>
                </div>
                <div className="goal-item">
                  <div className="goal-header">
                    <span>100% Renewable Energy</span>
                    <span className="badge badge-success">Complete</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: '100%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem Statement */}
        <section className="section">
          <h2 className="section-title">The Challenge</h2>
          <div className="challenge-card">
            <div className="challenge-grid">
              <div className="challenge-item">
                <div className="challenge-icon">📊</div>
                <h3 className="challenge-title">Inaccurate Tracking</h3>
                <p className="challenge-description">
                  Manual data collection led to 30% reporting errors and delayed insights
                </p>
              </div>
              <div className="challenge-item">
                <div className="challenge-icon">⚡</div>
                <h3 className="challenge-title">High Emissions</h3>
                <p className="challenge-description">
                  Data centers and fleet operations generating 5,000+ tons CO₂ annually
                </p>
              </div>
              <div className="challenge-item">
                <div className="challenge-icon">📋</div>
                <h3 className="challenge-title">Compliance Risk</h3>
                <p className="challenge-description">
                  Struggling to meet regulatory requirements and investor ESG expectations
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Solution */}
        <section className="section">
          <h2 className="section-title">Our Solution</h2>
          <div className="solution-grid">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Platform Features Implemented</h3>
              </div>
              <div className="card-content">
                <div className="feature-item">
                  <div className="feature-dot"></div>
                  <div>
                    <h4 className="feature-title">Real-time Asset Tracking</h4>
                    <p className="feature-description">
                      Automated monitoring of 500+ data center assets and 200+ fleet vehicles
                    </p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-dot"></div>
                  <div>
                    <h4 className="feature-title">Carbon Credit Management</h4>
                    <p className="feature-description">
                      Streamlined purchasing and tracking of verified carbon credits
                    </p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-dot"></div>
                  <div>
                    <h4 className="feature-title">Predictive Analytics</h4>
                    <p className="feature-description">
                      AI-powered insights for emission reduction opportunities
                    </p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-dot"></div>
                  <div>
                    <h4 className="feature-title">Compliance Reporting</h4>
                    <p className="feature-description">
                      Automated generation of regulatory and ESG reports
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="dashboard-image">
              <img src="https://via.placeholder.com/600x400/f0f0f0/666?text=CarbonTrack+Dashboard" alt="CarbonTrack Dashboard" />
            </div> */}
          </div>
        </section>

        {/* Implementation Process */}
        <section className="section">
          <h2 className="section-title">Implementation Process</h2>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-number">1</div>
              <div className="timeline-content">
                <h3 className="timeline-title">Discovery & Planning</h3>
                <p className="timeline-description">2 weeks - Asset audit and goal setting</p>
              </div>
              <div className="timeline-date">Week 1-2</div>
            </div>
            <div className="timeline-item">
              <div className="timeline-number">2</div>
              <div className="timeline-content">
                <h3 className="timeline-title">Platform Setup & Integration</h3>
                <p className="timeline-description">4 weeks - API connections and data migration</p>
              </div>
              <div className="timeline-date">Week 3-6</div>
            </div>
            <div className="timeline-item">
              <div className="timeline-number">3</div>
              <div className="timeline-content">
                <h3 className="timeline-title">Team Training & Testing</h3>
                <p className="timeline-description">2 weeks - User onboarding and system validation</p>
              </div>
              <div className="timeline-date">Week 7-8</div>
            </div>
            <div className="timeline-item">
              <div className="timeline-number completed">4</div>
              <div className="timeline-content">
                <h3 className="timeline-title">Go-Live & Optimization</h3>
                <p className="timeline-description">Ongoing - Full deployment and continuous improvement</p>
              </div>
              <div className="timeline-date">Week 9+</div>
            </div>
          </div>
        </section>

        {/* Results & Impact */}
        <section className="section">
          <h2 className="section-title">Results & Impact</h2>
          <div className="results-grid">
            <div className="result-card">
              <div className="result-number green">2,400</div>
              <div className="result-label">Tons CO₂ Reduced</div>
              <div className="result-sublabel">48% reduction from baseline</div>
            </div>
            <div className="result-card">
              <div className="result-number blue">1,200</div>
              <div className="result-label">Credits Generated</div>
              <div className="result-sublabel">Verified carbon offsets</div>
            </div>
            <div className="result-card">
              <div className="result-number purple">$1.2M</div>
              <div className="result-label">Cost Savings</div>
              <div className="result-sublabel">Annual operational savings</div>
            </div>
            <div className="result-card">
              <div className="result-number orange">100%</div>
              <div className="result-label">Compliance</div>
              <div className="result-sublabel">All regulatory requirements</div>
            </div>
          </div>

          <div className="chart-card">
            <div className="card-header">
              <h3 className="card-title">Emission Reduction Timeline</h3>
              <p className="card-description">Monthly CO₂ emissions before and after implementation</p>
            </div>
            <div className="chart-placeholder">
              <div className="chart-content">
                <div className="chart-icon">📉</div>
                <div className="chart-text">48% reduction in 12 months</div>
              </div>
            </div>
          </div>
        </section>

        {/* Client Testimonial */}
        <section className="section">
          <h2 className="section-title">Client Testimonial</h2>
          <div className="testimonial-card">
            <blockquote className="testimonial-quote">
              "CarbonTrack transformed our sustainability program from reactive to proactive. 
              The platform's real-time insights helped us identify emission reduction opportunities 
              we never knew existed. We achieved carbon neutrality 18 months ahead of schedule 
              and saved over $1M in the process."
            </blockquote>
            <div className="testimonial-author">
              <img src="https://via.placeholder.com/60x60/4f46e5/fff?text=SC" alt="Sarah Chen" className="author-image" />
              <div className="author-info">
                <div className="author-name">Sarah Chen</div>
                <div className="author-title">Chief Sustainability Officer</div>
                <div className="author-company">TechCorp Industries</div>
              </div>
            </div>
          </div>
        </section>

        {/* Download & CTA */}
        <section className="section">
          <div className="cta-card">
            <h2 className="cta-title">Ready to Transform Your Carbon Strategy?</h2>
            <p className="cta-description">
              Join TechCorp and 500+ other companies reducing emissions with CarbonTrack
            </p>
            <div className="cta-buttons">
              <button className="btn btn-primary btn-large">
                📥 Download Full Case Study
              </button>
              <button className="btn btn-outline btn-large">
                Book a Demo →
              </button>
            </div>
            <div className="cta-links">
              <a href="#" className="cta-link">See More Case Studies</a>
              <a href="#" className="cta-link">Platform Overview</a>
              <a href="#" className="cta-link">Contact Sales</a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CaseStudy;