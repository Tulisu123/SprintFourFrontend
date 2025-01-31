import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

export function PhotosPage() {
    const location = useLocation()
    const navigate = useNavigate()
    const { imgUrls } = location.state || { imgUrls: [] }
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(null);

    useEffect(() => {
        if (!imgUrls.length) {
            navigate(-1)
        }
    }, [imgUrls, navigate])

    const openModal = (index) => {
        setIsModalOpen(true)
        setCurrentImageIndex(index)
        document.body.style.overflow = "hidden"
    }

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentImageIndex(null)
        document.body.style.overflow = "auto"
    }

    const navigatePrev = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? imgUrls.length - 1 : prevIndex - 1
        )
    }

    const navigateNext = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === imgUrls.length - 1 ? 0 : prevIndex + 1
        )
    }

    return (
        <div className="photo-gallery-page">
            <header className="app-header">
                <button className="back-btn" onClick={() => navigate(-1)}>
                    <img
                        src="/src/assets/icons/arrow_back_ios_24dp_000000_FILL0_wght400_GRAD0_opsz24.png"
                        className="icon"
                        alt="Back"
                    />
                </button>
                <div className="actions-container">
                    <button className="action-btn">
                        <i className="fa-solid fa-arrow-up-from-bracket"></i>
                        <span className="action-text">Share</span>
                    </button>
                    <button className="action-btn">
                        <i className="fa-regular fa-heart"></i>
                        <span className="action-text">Save</span>
                    </button>
                </div>
            </header>
            <div className="photo-gallery">
                {imgUrls.map((url, index) => (
                    <img
                        key={index}
                        src={url}
                        alt={`Photo ${index + 1}`}
                        className={`photo-item div${(index % 5) + 1}`}
                        onClick={() => openModal(index)}
                    />
                ))}
            </div>
            {isModalOpen && (
                <div className="modal">
                    <button className="close-btn" onClick={closeModal}>
                        <span>X</span> Close
                    </button>
                    <div className="image-counter">
                        {currentImageIndex + 1} / {imgUrls.length}
                    </div>
                    <div className="modal-content">
                        <img
                            src={imgUrls[currentImageIndex]}
                            alt={`Photo ${currentImageIndex + 1}`}
                        />
                    </div>
                    <button className="navigation prev" onClick={navigatePrev}>
                        {/* Left arrow */}
                        <img
                            src="/src/assets/icons/chevron_left_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png"
                            className="icon"
                            alt="Left arrow"
                        />
                    </button>
                    <button className="navigation next" onClick={navigateNext}>
                        {/* Right arrow */}
                        <img
                            src="/src/assets/icons/chevron_right_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png"
                            className="icon"
                            alt="Right arrow"
                        />
                    </button>
                </div>
            )}
        </div >
    )
}