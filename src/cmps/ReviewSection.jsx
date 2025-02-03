import { ReviewsModal } from "./ReviewsModal.jsx";
import { SET_APP_MODAL_REVIEWS } from "../store/reducers/system.reducer.js";
import { ReviewList } from "./ReviewList.jsx";

export function ReviewSection({ stay, handleShowMore, isModalActive, setReviewIdxToScroll }) {
    return (
        <div className="stay-review-container">
            <section className="stay-review-header">
                <img src='../../src/assets/assets/icons/general icons/asset 158.svg' />
                <p>5.0 · {stay.reviews.length} review{stay.reviews.length > 1 && 's'}</p>
            </section>

            <ReviewList stay={stay} isModalActive={isModalActive} handleShowMore={handleShowMore} setReviewIdxToScroll={setReviewIdxToScroll} />
            {/* <button> */}
            <button className="regular-white-btn" onClick={() => handleShowMore(SET_APP_MODAL_REVIEWS)} >
                Show all {stay.reviews.length} reviews
            </button>
            {/* </button> */}
            {/* <ReviewsModal stay={stay} /> */}
        </div >
    )
}