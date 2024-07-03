import './styles.css'
import { Modal, closeModal, openModal } from "@/ui/Modal/Modal";
import type { IAudio, IPost } from "@/data/types/models";
// import LinkPreview from "./LinkPreview";
import { store } from "@/data";
import { ref } from 'hywer/jsx-runtime';
import SendIcon from '@/ui/icons/send';
import MediaIcon from '@/ui/icons/media';
import AddIcon from '@/ui/icons/add';
import BackIcon from '@/ui/icons/back';
import MusicIcon from '@/ui/icons/music';
import MusicSearch from './MusicSearch/MusicSearch';
import { mergeArrays } from '@/ui/utils/mergeArrays';
import MusicWidget from '@/ui/MusicWidget/MusicWidget';

interface PostEditorProps {
    type: "create" | "edit";
    post?: IPost;
}


export default function PostEditor(props: PostEditorProps) {
    const {strings} = store.locale()

    const user_id = store.auth.user_id()
	//const user = store.getProfileById(user_id!)!.get()


    // const { selectFiles, clearFiles } = createFileUploader({ multiple: true, accept: ".jpg,.png,.jpeg,.webp,.gif" });

    const media = ref<[]>([])


    const repostsArray = ref<IPost['reposts']>({count: 0, objects: [], initialPosts: []})

    const link = ref('')
    const audioTracks = ref<IAudio[]>([])



    let accessSelectRef: HTMLSelectElement | undefined

    // function selectFiles(callback: (files: MediaAttachment[]) => void) {

    // }

    const isDisabledButton = ref(true)

    function sendPost() {
        const textInput = document.querySelector<HTMLDivElement>(`.inputArea .textInput`)

        store.sendPost(textInput?.innerText.trim() || "")

        //props.onSendPost(textInputRef?.innerText.trim() || "", media.val, accessSelectRef?.value as IPost['access'], repostsArray.val)
        isDisabledButton.val = true
        if (textInput) textInput.innerHTML = ''
        media.val = []
        repostsArray.val = {count: 0, objects: [], initialPosts: []}
    }

    function cancelEdit() {
        //props.onCancelEdit();


        isDisabledButton.val = true
        repostsArray.val = {count: 0, objects: [], initialPosts: []}

        media.val = []

        onInputPostText();
    }

    function editPost() {
        const textInput = document.querySelector<HTMLDivElement>(`.inputArea .textInput`)
        //props.onEditPost(props.post!.id, textInputRef?.innerText.trim() || "", media.val, accessSelectRef?.value as IPost['access'])
        
        //props.onCancelEdit()
        
        isDisabledButton.val = true
        if (textInput) textInput.innerHTML = ''
        media.val = []
    }

    function showAddMenu() {

        const addMenu = document.querySelector(`.addMenu`) as HTMLDivElement
        const showAddMenuButton = document.querySelector(`.inputArea .showAddMenuButton`) as HTMLButtonElement

        (document.querySelector(`.inputArea .textInput`) as HTMLDivElement).blur();


        if (addMenu.className == "addMenu shown") {

            addMenu.className = "addMenu";

            showAddMenuButton.className = "showAddMenuButton";


        } else {

            addMenu.className = "addMenu shown";


            showAddMenuButton.className = "showAddMenuButton active";
        }
    }

    function findLinks(text: string) {
        var regex = /(?:https?|ftp):\/\/[^\s/$.?#].[^\s]*\b/gi;
        // Находим все совпадения
        var matches = text.match(regex);
        // Возвращаем массив ссылок
        return matches;
    }


    function onInputPostText() {
        const textInput = document.querySelector<HTMLDivElement>(`.inputArea .textInput`)

        const text = textInput?.innerText.trim()

        if (text !== '' || media.val.length !== 0 || repostsArray.val.initialPosts.length !== 0) {
            isDisabledButton.val = false

            if (text !== '') {
                const links = findLinks(text!);
                if (links) {
                    link.val = links[0]
                } else {
                    link.val = ''
                }
            } else {
                link.val = ''
            }

        } else {
            link.val = ''

            isDisabledButton.val = true
        }
    }

    //const photoLimitSize = Number(user.val.is_premium ? import.meta.env.VITE_PREMIUM_PHOTO_LIMIT_SIZE : import.meta.env.VITE_PHOTO_LIMIT_SIZE)

    const photoLimitSize = 0
    function processFiles(files: any[]) {

        files.forEach(file => {
            if (file.size > photoLimitSize) {
            
                openModal('heavyFileModal', [7,7,7,7], false)
    
            } else {

                let img = new Image();
                img.src = file.source

                img.onload = function() {

                    console.log(file)

                    // media.val = [{source: file.source, file: file.file, width: img.width, height: img.height}, ...media.oldVal];
    
                    onInputPostText()
                };

            }
        })

        media.val = []

    }

    function onPastePostText(e: ClipboardEvent) {
        console.log(e.clipboardData?.files)
    }

    // function deleteMedia(mediaItem: MediaAttachment) {
    //     media.val = media.val.filter(item => item.source !== mediaItem.source)
    // }

    // createEffect(() => {
    //     if (props.post) {

    //         let mediaArray: MediaAttachment[] = [];
    //         props.post.attachments.media.forEach((photo) => {
    //             mediaArray.push({source: `${import.meta.env.VITE_LIGHTS_CDN_URL}/picture/${photo.id}.webp`, preview: photo.preview, id: photo.id, width: photo.width, height: photo.height})
    //         })

    //         setMedia(mediaArray)



    //         if (props.post.reposts.count > 0) {
    //             setRepostsArray(props.post.reposts)
    //         }

    //         if (props.type == "edit") {
    //             setIsDisabledButton(true)

    //         } else {

    //             setIsDisabledButton(false)
    //         }
    //     }
    // })

    // const [isPreviewRepostModalOpen, setIsPreviewRepostModalOpen] = createSignal(false);


    function previewRepost() {
        console.log(repostsArray.val.initialPosts[0])
        //setIsPreviewRepostModalOpen(true)
    }

    function selectTracks(tracks: IAudio[]) {

        audioTracks.val = mergeArrays(audioTracks.val, tracks, 'isrc')


        onInputPostText()

        closeModal('musicSearchModal')

    }

    function removeTrack(isrc: string) {
        audioTracks.val = audioTracks.val.filter((item) => item.isrc !== isrc)

        onInputPostText()
    }

    return (
            <div class="createPost">
                <Modal type='flowFull' id='musicSearchModal'>
                    <div class='bar'>
                        <button class='close' onClick={() => closeModal("musicSearchModal")}>
                            <BackIcon />

                            {strings["back"]}
                        </button>

                        <div class="title">
                            {strings["music"]}
                        </div>
                    </div>
                    <MusicSearch selectedTracks={audioTracks} onDone={selectTracks}/>
                </Modal>
                <Modal type="modal" id="heavyFileModal">
                    <h1>{strings["heavy"]} 😓</h1>
                    {/* <p>
                        {user.val.is_premium ? strings["maxFileSizeWithRose"] : strings["maxFileSize"]}
                    </p> */}
                    <div class="buttons">
                        <button class="close" onClick={() => closeModal("heavyFileModal")}>OK</button>
                    </div>
                </Modal>
                <span class="title">{props.type == "create" ? strings["createPost"] : strings["editPost"]}</span>
                <div class="editBlock">
                    <div class="addMenu">
                        <button class="photo">
                            <MediaIcon />
                            {strings["photo"]}
                        </button>
                        <button class="music" onClick={() => openModal('musicSearchModal', [1], false) }>
                            <MusicIcon />
                            {strings["music"]}
                        </button>
                    </div>

                    <div class="inputArea">
                        
                        <button class="showAddMenuButton" onClick={showAddMenu}>
                            <AddIcon />
                        </button>

                        <div onPaste={(e: ClipboardEvent) => onPastePostText(e)} onInput={onInputPostText} contentEditable={true} class="textInput">
                            {props.post ? props.post?.text : null}
                        </div>
                    </div>


                </div>

                {
                    (props.post && repostsArray.val.initialPosts.length > 0) ?
                    <div onClick={previewRepost} class="forwardBadge">
                        {
                            repostsArray.val.initialPosts[0].attachments.media.length > 0 ?
                            <div class="pictureWrapper">
                                {/* <Picture picture={{url: repostsArray.val.initialPosts[0].attachments.media[0].url!, preview: repostsArray.val.initialPosts[0].attachments.media[0].preview, width: repostsArray.val.initialPosts[0].attachments.media[0].width, height: repostsArray.val.initialPosts[0].attachments.media[0].height, alt: "", id: ""}} /> */}
                            </div> : null
                        }
                        <div class="right">
                            Forward {repostsArray.val.initialPosts.length} post
                            <div class="text">
                                {repostsArray.val.initialPosts[0].text}
                            </div>
                        </div>
                    </div> : null
                }


                {/* {link() != '' ? <LinkPreview url={link()} /> : null} */}

                

                <div class="attachments">
                    <div class="photos">
                        {
                            media.derive((val) => {
                                if (val.length > 0) {
                                    val.map((item) => {
                                        return <div class="preview">
                                            <button onClick={() => {onInputPostText()}} class="remove" />
                                            {/* <Picture force={true} type={"download"} loader={false} photo={{source: item.source, preview: item.preview}} /> */}
                                        </div>
                                    })
                                } else {
                                    return <div style="display: none"/>
                                }
                                
                            })
                        }
                    </div>
                </div>

                {
                    audioTracks.derive((val) => {
                        if (val.length > 0) {
                            return <MusicWidget onRemoveTrack={removeTrack} type="edit" audios={audioTracks.val} />
                        } else {
                            return <div style="display: none"/>
                        }
                    })
                }
                
                <hr/>

                <div class="buttons">
                    <select onChange={() => props.type == "edit" && (isDisabledButton.val = false)} ref={accessSelectRef} name="access" id="accessSelect">
                        <option selected={props.type == "edit" && props.post?.access == 'all'} value="all">{strings["everybody"]}</option>
                        <option selected={props.type == "edit" && props.post?.access == 'friends'} value="friends">{strings["friends"]}</option>
                        <option selected={props.type == "edit" && props.post?.access == 'private'} value="private">{strings["onlyYou"]}</option>
                    </select>
                    <div class="postButtons">
                        {
                            props.type == "edit" ?
                            <>
                                <button class="cancelButton" onClick={cancelEdit}>
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
                                <button class="sendPostButton" disabled={isDisabledButton.val} onClick={editPost}>
                                    <svg viewBox="0 0 41 31" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M13.1421 24.3552L36.1231 1.37428C37.0995 0.397862 38.6824 0.398035 39.6586 1.37428C40.6349 2.35052 40.6351 3.9334 39.6586 4.90981L14.9099 29.6585C13.9335 30.635 12.3506 30.6348 11.3744 29.6585L0.767767 19.0519C-0.208475 18.0757 -0.208648 16.4928 0.767767 15.5164C1.74418 14.54 3.32706 14.5402 4.3033 15.5164L13.1421 24.3552Z" />
                                    </svg>

                                </button>
                            </> :
                            <button class="sendPostButton" disabled={isDisabledButton.derive(val => val)} onClick={sendPost}>
                                <SendIcon />
                            </button>
                        }
                    </div>

                </div>
            </div>
    )
}