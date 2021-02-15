import { LazyLoadImage } from 'react-lazy-load-image-component';

interface ScreenProps {
    alt: string,
    src: string,
    title: string,
    key: string,
    className: string
}

function LazyImage(props: ScreenProps) {
    const {alt, src, title, key, className} = props
    return(
        <LazyLoadImage 
            className = {className}
            alt = {alt}
            src = {src}
            title = {title}
            key = {key}
        />
    )
}

export default LazyImage;
