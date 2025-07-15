import { useState, useRef, useEffect } from 'react'

export function FilterSlider({ filters, onChange, filterBy }) {
    const filterItemsRef = useRef(null)
    const [isEnd, setIsEnd] = useState(false)
    const [isStart, setIsStart] = useState(true)

    useEffect(() => {
        const handleScroll = () => {
            if (!filterItemsRef.current) return
            const { scrollLeft, scrollWidth, clientWidth } = filterItemsRef.current
            setIsEnd(Math.round(scrollLeft) === Math.round(scrollWidth - clientWidth))
            setIsStart(scrollLeft === 0)
        }

        if (filterItemsRef.current) {
            filterItemsRef.current.addEventListener('scroll', handleScroll)
        }

        return () => {
            filterItemsRef.current?.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const onScrollFilters = (direction) => {
        if (filterItemsRef.current) {
            const { clientWidth } = filterItemsRef.current
            filterItemsRef.current.scrollLeft += clientWidth * 0.6 * direction
        }
    }

    return (
        <section className={`filter-slider ${!isStart ? 'before-shown' : ''} ${isEnd ? 'after-hidden' : ''}`}>
            <button
                onClick={() => onScrollFilters(-1)}
                className={`filters-nav-btn prev-filters-btn ${!isStart ? 'shown' : ''}`}
            >
                <img src="https://res.cloudinary.com/dzm5wsscb/image/upload/v1750261978/asset_151.svg" alt="previous" />
            </button>
            <div className="filter-items flex" ref={filterItemsRef}>
                {filters.map(filter => (
                    <label key={filter.title}>
                        <div
                            className={`filter-widget ${filterBy.label === filter.title ? 'active' : ''}`}
                        >
                            <img src={filter.img} alt={filter.title} />
                            <p>{filter.title}</p>
                            <input
                                type="radio"
                                name="label"
                                value={filter.title}
                                onChange={onChange}
                                checked={filterBy.label === filter.title}
                            />
                        </div>
                    </label>
                ))}
            </div>
            <button
                onClick={() => onScrollFilters(1)}
                className={`filters-nav-btn next-filters-btn ${!isEnd ? 'shown' : ''}`}
            >
                <img src="https://res.cloudinary.com/dzm5wsscb/image/upload/v1750261978/asset_152.svg" alt="next" />
            </button>
        </section>
    )
}
