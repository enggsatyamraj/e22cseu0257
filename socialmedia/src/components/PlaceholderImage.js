'use client';

// src/components/ui/PlaceholderImage.js
import React from 'react';

/**
 * A component that renders a placeholder image with custom dimensions
 * 
 * @param {Object} props - Component props
 * @param {number} props.width - Width of the placeholder
 * @param {number} props.height - Height of the placeholder
 * @param {string} props.text - Optional text to display on the placeholder
 * @param {string} props.bgColor - Background color for the placeholder
 * @param {string} props.textColor - Text color for the placeholder
 * @param {string} props.className - Additional CSS classes
 */
export default function PlaceholderImage({
    width = 400,
    height = 300,
    text = '',
    bgColor = '#f0f0f0',
    textColor = '#666666',
    className = '',
}) {
    return (
        <div
            className={`flex items-center justify-center overflow-hidden ${className}`}
            style={{
                width: `${width}px`,
                height: `${height}px`,
                backgroundColor: bgColor,
                color: textColor,
            }}
        >
            <div className="text-center p-4">
                {text || `${width} × ${height}`}
            </div>
        </div>
    );
}

/**
 * Utility function to get a placeholder image URL from the API
 * 
 * @param {number} width - Width of the placeholder image
 * @param {number} height - Height of the placeholder image
 * @returns {string} Placeholder image URL
 */
export function getPlaceholderImageUrl(width = 400, height = 300) {
    return `/api/placeholder/${width}/${height}`;
}