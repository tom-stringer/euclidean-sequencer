import { Instrument } from "../types/rhythm-types";

const instruments: Record<string, Record<string, Instrument>> = {
    "808s": {
        C1: { note: "C1", name: "Low 808", url: getSrc("/sounds/808s/alien_808.wav") },
        D1: { note: "D1", name: "Mid 808", url: getSrc("/sounds/808s/future_808_1.wav") },
        E1: { note: "E1", name: "High 808", url: getSrc("/sounds/808s/future_808_2.wav") },
    },
    "Hi-Hats": {
        F1: { note: "F1", name: "Closed Hi-Hat 1", url: getSrc("/sounds/Hi-Hats/Lev3_Chh_001.wav") },
        G1: { note: "G1", name: "Closed Hi-Hat 2", url: getSrc("/sounds/Hi-Hats/Lev_Chh_001.wav") },
        A1: { note: "A1", name: "Closed Hi-Hat 3", url: getSrc("/sounds/Hi-Hats/Lev_Chh_033.wav") },
        B1: { note: "B1", name: "Closed Hi-Hat 4", url: getSrc("/sounds/Hi-Hats/Lev_Chh_075.wav") },
        C2: { note: "C2", name: "Open Hi-Hat 1", url: getSrc("/sounds/Hi-Hats/Lev_Ohh_008.wav") },
        D2: { note: "D2", name: "Open Hi-Hat 2", url: getSrc("/sounds/Hi-Hats/Lev_Ohh_019.wav") },
        E2: { note: "E2", name: "Open Hi-Hat 3", url: getSrc("/sounds/Hi-Hats/Lev_Ohh_122.wav") },
    },
    Claps: {
        F2: { note: "F2", name: "Clap", url: getSrc("/sounds/claps/Lev3_Clap_A_01.wav") },
        G2: { note: "G2", name: "Click", url: getSrc("/sounds/claps/foley_snap.wav") },
    },
    Cymbals: {
        A2: { note: "A2", name: "Ride 1", url: getSrc("/sounds/cymbals/Lev3_Ride_01.wav") },
        D3: { note: "D3", name: "Ride 2", url: getSrc("/sounds/cymbals/Lev_Ride_13.wav") },
        B2: { note: "B2", name: "Crash 1", url: getSrc("/sounds/cymbals/Lev_Crash_14.wav") },
        C3: { note: "C3", name: "Crash 2", url: getSrc("/sounds/cymbals/Lev_Crash_89.wav") },
    },
    Kicks: {
        E3: { note: "E3", name: "Kick 1", url: getSrc("/sounds/kicks/Lev3_Kick_F_13.wav") },
        F3: { note: "F3", name: "Kick 2", url: getSrc("/sounds/kicks/Lev3_Kick_G_17.wav") },
        G3: { note: "G3", name: "Lo-Fi Kick", url: getSrc("/sounds/kicks/MC_kick.wav") },
        A3: { note: "A3", name: "Electronic Kick", url: getSrc("/sounds/kicks/alien_kick.wav") },
        B3: { note: "B3", name: "Ambient Kick 1", url: getSrc("/sounds/kicks/ambient_kick_1.wav") },
        C4: { note: "C4", name: "Ambient Kick 2", url: getSrc("/sounds/kicks/ambient_kick_2.wav") },
        D4: { note: "D4", name: "Ambient Kick 3", url: getSrc("/sounds/kicks/ambient_kick_3.wav") },
    },
    Other: {
        E4: { note: "E4", name: "Shaker 1", url: getSrc("/sounds/other/Lev3_Shaker_01.wav") },
        F4: { note: "F4", name: "Shaker 2", url: getSrc("/sounds/other/Lev3_Shaker_02.wav") },
        C5: { note: "C5", name: "Shaker 3", url: getSrc("/sounds/other/Lev_Shaker_009.wav") },
        G4: { note: "G4", name: "High Tom", url: getSrc("/sounds/other/Lev3_Tom_High_02.wav") },
        A4: { note: "A4", name: "Low Tom", url: getSrc("/sounds/other/Lev3_Tom_Low_01.wav") },
        B4: { note: "B4", name: "Conga", url: getSrc("/sounds/other/Lev_Conga_03.wav") },
        D5: { note: "D5", name: "Tambourine 1", url: getSrc("/sounds/other/Lev_Tamb_006.wav") },
        E5: { note: "E5", name: "Tambourine 2", url: getSrc("/sounds/other/Lev_Tamb_010.wav") },
        F5: { note: "F5", name: "Rim", url: getSrc("/sounds/other/foley_rim.wav") },
        G5: { note: "G5", name: "Lo-Fi Block", url: getSrc("/sounds/other/morning_chill_block.wav") },
        A5: { note: "A5", name: "Lo-Fi Rim 1", url: getSrc("/sounds/other/morning_chill_rim_2.wav") },
        B5: { note: "B5", name: "Lo-Fi Rim 2", url: getSrc("/sounds/other/morning_chill_rim.wav") },
    },
    Snares: {
        E6: { note: "E6", name: "Snare 1", url: getSrc("/sounds/snares/Lev_Snare_011.wav") },
        F6: { note: "F6", name: "Snare 2", url: getSrc("/sounds/snares/Lev_Snare_017.wav") },
        G6: { note: "G6", name: "Snare 3", url: getSrc("/sounds/snares/Lev_Snare_114.wav") },
        C6: {
            note: "C6",
            name: "Layered Snare",
            url: getSrc("/sounds/snares/Lev3_LayeredSnare_A_01.wav"),
        },
        A6: { note: "A6", name: "Layered Snare 2", url: getSrc("/sounds/snares/alien_snare.wav") },
        D6: { note: "D6", name: "Tight Snare", url: getSrc("/sounds/snares/Lev3_TightSnare_A_01.wav") },
    },
};

function getSrc(path: string) {
    return process.env.PUBLIC_URL + path;
}

export default instruments;
