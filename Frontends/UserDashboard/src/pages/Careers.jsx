import React from 'react';
import '../styles/Careers.css';

import {
  FaUsers,
  FaLeaf,
  FaBolt,
  FaMapMarkerAlt,
  FaHeart,
  FaChartLine,
  FaGraduationCap,
  FaPlane,
  FaCoffee,
  FaLaptopCode,
  FaPaintBrush,
  FaSeedling,
  FaHandshake,
  FaEnvelope,
  FaLinkedin
} from 'react-icons/fa';

const CareersPage = () => {
  const jobListings = [
    {
      title: "Senior React Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      description: "Build scalable web applications that help companies track and reduce their carbon footprint."
    },
    {
      title: "Sustainability Analyst",
      department: "Climate Research",
      location: "San Francisco, CA",
      type: "Full-time",
      description: "Analyze environmental data and develop strategies for corporate sustainability programs."
    },
    {
      title: "Product Designer",
      department: "Design",
      location: "Remote",
      type: "Full-time",
      description: "Design intuitive interfaces for our climate technology platform used by Fortune 500 companies."
    },
    {
      title: "Climate Data Scientist",
      department: "Climate Research",
      location: "New York, NY",
      type: "Full-time",
      description: "Develop machine learning models to predict and analyze climate impact metrics."
    },
    {
      title: "Partnership Manager",
      department: "Sales & Partnerships",
      location: "Hybrid",
      type: "Full-time",
      description: "Build strategic partnerships with enterprises to accelerate their sustainability journey."
    }
  ];

  const teams = [
    {
      name: "Engineering",
      icon: <FaLaptopCode />,
      description: "Building the technology that powers climate action"
    },
    {
      name: "Design",
      icon: <FaPaintBrush />,
      description: "Creating beautiful, intuitive experiences"
    },
    {
      name: "Product",
      icon: <FaBolt />,
      description: "Defining the future of sustainability software"
    },
    {
      name: "Climate Research",
      icon: <FaSeedling />,
      description: "Advancing the science of environmental impact"
    },
    {
      name: "Sales & Partnerships",
      icon: <FaHandshake />,
      description: "Connecting with organizations ready for change"
    }
  ];

  const testimonials = [
    {
      quote: "Working here means my code directly contributes to fighting climate change. It's incredibly fulfilling to build technology that makes a real difference.",
      name: "Sarah Chen",
      role: "Senior Frontend Developer",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face"
    },
    {
      quote: "The collaborative culture here is amazing. We're all united by our mission to create a sustainable future, and that shared purpose drives everything we do.",
      name: "Marcus Rodriguez",
      role: "Product Manager",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face"
    },
    {
      quote: "I love how we balance cutting-edge technology with meaningful environmental impact. Plus, the remote-first culture gives me the flexibility I need.",
      name: "Dr. Emily Watson",
      role: "Climate Data Scientist",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face"
    }
  ];

  const benefits = [
    {
      icon: <FaHeart />,
      title: "Health & Wellness",
      description: "Comprehensive health, dental, and vision insurance"
    },
    {
      icon: <FaChartLine />,
      title: "Equity & Growth",
      description: "Stock options and clear career advancement paths"
    },
    {
      icon: <FaGraduationCap />,
      title: "Learning Budget",
      description: "$2,000 annual budget for courses, conferences, and books"
    },
    {
      icon: <FaLeaf />,
      title: "Carbon Offset",
      description: "We offset your personal carbon footprint annually"
    },
    {
      icon: <FaPlane />,
      title: "Team Retreats",
      description: "Quarterly team retreats in inspiring locations"
    },
    {
      icon: <FaCoffee />,
      title: "Flexible Work",
      description: "Remote-first with flexible hours and unlimited PTO"
    }
  ];

  return (
    <div className="careers-page">
      <main>
        {/* Hero Section */}
        <section className="hero">
          <div className="container">
            <div className="hero-content">
              <h1 className="hero-title">Join Our Mission</h1>
              <p className="hero-description">
                We're building the technology that will help organizations worldwide achieve their sustainability goals.
                Our team is passionate about creating solutions that make environmental responsibility accessible,
                measurable, and actionable for businesses of all sizes.
              </p>
              <div className="badges">
                <span className="badge">Climate Tech</span>
                <span className="badge">Remote First</span>
                <span className="badge">Purpose Driven</span>
              </div>
            </div>
          </div>
        </section>

        {/* Why Work With Us */}
        <section className="why-work-section">
          <div className="container">
            <h2 className="section-title">Why Work With Us?</h2>
            <div className="cards-grid">
              <div className="card">
                <div className="card-header">
                  <span className="card-icon"><FaUsers /></span>
                  <h3 className="card-title">Purpose-Driven Culture</h3>
                </div>
                <div className="card-content">
                  <p>
                    Work alongside passionate individuals who believe in making a positive environmental impact.
                    Our diverse team collaborates to solve some of the world's most pressing challenges.
                  </p>
                </div>
              </div>
              <div className="card">
                <div className="card-header">
                  <span className="card-icon"><FaLeaf /></span>
                  <h3 className="card-title">Climate Impact</h3>
                </div>
                <div className="card-content">
                  <p>
                    Your work directly contributes to reducing global carbon emissions. We've helped our clients
                    avoid over 2 million tons of CO2 equivalent since our founding.
                  </p>
                </div>
              </div>
              <div className="card">
                <div className="card-header">
                  <span className="card-icon"><FaBolt /></span>
                  <h3 className="card-title">Cutting-Edge Tech</h3>
                </div>
                <div className="card-content">
                  <p>
                    Work with modern technologies including React, TypeScript, Python, and AI/ML tools.
                    We invest in the latest tools to keep our team productive and engaged.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="jobs-section">
          <div className="container">
            <h2 className="section-title">Open Positions</h2>
            <div className="jobs-list">
              {jobListings.map((job, index) => (
                <div key={index} className="job-card">
                  <div className="job-header">
                    <div className="job-info">
                      <h3 className="job-title">{job.title}</h3>
                      <div className="job-meta">
                        <span className="job-department">{job.department}</span>
                        <span className="job-location"><FaMapMarkerAlt /> {job.location}</span>
                        <span className="job-type">{job.type}</span>
                      </div>
                    </div>
                    <button className="apply-btn">
                      Apply Now →
                    </button>
                  </div>
                  <div className="job-content">
                    <p>{job.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Teams Overview */}
        <section className="teams-section">
          <div className="container">
            <h2 className="section-title">Our Teams</h2>
            <div className="teams-grid">
              {teams.map((team, index) => (
                <div key={index} className="team-card">
                  <div className="team-header">
                    <span className="team-icon">{team.icon}</span>
                    <h3 className="team-name">{team.name}</h3>
                  </div>
                  <div className="team-content">
                    <p>{team.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="testimonials-section">
          <div className="container">
            <h2 className="section-title">What Our Team Says</h2>
            <div className="testimonials-grid">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="testimonial-card">
                  <blockquote className="testimonial-quote">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="testimonial-author">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="author-image"
                    />
                    <div className="author-info">
                      <div className="author-name">{testimonial.name}</div>
                      <div className="author-role">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="benefits-section">
          <div className="container">
            <h2 className="section-title">Perks & Benefits</h2>
            <div className="benefits-grid">
              {benefits.map((benefit, index) => (
                <div key={index} className="benefit-item">
                  <span className="benefit-icon">{benefit.icon}</span>
                  <div className="benefit-content">
                    <h3 className="benefit-title">{benefit.title}</h3>
                    <p className="benefit-description">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="cta-section">
          <div className="container">
            <div className="cta-content">
              <h2 className="cta-title">Ready to Make an Impact?</h2>
              <p className="cta-description">
                We're always looking for passionate people who want to help build a sustainable future.
                Even if you don't see a perfect match above, we'd love to hear from you.
              </p>
              <div className="cta-buttons">
                <button className="cta-btn primary">
                  <FaEnvelope /> careers@ecotech.com
                </button>
                <button className="cta-btn secondary">
                  <FaLinkedin /> Follow us on LinkedIn
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CareersPage;