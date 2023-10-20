import { randomUUID } from "crypto"

export class DataBaseMemory{
    #videos = new Map()

    // Set, Map

    list(search){
        return Array.from(this.#videos.entries())
        .map((videdoArray)=>{
            const id = videdoArray[0]
            const data = videdoArray[1]

            return {
                id,
                ...data,
            }
        })
        .filter(video=>{
            if(search){
                return video.title.includes(search)
            }

            return true
        })
    }

    create(video){
        const videoId = randomUUID()

        this.#videos.set(videoId, video)
    }

    update(id,video){
        this.#videos.set(id,video)
    }

    delete(id){
        this.#videos.delete(id)
    }
}