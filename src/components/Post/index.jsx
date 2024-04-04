import {Api} from "../../api"
import { ref, effect } from 'hywer'
import './styles.css'
import Picture from "../Picture"

function Post({post, profile}) {


    return (
        <article class="post">
            <div class="title">
                <div class="info">
                    <a aria-label={profile.name != "" ? profile.name : profile.username} class="name" href={`/u/${profile.username}`}>{profile.name != "" ? profile.name : profile.username}</a>
                    
                    {
                        profile.verified ?
                        <svg class="verified" viewBox="0 0 40 31" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M18.3809 28.2702C18.2775 28.3952 18.1673 28.5165 18.0503 28.6335C16.0369 30.6469 12.7726 30.6469 10.7593 28.6335L1.64557 19.5198C-0.367784 17.5065 -0.36779 14.2422 1.64556 12.2288C3.65891 10.2155 6.92319 10.2155 8.93654 12.2288L14.3885 17.6808L30.3263 1.74291C32.3397 -0.270442 35.6039 -0.27044 37.6173 1.74291C39.6306 3.75626 39.6306 7.02054 37.6173 9.03389L18.3809 28.2702Z" />
                        </svg> : <></>
                    }

                    {
                        post.is_edited ?
                        <svg viewBox="0 0 132 133" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M87.0065 6.17421C94.0359 -0.855226 105.433 -0.855226 112.462 6.17421L126.604 20.3163C133.634 27.3458 133.634 38.7428 126.604 45.7722L120.483 51.8935L80.8851 12.2955L87.0065 6.17421ZM63.9146 29.2661L16.2958 76.8849C14.5499 78.6308 13.4545 80.7808 13.0094 83.0338L0.502283 122.223C-1.47345 128.413 4.36526 134.252 10.5559 132.276L49.7448 119.769C51.9979 119.324 54.1479 118.229 55.8938 116.483L103.513 68.8641L63.9146 29.2661Z" />
                        </svg> : <></>
                    }

                    <time datetime={post.date}>
                        {/* <Duration date={props.item.date} /> */}
                    </time>

                    {
                        post.is_pinned ?
                        <svg viewBox="0 0 13 16" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.56196 0.949159L4.17598 0.937757C3.35028 0.934907 2.62815 1.64753 2.62435 2.48178C2.62435 2.69652 2.67091 2.91221 2.73932 3.05474C3.12699 4.15693 3.2106 5.00639 2.99777 5.77982L2.93601 5.95561C2.67186 6.74995 2.22148 7.74193 0.890289 9.07311C0.744913 9.21849 0.633743 9.38667 0.554879 9.57575C0.400001 9.95107 0.399051 10.3815 0.555829 10.7606C0.712607 11.134 1.01666 11.4381 1.39008 11.5949C1.58296 11.6737 1.7844 11.7155 1.98393 11.7136L5.52237 11.7136L6.36137 16.7315L7.19752 11.7127L10.7303 11.7127C10.9355 11.7146 11.1379 11.6756 11.3308 11.5949C11.5217 11.516 11.6909 11.4039 11.8344 11.2604C11.9778 11.1169 12.0899 10.9478 12.1679 10.7578C12.3284 10.3729 12.3265 9.95107 12.1688 9.57671C12.0928 9.38857 11.9759 9.21469 11.8334 9.07216C10.5003 7.73908 10.0518 6.749 9.78578 5.95466C9.51403 5.14131 9.5777 4.2491 9.97202 3.12695C10.0632 2.92171 10.1117 2.70792 10.1107 2.48843C10.1041 1.63803 9.40856 0.946308 8.56196 0.949159Z"/>
                        </svg> : <></>
                    }
                </div>

                {/* <Show when={isIOS}>
                    <button onClick={(e) => {toggle({x: e.pageX - 330, y: e.pageY + 10}, contextMenuButtons())}} class="optionsButton">
                        <svg viewBox="0 0 25 7" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.4725 0.274902C1.6925 0.274902 0.25 1.7199 0.25 3.4999C0.25 5.2799 1.6925 6.7249 3.4725 6.7249C5.2525 6.7249 6.695 5.2824 6.695 3.4999C6.6975 1.7199 5.255 0.274902 3.4725 0.274902ZM12.5 0.274902C10.72 0.274902 9.275 1.7174 9.275 3.4974C9.275 5.2774 10.7175 6.7224 12.5 6.7224C14.28 6.7224 15.7225 5.2799 15.7225 3.4974C15.7225 1.7199 14.28 0.274902 12.5 0.274902ZM21.5275 0.274902C19.7475 0.274902 18.305 1.7174 18.305 3.4974C18.305 5.2774 19.7475 6.7224 21.5275 6.7224C23.3075 6.7224 24.75 5.2799 24.75 3.4974C24.75 1.7199 23.3075 0.274902 21.5275 0.274902Z" />
                        </svg>
                    </button>
                </Show> */}
            </div>
            
            
            <div class="content">
                {
                    post.access == 'friends' ?
                    <div class="accessBadge">
                        <svg viewBox="0 0 11 9" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_2943_201)">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M5.64839 2.09302C5.64839 3.24897 4.73214 4.18605 3.60188 4.18605C2.47163 4.18605 1.55537 3.24897 1.55537 2.09302C1.55537 0.93708 2.47163 0 3.60188 0C4.73214 0 5.64839 0.93708 5.64839 2.09302ZM3.58139 4.81395C1.60344 4.81395 0 6.45384 0 8.47673C0 8.7657 0.229064 9 0.511628 9H6.65116C6.93373 9 7.1628 8.7657 7.1628 8.47673C7.1628 6.45384 5.55935 4.81395 3.58139 4.81395ZM6.46697 2.09302C6.46697 2.77751 6.23749 3.40719 5.85292 3.90596C6.15396 4.0841 6.50349 4.18605 6.8763 4.18605C8.00653 4.18605 8.92283 3.24897 8.92283 2.09302C8.92283 0.93708 8.00653 0 6.8763 0C6.50349 0 6.15396 0.101953 5.85292 0.280084C6.23749 0.77886 6.46697 1.40853 6.46697 2.09302ZM6.85582 4.81395C6.63741 4.81395 6.42357 4.83394 6.21595 4.87225C7.28775 5.69297 7.98138 7.00202 7.98138 8.47673C7.98138 8.6622 7.94508 8.8389 7.87945 9H9.92559C10.2081 9 10.4372 8.7657 10.4372 8.47673C10.4372 6.45384 8.83381 4.81395 6.85582 4.81395Z" fill="#FF6C79"/>
                            </g>
                            <defs>
                            <clipPath id="clip0_2943_201">
                            <rect width="11" height="9" fill="white"/>
                            </clipPath>
                            </defs>
                        </svg>
                        {/* {t('forFriends')} */}
                    </div> : <></>
                }

                {
                    post.access == 'private' ?
                    <div class="accessBadge">
                        <svg viewBox="0 0 86 98" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M61 28C61 18.059 52.9409 10 43 10C33.0591 10 25 18.059 25 28V36.0175C26.8042 36 28.7935 36 31 36H55C57.2065 36 59.1958 36 61 36.0175V28ZM15 36.6436C13.04 36.9825 11.417 37.5 9.95703 38.29C6.71094 40.0468 4.04663 42.7109 2.29004 45.957C0 50.1886 0 55.7924 0 67C0 78.2076 0 83.8114 2.29004 88.043C4.04663 91.2891 6.71094 93.9532 9.95703 95.71C14.1885 98 19.7925 98 31 98H55C66.2075 98 71.8115 98 76.043 95.71C79.2891 93.9532 81.9531 91.2891 83.71 88.043C86 83.8114 86 78.2076 86 67C86 55.7924 86 50.1886 83.71 45.957C81.9531 42.7109 79.2891 40.0468 76.043 38.29C74.583 37.5 72.96 36.9825 71 36.6436V28C71 12.536 58.4639 0 43 0C27.5361 0 15 12.536 15 28V36.6436Z"/>
                        </svg>
                        {/* {t('private')} */}
                    </div> : <></>
                }


                {
                    post.text != "" ?
                    <div class="text">
                        {post.text}
                    </div> : <></>
                }

                
                {/* <Show when={props.item.reposts.count == 1}>
                    <Switch>
                        <Match when={props.item.reposts.objects[0].notAvailable}>
                            <ErrorPlaceholder />
                        </Match>
                        <Match when={props.item.reposts.initialPosts[0]}>
                            <ForwardedPost item={props.item.reposts.initialPosts[0]} profile={props.profileOfRepostedPost!} />

                        </Match>
                    </Switch>
                </Show>
                 */}
                
                {/* <Pictures onDownload={props.onPictureDownload} photos={props.item.attachments.photos} /> */}
            </div>
            <a aria-label={profile.name != "" ? profile.name : profile.username} class="name" href={`/u/${profile.username}`}>
                <Picture picture={profile.avatar[0].photo_id} />
            </a>

            {/* <A onDblClick={(e: Event) => e.stopPropagation()} onClick={showUserModal} aria-label={props.profile.name != "" ? props.profile.name : props.profile.username} class="avatarWrapper" href={`/u/${props.profile.username}`}>
                <Avatar avatar={props.profile.avatar} name={props.profile.name != "" ? props.profile.name : props.profile.username} />
            </A> */}
            {/* <Show when={!props.full}> */}
                <div class="line">
                    <hr />
                </div>
                <div class="buttons">
                    <div class="replies">
                        <svg viewBox="0 0 1090 994" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M0 245C0 109.69 109.69 0 245 0H845C980.31 0 1090 109.69 1090 245V559.286C1090 694.596 980.31 804.286 845 804.286H540.017L338.368 969.792C271.704 1024.51 171.422 977.085 171.422 890.84V793.033C72.054 761.778 0 668.978 0 559.286V245ZM245 90C159.396 90 90 159.396 90 245V559.286C90 637.331 147.724 701.971 222.796 712.714L261.422 718.241V890.84C261.422 901.092 273.342 906.731 281.268 900.225L507.812 714.286H845C930.604 714.286 1000 644.89 1000 559.286V245C1000 159.396 930.604 90 845 90H245Z" />
                        </svg>
                        {
                            post.comments.count == 0 ? `t("leaveAComment")` : `${post.comments.count}`
                        }
                    </div>
                </div>
            {/* </Show> */}
            

            {/* <Reactions onReact={(reaction_id: string) => props.onReact(props.item.id, reaction_id)} reactions={props.item.reactions} /> */}
        </article>
    )
}

export default Post