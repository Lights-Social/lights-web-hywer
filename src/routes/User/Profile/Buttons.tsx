import { openModal } from "@/ui/Modal/Modal";
import MessengerIcon from '@/ui/icons/messenger'
import MapIcon from '@/ui/icons/map'
import MapErrorModal from "@/ui/MapErrorModal";
import MessengerErrorModal from "@/ui/MessengerErrorModal";
import { store } from "@/data";

export default function Buttons() {
    const isAuthorized = store.auth.isAuthorized()

    
    return (
        <>
            <MapErrorModal />
            <MessengerErrorModal />
            <div class="buttons">
                {/* <Show when={props.profile.id == account?.id}>
                    <button onClick={() => navigate(`/settings`, { replace: false })}>
                        <svg viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.760746 10.3597L1.94041 10.3671C2.11681 11.2748 2.46593 12.1568 2.99512 12.9579L2.15723 13.7885C1.85588 14.0861 1.85588 14.5676 2.14988 14.8689L3.05392 15.784C3.35159 16.0853 3.83301 16.0853 4.13436 15.7913L4.97225 14.9608C5.76604 15.4973 6.64435 15.8611 7.55207 16.0449L7.54472 17.2246C7.54104 17.6472 7.88281 17.9889 8.30543 17.9926L9.59167 18C10.0143 18.0036 10.3561 17.6619 10.3597 17.2393L10.3671 16.0596C11.2748 15.8832 12.1568 15.5341 12.9579 15.0049L13.7885 15.8428C14.0861 16.1441 14.5676 16.1441 14.8689 15.8501L15.784 14.9461C16.0853 14.6484 16.0853 14.167 15.7913 13.8656L14.9608 13.0278C15.4973 12.234 15.8611 11.3556 16.0449 10.4479L17.2246 10.4553C17.6472 10.459 17.9889 10.1172 17.9926 9.69457L18 8.40833C18.0036 7.98571 17.6619 7.64394 17.2393 7.64027L16.0596 7.63292C15.8832 6.7252 15.5341 5.84321 15.0049 5.04207L15.8428 4.21153C16.1441 3.91386 16.1441 3.43244 15.8501 3.13109L14.9461 2.21603C14.6484 1.91468 14.167 1.91468 13.8656 2.20868L13.0278 3.03922C12.234 2.50268 11.3556 2.13885 10.4479 1.95511L10.4553 0.775445C10.459 0.352825 10.1172 0.0110542 9.69457 0.00737928L8.40833 2.93614e-05C7.98571 -0.0036456 7.64394 0.338125 7.64027 0.760746L7.62924 1.94041C6.71785 2.11681 5.83586 2.46593 5.0384 2.99512L4.20786 2.15723C3.91018 1.85588 3.42876 1.85588 3.12742 2.14988L2.21603 3.05392C1.91468 3.35159 1.91468 3.83301 2.20868 4.13436L3.03922 4.97225C2.50268 5.76604 2.13885 6.64435 1.95511 7.55207L0.775445 7.54472C0.352825 7.54104 0.0110542 7.88281 0.00737928 8.30543L2.93614e-05 9.59167C-0.0036456 10.0106 0.338125 10.3561 0.760746 10.3597ZM6.58923 6.5635C7.93426 5.23317 10.0988 5.24419 11.4291 6.58923C12.7595 7.93426 12.7485 10.0988 11.4034 11.4291C10.0584 12.7595 7.89384 12.7485 6.5635 11.4034C5.23317 10.0584 5.24419 7.89384 6.58923 6.5635Z"/>
                        </svg>
                    </button>
                </Show> */}
                {

                }
                {
                    isAuthorized ?
                    <>
                        <button onClick={(e: Event) => {e.stopPropagation(); openModal("messengerErrorModal", true, false)}}>
                            <MessengerIcon />
                        </button>
                        <button onClick={(e: Event) => {e.stopPropagation(); openModal("mapErrorModal", true, false)}}>
                            <MapIcon />
                        </button>

                        {/* <FriendshipButton user_id={props.profile.id} friendship_state={props.profile.friends.friendship_state} /> */}

                    </> : null
                }
            </div>
        </>
    )
}