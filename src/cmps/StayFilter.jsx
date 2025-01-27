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
                        { title: 'OMG!', img: '../../src/assets/assets/icons/filter bar icons/asset 6.jpeg' },
                        { title: 'Icons', img: '../../src/assets/assets/icons/filter bar icons/asset 7.webp' },
                        { title: 'Castles', img: '../../src/assets/assets/icons/filter bar icons/asset 8.jpeg' },
                        { title: 'Beahcfront', img: '../../src/assets/assets/icons/filter bar icons/asset 9.jpeg' },
                        { title: 'Bed & breakfasts', img: '../../src/assets/assets/icons/filter bar icons/asset 10.jpeg' },
                        { title: 'Desert', img: '../../src/assets/assets/icons/filter bar icons/asset 11.jpeg' },
                        { title: 'Amazing views', img: '../../src/assets/assets/icons/filter bar icons/asset 12.jpeg' },
                        { title: 'Amazing pools', img: '../../src/assets/assets/icons/filter bar icons/asset 13.jpeg' },
                        { title: 'Mansions', img: '../../src/assets/assets/icons/filter bar icons/asset 14.jpeg' },
                        { title: 'Cabins', img: '../../src/assets/assets/icons/filter bar icons/asset 15.jpeg' },
                        { title: 'Countryside', img: '../../src/assets/assets/icons/filter bar icons/asset 16.jpeg' },
                        { title: 'Lakefront', img: '../../src/assets/assets/icons/filter bar icons/asset 17.jpeg' },
                        { title: 'Design', img: '../../src/assets/assets/icons/filter bar icons/asset 19.jpeg' },
                        { title: 'Off-the-grid', img: '../../src/assets/assets/icons/filter bar icons/asset 20.jpeg' },
                        { title: 'Farms', img: '../../src/assets/assets/icons/filter bar icons/asset 21.jpeg' },
                        { title: 'Trending', img: '../../src/assets/assets/icons/filter bar icons/asset 22.jpeg' },
                        { title: 'Treehouses', img: '../../src/assets/assets/icons/filter bar icons/asset 23.jpeg' },
                        { title: 'Luxe', img: '../../src/assets/assets/icons/filter bar icons/asset 24.jpeg' },
                        { title: 'Top cities', img: '../../src/assets/assets/icons/filter bar icons/asset 25.jpeg' },
                        { title: 'Tiny homes', img: '../../src/assets/assets/icons/filter bar icons/asset 26.jpeg' },
                        { title: 'Tropical', img: '../../src/assets/assets/icons/filter bar icons/asset 27.jpeg' },
                    ]}
                    onFilterChange={(filter) => setFiterBy(filter)} // Pass directly to setFiterBy
                    filterBy={filterBy}
                    onChange={handleChange}
                />
            </div>
        </div>
    )
}
