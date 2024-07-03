import { ref } from 'hywer/jsx-runtime';
import './styles.css'
import SendIcon from '@/ui/icons/send';


interface SendBarProps {
    onSend: () => void;
}

export default function SendBar({onSend}: SendBarProps) {
    function showAddMenu() {

    }

    function onInputPostText() {

    }

    const isDisabledButton = ref(false)


    return (
        <div class="sendBar">
            <div class="editBlock">
                <div class="inputArea">
                    
                    <button class="showAddMenuButton" onClick={showAddMenu}>
                        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20ZM9 5C9 4.44771 9.44772 4 10 4C10.5523 4 11 4.44772 11 5V9H15C15.5523 9 16 9.44772 16 10C16 10.5523 15.5523 11 15 11H11V15C11 15.5523 10.5523 16 10 16C9.44772 16 9 15.5523 9 15V11H5C4.44771 11 4 10.5523 4 10C4 9.44772 4.44772 9 5 9H9V5Z"/>
                        </svg>
                    </button>

                    <div onInput={onInputPostText} contentEditable={true} class="textInput">
                        {/* <Show when={props.type == 'edit' && props.comment}>
                            {props.comment?.text}
                        </Show> */}
                    </div>
                </div>

                <div class="buttons">

                    <button class="sendPostButton" disabled={isDisabledButton.derive(val => val)} onClick={onSend}>
                        <SendIcon />
                    </button>

                    {/* <div class="postButtons">
                        <Switch>
                            <Match when={props.type == "create"}>
                                <button class="sendPostButton" disabled={isDisabledButton()} onClick={sendPost}>
                                    <svg viewBox="0 0 440 500" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M426.256 273.155C444.256 262.763 444.256 236.782 426.256 226.39L40.5535 3.70439C19.6123 -8.38601 -5.44205 11.0325 1.0425 34.3276L43.4521 186.68C46.5644 197.861 55.8462 206.243 67.2851 208.204L265.358 242.154C273.115 243.483 273.115 254.623 265.358 255.952L67.7059 289.83C56.2671 291.791 46.9852 300.173 43.8729 311.354L1.04252 465.218C-5.44203 488.513 19.6124 507.932 40.5536 495.841L426.256 273.155Z"/>
                                    </svg>
                                </button>
                            </Match>
                            <Match when={props.type == "edit" && props.comment}>
                                <button class="cancelButton" onClick={() => {setIsDisabledButton(true); setMedia([]); props.onCancelEdit()}}>
                                    <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_2991_200)">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M34.4263 6.14209C33.45 5.16578 31.867 5.16578 30.8907 6.14209L20.2841 16.7487L9.67758 6.14213C8.70127 5.16582 7.11836 5.16582 6.14205 6.14213C5.16573 7.11844 5.16573 8.70136 6.14205 9.67767L16.7486 20.2842L6.14199 30.8908C5.16568 31.8671 5.16568 33.45 6.14199 34.4264C7.1183 35.4027 8.70122 35.4027 9.67753 34.4264L20.2841 23.8198L30.8908 34.4264C31.8671 35.4027 33.45 35.4027 34.4263 34.4264C35.4026 33.4501 35.4026 31.8672 34.4263 30.8909L23.8197 20.2842L34.4263 9.67762C35.4026 8.70131 35.4026 7.1184 34.4263 6.14209Z"/>
                                        </g>
                                        <defs>
                                        <clipPath id="clip0_2991_200">
                                        <rect width="40" height="40" fill="white"/>
                                        </clipPath>
                                        </defs>
                                    </svg>
                                </button>
                                <button class="sendPostButton" disabled={isDisabledButton()} onClick={editPost}>
                                    <svg viewBox="0 0 41 31" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M13.1421 24.3552L36.1231 1.37428C37.0995 0.397862 38.6824 0.398035 39.6586 1.37428C40.6349 2.35052 40.6351 3.9334 39.6586 4.90981L14.9099 29.6585C13.9335 30.635 12.3506 30.6348 11.3744 29.6585L0.767767 19.0519C-0.208475 18.0757 -0.208648 16.4928 0.767767 15.5164C1.74418 14.54 3.32706 14.5402 4.3033 15.5164L13.1421 24.3552Z" />
                                    </svg>
                                </button>
                            </Match>
                        </Switch>
                    </div> */}

                </div>
            </div>
        </div>
    )
}