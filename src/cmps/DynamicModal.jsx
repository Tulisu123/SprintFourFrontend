import { SET_APP_MODAL_REVIEWS } from "../store/reducers/system.reducer.js";
import { SET_APP_MODAL_AMENITIES } from "../store/reducers/system.reducer.js";
import { ReviewsModal } from "./ReviewsModal.jsx";
import { AmenitiesModal } from "./AmenitiesModal.jsx";

export function ModalContent({ modalType, stay, onClose, reviewIdxToScroll, amenitiesToRender }) {

    switch (modalType) {

        // case SET_APP_MODAL_LOGIN:
        // return <SignupModal onClose={ onClose } />
        // case SET_APP_MODAL_SIGNUP:
        // return <SignupModal onClose={ onClose } />
        // case SET_APP_MODAL_ABOUT:
        // return <AboutModal stay={ stay } />
        case SET_APP_MODAL_AMENITIES:
            return <AmenitiesModal stay={stay} isModalActive={true} />
        case SET_APP_MODAL_REVIEWS:
            return <ReviewsModal stay={stay} isModalActive={true} reviewIdxToScroll={reviewIdxToScroll} />
        default: return

    }

}