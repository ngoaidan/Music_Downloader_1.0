import { showMusicControl, setInfoMusicPlaying, setIndexPlaying, setCurrentIDCollectionSelect } from '@services/redux/actions';
import { loadMusic, showLoading, showErrorInternet, setTaskDownloading, setPercent } from './../redux/actions';
import { dboCollection, dboMusic } from '@services/sqlite';
import RNBackgroundDownloader from 'react-native-background-downloader';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import PushNotification from "react-native-push-notification";
import cheerio from "cheerio-without-node-native"
import { PLAYMUSIC } from '@config/constrans';
import {navigate} from '@navigations/rootNavigation'

const API_DOWN = "https://downloader28.banabatech.com/oldtest.php?url=";
const YT = "https://www.youtube.com/watch?v="

const fn_GetAPI = async (link, dispatch: any) => {
    let json: any = "not working";
    let linkVideo = YT + link
    dispatch(setPercent(0.2))

    // await fetch(API_DOWN + linkVideo)
    //     .then((response) => response.json())
    //     .then((json) => {
    //         processButton(json,dispatch)
    //     })
    //     .catch(() => {
    //         dispatch(showLoading(false))
    //         dispatch(showErrorInternet(true))
    //     });

    // await fetch(API_DOWN + link)
    //     .then((response) => response.json())
    //     .then((json) => {
    //         console.log("🚀 ~ file: index.ts ~ line 28 ~ .then ~ json", json)
    //         processButton(json, dispatch)

    //     })
    //     .catch(() => {
    //         dispatch(showLoading(false))
    //         dispatch(showErrorInternet(true))
    //     });

    try {
        let res = await fn_crawlData(link);
        processButton(res, dispatch)
        dispatch(setPercent(0.3))

    }
    catch {
        dispatch(showLoading(false))
        dispatch(setTaskDownloading(null))
    }


}

/**
 * Get random id
 * 
 * @param max number max in number random
 */
export const fn_GetRandomID = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
}

let task;

const fn_stop = () => {
    task.stop();
}

const processButton = (data, dispatch: any) => {
    let duration = data.duration;
    let thumbnail = data.thumbnail;
    let title = data.title;
    let listDataAudio: any[] = []

    data.links.forEach((element: any) => {
        if (element.type == "mp3") {
            listDataAudio.push(element)
        }
    });

    console.log("qua")
    if (listDataAudio.length > 0) {

        let id = fn_GetRandomID(10000000000)
        let url = listDataAudio[0].url;
        let size = listDataAudio[0].size
        let path = `${RNBackgroundDownloader.directories.documents}/${title}_${id}.mp3`
        // const time = moment(duration,'HH:mm').format("HH:mm"); 
        let infoMusic: Music = {
            name: title,
            duration: duration,
            id_collection: 1,
            quality: listDataAudio[0].quality,
            size: size,
            status: true,
            thumbnail: thumbnail,
            path: path
        }

        task = RNBackgroundDownloader
            .download({
                id: id.toString(),
                url: url,
                destination: path,
                priority: 1,
            })
            .begin((expectedBytes) => {
            console.log("🚀 ~ file: index.ts ~ line 110 ~ .begin ~ expectedBytes", expectedBytes)
                
                dispatch(setTaskDownloading(task))
            })
            .progress((percent, bytesWritten, totalBytes) => {
                dispatch(setTaskDownloading(task))
                dispatch(setPercent(percent+0.3))
            })
            .done(async () => {
                dispatch(setTaskDownloading(task))
                dispatch(showLoading(false))
                await dboMusic.InsertItem(infoMusic).then(async res => {
                    await dboMusic.SelectAll().then((res:any) => {
                        dispatch(loadMusic(res))
                        dispatch(showLoading(false))
                        fn_PushNotification("Finished downloading", `The video ${title} has finished downloading`)
                        dispatch(setPercent(0))
                        dispatch(setIndexPlaying(res.length - 1))
                        dispatch(setInfoMusicPlaying(infoMusic))
                        dispatch(showMusicControl(true))
                        dispatch(setCurrentIDCollectionSelect(1))
                        navigate(PLAYMUSIC,{})
                    })
                   
                }).catch((err) => {
                })
            })
            .error((error: any) => {
                dispatch(setPercent(0))

                dispatch(showLoading(false))
                dispatch(showErrorInternet(true))
            })
    }
}

