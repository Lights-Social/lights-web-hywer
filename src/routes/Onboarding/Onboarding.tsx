// import { useNavigate } from '@solidjs/router';
import { store } from '@/data';
import './styles.css'
// import { Match, Switch, createSignal } from 'solid-js';
// import { useI18n } from '@solid-primitives/i18n';
import VerifyCodeInput from './VerifyCodeInput/VerifyCodeInput';

import { navigateTo } from "hywer/x/router"
import { ref } from 'hywer/jsx-runtime';
import ServiceUnavailableModal from './ServiceUnavailableModal';
import { openModal } from '@/ui/Modal/Modal';


function OnBoarding() {

    const {strings} = store.locale()
    //const navigate = useNavigate();

    const loginStep = ref("email")

    let email = ""

    async function requestCode(e: SubmitEvent) {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)

        email = formData.get("email") as string

        const response = await store.auth.requestCode(email)

        if (response) {
            loginStep.val = "code"
        } else {
            openModal("serviceUnavailableModal", [7,7,7,7], false)
        }

    }

    const goToMain = async() => {
        navigateTo(`/home`, { replace: false })

        // if (!document.startViewTransition) {
        //     navigateTo(`/home`, { replace: false })
        //     return;
        // }
    
        // document.documentElement.classList.add("onboardingStep");
    
    
        // const transition: any = document.startViewTransition(() => navigate(`/home`, { replace: false }));
    
        
        // try {
        //     await transition.finished;
        // } finally {
        //     document.documentElement.classList.remove('onboardingStep');
        // }
    
    }


    function EmailStep() {
        return (
            <>
                <div class="title">
                    {/* <svg viewBox="0 0 90 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M90 12.8484L45.4607 40.1111C45.1769 40.2849 44.8231 40.2849 44.5393 40.1111L0 12.8484V9.24591C0 4.13954 4.02944 0 9 0H81C85.9704 0 90 4.13954 90 9.24591V12.8484ZM90 21.4585V60.0982C90 65.2048 85.9708 69.3443 81 69.3443H9C4.02944 69.3443 0 65.2048 0 60.0982V21.4585L40.8541 46.4655C43.4084 48.0292 46.5916 48.0292 49.1459 46.4655L90 21.4585Z" fill="url(#paint0_radial_3058_163)"/>
                        <defs>
                        <radialGradient id="paint0_radial_3058_163" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(45 16.5) rotate(90) scale(52.8443 68.5851)">
                        <stop stop-color="#FD97A0"/>
                        <stop offset="1" stop-color="#FF6C79"/>
                        </radialGradient>
                        </defs>
                    </svg> */}



                    <span class="titleText">{strings["yourEmail"]}</span>
                    <span class="description">
                        {/* {t("enterCodeDescription")} */}
                    </span>
                </div>
                <form id="emailForm" onSubmit={requestCode}>
                    <input value={email} required name="email" inputMode="email" placeholder="example@domain.loc" type="email" />

                    <button type="submit">Next</button>
                </form>
                
            </>
        )
    } 

    return (
        <>
            <ServiceUnavailableModal />
            <main class="login">
                <div class='window'>
                    {
                        loginStep.derive((step) => {
                            switch (step) {
                                case "email": return <EmailStep />
                                case "code": return <VerifyCodeInput onDone={goToMain} email={email} />
                            }
                        })
                    }
                </div>
                
                {/* <input type="text" ref={ref} />

                <button onClick={() => pizda()}>іди нахуй</button> */}
            </main>
        </>
    )
}

export default OnBoarding;