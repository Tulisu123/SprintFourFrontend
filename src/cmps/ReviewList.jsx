import { use, useEffect } from "react";
import { makeId } from "../services/util.service.js";
import { SET_APP_MODAL_REVIEWS } from "../store/reducers/system.reducer.js";

export function ReviewList({ stay, handleShowMore, isModalActive, setReviewIdxToScroll, reviewIdxToScroll }) {
    const reviews = (isModalActive) ? stay.reviews : stay.reviews.slice(0, 6)
    useEffect(() => {
        if (!isModalActive) return
        if (reviewIdxToScroll === 0) return
        const reviewEl = document.querySelector('.stay-review-preview.' + CSS.escape(`${reviewIdxToScroll}`))
        reviewEl.scrollIntoView({ behavior: 'instant', block: 'start' })
    }, [])

    return (
        <div className={`stay-review-list  ${isModalActive ? 'isModal' : ''}`}>
            {reviews.map((review, idx) => {
                const reviewDate = new Date(review.at)
                const month = reviewDate.toLocaleString('default', { month: 'long' })
                const reviewYear = reviewDate.getFullYear()
                const thisYear = new Date().getFullYear()
                const yearsAgo = thisYear - reviewYear

                return (
                    <section className={`stay-review-preview ${(idx <= 5) ? `${idx}` : ''}`} key={makeId()}>

                        <article className="review-user">
                            <section className="review-img-container">
                                <img src={review.by.imgUrl} />
                            </section>
                            <section className="review-user-details">
                                <h3>{review.by.fullname}</h3>
                                <span className="years-ago">{`${yearsAgo} years on Airbnb`}</span>
                            </section>
                        </article>
                        <article className="flex">
                            <span className="stars">
                                <img src='https://res.cloudinary.com/dzm5wsscb/image/upload/v1750261995/asset_158.svg' />
                                <img src='https://res.cloudinary.com/dzm5wsscb/image/upload/v1750261995/asset_158.svg'
                                    className={(review.rate >= 2) ? '' : 'is-gray'} />
                                <img src='https://res.cloudinary.com/dzm5wsscb/image/upload/v1750261995/asset_158.svg'
                                    className={(review.rate >= 3) ? '' : 'is-gray'} />
                                <img src='https://res.cloudinary.com/dzm5wsscb/image/upload/v1750261995/asset_158.svg'
                                    className={(review.rate >= 4) ? '' : 'is-gray'} />
                                <img src='https://res.cloudinary.com/dzm5wsscb/image/upload/v1750261995/asset_158.svg'
                                    className={(review.rate === 5) ? '' : 'is-gray'} />
                            </span>
                            <span className="dot">·</span>
                            <span className="date">{month} {reviewYear}</span>
                            <span className="dot">·</span>
                            <span className="stayed">Stayed a few nights</span>
                        </article>

                        <article className="review-content">
                            <section>
                                <div className={isModalActive ? "isModal" : ""}>
                                    {review.txt}
                                </div>
                                {!isModalActive &&
                                    <div>
                                        <a className="bold-text nostyle underline"
                                            onClick={() => {
                                                setReviewIdxToScroll(idx)
                                                handleShowMore(SET_APP_MODAL_REVIEWS)
                                            }}>
                                            Show More
                                        </a>
                                    </div>}
                            </section>
                        </article>
                    </section>
                )
            })}
        </div >
    )
}