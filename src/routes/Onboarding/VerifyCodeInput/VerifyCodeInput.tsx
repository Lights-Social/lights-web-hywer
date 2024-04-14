//import { useI18n } from "@solid-primitives/i18n";

import { store } from "@/data";
import shake from "@/ui/shake";
import { ref } from "hywer/jsx-runtime";

interface FieldProps {
    id: number;
    onNext: (id: number) => void;
    onPrev: (id: number) => void
}

function Field(props: FieldProps) {
    function onInput(e: InputEvent) {
        const field = e.target as HTMLInputElement

        if (!e.data) return

        field.value = e.data?.replace(/[^0-9]/g, '')!

        if (field.value.length == 1) {

            props.onNext(props.id)
        } else {

            props.onPrev(props.id)
        }
    }

    function handleKeyDown(e: KeyboardEvent) {
        const field = e.target as HTMLInputElement

        if (e.key === 'Backspace' && field.value.length == 0) {
            props.onPrev(props.id)
            return
        }
        
    }

    return (
        <input autocomplete="one-time-code" autofocus={props.id == 1} inputMode="numeric" onKeyDown={handleKeyDown} onInput={onInput} type="number" min="0" max="9" id={"field_"+props.id} maxlength="1" />
    )
}

interface VerifyCodeInputProps {
    onDone: () => void;
    email: string;
}


export default function VerifyCodeInput(props: VerifyCodeInputProps ) {
    const {strings} = store.locale()


    function onNext(id: number) {

        const fields = document.querySelectorAll<HTMLInputElement>(`#field_1, #field_2, #field_3, #field_4, #field_5`)

        let count = 0
        fields.forEach((item) => {

            if (item.value != '') {
                count = count + 1
            }
            
        })

        if (count == 5) onDone()

        const newID = (Number(id)+1);

        if (newID > 5) {
            return;
        }


        const field = document.querySelector(`#field_${newID}`) as HTMLInputElement
        field.focus()
        
    }

    function onPrev(id: number) {

        const newID = (Number(id)-1);

        if (newID < 1) {
            return;
        }

        const field = document.querySelector(`#field_${newID}`) as HTMLInputElement
        field.focus()

    }

    async function onDone() {
        const codeInputElement = document.querySelector<HTMLDivElement>(".codeInput")
        
        let code = ""

        const fields = document.querySelectorAll<HTMLInputElement>(`#field_1, #field_2, #field_3, #field_4, #field_5`)
        fields.forEach((item) => {
            code = code + item.value
            item.blur()
        })

        codeInputElement?.classList.add("loading")

        const isValid = await store.auth.verifyCode(Number(code), props.email)
        
        codeInputElement?.classList.remove("loading")

        if (isValid) {
            codeInputElement!.classList.add("successful")

            setTimeout(() => {
                props.onDone()
            }, 500)
        } else {
            codeInputElement!.classList.add("failed")
            shake(codeInputElement!)



            setTimeout(() => {
                if (!codeInputElement) return;

                codeInputElement.classList.remove("failed")
                codeInputElement.classList.remove("loading")

                fields.forEach((item) => {
                    item.value = ""
                })

                fields[0].focus()

            }, 500)
        }


    }

    const timerValue = ref(3)
    const timer = setInterval(() => {
        timerValue.val = timerValue.val - 1

        if (timerValue.val <= 0) {
            clearInterval(timer)
        }
    }, 1000)
    
    

    return (
        <>
            <div class="title">

                <svg viewBox="0 0 90 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M90 12.8484L45.4607 40.1111C45.1769 40.2849 44.8231 40.2849 44.5393 40.1111L0 12.8484V9.24591C0 4.13954 4.02944 0 9 0H81C85.9704 0 90 4.13954 90 9.24591V12.8484ZM90 21.4585V60.0982C90 65.2048 85.9708 69.3443 81 69.3443H9C4.02944 69.3443 0 65.2048 0 60.0982V21.4585L40.8541 46.4655C43.4084 48.0292 46.5916 48.0292 49.1459 46.4655L90 21.4585Z" fill="url(#paint0_radial_3058_163)"/>
                    <defs>
                    <radialGradient id="paint0_radial_3058_163" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(45 16.5) rotate(90) scale(52.8443 68.5851)">
                    <stop stop-color="#FD97A0"/>
                    <stop offset="1" stop-color="#FF6C79"/>
                    </radialGradient>
                    </defs>
                </svg>



                <span class="titleText">{strings["enterCode"]}</span>
                <span class="description">
                    {strings["enterCodeDescription"]} <b>{props.email}</b>
                </span>
            </div>
            
            <div class="codeInput">
                <Field onNext={onNext} onPrev={onPrev} id={1} />
                <Field onNext={onNext} onPrev={onPrev} id={2} />
                <Field onNext={onNext} onPrev={onPrev} id={3} />
                <Field onNext={onNext} onPrev={onPrev} id={4} />
                <Field onNext={onNext} onPrev={onPrev} id={5} />
            </div>

            {/* <div class="askNewCode">
                {
                    timerValue.val > 0 ?
                    <span>{strings["youCanAskNewCodeIn"]} 0:{timerValue}</span>
                    : null
                }
            </div> */}
        </>
    )
}