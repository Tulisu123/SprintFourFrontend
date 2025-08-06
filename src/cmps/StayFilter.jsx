import { useEffect } from 'react'
import { FilterSlider } from '../cmps/FilterBar'
import { useSelector } from 'react-redux'
import { setFiterBy } from '../store/actions/stay.actions'

export function StayFilter() {
    const filterBy = useSelector((storeState) => storeState.stayModule.filterBy)

    // Modify the current filterBy and pass it to setFiterBy
    function handleChange(ev) {
        const type = ev.target.type
        const field = ev.target.name
        let value

        switch (type) {
            case 'text':
            case 'radio':
                value = field === 'sortDir' ? +ev.target.value : ev.target.value
                if (!filterBy.sortDir) filterBy.sortDir = 1
                break
            case 'number':
                value = +ev.target.value || ''
                break
            default:
                return
        }

        // Create a new filterBy object with the updated field
        const updatedFilterBy = { ...filterBy, [field]: value }
        setFiterBy(updatedFilterBy)
    }

    function clearFilter() {
        // Reset specific fields to default values
        const clearedFilterBy = { ...filterBy, txt: '', minCapacity: '', maxPrice: '' }
        setFiterBy(clearedFilterBy)
    }

    return (
        <div className="filters main-layout">
            <div className="wrapper">
                <FilterSlider
                    filters={[
                        { title: 'OMG!', img: 'https://res.cloudinary.com/dzm5wsscb/image/upload/v1750261964/asset_6.png' },
                        { title: 'Icons', img: 'https://res.cloudinary.com/dzm5wsscb/image/upload/v1750261964/asset_7.webp' },
                        { title: 'Castles', img: 'https://res.cloudinary.com/dzm5wsscb/image/upload/v1750261964/asset_8.png' },
                        { title: 'Beahcfront', img: 'https://res.cloudinary.com/dzm5wsscb/image/upload/v1750261964/asset_9.png' },
                        { title: 'Bed & breakfasts', img: 'https://res.cloudinary.com/dzm5wsscb/image/upload/v1750261964/asset_10.png' },
                        { title: 'Desert', img: 'https://res.cloudinary.com/dzm5wsscb/image/upload/v1750261964/asset_11.png' },
                        { title: 'Amazing views', img: 'https://res.cloudinary.com/dzm5wsscb/image/upload/v1750261964/asset_12.png' },
                        { title: 'Amazing pools', img: 'https://res.cloudinary.com/dzm5wsscb/image/upload/v1750261964/asset_13.png' },
                        { title: 'Mansions', img: 'https://res.cloudinary.com/dzm5wsscb/image/upload/v1750261964/asset_14.png' },
                        { title: 'Cabins', img: 'https://res.cloudinary.com/dzm5wsscb/image/upload/v1750261964/asset_15.png' },
                        { title: 'Countryside', img: 'https://res.cloudinary.com/dzm5wsscb/image/upload/v1750261964/asset_16.png' },
                        { title: 'Lakefront', img: 'https://res.cloudinary.com/dzm5wsscb/image/upload/v1750261964/asset_17.png' },
                        { title: 'Design', img: 'https://res.cloudinary.com/dzm5wsscb/image/upload/v1750261964/asset_19.png' },
                        { title: 'Off-the-grid', img: 'https://res.cloudinary.com/dzm5wsscb/image/upload/v1750261964/asset_20.png' },
                        { title: 'Farms', img: 'https://res.cloudinary.com/dzm5wsscb/image/upload/v1750261964/asset_21.png' },
                        { title: 'Trending', img: 'https://res.cloudinary.com/dzm5wsscb/image/upload/v1750261964/asset_22.png' },
                        { title: 'Treehouses', img: 'https://res.cloudinary.com/dzm5wsscb/image/upload/v1750261964/asset_23.png' },
                        { title: 'Luxe', img: 'https://res.cloudinary.com/dzm5wsscb/image/upload/v1750261964/asset_24.png' },
                        { title: 'Top cities', img: 'https://res.cloudinary.com/dzm5wsscb/image/upload/v1750261964/asset_25.png' },
                        { title: 'Tiny homes', img: 'https://res.cloudinary.com/dzm5wsscb/image/upload/v1750261964/asset_26.png' },
                        { title: 'Tropical', img: 'https://res.cloudinary.com/dzm5wsscb/image/upload/v1750261964/asset_27.png' },
                    ]}
                    onFilterChange={(filter) => setFiterBy(filter)} // Pass directly to setFiterBy
                    filterBy={filterBy}
                    onChange={handleChange}
                />
            </div>
        </div>
    )
}
