import { Howl } from 'howler';
import { useEffect, useState } from 'react'
import clown from '../assets/sounds/complete.ogg'

const useMusic = () => {
    const [audio, setAudio] = useState<Howl | null>(null)

    useEffect(() => {
        const howl = new Howl({
            src: clown,
            onplayerror: (e: any, d: any) => {
                console.log(e, d)
                howl.once('unlock', () => {
                    howl.play()
                })
            },
            loop: false,
            volume: 1,
            autoplay: false,
        })
        setAudio(howl)

        return () => {
            howl.unload()
        }
    }, [])

    return [audio] as const
}

export default useMusic