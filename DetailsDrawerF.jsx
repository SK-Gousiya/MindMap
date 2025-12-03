// DetailsDrawer.jsx
import React from 'react';

/**
 * Renders a side drawer to display details of the selected page.
 */
const DetailsDrawer = ({ selectedPage, onClose }) => {
    
    // Check if a page is selected
    if (!selectedPage) {
        // Render the empty state if no page is selected
        return (
            <div className="drawer details-drawer">
                <div className="drawer-empty-state">
                    <svg className="drawer-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        {/* Icon for empty state - e.g., a file or map icon */}
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 14l6-6m-6 0l6 6m-3-11v11m0 0H7v11h10V11h-4" />
                    </svg>
                    <p>Select a page node to view the detailed information here.</p>
                </div>
            </div>
        );
    }

    // Destructure required data
    const url = selectedPage.metadata?.url || 'N/A';
    const title = selectedPage.metadata?.title || 'N/A';
    const keyElements = selectedPage.metadata?.key_elements || [];
    const pageId = selectedPage.id;

    // Helper function to render element details
    const renderElementDetails = (element) => {
        const details = [];
        
        // 1. Element Tag
        if (element.tag) {
            details.push(<p key="tag" className="drawer-detail-item"><strong>Tag:</strong> <span className="drawer-detail-value">{element.tag.toUpperCase()}</span></p>);
        }

        // 2. Element Text/Label
        if (element.text) {
            details.push(<p key="text" className="drawer-detail-item"><strong>Text/Label:</strong> <span className="drawer-detail-value">{element.text}</span></p>);
        }
        
        // 3. ID Attribute
        if (element.id_attr) {
            details.push(<p key="id" className="drawer-detail-item"><strong>ID:</strong> <span className="drawer-detail-value">{element.id_attr}</span></p>);
        }

        // 4. Class Attribute
        if (element.class) {
            details.push(<p key="class" className="drawer-detail-item"><strong>Class:</strong> <span className="drawer-detail-value">{element.class}</span></p>);
        }

        // 5. Href (for links)
        if (element.href && element.type === 'link') {
            details.push(<p key="href" className="drawer-detail-item"><strong>Link (href):</strong> <a href={element.href} target="_blank" rel="noopener noreferrer" className="drawer-detail-link">{element.href}</a></p>);
        }
        
        // 6. Input Type (for inputs)
        if (element.input_type && element.type === 'input') {
            details.push(<p key="input_type" className="drawer-detail-item"><strong>Input Type:</strong> <span className="drawer-detail-value">{element.input_type}</span></p>);
        }
        
        // Handle cases where element has no specific details but is listed
        if (details.length === 0) {
             details.push(<p key="none" className="drawer-detail-item text-gray-500">No additional properties available.</p>);
        }

        return <div className="drawer-element-details">{details}</div>;
    };


    return (
        <div className={`drawer details-drawer ${selectedPage ? 'open' : ''}`}>
            <header className="drawer-header">
                <h2 className="drawer-page-title">Page Details: {selectedPage.label}</h2>
                <button onClick={onClose} className="drawer-close-btn">
                    <svg className="drawer-close-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </header>

            <div className="drawer-body">
                
                {/* Section: Basic Metadata */}
                <section className="drawer-section drawer-section-metadata">
                    <h3 className="drawer-section-title">Page Metadata</h3>
                    
                    <div className="drawer-section-content">
                        <p><strong>ID:</strong> <span className="drawer-metadata-value">{pageId}</span></p>
                        <p><strong>Title:</strong> <span className="drawer-metadata-value">{title}</span></p>
                        <p>
                            <strong>URL:</strong> 
                            <a href={url} target="_blank" rel="noopener noreferrer" className="drawer-detail-link">
                                <span className="drawer-metadata-value drawer-url">{url}</span>
                            </a>
                        </p>
                    </div>
                </section>

                {/* Section: Key Elements */}
                <section className="drawer-section drawer-section-key-elements">
                    <h3 className="drawer-section-title">
                        Key Elements 
                        <span className="drawer-badge drawer-element-count">({keyElements.length})</span>
                    </h3>
                    
                    {keyElements.length > 0 ? (
                        <ul className="drawer-elements-list">
                            {keyElements.map((el) => (
                                <li key={el.id} className="drawer-element-item">
                                    <div className="drawer-element-header">
                                        <span className={`drawer-badge drawer-badge-type drawer-type-${el.type || 'unknown'}`}>
                                            {el.type ? el.type.toUpperCase() : 'UNKNOWN TYPE'}
                                        </span>
                                        <span className="drawer-element-id">({el.id})</span>
                                    </div>
                                    
                                    {/* Detailed properties */}
                                    {renderElementDetails(el)}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="drawer-empty-message">
                            <p>No key elements documented for this page.</p>
                        </div>
                    )}
                </section>
                
            </div>
        </div>
    );
};

export default DetailsDrawer;
