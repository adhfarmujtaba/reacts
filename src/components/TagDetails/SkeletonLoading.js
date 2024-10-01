import React from 'react';


const SkeletonLoading = () => {
    // Define the number of skeleton rows you want to render
    const numberOfSkeletonRows = 5;

    // Render skeleton rows
    return (
        <div className="skeleton-loading-container">
            {Array.from({ length: numberOfSkeletonRows }).map((_, index) => (
                <div className="skeleton-row" key={index}>
                    <div className="skeleton-image"></div>
                    <div className="skeleton-text">
                        <div className="skeleton-title"></div>
                        <div className="skeleton-description"></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SkeletonLoading;
