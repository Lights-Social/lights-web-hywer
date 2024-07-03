// import sync from 'css-animation-sync';
// import { createEffect, createSignal } from 'solid-js';
// sync('loadingPlaceholder');

export function Placeholder() {

    return (
        <>

            <div class="cell placeholder">
                <div class="avatarWrapper placeholderAnimated" />
                <div class="title">
                    <div class="info">
                        <div class="name placeholderAnimated" />
                    </div>
                </div>
                
                <div class="buttons">
                    <div class="button placeholderAnimated" />
                    <div class="button placeholderAnimated" />
                </div>
            </div>

            <div class="cell placeholder">
                <div class="avatarWrapper placeholderAnimated" />
                <div class="title">
                    <div class="info">
                        <div class="name placeholderAnimated" />
                    </div>
                </div>
                
                <div class="buttons">
                    <div class="button placeholderAnimated" />
                    <div class="button placeholderAnimated" />
                </div>
            </div>

            <div class="cell placeholder">
                <div class="avatarWrapper placeholderAnimated" />
                <div class="title">
                    <div class="info">
                        <div class="name placeholderAnimated" />
                    </div>
                </div>
                
                <div class="buttons">
                    <div class="button placeholderAnimated" />
                    <div class="button placeholderAnimated" />
                </div>
            </div>
        </>
    )

}