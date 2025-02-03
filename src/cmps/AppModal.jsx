import { useDispatch } from 'react-redux'
import { CLOSE_APP_MODAL, REMOVE_FOCUSED_MODAL } from '../store/reducers/system.reducer.js'
import { ModalContent } from './DynamicModal'
import { useClickOutside } from '../customHooks/useCloseModule.jsx'

export function AppModal({ stay, modalType, isModalActive, setIsModalActive, modalHeaderContent, reviewIdxToScroll, amenitiesToRender }) {
    const modalRef = useClickOutside(onModalClickOutside)
    const dispatch = useDispatch()

    function onModalClickOutside(event) {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            setIsModalActive(false);
        }
    }

    function onModalClick(event) {
        event.stopPropagation()
    }

    function onClose() {
        dispatch({ type: CLOSE_APP_MODAL })
        dispatch({ type: REMOVE_FOCUSED_MODAL })
        setIsModalActive(false)
        document.body.classList.remove('modal-open')
    }

    return (
        <>
            {isModalActive &&
                <div className="modal-container main-container stay" onClick={onClose}>

                    <div className="modal" onClick={onModalClick}>
                        <div className="modal-header">
                            <button className='modal-close-btn' onClick={onClose}>
                                <img src='https://res.cloudinary.com/do0a92wpm/image/upload/v1699218785/close-btn_xugogt.svg' />
                            </button>
                            {modalHeaderContent}
                        </div>
                        <div className="modal-content">
                            <ModalContent stay={stay} modalType={modalType} onClose={onClose} reviewIdxToScroll={reviewIdxToScroll} />
                        </div>

                    </div>

                </div>
            }
        </>
    )
}