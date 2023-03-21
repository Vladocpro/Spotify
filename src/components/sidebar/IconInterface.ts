export const SidebarIcons = {
   HOME: {
      icon:"./assets/sidebar/homeGray.png",
      iconActive: "./assets/sidebar/homeWhite.png",
      title: "Home"
   },
   SEARCH: {
      icon: "./assets/sidebar/searchGray.png",
      iconActive: "./assets/sidebar/searchWhite.png",
      title: "Search"
   },
   LIBRARY: {
      icon:"./assets/sidebar/libraryGray.png",
      iconActive: "./assets/sidebar/libraryWhite.png",
      title: "Library"
   },
   PLUS: {
      icon:"./assets/sidebar/plusGray.png",
      iconActive:"./assets/sidebar/plusWhite.png",
      title: "Create Playlist"
   },
   HEART: {
      icon:"./assets/sidebar/likeGray.png",
      iconActive:"./assets/sidebar/likeWhite.png",
      title: "Liked Songs"
   },
   PODCASTS: {
      icon:"./assets/sidebar/podcastGray.png",
      iconActive:"./assets/sidebar/podcastWhite.png",
      title: "Your Episodes"
   },
}

export type IconType = typeof SidebarIcons.HOME;

