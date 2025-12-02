// DetailsDrawer.js
import React from 'react';
import './DetailsDrawer.css';

/**
 * Renders a side drawer to display details of the selected page.
 */
const DetailsDrawer = ({ selectedPage, onClose }) => {
  const isOpen = !!selectedPage;

  const url = selectedPage?.metadata?.url || 'N/A';
  const keyElements = selectedPage?.metadata?.key_elements || [];

  return (
    <div className={`details-drawer ${isOpen ? 'open' : ''}`}>
      <div className="drawer__content">
        <header className="drawer__header">
          <h2 className="drawer__title">
            {selectedPage?.label || 'Page Details'}
          </h2>

          <button
            onClick={onClose}
            className="drawer__close-btn"
            aria-label="Close details drawer"
            title="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="drawer__close-icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>

        {selectedPage ? (
          <div className="drawer__body">
            <section className="drawer__section drawer__url-card">
              <h3 className="drawer__label">URL</h3>
              <p className="drawer__url">{url}</p>
            </section>

            <section className="drawer__section drawer__key-elements">
              <h3 className="drawer__section-title">
                Key Elements <span className="drawer__count">({keyElements.length})</span>
              </h3>

              {keyElements.length > 0 ? (
                <ul className="drawer__elements-list">
                  {keyElements.map((el) => (
                    <li key={el.id} className="drawer__element">
                      <span className="drawer__element-text">{el.text}</span>
                      <span
                        className={`drawer__badge drawer__badge--${el.type}`}
                        aria-hidden="true"
                      >
                        {el.type}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="drawer__empty">
                  <p>No key elements documented for this page.</p>
                </div>
              )}
            </section>

            <section className="drawer__section drawer__details">
              <h3 className="drawer__label">Detailed Flow Information</h3>
              <p className="drawer__small">
                This section would contain history, access metrics, or full component tree data from a
                real application.
              </p>
            </section>
          </div>
        ) : (
          <div className="drawer__empty-state">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="drawer__empty-icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="drawer__empty-text">Click on any page node to view its detailed information here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailsDrawer;
