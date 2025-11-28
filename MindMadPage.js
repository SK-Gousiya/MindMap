// App.js
import React, { useState, useEffect, useMemo } from 'react';
import './App.css'; // Import the new CSS file
import { fetchMindMapData } from './MindMapApi'; // Import the API function
import MindMapCanvas from './MindMapCanvas'; // Import the Canvas component
import DetailsDrawer from './DetailsDrawer'; // Import the Drawer component

/**
 * Page component that handles data fetching and state management for the Mind Map.
 */
const App = () => {
    const [mindMapData, setMindMapData] = useState({ pages: [], edges: [] });
    const [loading, setLoading] = useState(true);
    const [selectedPageId, setSelectedPageId] = useState(null);
    const [error, setError] = useState(null);

    // 1. Data Fetching
    useEffect(() => {
        setLoading(true);
        setError(null);
        fetchMindMapData()
            .then(data => {
                if (data && Array.isArray(data.pages) && Array.isArray(data.edges)) {
                    setMindMapData(data);
                } else {
                    throw new Error("API returned invalid data structure.");
                }
            })
            .catch(e => {
                console.error("Error fetching mind map data:", e);
                setError("Failed to load mind map data. Check console for details.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    // 2. Select Page Logic
    const handlePageSelect = (page) => {
        // If the same page is clicked, unselect it (close the drawer)
        if (page.id === selectedPageId) {
            setSelectedPageId(null);
        } else {
            setSelectedPageId(page.id);
        }
    };

    // 3. Find the currently selected page object for the drawer
    const selectedPage = useMemo(() => 
        mindMapData.pages.find(p => p.id === selectedPageId)
    , [mindMapData.pages, selectedPageId]);

    if (loading) {
        return (
            <div className="loading-state">
                <div className="text-center p-20 text-xl font-medium text-indigo-600">
                    <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-indigo-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Loading Application Flow Map...
                </div>
            </div>
        );
    }

    if (error) {
        return <div className="error-state">{error}</div>;
    }

    return (
        <div className="mindmap-page-layout">
            {/* Main Content Area: Canvas */}
            <div className={`mindmap-content ${selectedPageId ? 'has-drawer-open' : ''}`}>
                <MindMapCanvas
                    initialPages={mindMapData.pages}
                    initialEdges={mindMapData.edges}
                    selectedPageId={selectedPageId}
                    onPageSelect={handlePageSelect}
                />
            </div>

            {/* Side Drawer */}
            <DetailsDrawer 
                selectedPage={selectedPage}
                onClose={() => setSelectedPageId(null)}
            />
        </div>
    );
};

export default App;
