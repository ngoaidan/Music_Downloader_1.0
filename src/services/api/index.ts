import { loadMusic, showLoading, showErrorInternet, setTaskDownloading, setPercent } from './../redux/actions';
import { dboCollection, dboMusic } from '@services/sqlite';
import RNBackgroundDownloader from 'react-native-background-downloader';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import PushNotification from "react-native-push-notification";

const API_DOWN = "https://downloader28.banabatech.com/oldtest.php?url=";
const YT = "https://www.youtube.com/watch?v="

const fn_GetAPI = async (link, dispatch: any) => {
    let json: any = "not working";
    let linkVideo = YT + link

    await fetch(API_DOWN + linkVideo)
        .then((response) => response.json())
        .then((json) => {
            processButton(json,dispatch)
        })
        .catch(() => {
            dispatch(showLoading(false))
            dispatch(showErrorInternet(true))
        });

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
                dispatch(setTaskDownloading(task))

            })
            .progress((percent, bytesWritten, totalBytes) => {
                dispatch(setPercent(percent))
            })
            .done(async () => {
                dispatch(setTaskDownloading(task))
                dispatch(showLoading(false))
                await dboMusic.InsertItem(infoMusic).then(async res => {
                    console.log("🚀 ~ file: index.ts ~ line 99 ~ dboMusic.InsertItem ~ res", res)

                    await dboMusic.SelectAll().then((res) => {
                        dispatch(loadMusic(res))
                        dispatch(showLoading(false))
                        fn_PushNotification("Finished downloading", `The video ${title} has finished downloading`)
                    })
                }).catch((err) => {
                    console.log("🚀 ~ file: index.ts ~ line 99 ~ dboMusic.InsertItem ~ res", err)
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

export { fn_GetAPI, fn_PushNotification, fn_stop }