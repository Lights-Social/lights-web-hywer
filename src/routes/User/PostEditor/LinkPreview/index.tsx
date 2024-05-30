import { createEffect, createResource } from 'solid-js'
import './styles.css'
import { Api } from '../../../../components/api';
import { IPhotoAttachment } from '../../../../types/models';

interface LinkPreviewProps {
    url: string
}

interface IResponseLinkPreview {
    data: {
        url: string;
        title: string;
        picture: IPhotoAttachment;
        description: string;
        
    }
}



export default function LinkPreview(props: LinkPreviewProps) {

    async function fetchData(url: string) {

		const response = await Api(`linkPreviews/`, 'POST');

        
		
		const data = await response?.json();
		
		return data.data[0];
		
	}

    const [data] = createResource(() => props.url, fetchData)

    createEffect(() => {

        if (data()) {
            console.log(data())
        }
    })


    return (
        <div class="linkPreview">
            {props.url}
        </div>
    )
}