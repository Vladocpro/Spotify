export function millisToMinutesAndSeconds(millis : number) : string {
   const minutes = Number(Math.floor(millis / 60000));
   const seconds = Number(((millis % 60000) / 1000).toFixed(0));
   return seconds === 60
       ? minutes + 1 + ":00"
       : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

export function showTimeConvert(date : string, millis : number) : string {
   const dates : string[] = date.split("-")
   let day = undefined;
   let month = undefined;
   switch (dates[1]) {
      case "01": {
         month = "Jan";
         break;
      }
      case "02": {
         month = "Feb";
         break;
      }
      case "03": {
         month = "Mar";
         break;
      }
      case "04": {
         month = "Apr";
         break;
      }
      case "05": {
         month = "May";
         break;
      }
      case "06": {
         month = "Jun";
         break;
      }
      case "07": {
         month = "Jul";
         break;
      }
      case "08": {
         month = "Aug";
         break;
      }
      case "09": {
         month = "Sep";
         break;
      }
      case "10": {
         month = "Oct";
         break;
      }
      case "11": {
         month = "Nov";
         break;
      }
      default: {
         month = "Dec"
         break;
      }
   }
   if(dates[2][0].includes("0")) day = ` ${dates[2].slice(1)}`
   else day = dates[2]
   let hours = undefined;
   if(Number(Math.floor(millis / 3600000)) > 0) hours = Number(Math.floor(millis / 3600000))
   const minutes = Number(Math.floor((millis % 3600000)  / 60000));
   const seconds = Number(((millis % 60000) / 1000).toFixed(0));
   const result = `${month} ${day} · ${hours != undefined ? hours + " hr" : ""}  ${minutes} min`
   return result

   // return seconds === 60
   //     ? minutes + 1 + ":00"
   //     : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}
