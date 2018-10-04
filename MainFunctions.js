function DateFunc(){
    var datetime = new Date();
    var hour = datetime.getHours().toString();
    if(hour.length==1)
    hour="0"+hour;
    var minute = datetime.getMinutes().toString();
    if(minute.length==1)
    minute="0"+minute;
    var seconds = datetime.getSeconds().toString();
    if(seconds.length==1)
    seconds="0"+seconds;
    return "["+datetime.toDateString()+" "+hour+":"+minute+":"+seconds+"] Update";
}
class MainFunctions{
static Update() {
    console.log(DateFunc());
}

}
module.exports=MainFunctions;