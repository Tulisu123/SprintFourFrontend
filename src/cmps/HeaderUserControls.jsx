import { useState } from 'react'
import { ProfilePic } from './ProfilePic.jsx'
export function HeaderUserControls({ onToggleMenu, onAddStay, user }) {

    return (
        <>
            <div className="header-user-section">
                <button onClick={onAddStay} className="add">Airbnb your home</ button>
                <button className="user-controls" onClick={onToggleMenu}>
                    <div className="controls-container">
                        <svg className="user-controls-actions"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 32 32"
                            aria-hidden="true"
                            role="presentation"
                            focusable="false"
                            style={{
                                display: 'block',
                                fill: 'none',
                                height: '16px',
                                width: '16px',
                                stroke: 'currentcolor',
                                strokeWidth: '3',
                                overflow: 'visible',
                            }}
                        >
                            <g fill="none">
                                <path d="M2 16h28M2 24h28M2 8h28"></path>
                            </g>
                        </svg>
                        <button>
                            <ProfilePic person={user} />
                        </button>


                    </div>
                </button>
            </div>
        </>
    )
}