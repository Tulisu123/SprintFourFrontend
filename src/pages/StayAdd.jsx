import { NavLink } from "react-router-dom";
import Logo from "../cmps/Logo";
import { useState } from "react";


export function StayAdd() {
    const [view, setView] = useState('initial');

    function onAddLabel(label){
        console.log(label)
    }

    return (
        <section className="add-flow">
            {/* Header */}
            <header>
                <NavLink>
                    <Logo />
                </NavLink>
                <div className="exit">
                    <button>Exit</button>
                </div>
            </header>

            {/* Main Content */}
            <main className={`main-content ${view}`}>
                {view === 'initial' && (
                    <>
                        <div className="desc-container">
                            <p className="desc">It’s easy to get started on Airbnb</p>

                        </div>
                        <div className="details">
                            <div className="item item-one">
                                <div className="item-desc">
                                    <h1><span>1</span> Tell us about your place</h1>
                                    <p>Share some basic info, like where it is and how many guests can stay.</p>
                                </div>
                                <img src="https://a0.muscache.com/4ea/air/v2/pictures/da2e1a40-a92b-449e-8575-d8208cc5d409.jpg" alt="" />
                            </div>
                            <div className="item item-two">
                                <div className="item-desc">
                                    <h1><span>2</span> Make it stand out</h1>
                                    <p>Add 5 or more photos plus a title and description—we’ll help you out.</p>
                                </div>
                                <img src="https://a0.muscache.com/4ea/air/v2/pictures/bfc0bc89-58cb-4525-a26e-7b23b750ee00.jpg" alt="" />
                            </div>
                            <div className="item item-three">
                                <div className="item-desc">
                                    <h1><span>3</span> Finish up and publish</h1>
                                    <p>Choose a starting price, verify a few details, then publish your listing.</p>
                                </div>
                                <img src="https://a0.muscache.com/4ea/air/v2/pictures/c0634c73-9109-4710-8968-3e927df1191c.jpg" alt="" />
                            </div>
                        </div>
                    </>
                )}

                {view === 'labels' && (
                    <div className="labels-view">
                        <div className="desc-container"><p className="desc">Which of these best describes your place?</p></div>
                        
                        <div className="labels-grid">
                            {[
                                'House',
                                'Apartment',
                                'Barn',
                                'Bed & breakfast',
                                'Boat',
                                'Cabin',
                                'Camper/RV',
                                'Casa particular',
                                'Castle',
                                'Cave',
                                'Container',
                                'Cycladic home',
                                'Dammuso',
                                'Dome',
                                'Earth home',
                            ].map((label) => (
                                <div className="label-item" key={label} onClick={()=> onAddLabel(label)}>
                                    {/* <img
                                        src={`/path-to-icons/${label.toLowerCase().replace(/\s+/g, '-')}.png`}
                                        alt={label}
                                    /> */}
                                    <span>{label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer>
                {view === 'initial' ? (
                    <button onClick={() => setView('labels')} className="reserve-btn">
                        Get started
                    </button>
                ) : (
                    <button onClick={() => setView('initial')} className="reserve-btn">
                        Back
                    </button>
                )}
            </footer>
        </section>
    );
}