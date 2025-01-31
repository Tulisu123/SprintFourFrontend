import { useState } from 'react'

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
                        {user?.fullname ?
                            <div className='user-profile-letter'>
                                <div>{user.fullname[0].toUpperCase()}</div>
                            </div>
                            :
                            <svg className="user-controls-profile" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"
                                style={{
                                    display: 'block',
                                    fill: 'currentcolor',
                                    overflow: 'visible',
                                }}>
                                <path d="M16 .7C7.56.7.7 7.56.7 16S7.56 31.3 16 31.3 31.3 24.44 31.3 16 24.44.7 16 .7zm0 28c-4.02 0-7.6-1.88-9.93-4.81a12.43 12.43 0 0 1 6.45-4.4A6.5 6.5 0 0 1 9.5 14a6.5 6.5 0 0 1 13 0 6.51 6.51 0 0 1-3.02 5.5 12.42 12.42 0 0 1 6.45 4.4A12.67 12.67 0 0 1 16 28.7z"></path>
                            </svg>}

                    </div>
                </button>
            </div>
        </>
    )
}