import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {SidebarIcons} from "../../components/sidebar/IconInterface";


interface globalState {
   iconActive: string | null,
   playlistActive: string | null,
   currentPlaylist: any | null,
   currentSong: any | null,
   songIsPlaying: boolean
}



const initialState : globalState= {
   iconActive: SidebarIcons.HOME.title,
   playlistActive: null,
   currentPlaylist: null,
   currentSong: null,
   songIsPlaying: false
}


export const globalSlice = createSlice({
   name: "global",
   initialState,
   reducers: {
      setIconActive: (state, action:PayloadAction<string>) => {
         if(state.iconActive !== action.payload) {
            state.iconActive = action.payload;

            // To change font color back to gray if not active
            state.playlistActive = null;
            // state.currentPlaylist.songs = [];
         }
      },
      setActivePlaylist: (state, action:PayloadAction<string>) => {
         if(state.playlistActive !== action.payload) {
             state.playlistActive = action.payload;
             // state.currentPlaylist.songs = action.payload.songs;
            // To change font color back to gray if not active
            state.iconActive = null;
         }
      },
      setCurrentPlaylist: (state, action:PayloadAction<object>) => {
         state.currentPlaylist = action.payload;
      },
      setCurrentSong: (state, action:PayloadAction<any>) => {
         state.currentSong = action.payload;
      },
      setSongIsPlaying: (state, action:PayloadAction<boolean>) => {
         state.songIsPlaying = action.payload;
      },
   }
})

export const {setIconActive, setActivePlaylist, setCurrentPlaylist, setCurrentSong, setSongIsPlaying} = globalSlice.actions
export const globalReducer = globalSlice.reducer;
