import { Note } from "tone/build/esm/core/type/NoteUnits";

export interface Instrument {
    note: Note;
    name: string;
    url: string;
}