/**
 * Push Notification
 * 
 * @param title title notification
 * @param message message notification
 */
const fn_PushNotification = (title, message) => {
    PushNotification.createChannel(
        {
            channelId: "4",
            channelName: "My channel",
            channelDescription: "A channel to categorise your notifications",
            playSound: false,
            soundName: "default",
            importance: 4,
            vibrate: true,
        },
        (created) => console.log(`createChannel returned '${created}'`)
    );

    PushNotification.localNotification({
        channelId: 4,
        title: title,
        message: message,
        smallIcon: "ic_notification",
        playSound: true,
        soundName: "default",
    });
}

const fn_crawlData = async (linkVideo) => {
    let jsonData = {}
    try {
        const searchUrl = "https://ymp4.download/"
        const response = await fetch(searchUrl);
        const htmlString = await response.text();
        const $ = cheerio.load(htmlString);
        const liList = $('script')
        const stringData = liList[2].children[0].data
        let apiKey = stringData.split(";", 2);
        let key = apiKey[1].substr(5, apiKey[1].length - 6);
        const response1 = await fetch("https://ymp4.download/", {
            "headers": {
                "accept": "*/*",
                "accept-language": "en-US,en;q=0.9,vi;q=0.8",
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "x-requested-with": "XMLHttpRequest",
                "cookie": `PHPSESSID=${key}`
            },
            "body": `url=${linkVideo}&sid=${key}&lng=en`,
            "method": "POST",
            "mode": "cors"
        })
        let htmlString1 = await response1.text();
        const htmlData = cheerio.load(htmlString1);

        // get img
        const img = htmlData('img')

        let imgSrc = img[0].attribs.src;
        let title = img[0].attribs.title;
        const a = cheerio.load(htmlString1)('tbody')

        let indexElement = 0;
        let i = 0;
        let linkDownArr: any[] = [];

        // while (1) {
        //     if (a[indexElement].children[i] == undefined) {
        //         break;
        //     }
        //     let data = {}
        //     let type = a[indexElement].children[0].children[1].children[0].children[0].data;
        //     let type2 = a[indexElement].children[0].children[1].children[0].children[0].data;

        //     console.log("🚀 ~ file: index.ts ~ line 193 ~ constfn_crawlData= ~ type", a[1].children[3].children[3].children[0])
        //     if(type == "mp3"){
        //         console.log(a[indexElement].children[i].children[3].children[0].attribs.href)
        //     }

        //     if (type == "mp4") {
        //         data = {
        //             url: a[indexElement].children[i].children[3].children[0].attribs.href,
        //             size: a[indexElement].children[i].children[2].children[0].data,
        //             type: type,
        //             quality: a[indexElement].children[i].children[0].children[0].data,
        //             mute: ""
        //         }
        //     }
        //     i++;
        //     linkDownArr.push(data)
        // }
        // if (a[indexElement].children[i] == undefined) {
        //     jsonData = {
        //         title: title,
        //         source: "Youtube",
        //         duration: "",
        //         thumbnail: imgSrc,
        //         links: linkDownArr
        //     }
        // }     

        // console.log("🚀 ~ file: index.ts ~ line 193 ~ constfn_crawlData= ~ type", a[1].children[3].children[1].children[0])

        jsonData = {
            title: title,
            source: "Youtube",
            duration: "",
            thumbnail: imgSrc,
            links: [
                {
                    url: a[1].children[3].children[3].children[0].attribs.href,
                    size: a[1].children[3].children[2].children[0].data,
                    type: "mp3",
                    quality: '',
                    mute: ""
                }
            ]
        }
    } catch (err) {

    }
    console.log("🚀 ~ file: index.ts ~ line 269 ~ constfn_crawlData= ~ jsonData", jsonData)

    return jsonData;
}

export { fn_GetAPI, fn_PushNotification, fn_stop }