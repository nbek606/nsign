import type { TNotes, TNotesRequest } from "~/types/notes"


export const useNotesStore = defineStore('notes', () => {
    const nuxtApp = useNuxtApp()

    const notesList: Ref<TNotes[]> = ref([])
    const maxNotes: Ref<number> = ref(0)
    const next: Ref<string | null> = ref(null)
 
    const nextPage = computed((): number => {
        return Math.floor(notesList.value.length / 10) + 1
    })

    const notes = async () => {
        try {
            const data: TNotesRequest = await nuxtApp.$api(`/notes/?page=${nextPage.value}`)
            notesList.value = [...notesList.value, ...data.results]
            maxNotes.value = data.count
            next.value = data.next
        } catch (error) {
            console.log(error)
        }
    }

    const notesDelete = async (id: number) => {
        try {
            await nuxtApp.$api(`/notes/${id}`, { method: 'delete' })
            notesList.value = notesList.value.filter(item => item.id != id)
        } catch (error) {
            console.log(error)
        }
    }

    const notesCreate = async (form:TNotes) => {
        try {
            const data: TNotes = await nuxtApp.$api('/notes/', { method: 'post', body: form })
            notesList.value.unshift(data)
        } catch (error) {
            console.log(error)
        }
    }

    const notesEdit = async (form: TNotes) => {
        try {
            const data: TNotes = await nuxtApp.$api(`/notes/${form.id}/`, { method: 'put', body: form })
            notesList.value = notesList.value.map(item => item.id == data.id ? data : item)
        } catch (error) {
            console.log()
        }
      
    }

    return {
        notes,
        notesDelete,
        notesCreate,
        notesEdit,
        notesList,
        maxNotes,
        next,
    }

})