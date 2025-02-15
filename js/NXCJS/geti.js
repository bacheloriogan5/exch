
function getBrowser(){

    let userAgent = navigator.userAgent;
    let browserName;

    if(userAgent.match(/chrome|chromium|crios/i)){
        browserName = "chrome(Chromium based Yandex, Amiga, etc...)";
    }else if(userAgent.match(/firefox|fxios/i)){
        browserName = "firefox";
    }  else if(userAgent.match(/safari/i)){
        browserName = "safari";
    }else if(userAgent.match(/opr\//i)){
        browserName = "opera";
    } else if(userAgent.match(/edg/i)){
        browserName = "edge";
    }else{
        browserName="unknown browser";
    }

    return browserName;

}

function getOS() {

    var userAgent = window.navigator.userAgent,
        platform = window.navigator?.userAgentData?.platform || window.navigator.platform,
        macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
        windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
        iosPlatforms = ['iPhone', 'iPad', 'iPod'],
        os = null;

    if (macosPlatforms.indexOf(platform) !== -1) {
        os = 'Mac OS';
    } else if (iosPlatforms.indexOf(platform) !== -1) {
        os = 'iOS';
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
        os = 'Windows';
    } else if (/Android/.test(userAgent)) {
        os = 'Android';
    } else if (/Linux/.test(platform)) {
        os = 'Linux';
    }

    return os;
}

$(document).ready(function () {

    var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}

    /*const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };*/
    var uappalt = getBrowser();
    //var uversion = navigator.appVersion;
    //var uappcodename = navigator.appCodeName;
    var uplatform = getOS();
    //var uoutwinw = window.outerWidth;
    //var uoutwinh = window.outerHeight;
    //var uinwinw = window.innerWidth;
    //var uinwinh = window.innerHeight;

    var gmt = new Date().toTimeString().slice(9);
    var gmt1 = Intl.DateTimeFormat().resolvedOptions().timeZone;

    ucolourbits = window.screen.colorDepth;
    ucolournumber = Math.pow(2, ucolourbits);

    //navigator.geolocation.getCurrentPosition(function (pos) {

        //const crd = pos.coords;

        /*$('#uhid').val(Base64.encode(uappalt+"---"+uversion+"---"+uappcodename+"---"+uplatform+"---"+uoutwinw+"---"+uoutwinh+
            "---"+uinwinw+"---"+uinwinh+"---"+ucolourbits+"---"+ucolournumber+"---"+crd.latitude+"---"+crd.longitude));*/

        /*$('#uhid').val(Base64.encode(uappalt+"---"+uplatform+"---"+crd.latitude+"---"+crd.longitude+"---"+gmt+
        "---"+gmt1));*/

    //}, function (err) {

        /*$('#uhid').val(Base64.encode(uappalt+"---"+uversion+"---"+uappcodename+"---"+uplatform+"---"+uoutwinw+"---"+uoutwinh+
            "---"+uinwinw+"---"+uinwinh+"---"+ucolourbits+"---"+ucolournumber+"---"+0+"---"+0));*/

        $('#uhid').val(Base64.encode(uappalt+"---"+uplatform+"---"+0+"---"+0+"---"+gmt+
            "---"+gmt1));

    //}, options);

});
