import { loadMusic, showLoading, showErrorInternet } from './../redux/actions';
import { dboCollection, dboMusic } from '@services/sqlite';
import RNBackgroundDownloader from 'react-native-background-downloader';
import moment from 'moment';
import {  useDispatch } from 'react-redux';
import PushNotification from "react-native-push-notification";

const API_DOWN = "https://downloader28.banabatech.com/oldtest.php?url=";
const YT = "https://www.youtube.com/watch?v="

const fn_GetAPI = async (link, dispatch: any) => {
    let json: any = "not working";
    let linkVideo = YT + link
    console.log("🚀 ~ file: index.ts ~ line 15 ~ constfn_GetAPI= ~ linkVideo", linkVideo)
    
    await fetch(API_DOWN + linkVideo)
        .then((response) => response.json())
        .then((json) => {
            processButton(json,dispatch)
        })
        .catch(() => {
            dispatch(showLoading(false))
            dispatch(showErrorInternet(true))
        });
}

/**
 * Get random id
 * 
 * @param max number max in number random
 */
export const fn_GetRandomID = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
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

        RNBackgroundDownloader
            .download({
                id: id.toString(),
                url: url,
                destination: path,
                priority: 1,
            })
            .begin((expectedBytes) => {
            })
            .progress((percent, bytesWritten, totalBytes) => {
                console.log(percent)
            })
            .done(() => {
                dboMusic.InsertItem(infoMusic).then(res => {
                    dboMusic.SelectAll().then((res) => {
                        dispatch(loadMusic(res))
                        dispatch(showLoading(false))
                        fn_PushNotification("Finished downloading", `The video ${title} has finished downloading`)
                    })
                })
            })
            .error((error: any) => {
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
            channelId: "3",
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
        channelId: 3,
        title: title,
        message: message,
        smallIcon: "ic_notification",
        playSound: true,
        soundName: "default",
    });
}

export { fn_GetAPI,fn_PushNotification }